import { SlideDrawer } from "@/components/common/SlideDrawer";
import type { EMIPlan, Variant } from "@/types";
import { formatINR } from "@/utils/cn";
import { TrendingUp, Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmiBreakdownDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: EMIPlan | null;
  variant: Variant;
  onProceed: () => void;
}

export function EmiBreakdownDialog({
  open,
  onOpenChange,
  plan,
  variant,
  onProceed,
}: EmiBreakdownDrawerProps) {
  if (!plan) return null;

  const mf = plan.mutualFund;

  return (
    <SlideDrawer
      isOpen={open}
      onClose={() => onOpenChange(false)}
      side="right"
      widthClass="w-full sm:w-[85vw] md:w-[80vw] lg:w-[75vw] max-w-5xl"
      title={
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6D28D9] text-white">
            <TrendingUp className="h-5 w-5 stroke-[2.4]" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#050505]">
              {plan.tenureMonths}-Month EMI & Investment Analysis
            </span>
          </div>
        </div>
      }
      description={
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-semibold text-[#6D28D9] bg-[#F8F4FF] border border-[#DCC9F5] px-2.5 py-0.5 rounded-full">
            {plan.tenureMonths} Months Tenure
          </span>
          <span className="text-xs text-[#777777]">
            Transparent enterprise calculation showing how mutual fund compounding offsets your device cost.
          </span>
        </div>
      }
      footer={
        <div className="flex items-center justify-between gap-4">
          <div className="text-xs text-[#777777] hidden sm:block">
            Lien marked via CAMS/KFintech • Units remain 100% in your folio
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="w-1/3 sm:w-auto rounded-[16px] border-[#E5E0EA] text-xs font-semibold h-12 px-6"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                onOpenChange(false);
                onProceed();
              }}
              className="w-2/3 sm:w-auto bg-[#6D28D9] hover:bg-[#5420C9] text-white rounded-[16px] text-sm font-bold h-12 px-8 shadow-sm flex items-center gap-2"
            >
              <span>Confirm & Proceed with Plan</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      }
    >
      <div className="p-6 sm:p-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-[22px] bg-[#F8F4FF] border border-[#DCC9F5] shadow-xs">
            <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider block">
              Monthly Installment
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#050505] mt-1">
              {formatINR(plan.monthlyAmount)}
              <span className="text-xs font-normal text-[#777777] ml-1">/ mo</span>
            </div>
            <div className="mt-2 text-xs font-semibold text-[#20D66B] flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{plan.interestRate === 0 ? "0% Interest Promo" : `${plan.interestRate}% Interest APR`}</span>
            </div>
          </div>

          <div className="p-5 rounded-[22px] bg-[#F8F4FF] border border-[#DCC9F5] shadow-xs">
            <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider block">
              Projected Fund Growth
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#20D66B] mt-1">
              +{formatINR(mf.estimatedMfGain || 0)}
            </div>
            <div className="mt-2 text-xs font-semibold text-[#6D28D9]">
              ~{mf.expectedReturnRate}% Historical CAGR
            </div>
          </div>

          <div className="p-5 rounded-[22px] bg-gradient-to-br from-[#6D28D9] to-[#5420C9] text-white shadow-xs">
            <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider block">
              Net Effective Cost
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {formatINR(plan.netEffectiveCost)}
            </div>
            <div className="mt-2 text-xs font-bold text-[#20D66B] bg-white/15 px-2.5 py-0.5 rounded-full w-fit">
              You Save {formatINR(plan.totalEmiPaid - plan.netEffectiveCost)}
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-[#E5E0EA] bg-white overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-[#E5E0EA] bg-[#FCFAFF] flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#050505] uppercase tracking-wider">
              Financial Breakdown Ledger
            </h4>
            <span className="text-xs text-[#777777]">Values in INR (₹)</span>
          </div>

          <div className="divide-y divide-[#E5E0EA] text-sm">
            <div className="flex items-center justify-between px-6 py-3.5">
              <span className="text-[#444444]">Device Purchase Value ({variant.storage}):</span>
              <span className="font-semibold text-[#050505]">{formatINR(variant.price)}</span>
            </div>

            <div className="flex items-center justify-between px-6 py-3.5">
              <span className="text-[#444444]">Total EMI Payable ({plan.tenureMonths} Months):</span>
              <span className="font-semibold text-[#050505]">{formatINR(plan.totalEmiPaid)}</span>
            </div>

            {plan.cashback > 0 && (
              <div className="flex items-center justify-between px-6 py-3.5 text-[#20D66B] bg-[#ECFDF3]/40">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="h-4 w-4" />
                  Guaranteed Brand Cashback:
                </span>
                <span className="font-bold">-{formatINR(plan.cashback)}</span>
              </div>
            )}

            <div className="flex items-center justify-between px-6 py-3.5 text-[#20D66B] bg-[#ECFDF3]/40">
              <span className="flex items-center gap-1.5 font-medium">
                <TrendingUp className="h-4 w-4" />
                Projected Mutual Fund Compounding Gain:
              </span>
              <span className="font-bold">-{formatINR(mf.estimatedMfGain || 0)}</span>
            </div>

            <div className="flex items-center justify-between px-6 py-4 bg-[#F8F4FF] font-bold text-[#050505]">
              <span className="text-base">Net Effective Out-of-Pocket Cost:</span>
              <span className="text-xl font-extrabold text-[#6D28D9]">
                {formatINR(plan.netEffectiveCost)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-[24px] bg-[#F8F4FF] border border-[#DCC9F5] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DCC9F5]/70 pb-3">
            <div>
              <span className="text-xs uppercase font-bold text-[#777777] block">Collateral Scheme</span>
              <h4 className="text-lg font-bold text-[#050505]">{mf.name}</h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#6D28D9] bg-[#EFDAFF] border border-[#DCC9F5] px-3 py-1 rounded-full">
                ~{mf.expectedReturnRate}% Expected CAGR
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#444444]">
            <div>
              <span className="text-[#777777] block mb-1">Fund House & Scheme Code:</span>
              <strong className="text-[#050505] font-semibold">{mf.fundHouse} • Code: {mf.schemeCode}</strong>
            </div>
            <div>
              <span className="text-[#777777] block mb-1">Lien Custody Mechanism:</span>
              <strong className="text-[#050505] font-semibold">SEBI Registered RTA (CAMS / KFintech)</strong>
            </div>
          </div>

          <div className="p-4 rounded-[16px] bg-white border border-[#DCC9F5] flex items-start gap-3 text-xs text-[#444444] leading-relaxed">
            <ShieldCheck className="h-5 w-5 text-[#6D28D9] shrink-0 mt-0.5" />
            <p>
              Your mutual fund units remain 100% invested in your portfolio under your direct ownership. They continue to earn daily NAV compounding and dividends. The digital lien is revoked automatically within 24 hours of final EMI payment or early prepayment.
            </p>
          </div>
        </div>
      </div>
    </SlideDrawer>
  );
}
