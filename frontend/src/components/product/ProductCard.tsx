import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Product } from "@/types";
import { formatINR } from "@/utils/cn";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Lowest price from variants
  const prices = product.variants?.map((v) => Number(v.price)) || [];
  const minPrice = product.minPrice || (prices.length > 0 ? Math.min(...prices) : 0);
  const mrpPrices = product.variants?.map((v) => Number(v.mrp)) || [];
  const minMrp = mrpPrices.length > 0 ? Math.min(...mrpPrices) : minPrice;

  // Approximate 24-month or 12-month lowest monthly installment
  const lowestEmi = Math.round(minPrice / 24);

  // Default display image
  const displayImage = product.variants?.[0]?.imageUrl || product.thumbnailUrl || "";

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 border border-[#E7E5E4] transition-all duration-300 hover:border-[#171717] hover:shadow-lg">
      <div>
        {/* Badges Top Bar */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge className="bg-[#ECFDF3] hover:bg-[#ECFDF3] text-[#16A34A] border-none text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full">
            <Sparkles className="h-3 w-3 mr-1" />
            0% Interest Available
          </Badge>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8A8A]">
            {product.brand}
          </span>
        </div>

        {/* Product Image Stage */}
        <Link
          to={`/products/${product.slug}`}
          className="relative flex h-60 w-full items-center justify-center overflow-hidden rounded-xl bg-[#FAFAF8] p-4 group-hover:bg-white transition-colors"
        >
          <img
            src={displayImage}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Product Meta */}
        <div className="mt-5 space-y-1.5">
          <h3 className="text-lg font-bold tracking-tight text-[#171717] group-hover:text-black">
            <Link to={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Variant Previews */}
        {product.availableColors && product.availableColors.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            {product.availableColors.map((color) => (
              <span
                key={color}
                className="text-[11px] font-medium text-[#6B6B6B] bg-[#F5F5F4] px-2 py-0.5 rounded-md"
              >
                {color}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pricing & CTA Section */}
      <div className="mt-6 pt-4 border-t border-[#E7E5E4]">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-[#171717]">
                {formatINR(minPrice)}
              </span>
              {minMrp > minPrice && (
                <span className="text-xs text-[#8A8A8A] line-through">
                  {formatINR(minMrp)}
                </span>
              )}
            </div>
            <div className="text-xs font-semibold text-[#16A34A] flex items-center gap-1 mt-0.5">
              <span>EMI from {formatINR(lowestEmi)}/mo</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-[#8A8A8A] block">Mutual Fund Backed</span>
            <span className="text-xs font-medium text-[#171717]">Zero Foreclosure</span>
          </div>
        </div>

        <Link
          to={`/products/${product.slug}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] hover:bg-black text-white h-11 text-sm font-medium transition-all group-hover:shadow-sm"
        >
          <span>View EMI Plans</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
