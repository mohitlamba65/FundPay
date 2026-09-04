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
  const [amount, setAmount] = useState<number>(112900); // default iPhone 16 Pro price
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
    }, 150); // slight debounce for smooth slider feel

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
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF3] text-[#16A34A] text-xs font-semibold uppercase tracking-wider mb-3">
          <TrendingUp className="h-3.5 w-3.5" />
          Interactive Financial Simulator
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171717]">
          See How Mutual Funds Offset Your EMI
        </h2>
        <p className="text-sm text-[#6B6B6B] mt-3 leading-relaxed">
          Traditional EMIs bleed interest. FundPay keeps your pledged mutual fund portfolio compounding, offsetting interest and lowering your net effective cost.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Controls Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] shadow-xs flex flex-col justify-between">
          <div className="space-y-8">
            {/* Amount Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-[#171717]">
                  Gadget Purchase Value
                </label>
                <span className="text-2xl font-bold text-[#171717]">
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
                className="w-full h-2 bg-[#F5F5F4] rounded-lg appearance-none cursor-pointer accent-[#111111]"
              />

              {/* Preset quick buttons */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {PRESET_AMOUNTS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setAmount(p.value)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      amount === p.value
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-[#FAFAF8] text-[#6B6B6B] border-[#E7E5E4] hover:bg-[#F5F5F4]"
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
                <label className="text-sm font-semibold text-[#171717]">
                  Repayment Tenure
                </label>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#16A34A] bg-[#ECFDF3] px-2.5 py-0.5 rounded-full">
                  {tenure === 6 ? "0% Interest Promo" : "Compounding Active"}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
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
                    className={`py-3 rounded-xl text-center text-sm font-semibold border transition-all ${
                      tenure === t
                        ? "bg-[#111111] text-white border-[#111111] shadow-xs"
                        : "bg-[#FAFAF8] text-[#171717] border-[#E7E5E4] hover:bg-[#F5F5F4]"
                    }`}
                  >
                    {t}M
                  </button>
                ))}
              </div>
            </div>

            {/* Key Assumptions */}
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E5E4] flex items-center justify-between text-xs text-[#6B6B6B]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
                <span>Linked Mutual Fund Returns:</span>
              </div>
              <strong className="text-[#171717] font-semibold">
                ~{expectedReturnRate}% Historical CAGR
              </strong>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E7E5E4] mt-6 flex items-center justify-between text-xs text-[#8A8A8A]">
            <span>Zero Processing Fees</span>
            <span>Zero Foreclosure Charges</span>
            <span className="flex items-center gap-1 text-[#16A34A]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Dynamic API Engine
            </span>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-[#111111] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-white/60 font-semibold">
                  Plan Breakdown
                </span>
                {isCalculating && (
                  <Loader2 className="h-3 w-3 text-[#16A34A] animate-spin" />
                )}
              </div>
              <span className="text-xs bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30 px-2.5 py-0.5 rounded-full font-semibold">
                {interestRate === 0 ? "0% Interest" : `${interestRate}% APR`}
              </span>
            </div>

            {/* Primary Monthly Amount */}
            <div className="space-y-1 mb-6">
              <span className="text-xs text-white/60">Estimated Monthly Installment</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-white">
                  {formatINR(baseMonthlyEmi)}
                </span>
                <span className="text-sm text-white/60">/ mo</span>
              </div>
            </div>

            {/* Metrics List */}
            <div className="space-y-3.5 text-sm border-t border-white/10 pt-5">
              <div className="flex justify-between text-white/70">
                <span>Principal Gadget Price:</span>
                <span className="text-white font-medium">{formatINR(amount)}</span>
              </div>

              <div className="flex justify-between text-white/70">
                <span>Total EMI Paid ({tenure} mos):</span>
                <span className="text-white font-medium">{formatINR(totalPayable)}</span>
              </div>

              <div className="flex justify-between text-[#16A34A]">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Guaranteed Cashback:
                </span>
                <span className="font-semibold">+{formatINR(cashback)}</span>
              </div>

              <div className="flex justify-between text-[#16A34A]">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Portfolio Growth (@{expectedReturnRate}%):
                </span>
                <span className="font-semibold">+{formatINR(estimatedReturns)}</span>
              </div>
            </div>
          </div>

          {/* Net Cost Box */}
          <div className="mt-8 pt-5 border-t border-white/10">
            <div className="flex items-end justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-white/60 font-semibold block">
                  Net Effective Cost
                </span>
                <span className="text-2xl font-bold text-white">
                  {formatINR(netEffectiveCost)}
                </span>
              </div>
              <div className="text-right text-xs text-[#16A34A] font-semibold">
                Save {formatINR(totalPayable - netEffectiveCost)}
              </div>
            </div>

            <a
              href="#products"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white text-[#111111] hover:bg-neutral-100 h-11 text-sm font-semibold transition-all shadow-sm"
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
