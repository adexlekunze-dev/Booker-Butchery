"use client";

import Link from "next/link";
import { SectorBusinessSolution, SectorTestimonial } from "@/data/sectors";
import { LucideIcon, Star, Quote } from "lucide-react";

type BusinessSolutionsSectionProps = {
  sectorName: string;
  businessSolutions?: SectorBusinessSolution[];
  primaryTestimonial?: SectorTestimonial;
};

export function BusinessSolutionsSection({
  sectorName,
  businessSolutions,
  primaryTestimonial,
}: BusinessSolutionsSectionProps) {
  // Default business solutions if none provided - always render section
  const defaultSolutions: SectorBusinessSolution[] = [
    {
      id: "hospitality-services",
      title: "Hospitality Services",
      description: "Comprehensive support for hospitality businesses including ordering assistance and account management.",
      link: "/services/hospitality",
      icon: undefined,
    },
    {
      id: "click-collect",
      title: "Click & Collect and Delivery",
      description: "Flexible ordering with next-day delivery or convenient branch collection.",
      link: "/services/click-collect-delivery",
      icon: undefined,
    },
  ];

  const displaySolutions = businessSolutions && businessSolutions.length > 0 
    ? businessSolutions 
    : defaultSolutions;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Business Solutions for {sectorName}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Services designed specifically for your business type
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Business Solutions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {displaySolutions.map((solution) => {
              const Icon = solution.icon as LucideIcon;
              return (
                <Link
                  key={solution.id}
                  href={solution.link}
                  className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-primary transition-all"
                >
                  {Icon && (
                    <div className="w-12 h-12 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                      <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" strokeWidth={2} />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {solution.description}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Primary Testimonial / Success Story */}
          {(primaryTestimonial || (displaySolutions.length > 0 && !primaryTestimonial)) && (
            <>
              {primaryTestimonial ? (
            <div className="bg-primary rounded-lg p-8 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Quote className="w-6 h-6 text-white opacity-80" />
                <span className="text-sm font-semibold uppercase tracking-wide opacity-90">
                  Success Story
                </span>
              </div>
              <blockquote className="text-lg font-medium mb-6 italic leading-relaxed">
                "{primaryTestimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg mb-1">
                    {primaryTestimonial.name}
                  </div>
                  <div className="text-sm opacity-90">
                    {primaryTestimonial.role}, {primaryTestimonial.business}
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < primaryTestimonial.rating
                          ? "text-yellow-300 fill-yellow-300"
                          : "text-white opacity-30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
              ) : (
                <div className="bg-primary rounded-lg p-8 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Quote className="w-6 h-6 text-white opacity-80" />
                    <span className="text-sm font-semibold uppercase tracking-wide opacity-90">
                      Success Story
                    </span>
                  </div>
                  <blockquote className="text-lg font-medium mb-6 italic leading-relaxed">
                    "Partnering with Booker has transformed our supply chain. Quality products, reliable delivery, and expert support help us focus on what matters most - serving our customers."
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lg mb-1">
                        Our Members
                      </div>
                      <div className="text-sm opacity-90">
                        Trusted by {sectorName} businesses nationwide
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-300 fill-yellow-300"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

