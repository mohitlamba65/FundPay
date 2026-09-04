import { useState, useEffect, useMemo } from "react";
import { TrendingUp, ShieldCheck, Sparkles, ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";
import { formatINR } from "@/utils/cn";
import { productsApi } from "@/api";
import type { GrowthCalculationResult } from "@/types";

const TENURE_OPTIONS = [6, 9, 12, 18, 24];

const PRESET_AMOUNTS = [
  { label: "₹75,000", value: 75000 },
  { label: "₹1,00,000", value: 100000 },
  { label: "₹1,25,000", value: 125000 },
  { label: "₹1,50,000", value: 150000 },
];

export function EmiCalculator() {
  const [amount, setAmount] = useState<number>(124900); // default iPhone 17 Pro price
  const [tenure, setTenure] = useState<number>(12);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const expectedReturnRate = 14.5; // Average large cap/flexi cap mutual fund CAGR

  // API State
  const [apiResult, setApiResult] = useState<GrowthCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Compute monthly EMI based on principal, tenure, and APR
  const baseMonthlyEmi = useMemo(() => {
    if (interestRate === 0) {
      return Math.round(amount / tenure);
    }
    const monthlyRate = interestRate / (12 * 100);
    return Math.round(
      (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1)
    );
  }, [amount, tenure, interestRate]);

  // Promotional cashback calculation
  const calculatedCashback = useMemo(() => {
    return Math.round(amount * (tenure >= 18 ? 0.04 : tenure >= 12 ? 0.03 : 0.015));
  }, [amount, tenure]);

  // Call POST /api/products/calculate-growth dynamically
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchGrowthCalculation = async () => {
      try {
        setIsCalculating(true);
        const result = await productsApi.calculateGrowth({
          monthlyAmount: baseMonthlyEmi,
          tenureMonths: tenure,
          expectedReturnRate,
          interestRate,
          cashback: calculatedCashback,
        });

        if (isMounted) {
          setApiResult(result);
        }
      } catch (err) {
        console.error("Failed to compute growth calculation from API:", err);
      } finally {
        if (isMounted) {
          setIsCalculating(false);
        }
      }
    };

    const timer = setTimeout(() => {
      fetchGrowthCalculation();
    }, 150);

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [baseMonthlyEmi, tenure, interestRate, calculatedCashback]);

  // Derived values with fallback to local calculation while first API call resolves
  const totalPayable = apiResult ? apiResult.totalInvested : baseMonthlyEmi * tenure;
  const cashback = apiResult ? apiResult.cashback : calculatedCashback;
  const projectedWealth = apiResult
    ? apiResult.projectedWealth
    : Math.round(
        baseMonthlyEmi *
          ((Math.pow(1 + expectedReturnRate / 1200, tenure) - 1) / (expectedReturnRate / 1200)) *
          (1 + expectedReturnRate / 1200)
      );
  const estimatedReturns = apiResult ? apiResult.estimatedReturns : Math.max(0, projectedWealth - totalPayable);
  const netEffectiveCost = apiResult ? apiResult.netEffectiveCost : Math.max(0, totalPayable - cashback - estimatedReturns);

  return (
    <section id="calculator" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F8F4FF] text-[#6D28D9] border border-[#DCC9F5] text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
          <TrendingUp className="h-3.5 w-3.5 text-[#7C20E8]" />
          <span>Interactive Financial Simulator</span>
        </div>
        <h2 className="text-[40px] sm:text-[56px] font-bold tracking-[-0.04em] text-[#050505] leading-[1.05]">
          See how mutual funds <span className="italic font-normal text-[#777777]">offset</span>{" "}
          <span className="text-[#6D28D9]">your EMI</span>
        </h2>
        <p className="text-[17px] sm:text-[19px] text-[#444444] mt-4 leading-relaxed font-normal">
          Traditional loans bleed interest. FundPay keeps your pledged mutual fund portfolio compounding, offsetting interest and drastically lowering your net effective cost.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Controls Card */}
        <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-9 border border-[#DCC9F5] shadow-1fi-card flex flex-col justify-between">
          <div className="space-y-8">
            {/* Amount Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[15px] font-bold text-[#050505]">
                  Gadget Purchase Value
                </label>
                <span className="text-3xl font-extrabold text-[#6D28D9]">
                  {formatINR(amount)}
                </span>
              </div>

              <input
                type="range"
                min={30000}
                max={200000}
                step={5000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-[#F8F4FF] rounded-lg appearance-none cursor-pointer accent-[#6D28D9]"
              />

              {/* Preset quick buttons */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {PRESET_AMOUNTS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setAmount(p.value)}
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                      amount === p.value
                        ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-xs"
                        : "bg-[#F8F4FF] text-[#444444] border-[#DCC9F5] hover:bg-[#EFDAFF]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tenure Segmented Control */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[15px] font-bold text-[#050505]">
                  Repayment Tenure
                </label>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6D28D9] bg-[#F8F4FF] px-3 py-1 rounded-full border border-[#DCC9F5]">
                  {tenure === 6 ? "0% Interest Promo" : "Compounding Active"}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2.5">
                {TENURE_OPTIONS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTenure(t);
                      if (t === 6) setInterestRate(0);
                      else if (t === 9) setInterestRate(6.5);
                      else if (t === 12) setInterestRate(9.5);
                      else if (t === 18) setInterestRate(11.0);
                      else setInterestRate(12.5);
                    }}
                    className={`py-3.5 rounded-[18px] text-center text-sm font-semibold border transition-all ${
                      tenure === t
                        ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-sm"
                        : "bg-[#F8F4FF] text-[#050505] border-[#E5E0EA] hover:bg-[#EFDAFF]"
                    }`}
                  >
                    {t}M
                  </button>
                ))}
              </div>
            </div>

            {/* Key Assumptions */}
            <div className="p-4 rounded-[20px] bg-[#F8F4FF] border border-[#DCC9F5] flex items-center justify-between text-xs text-[#444444]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#6D28D9]" />
                <span>Linked Mutual Fund Expected CAGR:</span>
              </div>
              <strong className="text-[#050505] font-bold text-sm">
                ~{expectedReturnRate}% Historical
              </strong>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E5E0EA] mt-6 flex items-center justify-between text-xs text-[#777777]">
            <span>Zero Processing Fee</span>
            <span>Zero Foreclosure Charge</span>
            <span className="flex items-center gap-1 text-[#20D66B] font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Dynamic API Engine
            </span>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#6D28D9] to-[#5420C9] text-white rounded-[28px] p-6 sm:p-9 flex flex-col justify-between shadow-1fi-nav relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-white/80 font-bold">
                  Plan Breakdown
                </span>
                {isCalculating && (
                  <Loader2 className="h-3.5 w-3.5 text-white animate-spin" />
                )}
              </div>
              <span className="text-xs bg-white/15 text-white border border-white/30 px-3 py-1 rounded-full font-semibold">
                {interestRate === 0 ? "0% Interest" : `${interestRate}% APR`}
              </span>
            </div>

            {/* Primary Monthly Amount */}
            <div className="space-y-1 mb-6">
              <span className="text-xs text-white/70 uppercase tracking-wider font-medium">Estimated Monthly Installment</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                  {formatINR(baseMonthlyEmi)}
                </span>
                <span className="text-sm text-white/70">/ month</span>
              </div>
            </div>

            {/* Metrics List */}
            <div className="space-y-3.5 text-[15px] border-t border-white/20 pt-5">
              <div className="flex justify-between text-white/80">
                <span>Principal Device Price:</span>
                <span className="text-white font-semibold">{formatINR(amount)}</span>
              </div>

              <div className="flex justify-between text-white/80">
                <span>Total EMI Paid ({tenure} mos):</span>
                <span className="text-white font-semibold">{formatINR(totalPayable)}</span>
              </div>

              <div className="flex justify-between text-[#20D66B]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="h-4 w-4" />
                  Guaranteed Cashback:
                </span>
                <span className="font-bold">+{formatINR(cashback)}</span>
              </div>

              <div className="flex justify-between text-[#20D66B]">
                <span className="flex items-center gap-1.5 font-medium">
                  <TrendingUp className="h-4 w-4" />
                  Portfolio Compounding (@{expectedReturnRate}%):
                </span>
                <span className="font-bold">+{formatINR(estimatedReturns)}</span>
              </div>
            </div>
          </div>

          {/* Net Cost Box */}
          <div className="mt-8 pt-5 border-t border-white/20">
            <div className="flex items-end justify-between p-4 rounded-[20px] bg-white/12 border border-white/20 backdrop-blur-xs">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-white/80 font-bold block">
                  Net Effective Cost
                </span>
                <span className="text-3xl font-extrabold text-white">
                  {formatINR(netEffectiveCost)}
                </span>
              </div>
              <div className="text-right text-xs text-[#20D66B] font-bold bg-[#20D66B]/20 border border-[#20D66B]/40 px-2.5 py-1 rounded-full">
                Save {formatINR(totalPayable - netEffectiveCost)}
              </div>
            </div>

            <a
              href="#products"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-[18px] bg-white text-[#6D28D9] hover:bg-[#F8F4FF] h-12 text-[15px] font-bold transition-all shadow-md"
            >
              <span>Explore Eligible Smartphones</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
