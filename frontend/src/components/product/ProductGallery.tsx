import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

interface ProductGalleryProps {
  imageUrl: string;
  productName: string;
  selectedColor: string;
}

export function ProductGallery({ imageUrl, productName, selectedColor }: ProductGalleryProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Stage */}
      <div className="relative aspect-square w-full rounded-3xl bg-white border border-[#E7E5E4] p-8 sm:p-12 flex items-center justify-center overflow-hidden shadow-xs">
        <img
          key={imageUrl}
          src={imageUrl}
          alt={`${productName} in ${selectedColor}`}
          className="h-full w-full object-contain transition-all duration-300 hover:scale-105"
        />

        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#FAFAF8] border border-[#E7E5E4] px-3 py-1 rounded-full text-xs font-semibold text-[#171717]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" />
          <span>Brand Authorized Sealed</span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs text-[#6B6B6B]">
        <div className="p-3 rounded-2xl bg-white border border-[#E7E5E4] flex flex-col items-center gap-1">
          <Truck className="h-4 w-4 text-[#171717]" />
          <span className="font-semibold text-[#171717]">Free Shipping</span>
          <span className="text-[10px] text-[#8A8A8A]">Express 24-48 hrs</span>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-[#E7E5E4] flex flex-col items-center gap-1">
          <ShieldCheck className="h-4 w-4 text-[#171717]" />
          <span className="font-semibold text-[#171717]">1 Yr Warranty</span>
          <span className="text-[10px] text-[#8A8A8A]">Official Manufacturer</span>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-[#E7E5E4] flex flex-col items-center gap-1">
          <RotateCcw className="h-4 w-4 text-[#171717]" />
          <span className="font-semibold text-[#171717]">7-Day Return</span>
          <span className="text-[10px] text-[#8A8A8A]">Hassle-free policy</span>
        </div>
      </div>
    </div>
  );
}
