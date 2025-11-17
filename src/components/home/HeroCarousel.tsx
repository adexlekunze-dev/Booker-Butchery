"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Banner = {
  id: string;
  title: string;
  description: string;
  image?: string;
  gradient?: string;
};

const banners: Banner[] = [
  {
    id: "1",
    title: "Seasonal Offers - Save Up to 25%",
    description: "Stock up on premium cuts and seasonal favorites. Limited time offers across fresh meat categories.",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1920&q=80",
    gradient: "from-primary to-primary"
  },
  {
    id: "2",
    title: "New Products Arriving Weekly",
    description: "Discover the latest additions to our wholesale catalog. Quality products delivered fresh to your business.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80",
    gradient: "from-primary to-primary"
  },
  {
    id: "3",
    title: "Business Services & Support",
    description: "Trade credit, expert advice, and dedicated account management. Supporting your business growth.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80",
    gradient: "from-primary to-primary"
  }
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentBanner = banners[currentIndex];

  return (
    <section className="relative text-white overflow-hidden">
      {/* Background Image Layer */}
      {currentBanner.image && (
        <div className="absolute inset-0 z-0">
          <img 
            src={currentBanner.image} 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      )}
      {/* Fallback gradient if no image */}
      {!currentBanner.image && (
        <div className={`absolute inset-0 z-0 bg-gradient-to-br ${currentBanner.gradient}`} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg" 
            style={{ color: '#FFFFFF' }}
          >
            {currentBanner.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
            {currentBanner.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/register">
              <Button variant="primary" size="lg">
                Become a member
              </Button>
            </Link>
            <Link href="/branches">
              <Button variant="primary" size="lg">
                Find your local store
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" strokeWidth={2} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" strokeWidth={2} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

