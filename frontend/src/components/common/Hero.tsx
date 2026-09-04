import { ArrowRight, Sparkles, TrendingUp, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { formatINR } from "@/utils/cn";
import { Skeleton } from "@/components/ui/skeleton";

interface HeroProps {
  featuredProduct?: Product | null;
  loading?: boolean;
}

export function Hero({ featuredProduct, loading = false }: HeroProps) {
  const displayProduct = featuredProduct;
  const price = displayProduct?.minPrice || 124900;
  const monthlyEmi = Math.round(price / 12);
  const cashback = Math.round(price * 0.03);
  const imageUrl =
    displayProduct?.thumbnailUrl ||
    displayProduct?.variants?.[0]?.imageUrl ||
    "https://res.cloudinary.com/dkhnq43nd/image/upload/v1788488983/Apple_iPhone_17_Pro_Deep_Blue_256_GB_gw4k4a.jpg";
  const productName = displayProduct?.name || "Apple iPhone 17 Pro";
  const productSlug = displayProduct?.slug || "iphone-17-pro";

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Editorial Text Content */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E5E4] text-xs font-semibold text-[#171717] shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="text-[#16A34A] font-bold">1Fi Inspired</span>
            <span className="text-[#8A8A8A]">•</span>
            <span>Mutual Fund Backed EMIs</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-[#171717] leading-[1.08]">
            Buy what you want.{" "}
            <span className="text-[#16A34A] block sm:inline">
              Keep your investments working.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#6B6B6B] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Pledge your existing mutual funds as collateral to purchase the latest flagship smartphones. Enjoy <strong>0% effective interest</strong>, zero down payment, and zero portfolio liquidation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] hover:bg-black text-[#FAFAF8] h-13 px-8 text-sm font-semibold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Flagships
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-[#F5F5F4] text-[#171717] border border-[#E7E5E4] h-13 px-8 text-sm font-semibold transition-all shadow-2xs"
            >
              Simulate Returns
              <TrendingUp className="h-4 w-4 text-[#16A34A]" />
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="pt-6 border-t border-[#E7E5E4] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#6B6B6B] font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[#16A34A]" />
              <span>0% Effective Interest</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[#16A34A]" />
              <span>Zero Down Payment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[#16A34A]" />
              <span>No Impact on CIBIL</span>
            </div>
          </div>
        </div>

        {/* Right Product Hero Stage */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Subtle Glow backdrop */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#ECFDF3]/80 to-[#F5F5F4] blur-2xl -z-10 opacity-70" />

          {/* Card Showcase */}
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 border border-[#E7E5E4] shadow-lg">
            {loading ? (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24 rounded-full" />
                  <Skeleton className="h-4 w-32 rounded-full" />
                </div>
                <Skeleton className="h-64 sm:h-72 w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#8A8A8A]">
                    Featured Deal
                  </span>
                  <span className="text-xs font-semibold text-[#16A34A] bg-[#ECFDF3] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> 0% Down Payment
                  </span>
                </div>

                {/* Featured Image */}
                <div className="h-64 sm:h-72 w-full flex items-center justify-center bg-[#FAFAF8] rounded-2xl p-4 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={productName}
                    className="h-full w-full object-contain hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="mt-5 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold text-[#171717]">{productName}</h3>
                    <span className="text-lg font-extrabold text-[#171717]">{formatINR(price)}</span>
                  </div>
                  <p className="text-xs text-[#6B6B6B]">
                    Backed by top-tier diversified large cap mutual funds
                  </p>
                </div>

                {/* Floating Info Pill */}
                <div className="mt-4 p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E5E4] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#8A8A8A] block text-[10px] uppercase font-semibold">
                      12M Plan
                    </span>
                    <span className="text-[#171717] font-bold text-sm">
                      {formatINR(monthlyEmi)}{" "}
                      <span className="text-[11px] font-normal text-[#6B6B6B]">/mo</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#16A34A] block text-[10px] uppercase font-semibold">
                      Cashback
                    </span>
                    <span className="text-[#16A34A] font-bold text-sm">+{formatINR(cashback)}</span>
                  </div>
                  <Link
                    to={`/products/${productSlug}`}
                    className="h-8 px-3.5 rounded-lg bg-[#111111] text-white text-xs font-semibold flex items-center gap-1 hover:bg-black transition-colors"
                  >
                    View
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
