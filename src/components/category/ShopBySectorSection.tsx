"use client";

import Link from "next/link";
import Image from "next/image";
import { getSectorsForCategory } from "@/lib/data/category-sectors";
import { sectors, getSectorBySlug } from "@/data/sectors";
import { Building2 } from "lucide-react";

type ShopBySectorSectionProps = {
  category: string;
};

export function ShopBySectorSection({ category }: ShopBySectorSectionProps) {
  const sectorSlugs = getSectorsForCategory(category);
  
  // Fetch sector data for each slug
  const sectorData = sectorSlugs
    .map((slug) => {
      if (!slug) return null;
      const sector = getSectorBySlug(slug);
      // Ensure sector exists and has required properties before using 'in' operator
      if (!sector || typeof sector !== 'object') return null;
      return sector;
    })
    .filter((sector): sector is NonNullable<typeof sector> => sector !== null && sector !== undefined);

  if (sectorData.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Your Business Type
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Tailored solutions for your industry. Curated products. Expert support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectorData.map((sector) => {
            if (!sector) return null;
            
            return (
              <Link
                key={sector.id}
                href={`/sectors/${sector.slug}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-orange-500 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-orange-50 to-gray-100">
                  {sector.hero.imageUrl ? (
                    <Image
                      src={sector.hero.imageUrl}
                      alt={sector.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building2 className="w-24 h-24 text-orange-400 opacity-30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Sector Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                      {sector.name}
                    </h3>
                    <p className="text-white/90 text-sm line-clamp-2 drop-shadow-md" style={{ color: '#FFFFFF' }}>
                      {sector.hero.subheadline}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Value Points Preview */}
                  {sector.valuePoints.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {sector.valuePoints.slice(0, 3).map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-orange-600 font-semibold group-hover:text-orange-700 transition-colors">
                      Explore {sector.name} →
                    </span>
                    <div className="w-8 h-8 rounded-full bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center transition-colors">
                      <svg
                        className="w-4 h-4 text-orange-600 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Optional: Link to all sectors */}
        <div className="text-center mt-12">
          <Link
            href="/sectors"
            className="inline-flex items-center gap-2 text-lg font-semibold text-gray-700 hover:text-orange-600 transition-colors"
          >
            View All Business Types
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

