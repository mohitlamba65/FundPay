import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { EMIPlan, Variant } from "@/types";
import { formatINR } from "@/utils/cn";
import { TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmiBreakdownDialogProps {
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
}: EmiBreakdownDialogProps) {
  if (!plan) return null;

  const mf = plan.mutualFund;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-[28px] p-6 sm:p-8 bg-white border border-[#DCC9F5] shadow-2xl">
        <DialogHeader>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F4FF] text-[#6D28D9] border border-[#DCC9F5] text-xs font-semibold w-fit mb-2">
            <TrendingUp className="h-3.5 w-3.5 text-[#7C20E8]" />
            <span>Mutual Fund Backed Plan</span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-[#050505]">
            {plan.tenureMonths}-Month EMI Breakdown
          </DialogTitle>
          <DialogDescription className="text-sm text-[#444444]">
            Transparent calculation showing how compounding offsets your device cost.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {/* Key Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-[20px] bg-[#F8F4FF] border border-[#DCC9F5]">
              <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider block">
                Monthly Debit
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#050505] mt-1 block">
                {formatINR(plan.monthlyAmount)}
              </span>
              <span className="text-[11px] text-[#20D66B] font-bold">
                {plan.interestRate === 0 ? "0% Interest Promo" : `${plan.interestRate}% Interest APR`}
              </span>
            </div>

            <div className="p-4 rounded-[20px] bg-[#F8F4FF] border border-[#DCC9F5]">
              <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider block">
                Net Effective Cost
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#6D28D9] mt-1 block">
                {formatINR(plan.netEffectiveCost)}
              </span>
              <span className="text-[11px] text-[#20D66B] font-bold">
                Save {formatINR(plan.totalEmiPaid - plan.netEffectiveCost)}
              </span>
            </div>
          </div>

          {/* Line items */}
          <div className="rounded-[20px] border border-[#E5E0EA] p-4 space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between text-[#444444]">
              <span>Device Price ({variant.storage}):</span>
              <span className="font-semibold text-[#050505]">{formatINR(variant.price)}</span>
            </div>

            <div className="flex justify-between text-[#444444]">
              <span>Total EMI Payable ({plan.tenureMonths} months):</span>
              <span className="font-semibold text-[#050505]">{formatINR(plan.totalEmiPaid)}</span>
            </div>

            {plan.cashback > 0 && (
              <div className="flex justify-between text-[#20D66B] font-bold">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> Guaranteed Cashback:
                </span>
                <span>-{formatINR(plan.cashback)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#20D66B] font-bold">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> Projected Mutual Fund Gain:
              </span>
              <span>-{formatINR(mf.estimatedMfGain || 0)}</span>
            </div>
          </div>

          {/* Mutual Fund Info Box */}
          <div className="p-4 rounded-[20px] bg-[#F8F4FF] border border-[#DCC9F5] space-y-1.5">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-bold text-[#050505]">{mf.name}</span>
              <span className="font-bold text-[#6D28D9] bg-[#EFDAFF] border border-[#DCC9F5] px-2.5 py-0.5 rounded-full text-xs">
                ~{mf.expectedReturnRate}% Exp. CAGR
              </span>
            </div>
            <p className="text-[12px] text-[#444444] leading-relaxed">
              Scheme Code: {mf.schemeCode} • {mf.fundHouse}. Your units remain 100% invested in your portfolio.
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-1/3 rounded-[16px] border-[#E5E0EA] text-xs font-semibold h-12"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
              onProceed();
            }}
            className="w-2/3 bg-[#6D28D9] hover:bg-[#5420C9] text-white rounded-[16px] text-xs sm:text-sm font-semibold h-12 shadow-sm"
          >
            Confirm & Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
