"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { RefreshCw, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

export function BuyAgainSection() {
  const [session, setSession] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState("Trending Products");
  const [subtitle, setSubtitle] = useState("Popular items across all Booker customers");
  const [icon, setIcon] = useState(<TrendingUp className="w-6 h-6 text-primary" />);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);

    const branchCode = currentUser?.primary_branch_code;
    
    // For prototype, show best sellers as "trending"
    const result = getProducts({
      bestSeller: true,
      branchCode,
      perPage: 8,
    });

    setProducts(result.products);
    
    if (currentSession?.user) {
      setTitle("Trending Products");
      setSubtitle("Best-selling items at your branch");
      setIcon(<RefreshCw className="w-6 h-6 text-primary" />);
    } else {
      setTitle("Trending Products");
      setSubtitle("Popular items across all Booker customers");
      setIcon(<TrendingUp className="w-6 h-6 text-primary" />);
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("trending-products-carousel");
    if (!container) return;
    
    const scrollAmount = 400;
    const newPosition = direction === "left" 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;
    
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 mt-1">{subtitle}</p>
            </div>
          </div>
          <Link href="/best-sellers">
            <Button variant="secondary" size="sm">
              View All
            </Button>
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
            id="trending-products-carousel"
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
