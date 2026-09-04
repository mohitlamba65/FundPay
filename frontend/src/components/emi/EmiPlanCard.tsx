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
      className={`relative cursor-pointer rounded-[22px] border p-5 transition-all duration-200 outline-none select-none text-left ${
        isSelected
          ? "border-[#6D28D9] bg-[#F8F4FF] ring-2 ring-[#6D28D9] shadow-1fi-card"
          : "border-[#E5E0EA] bg-white hover:border-[#DCC9F5] hover:bg-[#F8F4FF]/50"
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#050505]">
          {plan.tenureMonths} Months
        </span>

        <div className="flex items-center gap-1.5">
          {isRecommended && (
            <Badge className="bg-[#6D28D9] text-white border-none text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full">
              Recommended
            </Badge>
          )}
          {isNoCost && !isRecommended && (
            <Badge className="bg-[#ECFDF3] text-[#20D66B] border-none text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full">
              No-Cost
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-0.5 mb-3">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#050505]">
            {formatINR(plan.monthlyAmount)}
          </span>
          <span className="text-xs text-[#777777]">/ month</span>
        </div>
        <p className="text-xs font-medium text-[#444444]">
          {plan.interestRate === 0 ? (
            <span className="text-[#20D66B] font-bold">0% Interest Promo</span>
          ) : (
            <span>{plan.interestRate}% Interest APR</span>
          )}
        </p>
      </div>

      <div className="space-y-2 pt-3 border-t border-[#E5E0EA] text-xs">
        {plan.cashback > 0 && (
          <div className="flex items-center justify-between text-[#20D66B] font-bold bg-[#ECFDF3] px-2.5 py-1 rounded-lg">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              Cashback
            </span>
            <span>+{formatINR(plan.cashback)}</span>
          </div>
        )}

        <div className="flex items-start justify-between gap-2 text-[#444444]">
          <div className="flex items-center gap-1.5 text-[11px]">
            <TrendingUp className="h-3.5 w-3.5 text-[#6D28D9] shrink-0" />
            <span className="truncate max-w-[170px]" title={plan.mutualFund.name}>
              {plan.mutualFund.name}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#6D28D9] shrink-0">
            {plan.mutualFund.expectedReturnRate}% Exp.
          </span>
        </div>
      </div>

      <div className="mt-4 pt-2 flex items-center justify-between border-t border-[#E5E0EA]/70">
        <span className="text-[11px] text-[#777777]">
          Net cost: <strong className="text-[#050505]">{formatINR(plan.netEffectiveCost)}</strong>
        </span>

        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
            isSelected
              ? "border-[#6D28D9] bg-[#6D28D9] text-white"
              : "border-[#E5E0EA] bg-white"
          }`}
        >
          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
        </div>
      </div>
    </div>
  );
}
