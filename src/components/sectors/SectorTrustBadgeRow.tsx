"use client";

import { Shield, Award, MapPin, Truck, CheckCircle2, Fish, Leaf, LucideIcon } from "lucide-react";
import { SectorTrustBadge } from "@/data/sectors";

type SectorTrustBadgeRowProps = {
  trustBadges?: SectorTrustBadge[];
};

export function SectorTrustBadgeRow({ trustBadges }: SectorTrustBadgeRowProps) {
  // Default trust badges if sector-specific ones not provided
  const defaultBadges = [
    {
      id: "british-sourced",
      title: "British Sourced",
      description: "Supporting UK suppliers",
      icon: Award,
    },
    {
      id: "branches",
      title: "170+ Branches",
      description: "Nationwide coverage",
      icon: MapPin,
    },
    {
      id: "next-day-delivery",
      title: "Next-Day Delivery",
      description: "Order by 3pm",
      icon: Truck,
    },
    {
      id: "quality-assured",
      title: "Quality Assured",
      description: "Rigorous standards",
      icon: CheckCircle2,
    },
  ];

  // Use sector-specific badges if provided, otherwise use defaults
  const badges = trustBadges && trustBadges.length > 0 
    ? trustBadges.map((badge) => ({
        id: badge.id,
        title: badge.title,
        description: badge.description,
        icon: badge.icon || CheckCircle2,
      }))
    : defaultBadges;

  return (
    <section className="py-8 bg-gray-50 border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex md:flex-wrap md:justify-center gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible scrollbar-hide -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          {badges.map((badge) => {
            const Icon = badge.icon as LucideIcon;
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


