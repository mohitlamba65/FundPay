import type { Variant } from "@/types";

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant;
  onSelectVariant: (variant: Variant) => void;
}

// Map color names to modern hex swatches
function getColorHex(colorName: string): string {
  const lower = colorName.toLowerCase();
  if (lower.includes("desert")) return "#C9A784";
  if (lower.includes("natural")) return "#A29F98";
  if (lower.includes("black") || lower.includes("obsidian")) return "#242526";
  if (lower.includes("gray") || lower.includes("titanium")) return "#7D7E80";
  if (lower.includes("violet")) return "#79728E";
  if (lower.includes("porcelain") || lower.includes("white")) return "#F5F5F3";
  if (lower.includes("hazel")) return "#8A9488";
  return "#D1D5DB";
}

export function VariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: VariantSelectorProps) {
  // Extract unique storages and colors
  const storages = [...new Set(variants.map((v) => v.storage))];
  const colors = [...new Set(variants.map((v) => v.color))];

  const handleStorageChange = (storage: string) => {
    // Find variant with same color and new storage, or fallback to first matching storage
    const match =
      variants.find((v) => v.storage === storage && v.color === selectedVariant.color) ||
      variants.find((v) => v.storage === storage);
    if (match) onSelectVariant(match);
  };

  const handleColorChange = (color: string) => {
    // Find variant with same storage and new color, or fallback to first matching color
    const match =
      variants.find((v) => v.color === color && v.storage === selectedVariant.storage) ||
      variants.find((v) => v.color === color);
    if (match) onSelectVariant(match);
  };

  return (
    <div className="space-y-6">
      {/* Storage Options */}
      <div>
        <div className="flex justify-between items-center mb-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#171717]">
            Storage Option
          </label>
          <span className="text-xs font-semibold text-[#16A34A]">
            Selected: {selectedVariant.storage}
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          {storages.map((st) => {
            const isSelected = st === selectedVariant.storage;
            return (
              <button
                key={st}
                type="button"
                onClick={() => handleStorageChange(st)}
                className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all text-center ${
                  isSelected
                    ? "bg-[#111111] text-white border-[#111111] shadow-xs"
                    : "bg-white text-[#171717] border-[#E7E5E4] hover:bg-[#F5F5F4] hover:border-[#8A8A8A]"
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Options */}
      <div>
        <div className="flex justify-between items-center mb-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#171717]">
            Finish / Color
          </label>
          <span className="text-xs font-semibold text-[#6B6B6B]">
            {selectedVariant.color}
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {colors.map((col) => {
            const isSelected = col === selectedVariant.color;
            const hex = getColorHex(col);
            return (
              <button
                key={col}
                type="button"
                onClick={() => handleColorChange(col)}
                className={`group flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                  isSelected
                    ? "border-[#111111] bg-white ring-2 ring-[#111111] shadow-2xs"
                    : "border-[#E7E5E4] bg-white hover:bg-[#F5F5F4]"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/10 shadow-inner"
                  style={{ backgroundColor: hex }}
                />
                <span className="text-[#171717]">{col}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
