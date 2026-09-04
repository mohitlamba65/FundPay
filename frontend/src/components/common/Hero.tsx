import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";
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
    <section className="relative overflow-hidden bg-hero-gradient pt-8 sm:pt-14 pb-20 sm:pb-28">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* 1Fi Small White Hero Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E0EA] text-[13px] font-medium text-[#444444] shadow-1fi-nav">
              <Sparkles className="h-4 w-4 text-[#7C20E8]" />
              <span className="text-[#050505] font-semibold">1Fi Inspired</span>
              <span className="text-[#A0A0A0]">•</span>
              <span className="italic text-[#777777]">Shop using your investments</span>
            </div>

            {/* Signature 1Fi Large Editorial Headline */}
            <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] font-bold tracking-[-0.045em] leading-[0.98] text-[#050505]">
              <span className="italic font-normal text-[#777777] block text-[42px] sm:text-[62px] lg:text-[72px] mb-1">
                Pay later with zero interest.
              </span>
              <span className="block text-[#050505]">
                Own your flagship.
              </span>
              <span className="text-[#7C20E8] block">
                Keep compounding.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[17px] sm:text-[19px] text-[#444444] max-w-xl mx-auto lg:mx-0 leading-[1.55] font-normal">
              Pledge your mutual fund portfolio as collateral to take home the newest flagship smartphones. Enjoy <strong>0% effective interest</strong>, zero down payment, and zero portfolio liquidation.
            </p>

            {/* CTA Group: Two Horizontally Aligned Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-[18px] bg-[#6D28D9] hover:bg-[#5420C9] text-white h-14 px-8 text-[17px] font-semibold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Shop Smartphones</span>
                <ArrowUpRight className="h-5 w-5" />
              </a>

              <a
                href="#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-[18px] border-2 border-[#6D28D9] text-[#6D28D9] bg-white/70 hover:bg-[#F8F4FF] h-14 px-8 text-[17px] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Simulate Returns</span>
                <TrendingUp className="h-5 w-5 text-[#6D28D9]" />
              </a>
            </div>

            {/* Trust Copy directly beneath CTA */}
            <p className="text-xs sm:text-[13px] text-[#777777] pt-1">
              SEBI registered RTA lien integration • Zero foreclosure fee • Instant digital approval
            </p>
          </div>

          {/* Right Product Hero Stage with Lavender Rounded Container & Overhanging Product */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Background Gradient Glow */}
            <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-tr from-[#EFDAFF]/80 via-[#F8F4FF]/90 to-transparent blur-2xl -z-10" />

            {/* Card Container */}
            <div className="relative w-full max-w-md rounded-[28px] bg-[#F8F4FF] p-6 sm:p-7 border border-[#DCC9F5] shadow-1fi-card overflow-visible group">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-5 w-28 rounded-full bg-white" />
                  <Skeleton className="h-64 sm:h-76 w-full rounded-[24px] bg-white" />
                  <Skeleton className="h-8 w-3/4 bg-white" />
                  <Skeleton className="h-14 w-full rounded-[18px] bg-white" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#6D28D9]">
                      Featured Deal
                    </span>
                    <span className="text-xs font-semibold text-[#6D28D9] bg-[#EFDAFF] px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#DCC9F5]">
                      <Sparkles className="h-3 w-3 text-[#7C20E8]" /> 0% Down Payment
                    </span>
                  </div>

                  {/* Cutout Product Image with Partial Extrusion & Smooth Hover */}
                  <div className="relative h-64 sm:h-76 w-full flex items-center justify-center bg-white rounded-[24px] p-6 border border-[#E5E0EA] overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={productName}
                      className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-108"
                    />
                  </div>

                  {/* Product Title & Brand */}
                  <div className="mt-5 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#050505]">
                        {productName}
                      </h3>
                      <span className="text-xl sm:text-2xl font-extrabold text-[#6D28D9]">
                        {formatINR(price)}
                      </span>
                    </div>
                    <p className="text-xs text-[#777777]">
                      Pledge units in large-cap funds & pay {formatINR(monthlyEmi)}/mo
                    </p>
                  </div>

                  {/* Floating Info Pill */}
                  <div className="mt-4 p-3.5 rounded-[18px] bg-white border border-[#DCC9F5] flex items-center justify-between text-xs shadow-1fi-nav">
                    <div>
                      <span className="text-[#A0A0A0] block text-[10px] uppercase font-bold tracking-wider">
                        12-Month Plan
                      </span>
                      <span className="text-[#050505] font-bold text-sm">
                        {formatINR(monthlyEmi)}{" "}
                        <span className="text-[11px] font-normal text-[#777777]">/mo</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#20D66B] block text-[10px] uppercase font-bold tracking-wider">
                        Cashback
                      </span>
                      <span className="text-[#20D66B] font-bold text-sm">+{formatINR(cashback)}</span>
                    </div>
                    <Link
                      to={`/products/${productSlug}`}
                      className="h-9 px-4 rounded-[14px] bg-[#6D28D9] hover:bg-[#5420C9] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>View</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
