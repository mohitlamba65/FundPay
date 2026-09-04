import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TrendingUp, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EligibilityDrawer } from "@/components/common/EligibilityDrawer";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eligibilityDrawerOpen, setEligibilityDrawerOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Phones", href: "/#products" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Calculator", href: "/#calculator" },
    { label: "Benefits", href: "/#benefits" },
    { label: "FAQs", href: "/#faqs" },
  ];

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
            {/* Shop Now / Check Eligibility Primary Button */}
            <Button
              onClick={() => setEligibilityDrawerOpen(true)}
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
                    setEligibilityDrawerOpen(true);
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

      {/* 1Fi-Inspired Right Slide Sheet Drawer for Eligibility */}
      <EligibilityDrawer
        isOpen={eligibilityDrawerOpen}
        onClose={() => setEligibilityDrawerOpen(false)}
      />
    </>
  );
}

