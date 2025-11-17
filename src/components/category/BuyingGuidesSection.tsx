"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type BuyingGuidesSectionProps = {
  category: string;
};

interface CutGuide {
  title: string;
  description: string;
  slug: string;
  image: string;
  icon: string;
}

// Professional Butchery Cut Guides
const cutGuides: CutGuide[] = [
  {
    title: "Beef Cuts Guide",
    description: "Master beef primal cuts, aging, marbling grades, and cooking methods for restaurants",
    slug: "beef",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80",
    icon: "🥩",
  },
  {
    title: "Pork Cuts Guide",
    description: "Complete pork butchery guide from shoulder to belly, cooking temps and techniques",
    slug: "pork",
    image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=800&q=80",
    icon: "🐷",
  },
  {
    title: "Lamb Cuts Guide",
    description: "Lamb primal cuts, rack preparation, seasonal availability and cooking methods",
    slug: "lamb",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
    icon: "🐑",
  },
  {
    title: "Chicken Cuts Guide",
    description: "Chicken portioning, breast vs thigh applications, and cooking temperatures",
    slug: "chicken",
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&q=80",
    icon: "🐔",
  },
  {
    title: "Sausage Guide",
    description: "Sausage types, casings, meat content standards and cooking methods",
    slug: "sausages",
    image: "https://images.unsplash.com/photo-1612161019796-3f6f1f7e6e1f?w=800&q=80",
    icon: "🌭",
  },
];

export function BuyingGuidesSection({ category }: BuyingGuidesSectionProps) {
  // Only show cut guides for Meat, Fish & Poultry category
  if (category !== "Meat, Fish & Poultry") {
    return null;
  }

  // Show first 4 cut guides
  const displayGuides = cutGuides.slice(0, 4);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Professional Butchery Cut Guides
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Master cuts, cooking methods, and temperature guides for professional kitchens
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayGuides.map((guide) => {
            return (
              <Link
                key={guide.slug}
                href={`/cut-guides/${guide.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-orange-500 transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg line-clamp-2" style={{ color: '#FFFFFF' }}>
                      {guide.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {guide.description}
                  </p>

                  <div className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-colors">
                    <span className="text-sm">View Guide</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Link to all cut guides */}
        <div className="text-center mt-12">
          <Link
            href="/cut-guides"
            className="inline-flex items-center gap-2 text-lg font-semibold text-gray-700 hover:text-orange-600 transition-colors"
          >
            Browse All Cut Guides
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

