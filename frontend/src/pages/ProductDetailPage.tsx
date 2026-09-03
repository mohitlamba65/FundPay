import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productService } from "@/services/product.service";
import type { Product, Variant, EMIPlan } from "@/types";
import { ProductGallery } from "@/components/product/ProductGallery";
import { VariantSelector } from "@/components/product/VariantSelector";
import { EmiPlanCard } from "@/components/emi/EmiPlanCard";
import { EmiBreakdownDialog } from "@/components/emi/EmiBreakdownDialog";
import { formatINR } from "@/utils/cn";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EMIPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"confirm" | "success">("confirm");

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductBySlug(slug);
        setProduct(data);

        // Select first variant by default
        if (data.variants && data.variants.length > 0) {
          const firstVariant = data.variants[0]!;
          setSelectedVariant(firstVariant);

          // Select 12M plan by default if available, or first plan
          if (firstVariant.emiPlans && firstVariant.emiPlans.length > 0) {
            const defaultPlan =
              firstVariant.emiPlans.find((p) => p.tenureMonths === 12) ||
              firstVariant.emiPlans[0]!;
            setSelectedPlan(defaultPlan);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // When variant changes, update selected plan to match new variant's equivalent tenure
  const handleVariantSelect = (newVariant: Variant) => {
    setSelectedVariant(newVariant);
    if (newVariant.emiPlans && newVariant.emiPlans.length > 0) {
      const targetTenure = selectedPlan ? selectedPlan.tenureMonths : 12;
      const matchingPlan =
        newVariant.emiPlans.find((p) => p.tenureMonths === targetTenure) ||
        newVariant.emiPlans[0]!;
      setSelectedPlan(matchingPlan);
    }
  };

  const handleProceedWithPlan = () => {
    setCheckoutStep("confirm");
    setCheckoutModalOpen(true);
  };

  const handleConfirmOrder = () => {
    setCheckoutStep("success");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Skeleton className="h-6 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-4">
            <Skeleton className="aspect-square w-full rounded-3xl" />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product || !selectedVariant) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 mx-auto">
          <Info className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#171717]">Product Not Found</h2>
        <p className="text-xs text-[#6B6B6B]">{error || "The requested smartphone is currently unavailable."}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-semibold hover:bg-black transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Shop
        </Link>
      </div>
    );
  }

  const emiPlans = selectedVariant.emiPlans || [];

  return (
    <div className="min-h-screen pb-32">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E7E5E4] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-[#8A8A8A]">
          <Link to="/" className="hover:text-[#171717] transition-colors flex items-center gap-1">
            <ChevronLeft className="h-3.5 w-3.5" />
            Shop
          </Link>
          <span>/</span>
          <span className="text-[#6B6B6B]">{product.brand}</span>
          <span>/</span>
          <span className="text-[#171717] font-semibold truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <ProductGallery
              imageUrl={selectedVariant.imageUrl}
              productName={product.name}
              selectedColor={selectedVariant.color}
            />
          </div>

          {/* Right Column: Configuration & EMI Plan Selection */}
          <div className="lg:col-span-6 space-y-8">
            {/* Title & Brand */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A8A8A]">
                  {product.brand}
                </span>
                <span className="text-xs text-[#E7E5E4]">•</span>
                <Badge className="bg-[#ECFDF3] text-[#16A34A] border-none text-[11px] font-semibold">
                  <Sparkles className="h-3 w-3 mr-1" />
                  0% Effective Interest Available
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171717]">
                {product.name}
              </h1>

              <p className="text-sm text-[#6B6B6B] mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Header */}
            <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-xs text-[#8A8A8A] block font-medium">Selling Price</span>
                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <span className="text-3xl font-extrabold text-[#171717]">
                    {formatINR(selectedVariant.price)}
                  </span>
                  {selectedVariant.mrp > selectedVariant.price && (
                    <span className="text-sm text-[#8A8A8A] line-through">
                      {formatINR(selectedVariant.mrp)}
                    </span>
                  )}
                  {selectedVariant.discountPercentage && selectedVariant.discountPercentage > 0 && (
                    <span className="text-xs font-bold text-[#16A34A] bg-[#ECFDF3] px-2 py-0.5 rounded-md">
                      {selectedVariant.discountPercentage}% OFF
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#16A34A] block">
                  Down Payment
                </span>
                <span className="text-xl font-bold text-[#171717]">₹0</span>
              </div>
            </div>

            {/* Variant Selectors: Storage & Color */}
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={handleVariantSelect}
            />

            {/* EMI Plans Section */}
            <div className="space-y-4 pt-4 border-t border-[#E7E5E4]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#171717] tracking-tight">
                    Select Mutual Fund EMI Plan
                  </h2>
                  <p className="text-xs text-[#6B6B6B]">
                    Each plan is backed by an active mutual fund scheme that continues earning returns.
                  </p>
                </div>

                {selectedPlan && (
                  <button
                    type="button"
                    onClick={() => setBreakdownOpen(true)}
                    className="text-xs font-semibold text-[#16A34A] hover:underline flex items-center gap-1"
                  >
                    <Info className="h-3.5 w-3.5" />
                    Full Breakdown
                  </button>
                )}
              </div>

              {/* Grid of EMI Plan Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {emiPlans.map((plan) => (
                  <EmiPlanCard
                    key={plan.id}
                    plan={plan}
                    isSelected={selectedPlan?.id === plan.id}
                    onSelect={() => setSelectedPlan(plan)}
                  />
                ))}
              </div>
            </div>

            {/* Selected Plan Summary Banner */}
            {selectedPlan && (
              <div className="rounded-2xl p-5 bg-[#FAFAF8] border border-[#E7E5E4] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B6B6B]">Collateral Scheme:</span>
                  <strong className="text-[#171717] font-semibold">{selectedPlan.mutualFund.name}</strong>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B6B6B]">Expected Portfolio Return:</span>
                  <span className="text-[#16A34A] font-semibold">
                    ~{selectedPlan.mutualFund.expectedReturnRate}% CAGR
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E7E5E4]">
                  <span className="text-[#6B6B6B]">Net Effective Cost:</span>
                  <strong className="text-base font-bold text-[#171717]">
                    {formatINR(selectedPlan.netEffectiveCost)}
                  </strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      {selectedPlan && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E7E5E4] bg-white/95 backdrop-blur-md py-4 px-4 sm:px-8 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="hidden sm:block h-12 w-12 rounded-xl bg-[#FAFAF8] border border-[#E7E5E4] p-1 shrink-0 overflow-hidden">
                <img
                  src={selectedVariant.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <div className="text-xs text-[#8A8A8A] font-medium hidden sm:block">
                  {product.name} • {selectedVariant.storage} ({selectedVariant.color})
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-[#171717]">
                    {formatINR(selectedPlan.monthlyAmount)}
                  </span>
                  <span className="text-xs text-[#6B6B6B]">
                    / month for {selectedPlan.tenureMonths} mos
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setBreakdownOpen(true)}
                className="hidden sm:flex rounded-xl border-[#E7E5E4] text-xs font-semibold h-12 px-5"
              >
                View Math
              </Button>

              <Button
                onClick={handleProceedWithPlan}
                className="bg-[#111111] hover:bg-black text-white rounded-xl h-12 px-8 text-sm font-semibold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Proceed with Selected Plan
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Breakdown Dialog */}
      <EmiBreakdownDialog
        open={breakdownOpen}
        onOpenChange={setBreakdownOpen}
        plan={selectedPlan}
        variant={selectedVariant}
        onProceed={handleProceedWithPlan}
      />

      {/* Checkout / Order Intent Modal */}
      <Dialog open={checkoutModalOpen} onOpenChange={setCheckoutModalOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl p-6 sm:p-8 bg-white border border-[#E7E5E4]">
          {checkoutStep === "confirm" ? (
            <div>
              <DialogHeader>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF3] text-[#16A34A]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <DialogTitle className="text-center text-xl font-bold tracking-tight text-[#171717]">
                  Confirm Plan & Begin Digital KYC
                </DialogTitle>
                <DialogDescription className="text-center text-xs text-[#6B6B6B]">
                  Reserve this exclusive mutual-fund backed plan. No payment required today.
                </DialogDescription>
              </DialogHeader>

              <div className="my-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E5E4] p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Device:</span>
                  <span className="font-semibold text-[#171717]">{product.name} ({selectedVariant.storage})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Selected Plan:</span>
                  <span className="font-semibold text-[#171717]">{selectedPlan?.tenureMonths} Months @ {formatINR(selectedPlan?.monthlyAmount)}/mo</span>
                </div>
                <div className="flex justify-between text-[#16A34A]">
                  <span className="font-medium">Promotional Cashback:</span>
                  <span className="font-bold">+{formatINR(selectedPlan?.cashback)}</span>
                </div>
                <div className="flex justify-between border-t border-[#E7E5E4] pt-2">
                  <span className="text-[#6B6B6B]">Amount Due Today:</span>
                  <span className="text-base font-bold text-[#16A34A]">₹0 (Zero Down Payment)</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleConfirmOrder}
                  className="w-full bg-[#111111] hover:bg-black text-white h-12 rounded-xl text-sm font-semibold transition-all"
                >
                  Verify Mutual Funds via OTP
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setCheckoutModalOpen(false)}
                  className="w-full text-xs text-[#6B6B6B] h-10"
                >
                  Modify Selection
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#ECFDF3] text-[#16A34A]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <DialogTitle className="text-2xl font-bold tracking-tight text-[#171717]">
                Application Approved! 🎉
              </DialogTitle>
              <DialogDescription className="text-xs text-[#6B6B6B] max-w-xs mx-auto leading-relaxed">
                Your mutual-fund backed plan for <strong>{product.name}</strong> has been secured at <strong>{formatINR(selectedPlan?.monthlyAmount)}/mo</strong>.
              </DialogDescription>

              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E5E4] text-xs text-left space-y-1.5 text-[#6B6B6B]">
                <div className="flex justify-between">
                  <span>Application Reference:</span>
                  <strong className="text-[#171717]">FP-{Math.floor(100000 + Math.random() * 900000)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Pledged Fund:</span>
                  <strong className="text-[#171717]">{selectedPlan?.mutualFund.name}</strong>
                </div>
                <div className="flex justify-between text-[#16A34A]">
                  <span>Cashback Credited:</span>
                  <strong className="font-bold">{formatINR(selectedPlan?.cashback)} on 1st EMI</strong>
                </div>
              </div>

              <Button
                onClick={() => {
                  setCheckoutModalOpen(false);
                  navigate("/");
                }}
                className="w-full bg-[#111111] hover:bg-black text-white h-12 rounded-xl text-sm font-semibold"
              >
                Return to Shop
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
