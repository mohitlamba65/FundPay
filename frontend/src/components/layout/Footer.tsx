import { TrendingUp, ShieldCheck, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-[#E5E0EA] bg-white pt-16 pb-12 text-[#050505]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#E5E0EA]">
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#6D28D9] text-white shadow-xs">
                <TrendingUp className="h-5 w-5 stroke-[2.4]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#050505]">
                Fund<span className="text-[#6D28D9]">Pay</span>
              </span>
            </Link>
            <p className="text-[15px] text-[#444444] max-w-sm leading-relaxed">
              India’s first smart gadget shopping platform backed by mutual funds. Upgrade your tech without stopping your compounding wealth journey.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#777777] pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#20D66B]" />
                <span>SEBI Reg. Custody</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-[#6D28D9]" />
                <span>256-bit Encryption</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#050505] mb-3">
              Shop Flagships
            </h4>
            <ul className="space-y-2.5 text-sm text-[#444444]">
              <li>
                <Link to="/products/iphone-17-pro" className="hover:text-[#6D28D9] transition-colors">
                  iPhone 17 Pro
                </Link>
              </li>
              <li>
                <Link to="/products/samsung-s24-ultra" className="hover:text-[#6D28D9] transition-colors">
                  Galaxy S24 Ultra
                </Link>
              </li>
              <li>
                <Link to="/products/google-pixel-11-pro" className="hover:text-[#6D28D9] transition-colors">
                  Pixel 11 Pro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#050505] mb-3">
              How It Works
            </h4>
            <ul className="space-y-2.5 text-sm text-[#444444]">
              <li>
                <a href="#how-it-works" className="hover:text-[#6D28D9] transition-colors">
                  Mutual Fund Lien
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#6D28D9] transition-colors">
                  Compounding Calculator
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-[#6D28D9] transition-colors">
                  Zero Down Payment
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#6D28D9] transition-colors">
                  Security & Safety
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#050505] mb-3">
              Regulatory
            </h4>
            <ul className="space-y-2.5 text-sm text-[#444444]">
              <li>
                <span className="text-xs text-[#777777] block">Lending Partner</span>
                <span className="text-xs font-medium text-[#050505]">RBI-Regulated NBFCs</span>
              </li>
              <li className="pt-1">
                <span className="text-xs text-[#777777] block">RTA Integrations</span>
                <span className="text-xs font-medium text-[#050505]">CAMS & KFintech API</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <p>
            © {new Date().getFullYear()} FundPay Financial Technologies Pvt Ltd. All rights reserved.
          </p>
          <p className="max-w-xl text-center md:text-right text-[11px] leading-relaxed text-[#A0A0A0]">
            *Mutual fund investments are subject to market risks. Units are marked under lien and remain invested, continuing to generate potential returns.
          </p>
        </div>
      </div>
    </footer>
  );
}
