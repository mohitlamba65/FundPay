import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TrendingUp, Menu, X, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);
  const [kycStep, setKycStep] = useState<"phone" | "pan" | "success">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const location = useLocation();

  const navLinks = [
    { label: "Phones", href: "/#products" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Calculator", href: "/#calculator" },
    { label: "Benefits", href: "/#benefits" },
    { label: "FAQs", href: "/#faqs" },
  ];

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (kycStep === "phone") {
      setKycStep("pan");
    } else if (kycStep === "pan") {
      setKycStep("success");
    }
  };

  const resetKyc = () => {
    setEligibilityModalOpen(false);
    setTimeout(() => {
      setKycStep("phone");
      setPhoneNumber("");
    }, 300);
  };

  return (
    <>
      {/* 1Fi Floating Centered Navbar */}
      <div className="sticky top-4 sm:top-6 z-50 w-full px-4 sm:px-6">
        <header className="mx-auto w-full max-w-7xl h-[78px] sm:h-[86px] rounded-[22px] bg-white/92 backdrop-blur-md border border-[#E5E0EA] px-5 sm:px-8 flex items-center justify-between shadow-1fi-nav transition-all">
          {/* Logo Mark */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-[16px] bg-[#6D28D9] text-white transition-transform group-hover:scale-105 shadow-sm">
              <TrendingUp className="h-6 w-6 stroke-[2.4]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#050505] leading-none">
                Fund<span className="text-[#6D28D9]">Pay</span>
              </span>
              <span className="text-[11px] font-medium tracking-wide text-[#777777] mt-1 hidden sm:block">
                Mutual Fund Backed EMIs
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Large gaps 32–42px, 18–20px font) */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === "/" && location.hash === link.href.replace("/", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-[17px] font-medium transition-colors hover:text-[#6D28D9] ${
                    isActive ? "text-[#6D28D9] font-semibold" : "text-[#444444]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Live DB Status Pill */}
           
            {/* Shop Now / Check Eligibility Primary Button */}
            <Button
              onClick={() => setEligibilityModalOpen(true)}
              className="bg-[#6D28D9] hover:bg-[#5420C9] text-white text-[16px] font-medium rounded-[18px] px-6 h-12 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <span>Check Eligibility</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-[#050505] hover:bg-[#F8F4FF] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mx-auto mt-2 w-full max-w-7xl rounded-[22px] bg-white border border-[#E5E0EA] p-6 shadow-1fi-nav animate-in slide-in-from-top-3">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-[#444444] hover:text-[#6D28D9] py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-[#E5E0EA] flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setEligibilityModalOpen(true);
                  }}
                  className="w-full bg-[#6D28D9] hover:bg-[#5420C9] text-white rounded-[18px] h-12 text-base font-medium"
                >
                  Check Instant Eligibility
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Eligibility Modal */}
      <Dialog open={eligibilityModalOpen} onOpenChange={setEligibilityModalOpen}>
        <DialogContent className="sm:max-w-md rounded-[28px] p-6 sm:p-8 bg-white border border-[#DCC9F5] shadow-2xl">
          <DialogHeader className="text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F4FF] text-[#6D28D9] text-xs font-semibold w-fit border border-[#DCC9F5]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Instant Portfolio Lien Check</span>
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight text-[#050505]">
              {kycStep === "phone" && "Check Your Portfolio Limit"}
              {kycStep === "pan" && "Enter Mutual Fund PAN"}
              {kycStep === "success" && "Congratulations! Pre-Approved"}
            </DialogTitle>
            <DialogDescription className="text-sm text-[#444444] leading-relaxed">
              {kycStep === "phone" && "Verify your phone number registered with CAMS/KFintech mutual funds."}
              {kycStep === "pan" && "We query your CAMS CAS safely to calculate your zero down payment credit limit."}
              {kycStep === "success" && "You are eligible for up to ₹2,50,000 credit at 0% effective interest against your funds."}
            </DialogDescription>
          </DialogHeader>

          {kycStep === "phone" && (
            <form onSubmit={handleKycSubmit} className="space-y-4 mt-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#777777] block mb-2">
                  Mobile Number (Linked with MF)
                </label>
                <div className="flex gap-2">
                  <span className="flex items-center justify-center px-3.5 rounded-[16px] bg-[#F8F4FF] border border-[#E5E0EA] text-sm font-semibold text-[#050505]">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 rounded-[16px] border border-[#E5E0EA] focus:border-[#6D28D9] focus:outline-none px-4 py-3 text-sm text-[#050505] placeholder:text-[#A0A0A0]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#6D28D9] hover:bg-[#5420C9] text-white rounded-[18px] h-12 text-sm font-medium"
              >
                Send Verification OTP
              </Button>
            </form>
          )}

          {kycStep === "pan" && (
            <form onSubmit={handleKycSubmit} className="space-y-4 mt-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#777777] block mb-2">
                  PAN Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  className="w-full uppercase rounded-[16px] border border-[#E5E0EA] focus:border-[#6D28D9] focus:outline-none px-4 py-3 text-sm text-[#050505] placeholder:text-[#A0A0A0]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#6D28D9] hover:bg-[#5420C9] text-white rounded-[18px] h-12 text-sm font-medium"
              >
                Fetch Pre-Approved Limit
              </Button>
            </form>
          )}

          {kycStep === "success" && (
            <div className="space-y-5 mt-3 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#20D66B]">
                <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
              </div>

              <div className="p-4 rounded-[20px] bg-[#F8F4FF] border border-[#DCC9F5]">
                <span className="text-xs text-[#777777] uppercase font-semibold block">Pre-Approved Limit</span>
                <span className="text-3xl font-extrabold text-[#6D28D9] mt-1 block">₹2,50,000</span>
                <span className="text-xs text-[#20D66B] font-semibold mt-1 inline-block">Zero Down Payment Required</span>
              </div>

              <Button
                onClick={resetKyc}
                className="w-full bg-[#6D28D9] hover:bg-[#5420C9] text-white rounded-[18px] h-12 text-sm font-medium"
              >
                Browse Eligible Phones Now
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
