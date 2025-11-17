"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";

interface AwardItem {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
}

const awards: AwardItem[] = [
  {
    id: "1",
    title: "The Grocer Gold Awards",
    year: "2025",
    description: "Londis Won Grocer Gold Symbol/Franchise Retailer of the Year.",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80"
  },
  {
    id: "2",
    title: "SLR Awards",
    year: "2025",
    description: "30 of our retail stores shortlisted and 11 wins across 16 categories, it was an incredible showcase of the talent.",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80"
  },
  {
    id: "3",
    title: "Convenience Awards",
    year: "2024",
    description: "6 of our Premier stores were winners across 6 different categories.",
    image: "https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=800&q=80"
  },
  {
    id: "4",
    title: "Scottish Grocer Awards",
    year: "2024",
    description: "6 Premier stores where winners of 6 awards across different categories.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80"
  },
  {
    id: "5",
    title: "Quality Food Awards",
    year: "2024",
    description: "Blackgate Trimmed Lamb Rack won Gold, Chef's larder Freeze Dried Coffee won Silver, Blackgate Trimmed Pork Rack & Beef Ribeye Steak won Bronze.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80"
  },
  {
    id: "6",
    title: "Asian Trader Awards",
    year: "2024",
    description: "2 Budgens stores, 2 Premier stores and a Londis store were winners across 5 different categories.",
    image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&q=80"
  },
  {
    id: "7",
    title: "Forecourt Trader Awards",
    year: "2024",
    description: "9 awards won by Budgens and Londis stores. 3 were 2024 Specialist winners, and 6 were 2024 Regional winners.",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80"
  },
  {
    id: "8",
    title: "Meat Management Award",
    year: "2024",
    description: "Own brand label Blackgate Signature Traditionally Linked Sausages wins 'Britain's Best Sausage' for second year in a row!",
    image: "https://images.unsplash.com/photo-1563736602-04e1a3d08cb1?w=800&q=80"
  },
  {
    id: "9",
    title: "Food Management Today",
    year: "2024",
    description: "Own brand Chef's Larder won Best Bakery Product with 18 Mini Victoria Sponge Cakes.",
    image: "https://images.unsplash.com/photo-1586943759066-e7019d99c242?w=800&q=80"
  },
  {
    id: "10",
    title: "Food Management Today",
    year: "2024",
    description: "Own brand Chef's Larder Premium won Best Dairy Product with Taw Valley Mature Cheddar.",
    image: "https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=800&q=80"
  },
  {
    id: "11",
    title: "The Grocer Gold Awards",
    year: "2024",
    description: "Premier Won Grocer Gold Symbol Retailer of the Year.",
    image: "https://images.unsplash.com/photo-1604480133435-25b1f1f0e5d9?w=800&q=80"
  },
  {
    id: "12",
    title: "Retail Industry Awards",
    year: "2024",
    description: "Londis won Symbol Group of the Year. With 6 awards won by our independent retailers.",
    image: "https://images.unsplash.com/photo-1569630256077-1584e29dd565?w=800&q=80"
  }
];

export function AwardsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Awards</h2>
          <p className="text-lg text-gray-600">Booker's most recent accolades</p>
        </div>

        <div className="relative">
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors hidden md:block"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Scroll Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors hidden md:block"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Awards Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-6 pb-4">
              {awards.map((award) => (
                <div
                  key={award.id}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-150"
                >
                  <div className="relative h-40 bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                    <div className="relative w-24 h-24">
                      <Image
                        src={award.image}
                        alt={`${award.title} ${award.year}`}
                        fill
                        className="object-contain drop-shadow-xl"
                        sizes="96px"
                      />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Award className="w-6 h-6 text-white opacity-80" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{award.title}</h3>
                      <span className="text-sm font-semibold text-primary">{award.year}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile scroll indicator */}
        <div className="mt-4 text-center text-sm text-gray-500 md:hidden">
          ← Swipe to see more awards →
        </div>
      </div>
    </section>
  );
}

