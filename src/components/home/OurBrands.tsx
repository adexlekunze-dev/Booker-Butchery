import Link from "next/link";
import Image from "next/image";
import { getAllBrands } from "@/data/brands";

export function OurBrands() {
  const allBrands = getAllBrands();
  const brands = allBrands.slice(0, 6); // Show only first 6 brands

  return (
    <section className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Brands</h2>
          <p className="text-lg text-gray-600">Quality Products Across All Categories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-150 overflow-hidden border border-gray-200"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={brand.hero.imageUrl || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"}
                  alt={brand.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{brand.description}</p>
                <span className="text-primary font-medium group-hover:opacity-80 transition-opacity">
                  Learn More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/brands"
            className="text-primary hover:text-primary font-medium text-lg"
          >
            View All Brands →
          </Link>
        </div>
      </div>
    </section>
  );
}

