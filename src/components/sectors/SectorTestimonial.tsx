"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";

type SectorTestimonialProps = {
  photo?: string;
  quote: string;
  name: string;
  business: string;
  location: string;
  rating: number;
  readMoreLink?: string;
};

export function SectorTestimonial({
  photo,
  quote,
  name,
  business,
  location,
  rating,
  readMoreLink,
}: SectorTestimonialProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 md:p-12">
          <div className="flex items-start gap-6">
            {photo && (
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={photo}
                    alt={name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <blockquote className="text-lg text-gray-900 mb-6 italic">
                "{quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{name}</div>
                  <div className="text-sm text-gray-600">
                    {business}, {location}
                  </div>
                </div>
                {readMoreLink && (
                  <Link
                    href={readMoreLink}
                    className="text-sm text-primary hover:text-primary font-medium"
                  >
                    Read More →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

