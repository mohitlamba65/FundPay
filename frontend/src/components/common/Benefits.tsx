import {
  Percent,
  Wallet,
  Calendar,
  TrendingUp,
  Zap,
  ShieldAlert,
  Sparkles,
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
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E5E0EA]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F8F4FF] border border-[#DCC9F5] text-xs font-semibold uppercase tracking-wider text-[#6D28D9] mb-4 shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-[#7C20E8]" />
          <span>Why FundPay</span>
        </div>
        <h2 className="text-[40px] sm:text-[56px] font-bold tracking-[-0.04em] text-[#050505] leading-[1.05]">
          Smart EMI meets <span className="italic font-normal text-[#777777]">unbroken</span>{" "}
          <span className="text-[#6D28D9]">compounding</span>
        </h2>
        <p className="text-[17px] sm:text-[19px] text-[#444444] mt-4 leading-relaxed font-normal">
          Traditional consumer loans charge high hidden interest. We turn your existing mutual fund portfolio into purchasing power without liquidation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BENEFITS.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className="group p-8 rounded-[26px] bg-[#F8F4FF] border border-[#DCC9F5] hover:border-[#6D28D9] hover:shadow-1fi-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white border border-[#DCC9F5] text-[#6D28D9] group-hover:bg-[#6D28D9] group-hover:text-white transition-colors mb-6 shadow-xs">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="text-[20px] font-bold text-[#050505] tracking-tight mb-2 group-hover:text-[#6D28D9] transition-colors">
                {b.title}
              </h3>
              <p className="text-[14px] text-[#444444] leading-relaxed">
                {b.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
