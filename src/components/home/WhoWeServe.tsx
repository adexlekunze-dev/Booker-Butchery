import Link from "next/link";
import Image from "next/image";

const sectors = [
  {
    id: "pubs-bars",
    name: "Pubs & Bars",
    description: "Quality beverages and supplies for your establishment",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80",
    href: "/sectors/pubs-bars"
  },
  {
    id: "restaurants",
    name: "Restaurants",
    description: "Fresh ingredients and products for culinary excellence",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    href: "/sectors/restaurants"
  },
  {
    id: "hotels",
    name: "Hotels",
    description: "Complete solutions for hospitality and guest services",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    href: "/sectors/hotels"
  },
  {
    id: "events",
    name: "Events",
    description: "Complete catering and event solutions",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    href: "/sectors/events"
  },
  {
    id: "coffee-shops-cafes",
    name: "Coffee Shops & Cafes",
    description: "Quality beverages and fresh supplies",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    href: "/sectors/coffee-shops-cafes"
  },
  {
    id: "takeaways",
    name: "Takeaways",
    description: "Fast-service essentials and packaging",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    href: "/sectors/takeaways"
  }
];

export function WhoWeServe() {
  return (
    <section className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Who We Serve</h2>
          <p className="text-lg text-gray-600">Supporting Businesses Across All Sectors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {sectors.map((sector) => (
            <Link
              key={sector.id}
              href={sector.href}
              className="group bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-150 overflow-hidden border border-gray-200"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={sector.image}
                  alt={sector.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                  {sector.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{sector.description}</p>
                <span className="text-primary font-medium group-hover:opacity-80 transition-opacity">
                  Learn More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/sectors"
            className="text-primary hover:text-primary font-medium text-lg"
          >
            View All Sectors & Retail →
          </Link>
        </div>
      </div>
    </section>
  );
}

