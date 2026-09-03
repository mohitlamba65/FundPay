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
      <DialogContent className="sm:max-w-lg rounded-3xl p-6 sm:p-8 bg-white border border-[#E7E5E4] shadow-xl">
        <DialogHeader>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF3] text-[#16A34A] text-xs font-semibold w-fit mb-2">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Mutual Fund Backed Plan</span>
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight text-[#171717]">
            {plan.tenureMonths}-Month EMI Breakdown
          </DialogTitle>
          <DialogDescription className="text-xs text-[#6B6B6B]">
            Transparent calculation showing how compounding offsets your device cost.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {/* Key Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E5E4]">
              <span className="text-[11px] font-semibold text-[#8A8A8A] uppercase tracking-wider block">
                Monthly Debit
              </span>
              <span className="text-xl font-bold text-[#171717] mt-1 block">
                {formatINR(plan.monthlyAmount)}
              </span>
              <span className="text-[11px] text-[#16A34A] font-medium">
                {plan.interestRate === 0 ? "0% Interest" : `${plan.interestRate}% Interest APR`}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E5E4]">
              <span className="text-[11px] font-semibold text-[#8A8A8A] uppercase tracking-wider block">
                Net Effective Cost
              </span>
              <span className="text-xl font-bold text-[#171717] mt-1 block">
                {formatINR(plan.netEffectiveCost)}
              </span>
              <span className="text-[11px] text-[#16A34A] font-medium">
                Save {formatINR(plan.totalEmiPaid - plan.netEffectiveCost)}
              </span>
            </div>
          </div>

          {/* Line items */}
          <div className="rounded-2xl border border-[#E7E5E4] p-4 space-y-2.5 text-xs">
            <div className="flex justify-between text-[#6B6B6B]">
              <span>Device Price ({variant.storage}):</span>
              <span className="font-semibold text-[#171717]">{formatINR(variant.price)}</span>
            </div>

            <div className="flex justify-between text-[#6B6B6B]">
              <span>Total EMI Payable ({plan.tenureMonths} months):</span>
              <span className="font-semibold text-[#171717]">{formatINR(plan.totalEmiPaid)}</span>
            </div>

            {plan.cashback > 0 && (
              <div className="flex justify-between text-[#16A34A] font-semibold">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Guaranteed Cashback:
                </span>
                <span>-{formatINR(plan.cashback)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#16A34A] font-semibold">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Projected Mutual Fund Gain:
              </span>
              <span>-{formatINR(mf.estimatedMfGain || 0)}</span>
            </div>
          </div>

          {/* Mutual Fund Info Box */}
          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E5E4] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#171717]">{mf.name}</span>
              <span className="font-semibold text-[#16A34A] bg-[#ECFDF3] px-2 py-0.5 rounded-md">
                ~{mf.expectedReturnRate}% Exp. CAGR
              </span>
            </div>
            <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
              Scheme Code: {mf.schemeCode} • {mf.fundHouse}. Your units remain 100% invested in your portfolio.
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-1/3 rounded-xl border-[#E7E5E4] text-xs font-semibold h-11"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
              onProceed();
            }}
            className="w-2/3 bg-[#111111] hover:bg-black text-white rounded-xl text-xs font-semibold h-11"
          >
            Confirm & Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
