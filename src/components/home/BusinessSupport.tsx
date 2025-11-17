import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "hospitality",
    title: "Hospitality Services",
    description: "Comprehensive services tailored for restaurants, hotels, pubs, bars, and catering businesses.",
    href: "/services/hospitality",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
  },
  {
    id: "retail",
    title: "Services for Retail Business",
    description: "Specialized solutions for convenience stores, retail outlets, and independent retailers.",
    href: "/services/retail",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
  },
  {
    id: "delivery",
    title: "Click & Collect and Delivery",
    description: "Flexible fulfillment options to suit your business needs. Order online, collect at branch or get delivered.",
    href: "/services/click-collect-delivery",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&q=80",
  },
  {
    id: "clubs",
    title: "Foodservice Clubs",
    description: "Exclusive member benefits, discounts, and special offers for foodservice businesses.",
    href: "/services/foodservice-clubs",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
  },
];

export function BusinessSupport() {
  return (
    <section className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Business Services & Support</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl">Comprehensive business solutions designed to support your operations and help your business thrive.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            return (
              <Link
                key={service.id}
                href={service.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary transform hover:-translate-y-1"
              >
                {/* Hero Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center text-primary font-semibold text-sm group-hover:underline">
                    <span>Learn More</span>
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
