import { useEffect, useState } from "react";
import { Hero } from "@/components/common/Hero";
import { ProductCard } from "@/components/product/ProductCard";
import { EmiCalculator } from "@/components/emi/EmiCalculator";
import { HowItWorks } from "@/components/common/HowItWorks";
import { Benefits } from "@/components/common/Benefits";
import { TrustSection } from "@/components/common/TrustSection";
import { FaqSection } from "@/components/common/FaqSection";
import { productsApi } from "@/api";
import type { Product } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ServerWakeupLoader } from "@/components/common/ServerWakeupLoader";
import { Sparkles, ArrowUpRight } from "lucide-react";

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsApi.getProducts();
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

  const featuredProduct = products.find((p) => p.slug === "iphone-17-pro") || products[0] || null;

  return (
    <main className="min-h-screen bg-white">
      <Hero featuredProduct={featuredProduct} loading={loading} />

      <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E5E0EA]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6D28D9] bg-[#F8F4FF] border border-[#DCC9F5] px-3.5 py-1.5 rounded-full mb-3 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-[#7C20E8]" />
              Flagship Collection
            </span>
            <h2 className="text-[38px] sm:text-[54px] font-bold tracking-[-0.04em] text-[#050505] leading-[1.05]">
              Explore eligible <span className="italic font-normal text-[#777777]">smartphones</span>{" "}
              <span className="text-[#6D28D9]">with zero down</span>
            </h2>
            <p className="text-[17px] text-[#444444] mt-3 max-w-2xl leading-relaxed">
              Every device is backed by pre-vetted mutual fund plans with 0% effective interest and instant lien approval.
            </p>
          </div>

          <div className="text-sm text-[#777777] font-medium shrink-0">
            Showing <strong className="text-[#050505] font-bold">{products.length}</strong> flagship models
          </div>
        </div>

        <ServerWakeupLoader
          isLoading={loading}
          error={error}
          onRetry={fetchProducts}
          title="Connecting to FundPay Backend"
          itemType="smartphones"
        />

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-[28px] border border-[#DCC9F5] p-6 space-y-4 bg-[#F8F4FF]">
                <Skeleton className="h-6 w-24 rounded-full bg-white" />
                <Skeleton className="h-64 w-full rounded-[22px] bg-white" />
                <Skeleton className="h-8 w-3/4 bg-white" />
                <Skeleton className="h-4 w-1/2 bg-white" />
                <div className="pt-4 border-t border-[#DCC9F5] flex justify-between">
                  <Skeleton className="h-8 w-24 bg-white" />
                  <Skeleton className="h-10 w-28 rounded-xl bg-white" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <EmiCalculator />
      <HowItWorks />
      <Benefits />
      <TrustSection />
      <FaqSection />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-[32px] bg-gradient-to-br from-[#6D28D9] via-[#5420C9] to-[#4012A3] text-white p-8 sm:p-16 text-center relative overflow-hidden shadow-1fi-nav">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold uppercase tracking-wider border border-white/20">
              <Sparkles className="h-3.5 w-3.5 text-[#20D66B]" />
              Zero Down Payment
            </span>

            <h2 className="text-[40px] sm:text-[60px] font-bold tracking-tight leading-[1.02]">
              Ready to upgrade without selling your mutual funds?
            </h2>

            <p className="text-[17px] sm:text-[19px] text-white/80 leading-relaxed max-w-2xl mx-auto font-normal">
              Check your pre-approved portfolio credit limit in 60 seconds with zero paperwork and zero impact on your CIBIL score.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[18px] bg-white text-[#6D28D9] hover:bg-[#F8F4FF] h-14 px-9 text-[17px] font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Browse Eligible Phones</span>
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
