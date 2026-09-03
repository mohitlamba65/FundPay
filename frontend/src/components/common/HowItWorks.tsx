import { useState } from "react";
import { Smartphone, CheckSquare, Layers, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    id: 1,
    title: "1. Choose Gadget & Plan",
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
      "Enjoy zero down payment. Your order is dispatched directly from authorized brand stores with manufacturer warranty and invoice.",
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
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E7E5E4]">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#16A34A] bg-[#ECFDF3] px-3 py-1 rounded-full">
          Simple 4-Step Journey
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171717] mt-3">
          How Mutual-Fund Backed EMI Works
        </h2>
        <p className="text-sm text-[#6B6B6B] mt-3 leading-relaxed">
          No credit card? No problem. Use your existing mutual fund portfolio as collateral without selling a single unit.
        </p>
      </div>

      {/* Step Navigation Bar (Horizontal on desktop, vertical on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = idx === activeStep;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? "bg-[#111111] text-white border-[#111111] shadow-md scale-[1.02]"
                  : "bg-white text-[#171717] border-[#E7E5E4] hover:bg-[#F5F5F4] hover:border-[#8A8A8A]"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isActive ? "bg-white/15 text-[#16A34A]" : "bg-[#FAFAF8] text-[#171717]"
                }`}
              >
                <StepIcon className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <span className={`text-[10px] uppercase tracking-wider font-semibold block ${isActive ? "text-white/60" : "text-[#8A8A8A]"}`}>
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

      {/* Interactive Detail Box */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF3] text-[#16A34A] text-xs font-semibold">
            <ShieldCheck className="h-4 w-4" />
            <span>{current.tagline}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight">
            {current.title}
          </h3>

          <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-xl">
            {current.description}
          </p>

          <div className="pt-2 space-y-2.5">
            {current.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-xs font-medium text-[#171717]">
                <div className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-4">
            {activeStep < STEPS.length - 1 ? (
              <Button
                onClick={() => setActiveStep(activeStep + 1)}
                className="bg-[#111111] hover:bg-black text-white rounded-xl h-11 px-6 text-xs font-semibold"
              >
                Next Step <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            ) : (
              <a
                href="#products"
                className="inline-flex items-center gap-1.5 bg-[#16A34A] hover:bg-[#15803d] text-white rounded-xl h-11 px-6 text-xs font-semibold transition-colors"
              >
                Start Shopping Now <ArrowRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Visual Graphic Representation */}
        <div className="lg:col-span-5 flex items-center justify-center p-8 bg-[#FAFAF8] rounded-2xl border border-[#E7E5E4]">
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-sm border border-[#E7E5E4]">
              <IconComponent className="h-12 w-12 text-[#16A34A]" />
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8A8A8A]">
                FundPay Digital Guarantee
              </span>
              <div className="text-lg font-bold text-[#171717]">
                Zero Prepayment Penalties
              </div>
              <p className="text-xs text-[#6B6B6B] max-w-xs mx-auto">
                Pay off early anytime to immediately revoke mutual fund lien.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
