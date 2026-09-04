import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productsApi } from "@/api";
import type { Product, Variant, EMIPlan } from "@/types";
import { ProductGallery } from "@/components/product/ProductGallery";
import { VariantSelector } from "@/components/product/VariantSelector";
import { EmiPlanCard } from "@/components/emi/EmiPlanCard";
import { EmiBreakdownDialog } from "@/components/emi/EmiBreakdownDialog";
import { formatINR } from "@/utils/cn";
import { Skeleton } from "@/components/ui/skeleton";
import { ServerWakeupLoader } from "@/components/common/ServerWakeupLoader";
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

  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"confirm" | "success">("confirm");

  const fetchProduct = async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      const data = await productsApi.getProductBySlug(slug);
      setProduct(data);

      if (data.variants && data.variants.length > 0) {
        const firstVariant = data.variants[0]!;
        setSelectedVariant(firstVariant);

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

  useEffect(() => {
    fetchProduct();
  }, [slug]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ServerWakeupLoader
          isLoading={loading}
          title="Connecting to FundPay Backend"
          itemType="device specifications"
        />
        <Skeleton className="h-6 w-48 mb-8 rounded-full bg-[#F8F4FF]" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-4">
            <Skeleton className="aspect-square w-full rounded-[28px] bg-[#F8F4FF]" />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <Skeleton className="h-10 w-3/4 bg-[#F8F4FF] rounded-2xl" />
            <Skeleton className="h-12 w-1/3 bg-[#F8F4FF] rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-[24px] bg-[#F8F4FF]" />
            <Skeleton className="h-48 w-full rounded-[24px] bg-[#F8F4FF]" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product || !selectedVariant) {
    return (
      <div className="max-w-md mx-auto px-4 py-28 text-center space-y-4">
        <ServerWakeupLoader
          isLoading={false}
          error={error}
          onRetry={fetchProduct}
          title="Connecting to FundPay Backend"
          itemType="device specifications"
        />
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFDAFF] text-[#6D28D9] mx-auto">
          <Info className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-bold text-[#050505]">Product Not Found</h2>
        <p className="text-sm text-[#777777]">{error || "The requested smartphone is currently unavailable."}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[16px] bg-[#6D28D9] text-white text-sm font-semibold hover:bg-[#5420C9] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Catalog
        </Link>
      </div>
    );
  }

  const emiPlans = selectedVariant.emiPlans || [];

  return (
    <div className="min-h-screen pb-32 bg-white">
      <div className="border-b border-[#E5E0EA] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs font-medium text-[#777777]">
          <Link to="/" className="hover:text-[#6D28D9] transition-colors flex items-center gap-1">
            <ChevronLeft className="h-3.5 w-3.5" />
            Catalog
          </Link>
          <span>/</span>
          <span className="text-[#444444]">{product.brand}</span>
          <span>/</span>
          <span className="text-[#050505] font-bold truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <ProductGallery
              imageUrl={selectedVariant.imageUrl}
              productName={product.name}
              selectedColor={selectedVariant.color}
            />
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] bg-[#F8F4FF] border border-[#DCC9F5] px-3 py-1 rounded-full">
                  {product.brand}
                </span>
                <span className="text-xs text-[#E5E0EA]">•</span>
                <Badge className="bg-[#EFDAFF] text-[#6D28D9] border border-[#DCC9F5] text-[11px] font-semibold rounded-full px-3 py-1">
                  <Sparkles className="h-3 w-3 mr-1 text-[#7C20E8]" />
                  0% Effective Interest Available
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#050505] leading-tight">
                {product.name}
              </h1>

              <p className="text-[15px] text-[#444444] mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="p-6 rounded-[24px] bg-[#F8F4FF] border border-[#DCC9F5] flex items-center justify-between shadow-1fi-card">
              <div>
                <span className="text-xs text-[#777777] block font-semibold uppercase tracking-wider">Lien Purchase Price</span>
                <div className="flex items-baseline gap-2.5 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#050505]">
                    {formatINR(selectedVariant.price)}
                  </span>
                  {selectedVariant.mrp > selectedVariant.price && (
                    <span className="text-sm text-[#A0A0A0] line-through">
                      {formatINR(selectedVariant.mrp)}
                    </span>
                  )}
                  {selectedVariant.discountPercentage && selectedVariant.discountPercentage > 0 && (
                    <span className="text-xs font-bold text-[#6D28D9] bg-[#EFDAFF] border border-[#DCC9F5] px-2 py-0.5 rounded-md">
                      {selectedVariant.discountPercentage}% OFF
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#20D66B] block">
                  Down Payment
                </span>
                <span className="text-2xl font-extrabold text-[#050505]">₹0</span>
              </div>
            </div>

            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={handleVariantSelect}
            />

            <div className="space-y-4 pt-6 border-t border-[#E5E0EA]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#050505] tracking-tight">
                    Select Mutual Fund EMI Plan
                  </h2>
                  <p className="text-xs text-[#777777] mt-0.5">
                    Backed by active equity/debt funds that continue compounding in your portfolio.
                  </p>
                </div>

                {selectedPlan && (
                  <button
                    type="button"
                    onClick={() => setBreakdownOpen(true)}
                    className="text-xs font-bold text-[#6D28D9] hover:underline flex items-center gap-1 bg-[#F8F4FF] border border-[#DCC9F5] px-3 py-1.5 rounded-full"
                  >
                    <Info className="h-3.5 w-3.5" />
                    View Math
                  </button>
                )}
              </div>

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

            {selectedPlan && (
              <div className="rounded-[22px] p-5 bg-[#F8F4FF] border border-[#DCC9F5] space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#444444]">Collateral Scheme:</span>
                  <strong className="text-[#050505] font-semibold">{selectedPlan.mutualFund.name}</strong>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#444444]">Expected Portfolio CAGR:</span>
                  <span className="text-[#20D66B] font-bold">
                    ~{selectedPlan.mutualFund.expectedReturnRate}% Compounding
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm pt-3 border-t border-[#DCC9F5]">
                  <span className="text-[#444444]">Net Effective Cost:</span>
                  <strong className="text-lg font-extrabold text-[#6D28D9]">
                    {formatINR(selectedPlan.netEffectiveCost)}
                  </strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedPlan && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5E0EA] bg-white/95 backdrop-blur-md py-4 px-4 sm:px-8 shadow-1fi-nav">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 pr-1 sm:pr-4">
            <div className="flex items-center gap-4">
              <div className="hidden sm:block h-12 w-12 rounded-[14px] bg-[#F8F4FF] border border-[#DCC9F5] p-1 shrink-0 overflow-hidden">
                <img
                  src={selectedVariant.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <div className="text-xs text-[#777777] font-medium hidden sm:block">
                  {product.name} • {selectedVariant.storage} ({selectedVariant.color})
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#050505]">
                    {formatINR(selectedPlan.monthlyAmount)}
                  </span>
                  <span className="text-xs text-[#777777]">
                    / month for {selectedPlan.tenureMonths} mos
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setBreakdownOpen(true)}
                className="hidden sm:flex rounded-[16px] border-[#DCC9F5] text-xs font-semibold h-12 px-5 hover:bg-[#F8F4FF]"
              >
                View Math
              </Button>

              <Button
                onClick={handleProceedWithPlan}
                className="bg-[#6D28D9] hover:bg-[#5420C9] text-white rounded-[16px] h-12 px-8 text-sm font-semibold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Proceed with Selected Plan
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <EmiBreakdownDialog
        open={breakdownOpen}
        onOpenChange={setBreakdownOpen}
        plan={selectedPlan}
        variant={selectedVariant}
        onProceed={handleProceedWithPlan}
      />

      <Dialog open={checkoutModalOpen} onOpenChange={setCheckoutModalOpen}>
        <DialogContent className="sm:max-w-md rounded-[28px] p-6 sm:p-8 bg-white border border-[#DCC9F5] shadow-2xl">
          {checkoutStep === "confirm" ? (
            <div>
              <DialogHeader>
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#F8F4FF] text-[#6D28D9] border border-[#DCC9F5]">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <DialogTitle className="text-center text-2xl font-bold tracking-tight text-[#050505]">
                  Confirm Plan & Begin Digital KYC
                </DialogTitle>
                <DialogDescription className="text-center text-xs text-[#777777]">
                  Reserve this exclusive mutual-fund backed plan. No upfront charge required today.
                </DialogDescription>
              </DialogHeader>

              <div className="my-5 rounded-[20px] bg-[#F8F4FF] border border-[#DCC9F5] p-4 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-[#444444]">Device:</span>
                  <span className="font-semibold text-[#050505]">{product.name} ({selectedVariant.storage})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#444444]">Selected Plan:</span>
                  <span className="font-semibold text-[#050505]">{selectedPlan?.tenureMonths} Months @ {formatINR(selectedPlan?.monthlyAmount)}/mo</span>
                </div>
                <div className="flex justify-between text-[#20D66B]">
                  <span className="font-medium">Promotional Cashback:</span>
                  <span className="font-bold">+{formatINR(selectedPlan?.cashback)}</span>
                </div>
                <div className="flex justify-between border-t border-[#DCC9F5] pt-2">
                  <span className="text-[#444444]">Amount Due Today:</span>
                  <span className="text-base font-bold text-[#20D66B]">₹0 (Zero Down Payment)</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleConfirmOrder}
                  className="w-full bg-[#6D28D9] hover:bg-[#5420C9] text-white h-12 rounded-[16px] text-sm font-semibold transition-all"
                >
                  Verify Mutual Funds via OTP
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setCheckoutModalOpen(false)}
                  className="w-full text-xs text-[#777777] h-10 hover:bg-[#F8F4FF]"
                >
                  Modify Selection
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#20D66B]">
                <CheckCircle2 className="h-9 w-9 stroke-[2.5]" />
              </div>
              <DialogTitle className="text-2xl font-bold tracking-tight text-[#050505]">
                Application Approved! 🎉
              </DialogTitle>
              <DialogDescription className="text-xs text-[#444444] max-w-xs mx-auto leading-relaxed">
                Your mutual-fund backed plan for <strong>{product.name}</strong> has been secured at <strong>{formatINR(selectedPlan?.monthlyAmount)}/mo</strong>.
              </DialogDescription>

              <div className="p-4 rounded-[20px] bg-[#F8F4FF] border border-[#DCC9F5] text-xs text-left space-y-2 text-[#444444]">
                <div className="flex justify-between">
                  <span>Application Reference:</span>
                  <strong className="text-[#050505]">FP-{Math.floor(100000 + Math.random() * 900000)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Pledged Fund:</span>
                  <strong className="text-[#050505]">{selectedPlan?.mutualFund.name}</strong>
                </div>
                <div className="flex justify-between text-[#20D66B]">
                  <span>Cashback Credited:</span>
                  <strong className="font-bold">{formatINR(selectedPlan?.cashback)} on 1st EMI</strong>
                </div>
              </div>

              <Button
                onClick={() => {
                  setCheckoutModalOpen(false);
                  navigate("/");
                }}
                className="w-full bg-[#6D28D9] hover:bg-[#5420C9] text-white h-12 rounded-[16px] text-sm font-semibold"
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
