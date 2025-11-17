"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/lib/mock-auth";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Clock, Tag, Package, ArrowRight } from "lucide-react";

interface SeasonalPromo {
  type: 'deadline' | 'bundle' | 'featured' | 'campaign';
  title: string;
  description: string;
  badge?: string;
  image?: string;
  cta: { text: string; href: string };
  deadline?: string;
  savings?: string;
}

export function SeasonalPromos() {
  const [session, setSession] = useState<any>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);
  }, []);

  if (!session?.user) {
    return null;
  }

  // Mock seasonal promotions
  const promos: SeasonalPromo[] = [
    {
      type: 'deadline',
      title: 'Christmas Deadline',
      description: 'Order by Dec 18th for guaranteed Christmas delivery',
      badge: 'URGENT',
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80',
      cta: { text: 'Order Now', href: '/christmas' },
      deadline: 'Dec 18, 2024',
    },
    {
      type: 'bundle',
      title: 'Festive Turkey Bundle',
      description: 'Premium turkey, sides & desserts',
      badge: 'SAVE 15%',
      image: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=800&q=80',
      cta: { text: 'Add Bundle', href: '/bundles/festive-turkey' },
      savings: '£45',
    },
    {
      type: 'featured',
      title: 'Premium Champagne',
      description: 'Perfect for New Year celebrations',
      badge: '20% OFF',
      image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&q=80',
      cta: { text: 'Shop Now', href: '/beer/shop?category=champagne' },
      savings: '£24',
    },
    {
      type: 'featured',
      title: 'Festive Desserts',
      description: 'Christmas puddings & mince pies',
      badge: 'BEST VALUE',
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80',
      cta: { text: 'Browse', href: '/desserts' },
    },
  ];

  const scrollCarousel = (direction: "left" | "right") => {
    const container = document.getElementById("seasonal-promos-carousel");
    if (!container) return;
    
    const scrollAmount = 320;
    const newPosition = direction === "left" 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;
    
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  return (
    <section className="bg-gradient-to-br from-red-50 via-green-50 to-white border-b border-gray-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            🎄 Seasonal Promotions & Offers
          </h2>
          <p className="text-gray-600">Limited-time deals and festive bundles</p>
        </div>

        {/* Horizontal Scrolling Carousel */}
        <div className="relative">
          <div
            id="seasonal-promos-carousel"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={handleScroll}
          >
            {promos.map((promo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group border-2 border-transparent hover:border-primary"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {promo.image && (
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="320px"
                    />
                  )}
                  {/* Badge */}
                  {promo.badge && (
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                      promo.type === 'deadline' ? 'bg-red-600 text-white' :
                      promo.type === 'bundle' ? 'bg-green-600 text-white' :
                      'bg-primary text-white'
                    }`}>
                      {promo.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {promo.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {promo.description}
                  </p>

                  {/* Deadline or Savings */}
                  {promo.deadline && (
                    <div className="flex items-center gap-2 mb-4 text-red-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{promo.deadline}</span>
                    </div>
                  )}
                  {promo.savings && (
                    <div className="flex items-center gap-2 mb-4 text-green-600">
                      <Tag className="w-4 h-4" />
                      <span className="text-sm font-medium">Save {promo.savings}</span>
                    </div>
                  )}

                  {/* CTA */}
                  <Link href={promo.cta.href}>
                    <Button variant="primary" size="sm" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
                      {promo.cta.text}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicators (Optional - shows if content overflows) */}
          {scrollPosition > 0 && (
            <button
              onClick={() => scrollCarousel("left")}
              className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all"
              aria-label="Scroll left"
            >
              ←
            </button>
          )}
          {scrollPosition < 1000 && (
            <button
              onClick={() => scrollCarousel("right")}
              className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all"
              aria-label="Scroll right"
            >
              →
            </button>
          )}
        </div>

        {/* Alert Banner for Deadline */}
        <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Christmas Order Deadline: Dec 18th</p>
              <p className="text-sm text-gray-600">Order now for guaranteed delivery before Christmas</p>
            </div>
          </div>
          <Link href="/christmas">
            <Button variant="primary" size="sm">
              Shop Christmas →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

