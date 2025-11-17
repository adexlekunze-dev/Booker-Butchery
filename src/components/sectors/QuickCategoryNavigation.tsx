"use client";

import Link from "next/link";
import { SectorCategory } from "@/data/sectors";
import { LucideIcon } from "lucide-react";

type QuickCategoryNavigationProps = {
  categories: SectorCategory[];
  sectorSlug: string;
};

export function QuickCategoryNavigation({
  categories,
  sectorSlug,
}: QuickCategoryNavigationProps) {
  // Display exactly 6 categories (first 6 if more exist)
  const displayCategories = categories.slice(0, 6);

  if (displayCategories.length === 0) {
    return null;
  }

  // Map category slugs to product category shop routes
  const getCategoryShopLink = (categorySlug: string) => {
    // Map sector category slugs to product category routes
    const categoryMap: Record<string, string> = {
      "fresh-meat": "/meat-fish-poultry/shop",
      "meat-fish-poultry": "/meat-fish-poultry/shop",
      "poultry": "/meat-fish-poultry/shop",
      "fish-seafood": "/meat-fish-poultry/shop",
      "beer": "/beer/shop",
      "beer-cider": "/beer/shop",
      "wine-spirits": "/beer/shop",
      "greengrocery": "/greengrocery/shop",
      "fresh-produce": "/greengrocery/shop",
      "vegetables": "/greengrocery/shop",
      "snacks": "/search",
      "soft-drinks": "/search",
      "ice": "/search",
    };

    // First try to map directly
    if (categoryMap[categorySlug]) {
      return categoryMap[categorySlug];
    }

    // Fallback: link to sector shop page
    return `/sectors/${sectorSlug}/shop`;
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Find products tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((category) => {
            const Icon = category.icon as LucideIcon;
            const categoryLink = getCategoryShopLink(category.slug);

            return (
              <Link
                key={category.id}
                href={categoryLink}
                className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-primary transition-all"
              >
                <div className="flex items-center gap-4">
                  {Icon && (
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" strokeWidth={2} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}


