import { Check, Sparkles, TrendingUp } from "lucide-react";
import type { EMIPlan } from "@/types";
import { formatINR } from "@/utils/cn";
import { Badge } from "@/components/ui/badge";

interface EmiPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: () => void;
}

export function EmiPlanCard({ plan, isSelected, onSelect }: EmiPlanCardProps) {
  const isRecommended = plan.tenureMonths === 12;
  const isNoCost = plan.interestRate === 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`relative cursor-pointer rounded-2xl border p-5 transition-all duration-200 outline-none select-none text-left ${
        isSelected
          ? "border-[#111111] bg-white ring-2 ring-[#111111] shadow-md"
          : "border-[#E7E5E4] bg-white hover:border-[#8A8A8A] hover:bg-[#FAFAF8]"
      }`}
    >
      {/* Top Badges */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
          {plan.tenureMonths} Months
        </span>

        <div className="flex items-center gap-1.5">
          {isRecommended && (
            <Badge className="bg-[#111111] text-white border-none text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full">
              Recommended
            </Badge>
          )}
          {isNoCost && !isRecommended && (
            <Badge className="bg-[#ECFDF3] text-[#16A34A] border-none text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full">
              No-Cost
            </Badge>
          )}
        </div>
      </div>

      {/* Main Monthly EMI */}
      <div className="space-y-0.5 mb-3">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold tracking-tight text-[#171717]">
            {formatINR(plan.monthlyAmount)}
          </span>
          <span className="text-xs text-[#6B6B6B]">/ month</span>
        </div>
        <p className="text-xs font-medium text-[#6B6B6B]">
          {plan.interestRate === 0 ? (
            <span className="text-[#16A34A] font-semibold">0% Interest</span>
          ) : (
            <span>{plan.interestRate}% Interest APR</span>
          )}
        </p>
      </div>

      {/* Cashback & Mutual Fund Highlight */}
      <div className="space-y-2 pt-3 border-t border-[#E7E5E4] text-xs">
        {plan.cashback > 0 && (
          <div className="flex items-center justify-between text-[#16A34A] font-semibold bg-[#ECFDF3] px-2.5 py-1 rounded-lg">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Cashback
            </span>
            <span>+{formatINR(plan.cashback)}</span>
          </div>
        )}

        {/* Mutual Fund Linkage */}
        <div className="flex items-start justify-between gap-2 text-[#6B6B6B]">
          <div className="flex items-center gap-1 text-[11px]">
            <TrendingUp className="h-3 w-3 text-[#16A34A] shrink-0" />
            <span className="truncate max-w-[170px]" title={plan.mutualFund.name}>
              {plan.mutualFund.name}
            </span>
          </div>
          <span className="text-[11px] font-medium text-[#171717] shrink-0">
            {plan.mutualFund.expectedReturnRate}% Exp.
          </span>
        </div>
      </div>

      {/* Selection Indicator */}
      <div className="mt-4 pt-2 flex items-center justify-between">
        <span className="text-[11px] text-[#8A8A8A]">
          Net cost: <strong className="text-[#171717]">{formatINR(plan.netEffectiveCost)}</strong>
        </span>

        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
            isSelected
              ? "border-[#111111] bg-[#111111] text-white"
              : "border-[#E7E5E4] bg-white"
          }`}
        >
          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
        </div>
      </div>
    </div>
  );
}
