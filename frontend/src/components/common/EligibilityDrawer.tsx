import { useState } from "react";
import { SlideDrawer } from "@/components/common/SlideDrawer";
import { TrendingUp, X, Check, ShieldCheck, CheckCircle2, ArrowRight, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EligibilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EligibilityDrawer({ isOpen, onClose }: EligibilityDrawerProps) {
  const [step, setStep] = useState<"phone" | "pan" | "success">("phone");
  const [phone, setPhone] = useState("");
  const [pan, setPan] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!agreedToTerms) {
      setError("Please accept the Terms & Conditions to proceed.");
      return;
    }
    setError(null);
    setStep("pan");
  };

  const handlePanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pan || pan.trim().length < 10) {
      setError("Please enter a valid 10-character PAN number.");
      return;
    }
    setError(null);
    setStep("success");
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep("phone");
      setPhone("");
      setPan("");
      setError(null);
    }, 300);
  };

  return (
    <SlideDrawer
      isOpen={isOpen}
      onClose={handleResetAndClose}
      side="right"
      hideHeader={true}
      widthClass="w-full sm:w-[92vw] md:w-[85vw] lg:w-[75vw] xl:w-[68vw] max-w-5xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-full h-full">
        <div className="md:col-span-6 bg-gradient-to-br from-[#7C20E8] via-[#6D28D9] to-[#4F16A8] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255, 255, 255, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="absolute top-1/4 -left-12 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white/15 backdrop-blur-md text-white border border-white/20 shadow-sm">
                <TrendingUp className="h-6 w-6 stroke-[2.4]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Fund<span className="text-purple-200">Pay</span>
              </span>
            </div>
          </div>

          <div className="relative z-10 my-auto py-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
              Shop today <br />
              <span className="italic font-light text-purple-200">Pay later</span> using <br />
              mutual funds.
            </h2>
            <p className="text-sm sm:text-base text-purple-100/90 mt-6 max-w-sm leading-relaxed font-normal">
              No credit score required. No interest. Fully backed by your investments.
            </p>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/15 space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-purple-200">
              <ShieldCheck className="h-4 w-4 text-[#20D66B]" />
              <span>SEBI-Registered RTA Custody (CAMS & KFintech)</span>
            </div>
            <p className="text-[11px] text-purple-200/70">
              Your portfolio units remain 100% in your folio earning daily compounding.
            </p>
          </div>
        </div>

        <div className="md:col-span-6 bg-white p-8 sm:p-12 flex flex-col justify-between relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-6 right-6 p-2 rounded-xl text-[#777777] hover:text-[#050505] hover:bg-[#F8F4FF] transition-colors"
            aria-label="Close eligibility drawer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="my-auto max-w-md w-full mx-auto">
            {step === "phone" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#050505]">
                    Mobile Number
                  </h3>
                  <p className="text-sm text-[#777777] mt-1.5">
                    Enter the number linked to your investments.
                  </p>
                </div>

                <form onSubmit={handlePhoneSubmit} className="space-y-5">
                  <div>
                    <div className="flex items-center rounded-[18px] bg-[#F9FAFB] border border-[#E5E0EA] focus-within:border-[#6D28D9] focus-within:ring-2 focus-within:ring-[#6D28D9]/10 transition-all p-1.5">
                      <span className="flex items-center text-sm font-semibold text-[#555555] px-3.5 py-2">
                        +91
                      </span>
                      <div className="h-5 w-[1px] bg-[#E5E0EA] mr-2" />
                      <input
                        type="tel"
                        required
                        autoFocus
                        maxLength={10}
                        placeholder="Enter mobile number"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/\D/g, ""));
                          setError(null);
                        }}
                        className="flex-1 bg-transparent border-none focus:outline-none text-base text-[#050505] placeholder:text-[#A0A0A0] py-2"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer select-none group">
                    <div
                      onClick={() => setAgreedToTerms(!agreedToTerms)}
                      className={`h-5 w-5 rounded-[6px] border transition-colors flex items-center justify-center shrink-0 mt-0.5 ${
                        agreedToTerms
                          ? "bg-[#6D28D9] border-[#6D28D9] text-white"
                          : "border-[#D1D5DB] group-hover:border-[#6D28D9] bg-white"
                      }`}
                    >
                      {agreedToTerms && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-xs text-[#555555] leading-relaxed">
                      I agree with{" "}
                      <span className="text-[#6D28D9] font-semibold hover:underline">
                        T&amp;C
                      </span>{" "}
                      and{" "}
                      <span className="text-[#6D28D9] font-semibold hover:underline">
                        Privacy Policy
                      </span>
                    </span>
                  </label>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 text-xs text-red-600 font-medium">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#8E5BF5] hover:bg-[#7C20E8] text-white font-semibold text-base h-13 rounded-[20px] shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Proceed
                  </Button>
                </form>
              </div>
            )}

            {step === "pan" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#050505]">
                    Enter PAN
                  </h3>
                  <p className="text-sm text-[#777777] mt-1.5">
                    We query your CAMS / KFintech portfolio safely to fetch your 0% down payment limit.
                  </p>
                </div>

                <form onSubmit={handlePanSubmit} className="space-y-5">
                  <div>
                    <div className="rounded-[18px] bg-[#F9FAFB] border border-[#E5E0EA] focus-within:border-[#6D28D9] focus-within:ring-2 focus-within:ring-[#6D28D9]/10 transition-all p-3">
                      <input
                        type="text"
                        required
                        autoFocus
                        maxLength={10}
                        placeholder="ABCDE1234F"
                        value={pan}
                        onChange={(e) => {
                          setPan(e.target.value.toUpperCase());
                          setError(null);
                        }}
                        className="w-full uppercase bg-transparent border-none focus:outline-none text-lg font-bold tracking-wider text-[#050505] placeholder:text-[#A0A0A0] placeholder:font-normal placeholder:tracking-normal"
                      />
                    </div>
                    <span className="text-[11px] text-[#777777] mt-1.5 block">
                      Number linked: +91 {phone}
                    </span>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 text-xs text-red-600 font-medium">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2.5">
                    <Button
                      type="submit"
                      className="w-full bg-[#8E5BF5] hover:bg-[#7C20E8] text-white font-semibold text-base h-13 rounded-[20px] shadow-sm transition-all"
                    >
                      Fetch Pre-Approved Limit
                    </Button>
                    <button
                      type="button"
                      onClick={() => setStep("phone")}
                      className="w-full text-xs text-[#777777] hover:text-[#050505] py-2"
                    >
                      Change Mobile Number
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === "success" && (
              <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#20D66B]">
                  <CheckCircle2 className="h-9 w-9 stroke-[2.5]" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#050505]">
                    Congratulations! 🎉
                  </h3>
                  <p className="text-sm text-[#444444] mt-1">
                    Your mutual fund portfolio is eligible for zero down payment purchase.
                  </p>
                </div>

                <div className="p-6 rounded-[24px] bg-[#F8F4FF] border border-[#DCC9F5] text-center space-y-2">
                  <span className="text-xs font-bold text-[#777777] uppercase tracking-wider block">
                    Pre-Approved Credit Limit
                  </span>
                  <div className="text-4xl font-extrabold text-[#6D28D9]">
                    ₹2,50,000
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#20D66B] bg-[#ECFDF3] px-3 py-1 rounded-full">
                    <Check className="h-3.5 w-3.5" />
                    <span>0% Interest EMI Available</span>
                  </div>
                </div>

                <div className="text-xs text-[#777777] text-left p-4 rounded-[16px] bg-[#F9FAFB] space-y-1.5">
                  <div className="flex justify-between">
                    <span>Portfolio Status:</span>
                    <strong className="text-[#050505]">Active &amp; Verified</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Mutual Fund Units:</span>
                    <strong className="text-[#20D66B]">Unsold (Compounding Intact)</strong>
                  </div>
                </div>

                <Button
                  onClick={handleResetAndClose}
                  className="w-full bg-[#6D28D9] hover:bg-[#5420C9] text-white font-semibold text-base h-13 rounded-[20px] shadow-sm flex items-center justify-center gap-2"
                >
                  <Smartphone className="h-4 w-4" />
                  <span>Browse Eligible Smartphones</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="text-center pt-4">
            <span className="text-[11px] text-[#A0A0A0]">
              Bank-grade 256-bit encryption • Powered by CAMS &amp; KFintech
            </span>
          </div>
        </div>
      </div>
    </SlideDrawer>
  );
}
