import {
  Percent,
  Wallet,
  Calendar,
  TrendingUp,
  Zap,
  ShieldAlert,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Percent,
    title: "0% Effective Interest",
    description:
      "Exclusive brand tie-ups and compounding mutual fund growth bring your net effective interest rate down to 0% or positive net wealth.",
  },
  {
    icon: Wallet,
    title: "Zero Down Payment",
    description:
      "Pay ₹0 at checkout. Your verified mutual fund equity portfolio covers 100% of the gadget purchase price upfront.",
  },
  {
    icon: Calendar,
    title: "Flexible Tenures (6–24M)",
    description:
      "Choose from comfortable repayment periods of 6, 9, 12, 18, or 24 months with transparent monthly debit schedules.",
  },
  {
    icon: TrendingUp,
    title: "Keep Investments Compounding",
    description:
      "Your mutual fund units are never sold. They remain in your name with AMCs, earning dividends and market compounding.",
  },
  {
    icon: Zap,
    title: "Instant Digital Onboarding",
    description:
      "Paperless e-KYC and digital lien creation in under 3 minutes via verified CAMS and KFintech OTP authentication.",
  },
  {
    icon: ShieldAlert,
    title: "Zero Foreclosure Penalties",
    description:
      "Clear your loan balance anytime with zero prepayment penalties or lock-in periods. Units are immediately un-pledged.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E7E5E4]">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#16A34A] bg-[#ECFDF3] px-3 py-1 rounded-full">
          Why FundPay
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171717] mt-3">
          Smart EMI Meets Smart Wealth
        </h2>
        <p className="text-sm text-[#6B6B6B] mt-3 leading-relaxed">
          Traditional consumer loans charge high hidden interest. We turn your existing portfolio into purchasing power without liquidation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BENEFITS.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className="group p-8 rounded-3xl bg-white border border-[#E7E5E4] hover:border-[#171717] hover:shadow-md transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAFAF8] text-[#171717] group-hover:bg-[#111111] group-hover:text-white transition-colors mb-5">
                <Icon className="h-6 w-6 text-[#16A34A] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-[#171717] tracking-tight mb-2">
                {b.title}
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                {b.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
