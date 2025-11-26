"use client";

import Link from "next/link";
import Image from "next/image";
import { icpPersonas } from "@/data/icp-personas";
import { ChevronRight } from "lucide-react";

export function ICPSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Solutions Tailored to Your Needs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Find the perfect wholesale butchery solution for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {icpPersonas.map((icp) => (
            <Link
              key={icp.id}
              href={`/icp/${icp.slug}`}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-orange-500 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-50 to-gray-100">
                <Image
                  src={icp.hero.imageUrl}
                  alt={icp.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                    {icp.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {icp.shortDescription}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-orange-600 font-semibold text-sm group-hover:text-orange-700 transition-colors">
                    Learn More
                  </span>
                  <div className="w-7 h-7 rounded-full bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Optional: Link to all ICPs */}
        <div className="text-center mt-12">
          <Link
            href="/icp"
            className="inline-flex items-center gap-2 text-lg font-semibold text-gray-700 hover:text-orange-600 transition-colors"
          >
            Explore All Solutions
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
