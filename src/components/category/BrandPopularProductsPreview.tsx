"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/lib/data/products";
import { getUser } from "@/lib/mock-auth";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BrandPopularProductsPreviewProps = {
  brandName: string;
  brandSlug: string;
  socialProof?: {
    count: number;
    businessType: string;
    timePeriod: string;
  };
};

export function BrandPopularProductsPreview({
  brandName,
  brandSlug,
  socialProof,
}: BrandPopularProductsPreviewProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        const user = getUser();
        const branchCode = user?.primary_branch_code;

        const result = getProducts({
          brands: [brandName],
          bestSeller: true,
          branchCode,
          perPage: 8,
          sortBy: 'name_az',
        });

        setProducts(result.products.slice(0, 8));
      } catch (error) {
        console.error('Error fetching popular products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brandName]);

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("brand-popular-products-carousel");
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
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
            <div className="flex gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-64 h-80 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Always render section even if no products (show fallback)
  const displayProducts = products.length > 0 ? products : [];

  const maxScroll = displayProducts.length * 272 - 1152;
  const showLeftButton = scrollPosition > 0 && displayProducts.length > 0;
  const showRightButton = scrollPosition < maxScroll && displayProducts.length > 0;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular {brandName} Products
            </h2>
            {socialProof ? (
              <p className="text-lg text-gray-600">
                Ordered by {socialProof.count.toLocaleString()} {socialProof.businessType} this {socialProof.timePeriod}
              </p>
            ) : (
              <p className="text-lg text-gray-600">
                Best sellers customers love. Quality guaranteed.
              </p>
            )}
          </div>
          <Link 
            href={`/brands/${brandSlug}/shop?best_seller=true`}
            className="text-primary hover:text-primary font-medium flex-shrink-0 ml-6"
          >
            View All Best Sellers →
          </Link>
        </div>
        <div className="relative">
          {showLeftButton && (
            <button
              onClick={() => scrollContainer("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" strokeWidth={2} />
            </button>
          )}
          <div
            id="brand-popular-products-carousel"
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={handleScroll}
          >
            {displayProducts.length > 0 ? (
              displayProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-64">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="w-full text-center py-12 text-gray-500">
                <p>Loading popular products for {brandName}...</p>
              </div>
            )}
          </div>
          {showRightButton && (
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
    </section>
  );
}

