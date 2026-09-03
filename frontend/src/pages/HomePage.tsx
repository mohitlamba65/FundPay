import { useEffect, useState } from "react";
import { Hero } from "@/components/common/Hero";
import { ProductCard } from "@/components/product/ProductCard";
import { EmiCalculator } from "@/components/emi/EmiCalculator";
import { HowItWorks } from "@/components/common/HowItWorks";
import { Benefits } from "@/components/common/Benefits";
import { TrustSection } from "@/components/common/TrustSection";
import { FaqSection } from "@/components/common/FaqSection";
import { productService } from "@/services/product.service";
import type { Product } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Products Section */}
      <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E7E5E4]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#16A34A] bg-[#ECFDF3] px-3 py-1 rounded-full">
              Flagship Collection
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171717] mt-3">
              Explore Eligible Smartphones
            </h2>
            <p className="text-sm text-[#6B6B6B] mt-2">
              Every device is backed by pre-vetted mutual fund plans with 0% interest and cashback.
            </p>
          </div>

          <div className="text-xs text-[#8A8A8A]">
            Showing <strong className="text-[#171717]">{products.length}</strong> flagship models
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl border border-[#E7E5E4] p-6 space-y-4 bg-white">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-60 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="pt-4 border-t border-[#E7E5E4] flex justify-between">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-10 w-28 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State with Retry */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50/60 p-8 text-center max-w-md mx-auto space-y-4">
            <AlertCircle className="h-10 w-10 text-[#DC2626] mx-auto" />
            <h3 className="text-lg font-bold text-[#171717]">Failed to Load Products</h3>
            <p className="text-xs text-[#6B6B6B]">{error}</p>
            <Button
              onClick={fetchProducts}
              className="bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-xl h-10 px-5"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-2" />
              Retry Connection
            </Button>
          </div>
        )}

        {/* Dynamic Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Interactive EMI Calculator */}
      <EmiCalculator />

      {/* 4. How It Works Timeline */}
      <HowItWorks />

      {/* 5. Benefits */}
      <Benefits />

      {/* 6. Trust & Security */}
      <TrustSection />

      {/* 7. FAQs */}
      <FaqSection />

      {/* 8. Conversion Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#111111] text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-[#16A34A]" />
              Zero Down Payment
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to upgrade without selling your mutual funds?
            </h2>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              Check your pre-approved portfolio credit limit in 60 seconds with zero paperwork and zero impact on your CIBIL score.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#111111] hover:bg-neutral-100 h-13 px-8 text-sm font-semibold transition-all shadow-md"
              >
                Browse Eligible Phones
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
