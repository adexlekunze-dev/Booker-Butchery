"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { useBranchContext } from "@/lib/branch-context";

export function FeaturedOffers() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { branchName } = useBranchContext();

  useEffect(() => {
    const fetchOffers = () => {
      try {
        // Use client-side product functions
        import("@/lib/data/products").then(({ getProducts }) => {
          import("@/lib/mock-auth").then(({ getUser }) => {
            const user = getUser();
            const branchCode = user?.primary_branch_code;
            
            const result = getProducts({
              branchCode,
              on_offer: true,
              perPage: 12,
            });
            
            setProducts(result.products || []);
            setLoading(false);
          });
        });
      } catch (error) {
        console.error("Error fetching offers:", error);
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("offers-carousel");
    if (!container) return;
    
    const scrollAmount = 400;
    const newPosition = direction === "left" 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;
    
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Special Offers This Week</h2>
          </div>
          <div className="text-gray-600">Loading offers...</div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Special Offers This Week</h2>
          <Link href="/offers" className="text-primary hover:text-primary font-medium">
            View All Offers →
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={() => scrollContainer("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" strokeWidth={2} />
          </button>

          <div
            id="offers-carousel"
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollContainer("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}

