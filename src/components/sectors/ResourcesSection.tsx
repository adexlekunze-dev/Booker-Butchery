"use client";

import Image from "next/image";
import Link from "next/link";

type Resource = {
  image: string;
  title: string;
  description: string;
  link: string;
};

type ResourcesSectionProps = {
  resources: Resource[];
  title?: string;
};

export function ResourcesSection({ resources, title }: ResourcesSectionProps) {
  // Limit to exactly 3 resources as per requirements
  const displayResources = resources.slice(0, 3);
  
  if (displayResources.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayResources.map((resource, idx) => (
            <Link
              key={idx}
              href={resource.link}
              className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{resource.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

