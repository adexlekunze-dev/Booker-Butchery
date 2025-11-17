"use client";

import { useState, useEffect } from "react";
import { Star, Award, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import testimonials from "@/data/testimonials.json";

type Testimonial = {
  id: string;
  chef_name: string;
  chef_title: string;
  restaurant_name: string;
  restaurant_location: string;
  michelin_stars?: number;
  rosettes?: number;
  chef_photo: string;
  testimonial: string;
  product_skus?: string[];
  product_categories?: string[];
  featured?: boolean;
  rating: number;
};

type ChefTestimonialsProps = {
  variant?: "carousel" | "grid" | "featured";
  productCategory?: string;
  productSku?: string;
  maxItems?: number;
  showNavigation?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
};

export function ChefTestimonials({
  variant = "carousel",
  productCategory,
  productSku,
  maxItems = 3,
  showNavigation = true,
  autoplay = false,
  autoplayDelay = 5000,
}: ChefTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter testimonials based on product category or SKU
  const filteredTestimonials = testimonials.filter((t: Testimonial) => {
    if (productSku && t.product_skus?.includes(productSku)) return true;
    if (productCategory && t.product_categories?.includes(productCategory)) return true;
    if (!productCategory && !productSku) return t.featured; // Show only featured if no filter
    return false;
  }) as Testimonial[];

  // If no matches, show featured testimonials
  const displayTestimonials = filteredTestimonials.length > 0
    ? filteredTestimonials.slice(0, maxItems)
    : (testimonials.filter((t: Testimonial) => t.featured).slice(0, maxItems) as Testimonial[]);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || variant !== "carousel") return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, displayTestimonials.length, variant]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  if (displayTestimonials.length === 0) {
    return null;
  }

  // Featured variant - single large testimonial
  if (variant === "featured") {
    const testimonial = displayTestimonials[0];
    return (
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Quote className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={testimonial.chef_photo}
              alt={testimonial.chef_name}
              className="w-20 h-20 rounded-full border-4 border-white/30 object-cover"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                {testimonial.michelin_stars && testimonial.michelin_stars > 0 && (
                  <div className="flex gap-1">
                    {[...Array(testimonial.michelin_stars)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}
                {testimonial.rosettes && testimonial.rosettes > 0 && (
                  <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded">
                    <Award className="w-4 h-4" />
                    <span>{testimonial.rosettes} Rosette{testimonial.rosettes > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold">{testimonial.chef_name}</h3>
              <p className="text-blue-200 text-sm">{testimonial.chef_title}</p>
            </div>
          </div>
          <blockquote className="text-lg md:text-xl leading-relaxed mb-4 italic">
            "{testimonial.testimonial}"
          </blockquote>
          <div className="flex items-center gap-2 text-blue-200">
            <span className="font-semibold">{testimonial.restaurant_name}</span>
            <span>•</span>
            <span>{testimonial.restaurant_location}</span>
          </div>
        </div>
      </div>
    );
  }

  // Grid variant - multiple testimonials in a grid
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    );
  }

  // Carousel variant (default)
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {displayTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {showNavigation && displayTestimonials.length > 1 && (
        <>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {displayTestimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {displayTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Individual testimonial card component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 hover:shadow-xl transition-shadow">
      {/* Quote icon */}
      <div className="mb-4">
        <Quote className="w-10 h-10 text-primary opacity-20" />
      </div>

      {/* Testimonial text */}
      <blockquote className="text-gray-700 mb-6 leading-relaxed min-h-[120px]">
        "{testimonial.testimonial}"
      </blockquote>

      {/* Chef info */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <img
          src={testimonial.chef_photo}
          alt={testimonial.chef_name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-gray-900">{testimonial.chef_name}</h4>
            {testimonial.michelin_stars && testimonial.michelin_stars > 0 && (
              <div className="flex gap-0.5">
                {[...Array(testimonial.michelin_stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-1">{testimonial.chef_title}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold text-primary">{testimonial.restaurant_name}</span>
            <span>•</span>
            <span>{testimonial.restaurant_location}</span>
          </div>
          {testimonial.rosettes && testimonial.rosettes > 0 && (
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
              <Award className="w-3 h-3" />
              <span>{testimonial.rosettes} AA Rosette{testimonial.rosettes > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>

      {/* Rating stars */}
      <div className="flex gap-1 mt-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
