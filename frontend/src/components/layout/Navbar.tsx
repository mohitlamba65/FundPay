import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Menu, X, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { healthApi, type HealthCheckResponse } from "@/api";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);
  const [kycStep, setKycStep] = useState<"phone" | "pan" | "success">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [healthStatus, setHealthStatus] = useState<HealthCheckResponse | null>(null);

  useEffect(() => {
    healthApi
      .checkHealth()
      .then((res) => setHealthStatus(res))
      .catch(() =>
        setHealthStatus({
          status: "error",
          timestamp: new Date().toISOString(),
          database: "disconnected",
        })
      );
  }, []);

  const navLinks = [
    { label: "Products", href: "/#products" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "EMI Calculator", href: "/#calculator" },
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
      <header className="sticky top-0 z-50 w-full border-b border-[#E7E5E4] bg-[#FAFAF8]/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111111] text-white transition-transform group-hover:scale-105 shadow-xs">
              <TrendingUp className="h-4.5 w-4.5 text-[#16A34A]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#171717]">
                Fund<span className="text-[#16A34A]">Pay</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#8A8A8A] -mt-1">
                Mutual Fund Backed EMIs
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#6B6B6B] hover:text-[#171717] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Health / DB Status Badge */}
            <div
              className="flex items-center gap-1.5 text-xs text-[#6B6B6B] bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full shadow-2xs"
              title={`Server: ${healthStatus?.status || "checking..."} | DB: ${healthStatus?.database || "checking..."}`}
            >
              <span
                className={`flex h-2 w-2 rounded-full ${
                  healthStatus?.database === "connected"
                    ? "bg-[#16A34A] animate-pulse"
                    : healthStatus?.database === "disconnected"
                    ? "bg-[#DC2626]"
                    : "bg-amber-400 animate-ping"
                }`}
              />
              <span>
                {healthStatus?.database === "connected"
                  ? "DB Connected"
                  : healthStatus?.database === "disconnected"
                  ? "DB Offline"
                  : "Checking API"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" />
              <span>0% Interest</span>
            </div>
            <Button
              onClick={() => setEligibilityModalOpen(true)}
              className="bg-[#111111] hover:bg-black text-[#FAFAF8] text-sm font-medium rounded-xl px-5 h-10 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Check Eligibility
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#171717] hover:bg-[#F5F5F4] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#E7E5E4] bg-white px-4 pt-3 pb-6 space-y-3 shadow-md animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-[#171717] hover:bg-[#F5F5F4] rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-[#E7E5E4]">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEligibilityModalOpen(true);
                }}
                className="w-full bg-[#111111] text-white rounded-xl h-11 text-sm font-medium shadow-xs"
              >
                Check Eligibility
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Quick Eligibility Modal */}
      <Dialog open={eligibilityModalOpen} onOpenChange={setEligibilityModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-white border border-[#E7E5E4]">
          <DialogHeader>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF3] text-[#16A34A]">
              <TrendingUp className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center text-xl font-bold tracking-tight text-[#171717]">
              Check Mutual Fund EMI Limit
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-[#6B6B6B]">
              Instantly discover your credit limit backed by CAMS & KFintech mutual fund portfolios without impacting your CIBIL score.
            </DialogDescription>
          </DialogHeader>

          {kycStep === "phone" && (
            <form onSubmit={handleKycSubmit} className="space-y-4 mt-2">
              <div>
                <label className="block text-xs font-semibold text-[#171717] mb-1.5">
                  Mobile Number (Linked with Folios)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#8A8A8A] font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    className="w-full pl-12 pr-4 py-2.5 bg-[#FAFAF8] border border-[#E7E5E4] rounded-xl text-sm font-medium text-[#171717] focus:outline-none focus:border-[#111111] transition-colors"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={phoneNumber.length < 10}
                className="w-full bg-[#111111] hover:bg-black text-white h-11 rounded-xl text-sm font-medium transition-all"
              >
                Continue <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>
          )}

          {kycStep === "pan" && (
            <form onSubmit={handleKycSubmit} className="space-y-4 mt-2">
              <div>
                <label className="block text-xs font-semibold text-[#171717] mb-1.5">
                  Permanent Account Number (PAN)
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  placeholder="ABCDE1234F"
                  className="w-full uppercase px-4 py-2.5 bg-[#FAFAF8] border border-[#E7E5E4] rounded-xl text-sm font-medium text-[#171717] focus:outline-none focus:border-[#111111] transition-colors"
                />
                <p className="text-[11px] text-[#8A8A8A] mt-1">
                  Used solely to fetch verified mutual fund CAS data from SEBI-approved RTAs.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#111111] hover:bg-black text-white h-11 rounded-xl text-sm font-medium transition-all"
              >
                Verify & Check Limit
              </Button>
            </form>
          )}

          {kycStep === "success" && (
            <div className="space-y-4 text-center py-2">
              <div className="p-4 rounded-xl bg-[#ECFDF3] border border-[#16A34A]/20">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#16A34A]">
                  Pre-Approved Limit
                </span>
                <div className="text-3xl font-bold text-[#171717] mt-1">₹2,50,000</div>
                <p className="text-xs text-[#6B6B6B] mt-1">
                  Eligible for 0% down payment on all flagship smartphones.
                </p>
              </div>

              <Button
                onClick={resetKyc}
                className="w-full bg-[#111111] hover:bg-black text-white h-11 rounded-xl text-sm font-medium"
              >
                Start Shopping
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
