import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Product } from "@/types";
import { formatINR } from "@/utils/cn";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const prices = product.variants?.map((v) => Number(v.price)) || [];
  const minPrice = product.minPrice || (prices.length > 0 ? Math.min(...prices) : 0);
  const mrpPrices = product.variants?.map((v) => Number(v.mrp)) || [];
  const minMrp = mrpPrices.length > 0 ? Math.min(...mrpPrices) : minPrice;

  // Approximate 24-month or 12-month lowest monthly installment
  const lowestEmi = Math.round(minPrice / 24);

  // Default display image
  const displayImage = product.variants?.[0]?.imageUrl || product.thumbnailUrl || "";

  // Badge label mapping for editorial feel
  let badgeLabel = "Best Seller";
  if (product.brand.toLowerCase() === "apple") badgeLabel = "Featured Flagship";
  else if (product.brand.toLowerCase() === "google") badgeLabel = "AI Flagship";

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group relative flex flex-col justify-between rounded-[28px] bg-[#F8F4FF] p-6 sm:p-7 border border-[#DCC9F5] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-1fi-hover hover:border-[#6D28D9] cursor-pointer"
    >
      <div>
        {/* Badges Top Bar */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6D28D9] bg-white px-3 py-1 rounded-full border border-[#DCC9F5] shadow-2xs">
            <Sparkles className="h-3 w-3 text-[#7C20E8]" />
            {badgeLabel}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#777777]">
            {product.brand}
          </span>
        </div>

        {/* Product Image Stage with clean white inset container */}
        <div className="relative flex h-64 sm:h-72 w-full items-center justify-center overflow-hidden rounded-[22px] bg-white p-6 border border-[#E5E0EA] transition-colors group-hover:border-[#DCC9F5]">
          <img
            src={displayImage}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-106"
            loading="lazy"
          />
        </div>

        {/* Product Meta */}
        <div className="mt-6 space-y-2">
          <h3 className="text-[26px] sm:text-[28px] font-bold tracking-tight text-[#050505] leading-tight group-hover:text-[#6D28D9] transition-colors">
            {product.name}
          </h3>
          <p className="text-[14px] text-[#444444] line-clamp-2 leading-relaxed font-normal">
            {product.description}
          </p>
        </div>

        {/* Available Color Swatches / Tags */}
        {product.availableColors && product.availableColors.length > 0 && (
          <div className="mt-4 flex items-center gap-1.5 flex-wrap">
            {product.availableColors.map((color) => (
              <span
                key={color}
                className="text-[12px] font-medium text-[#444444] bg-white border border-[#E5E0EA] px-2.5 py-1 rounded-lg"
              >
                {color}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pricing & CTA Section */}
      <div className="mt-8 pt-5 border-t border-[#DCC9F5]">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-[#050505]">
                {formatINR(minPrice)}
              </span>
              {minMrp > minPrice && (
                <span className="text-xs text-[#A0A0A0] line-through">
                  {formatINR(minMrp)}
                </span>
              )}
            </div>
            <div className="text-xs font-semibold text-[#6D28D9] flex items-center gap-1 mt-0.5">
              <span>From {formatINR(lowestEmi)}/mo with 0% interest</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-[#777777] block font-medium">Lien Backed</span>
            <span className="text-xs font-semibold text-[#050505]">Zero Selling</span>
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-2 rounded-[18px] bg-[#6D28D9] group-hover:bg-[#5420C9] text-white h-12 text-[15px] font-semibold transition-all shadow-xs">
          <span>Explore EMI Plans</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
