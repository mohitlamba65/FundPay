import { TrendingUp, ShieldCheck, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-[#E7E5E4] bg-white pt-16 pb-12 text-[#171717]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#E7E5E4]">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#111111] text-white">
                <TrendingUp className="h-4 w-4 text-[#16A34A]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#171717]">
                Fund<span className="text-[#16A34A]">Pay</span>
              </span>
            </Link>
            <p className="text-sm text-[#6B6B6B] max-w-sm leading-relaxed">
              India’s first smart gadget shopping platform backed by mutual funds. Upgrade your tech without stopping your compounding wealth journey.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#8A8A8A] pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
                <span>SEBI Reg. Custody</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-[#16A34A]" />
                <span>256-bit Encryption</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171717] mb-3">
              Shop Flagships
            </h4>
            <ul className="space-y-2 text-sm text-[#6B6B6B]">
              <li>
                <Link to="/products/iphone-16-pro" className="hover:text-[#171717] transition-colors">
                  iPhone 16 Pro
                </Link>
              </li>
              <li>
                <Link to="/products/samsung-s24-ultra" className="hover:text-[#171717] transition-colors">
                  Galaxy S24 Ultra
                </Link>
              </li>
              <li>
                <Link to="/products/google-pixel-9-pro" className="hover:text-[#171717] transition-colors">
                  Pixel 9 Pro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171717] mb-3">
              How It Works
            </h4>
            <ul className="space-y-2 text-sm text-[#6B6B6B]">
              <li>
                <a href="#how-it-works" className="hover:text-[#171717] transition-colors">
                  Mutual Fund Lien
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#171717] transition-colors">
                  Compounding Calculator
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-[#171717] transition-colors">
                  Zero Down Payment
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#171717] transition-colors">
                  Security & Safety
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171717] mb-3">
              Regulatory
            </h4>
            <ul className="space-y-2 text-sm text-[#6B6B6B]">
              <li>
                <span className="text-xs text-[#8A8A8A] block">Lending Partner</span>
                <span className="text-xs font-medium text-[#171717]">RBI-Regulated NBFCs</span>
              </li>
              <li className="pt-1">
                <span className="text-xs text-[#8A8A8A] block">RTA Integrations</span>
                <span className="text-xs font-medium text-[#171717]">CAMS & KFintech API</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A8A8A]">
          <p>
            © {new Date().getFullYear()} FundPay Financial Technologies Pvt Ltd. All rights reserved.
          </p>
          <p className="max-w-xl text-center md:text-right text-[11px] leading-relaxed">
            *Mutual fund investments are subject to market risks. Units are marked under lien and remain invested, continuing to generate potential returns.
          </p>
        </div>
      </div>
    </footer>
  );
}
