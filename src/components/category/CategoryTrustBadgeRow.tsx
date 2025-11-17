"use client";

import { Shield, Award, MapPin, Truck, CheckCircle2, Fish, Leaf } from "lucide-react";

type CategoryTrustBadgeRowProps = {
  category?: string;
};

export function CategoryTrustBadgeRow({ category }: CategoryTrustBadgeRowProps) {
  // Define all possible badges
  const allBadges = [
    {
      id: "british-sourced",
      title: "British Sourced",
      description: "Supporting UK farmers",
      icon: Award,
      showFor: ["all"],
    },
    {
      id: "branches",
      title: "170+ Branches",
      description: "Nationwide coverage",
      icon: MapPin,
      showFor: ["all"],
    },
    {
      id: "next-day-delivery",
      title: "Next-Day Delivery",
      description: "Order by 3pm",
      icon: Truck,
      showFor: ["all"],
    },
    {
      id: "quality-assured",
      title: "Quality Assured",
      description: "Rigorous standards",
      icon: CheckCircle2,
      showFor: ["all"],
    },
    {
      id: "red-tractor",
      title: "Red Tractor Certified",
      description: "British quality standards",
      icon: Shield,
      showFor: ["Meat, Fish & Poultry"],
    },
    {
      id: "msc-certified",
      title: "MSC Certified",
      description: "Sustainable seafood",
      icon: Fish,
      showFor: ["Meat, Fish & Poultry"],
    },
    {
      id: "organic-options",
      title: "Organic Options",
      description: "Certified organic produce",
      icon: Leaf,
      showFor: ["Greengrocery"],
    },
  ];

  // Filter badges based on category
  const badges = allBadges.filter((badge) => {
    if (badge.showFor.includes("all")) return true;
    if (!category) return false;
    return badge.showFor.includes(category);
  });

  return (
    <section className="py-8 bg-gray-50 border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex md:flex-wrap md:justify-center gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible scrollbar-hide -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-4 py-3 hover:shadow-md transition-shadow flex-shrink-0 md:flex-1 min-w-[200px] md:min-w-0"
              >
                <div className="flex-shrink-0">
                  <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900 mb-0.5">
                    {badge.title}
                  </div>
                  <div className="text-xs text-gray-600">
                    {badge.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

