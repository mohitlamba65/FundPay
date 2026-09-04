import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  side?: "left" | "right";
  widthClass?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  hideHeader?: boolean;
}

export function SlideDrawer({
  isOpen,
  onClose,
  side = "right",
  widthClass,
  title,
  description,
  children,
  footer,
  hideHeader = false,
}: SlideDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Default width classes
  const resolvedWidth =
    widthClass ||
    (side === "left"
      ? "w-full sm:w-[85vw] md:w-[80vw] lg:w-[75vw] xl:w-[70vw] max-w-5xl"
      : "w-full sm:w-[90vw] md:w-[85vw] lg:w-[75vw] xl:w-[65vw] max-w-4xl");

  const sidePositionClasses =
    side === "left"
      ? "left-0 animate-in slide-in-from-left duration-300 border-r"
      : "right-0 animate-in slide-in-from-right duration-300 border-l";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Drawer Container */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        className={`fixed inset-y-0 ${sidePositionClasses} ${resolvedWidth} bg-white border-[#E5E0EA] shadow-2xl flex flex-col z-50 focus:outline-none`}
      >
        {/* Optional Default Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#E5E0EA] bg-[#FCFAFF]">
            <div className="space-y-1">
              {title && (
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#050505]">
                  {title}
                </div>
              )}
              {description && (
                <div className="text-xs sm:text-sm text-[#444444]">
                  {description}
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#777777] hover:text-[#050505] hover:bg-[#F8F4FF] transition-colors"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div className="border-t border-[#E5E0EA] p-5 sm:p-6 bg-white shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
