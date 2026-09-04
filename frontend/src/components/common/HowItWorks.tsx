import { useState } from "react";
import { Smartphone, CheckSquare, Layers, ShoppingBag, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    id: 1,
    title: "1. Choose Device & Plan",
    tagline: "Pick your phone and customized EMI tenure",
    description:
      "Select your favorite flagship smartphone and explore tenures from 6 to 24 months with promotional cashbacks and 0% interest options.",
    badge: "Step 1",
    icon: Smartphone,
    highlights: ["Select color and storage", "Compare 6 to 24 month EMIs", "Lock in guaranteed cashback"],
  },
  {
    id: 2,
    title: "2. Verify Portfolio",
    tagline: "Instant paperless verification via CAMS/KFintech",
    description:
      "Enter your PAN & mobile number to fetch your existing mutual fund folios. No credit score check or heavy salary slips required.",
    badge: "Step 2",
    icon: CheckSquare,
    highlights: ["Takes under 60 seconds", "Zero impact on CIBIL", "100% digital OTP verification"],
  },
  {
    id: 3,
    title: "3. Digital Lien Pledge",
    tagline: "Your mutual fund units stay invested and grow",
    description:
      "Mark a digital lien on eligible units. You do NOT sell or liquidate them. Your investments remain in your name, earning dividends and market compounding.",
    badge: "Step 3",
    icon: Layers,
    highlights: ["Zero tax or capital gains event", "Units keep earning dividends", "Lien released on loan payoff"],
  },
  {
    id: 4,
    title: "4. Doorstep Delivery",
    tagline: "Pay ₹0 today. Gadget dispatched immediately",
    description:
      "Enjoy zero down payment. Your order is dispatched directly from authorized brand stores with official manufacturer warranty and invoice.",
    badge: "Step 4",
    icon: ShoppingBag,
    highlights: ["100% brand authentic", "Free insured express delivery", "Auto-debit monthly EMI"],
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep]!;
  const IconComponent = current.icon;

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E5E0EA]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F8F4FF] border border-[#DCC9F5] text-xs font-semibold uppercase tracking-wider text-[#6D28D9] mb-4 shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-[#7C20E8]" />
          <span>Simple 4-Step Journey</span>
        </div>

        <h2 className="text-[40px] sm:text-[56px] font-bold tracking-[-0.04em] text-[#050505] leading-[1.05]">
          How you upgrade <span className="italic font-normal text-[#777777]">without selling</span>{" "}
          <span className="text-[#6D28D9]">your portfolio</span>
        </h2>
        <p className="text-[17px] sm:text-[19px] text-[#444444] mt-4 leading-relaxed font-normal">
          Traditional EMIs bleed interest. Use your pre-existing mutual funds as collateral to unlock 0% effective interest rates.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = idx === activeStep;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-3 p-4 rounded-[20px] border text-left transition-all ${
                isActive
                  ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-md scale-[1.02]"
                  : "bg-[#F8F4FF] text-[#050505] border-[#DCC9F5] hover:bg-[#EFDAFF]"
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] transition-colors ${
                  isActive ? "bg-white/20 text-white" : "bg-white text-[#6D28D9] border border-[#DCC9F5]"
                }`}
              >
                <StepIcon className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <span className={`text-[11px] uppercase tracking-wider font-bold block ${isActive ? "text-white/70" : "text-[#777777]"}`}>
                  {step.badge}
                </span>
                <span className="text-sm font-bold truncate block">
                  {step.title.split(". ")[1]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-[28px] border border-[#DCC9F5] p-8 sm:p-12 shadow-1fi-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8F4FF] text-[#6D28D9] text-xs font-semibold border border-[#DCC9F5]">
            <ShieldCheck className="h-4 w-4 text-[#7C20E8]" />
            <span>{current.tagline}</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-[#050505] tracking-tight">
            {current.title}
          </h3>

          <p className="text-[16px] text-[#444444] leading-relaxed max-w-xl">
            {current.description}
          </p>

          <div className="pt-2 space-y-2.5">
            {current.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2.5 text-sm font-medium text-[#050505]">
                <div className="h-2 w-2 rounded-full bg-[#20D66B]" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-4">
            {activeStep < STEPS.length - 1 ? (
              <Button
                onClick={() => setActiveStep(activeStep + 1)}
                className="bg-[#6D28D9] hover:bg-[#5420C9] text-white rounded-[18px] h-12 px-7 text-sm font-medium"
              >
                Next Step <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <a
                href="#products"
                className="inline-flex items-center gap-2 bg-[#6D28D9] hover:bg-[#5420C9] text-white rounded-[18px] h-12 px-7 text-sm font-semibold transition-colors shadow-sm"
              >
                Start Shopping Now <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 flex items-center justify-center p-8 bg-[#F8F4FF] rounded-[24px] border border-[#DCC9F5]">
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[24px] bg-white shadow-sm border border-[#DCC9F5]">
              <IconComponent className="h-14 w-14 text-[#6D28D9]" />
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-bold text-[#777777]">
                FundPay Digital Guarantee
              </span>
              <div className="text-xl font-bold text-[#050505]">
                Zero Prepayment Penalties
              </div>
              <p className="text-xs text-[#444444] max-w-xs mx-auto leading-relaxed">
                Pay off early anytime to immediately revoke mutual fund lien.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
