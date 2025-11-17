"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/lib/data/products";
import { getUser } from "@/lib/mock-auth";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PopularProductsPreviewProps = {
  category: string;
  limit?: number;
};

export function PopularProductsPreview({ category, limit = 8 }: PopularProductsPreviewProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        const user = getUser();
        const branchCode = user?.primary_branch_code;

        const result = getProducts({
          category,
          bestSeller: true,
          branchCode,
          perPage: limit,
          sortBy: 'name_az',
        });

        setProducts(result.products.slice(0, limit));
      } catch (error) {
        console.error('Error fetching popular products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, limit]);

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("popular-products-carousel");
    if (!container) return;
    
    const scrollAmount = 400;
    const newPosition = direction === "left" 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;
    
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Products</h2>
            <p className="text-lg text-gray-600">Best sellers customers love. Quality guaranteed.</p>
          </div>
          <div className="flex gap-6 overflow-x-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-64 h-80 bg-gray-100 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  const getCategoryShopRoute = (cat: string) => {
    const routeMap: Record<string, string> = {
      "Meat, Fish & Poultry": "/meat-fish-poultry/shop",
      "Beer, Cider and Alcoholic RTDs": "/beer/shop",
      "Beer, Cider & RTDs": "/beer/shop", // Fallback for legacy naming
      "Greengrocery": "/greengrocery/shop",
    };
    return routeMap[cat] || "/shop";
  };

  return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Products</h2>
              <p className="text-lg text-gray-600">Best sellers customers love. Quality guaranteed.</p>
            </div>
            <Link 
              href={`${getCategoryShopRoute(category)}?best_seller=true`}
              className="text-primary hover:text-primary font-medium flex-shrink-0 ml-6"
            >
              View All Best Sellers →
            </Link>
          </div>
        <div className="relative">
          {scrollPosition > 0 && (
            <button
              onClick={() => scrollContainer("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" strokeWidth={2} />
            </button>
          )}
          <div
            id="popular-products-carousel"
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={handleScroll}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {scrollPosition < (products.length * 272 - 1152) && (
            <button
              onClick={() => scrollContainer("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

