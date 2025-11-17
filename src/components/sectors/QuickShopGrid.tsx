"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

type QuickShopItem = {
  image: string;
  title: string;
  description?: string;
  productCount?: number;
  inStock?: boolean;
  link: string;
};

type QuickShopGridProps = {
  items: QuickShopItem[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  scrollable?: boolean; // New prop for horizontal scroll
};

export function QuickShopGrid({ items, title, showViewAll = true, viewAllLink, scrollable = false }: QuickShopGridProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("quick-shop-carousel");
    if (!container) return;
    
    const scrollAmount = 400;
    const newPosition = direction === "left" 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;
    
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  if (scrollable) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {title && (
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
              {showViewAll && viewAllLink && (
                <Link href={viewAllLink} className="text-primary hover:text-primary font-medium">
                  View All →
                </Link>
              )}
            </div>
          )}
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
              id="quick-shop-carousel"
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
            >
              {items.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="group flex-shrink-0 w-64 bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-video bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="256px"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      {item.productCount !== undefined && (
                        <span className="text-xs text-gray-500">{item.productCount} products</span>
                      )}
                      {item.inStock !== undefined && (
                        <span className={`text-xs font-medium ${
                          item.inStock ? "text-green-600" : "text-gray-500"
                        }`}>
                          {item.inStock ? "In Stock" : "Limited Stock"}
                        </span>
                      )}
                    </div>
                    <Button variant="primary" size="sm" block className="mt-2">
                      Shop Now
                    </Button>
                  </div>
                </Link>
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
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            {showViewAll && viewAllLink && (
              <Link href={viewAllLink} className="text-primary hover:text-primary font-medium">
                View All →
              </Link>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                )}
                <div className="flex items-center justify-between">
                  {item.productCount !== undefined && (
                    <span className="text-xs text-gray-500">{item.productCount} products</span>
                  )}
                  {item.inStock !== undefined && (
                    <span className={`text-xs font-medium ${
                      item.inStock ? "text-green-600" : "text-gray-500"
                    }`}>
                      {item.inStock ? "In Stock" : "Limited Stock"}
                    </span>
                  )}
                </div>
                <Button variant="primary" size="sm" block className="mt-3">
                  Shop Now
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

