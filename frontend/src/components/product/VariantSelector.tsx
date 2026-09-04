import type { Variant } from "@/types";

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant;
  onSelectVariant: (variant: Variant) => void;
}

function getColorHex(colorName: string): string {
  const lower = colorName.toLowerCase();
  if (lower.includes("cosmic") || lower.includes("orange")) return "#E86328";
  if (lower.includes("blue")) return "#1E3A8A";
  if (lower.includes("yellow") || lower.includes("gold")) return "#E5D38A";
  if (lower.includes("violet")) return "#79728E";
  if (lower.includes("canyon")) return "#B86B53";
  if (lower.includes("fog")) return "#C4C8C5";
  if (lower.includes("silver")) return "#E2E8F0";
  if (lower.includes("black") || lower.includes("obsidian")) return "#242526";
  if (lower.includes("gray") || lower.includes("titanium")) return "#7D7E80";
  if (lower.includes("desert")) return "#C9A784";
  if (lower.includes("natural")) return "#A29F98";
  if (lower.includes("porcelain") || lower.includes("white")) return "#F5F5F3";
  if (lower.includes("hazel")) return "#8A9488";
  return "#D1D5DB";
}

export function VariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: VariantSelectorProps) {
  const storages = [...new Set(variants.map((v) => v.storage))];
  const colors = [...new Set(variants.map((v) => v.color))];

  const handleStorageChange = (storage: string) => {
    const match =
      variants.find((v) => v.storage === storage && v.color === selectedVariant.color) ||
      variants.find((v) => v.storage === storage);
    if (match) onSelectVariant(match);
  };

  const handleColorChange = (color: string) => {
    const match =
      variants.find((v) => v.color === color && v.storage === selectedVariant.storage) ||
      variants.find((v) => v.color === color);
    if (match) onSelectVariant(match);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#050505]">
            Storage Option
          </label>
          <span className="text-xs font-bold text-[#6D28D9]">
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
                className={`py-3 px-4 rounded-[16px] text-xs font-semibold border transition-all text-center ${
                  isSelected
                    ? "bg-[#6D28D9] text-white border-[#6D28D9] shadow-sm"
                    : "bg-[#F8F4FF] text-[#050505] border-[#DCC9F5] hover:bg-[#EFDAFF]"
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#050505]">
            Finish / Color
          </label>
          <span className="text-xs font-semibold text-[#6D28D9]">
            {selectedVariant.color}
          </span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {colors.map((col) => {
            const isSelected = col === selectedVariant.color;
            const hex = getColorHex(col);
            return (
              <button
                key={col}
                type="button"
                onClick={() => handleColorChange(col)}
                className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-[16px] border text-xs font-semibold transition-all ${
                  isSelected
                    ? "border-[#6D28D9] bg-white ring-2 ring-[#6D28D9] shadow-xs text-[#050505]"
                    : "border-[#DCC9F5] bg-[#F8F4FF] hover:bg-[#EFDAFF] text-[#444444]"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/10 shadow-inner"
                  style={{ backgroundColor: hex }}
                />
                <span>{col}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
