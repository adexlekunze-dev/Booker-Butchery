import Link from "next/link";
import Image from "next/image";

const inspirationItems = [
  {
    id: "seasonal-guide",
    title: "Seasonal Guide",
    description: "Learn which cuts are best for grilling, roasting, or slow cooking throughout the year.",
    ctaText: "Read Guide",
    href: "/meat-fish-poultry",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80"
  },
  {
    id: "business-tips",
    title: "Business Tips",
    description: "Optimize your ordering, manage inventory efficiently, and grow your wholesale business.",
    ctaText: "Read Tips",
    href: "/account",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80"
  },
  {
    id: "recipe-ideas",
    title: "Recipe Ideas",
    description: "Discover new dishes and menu ideas to delight your customers with premium ingredients.",
    ctaText: "View Recipes",
    href: "/meat-fish-poultry",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
  }
];

export function InspirationTiles() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Grow Your Business</h2>
          <p className="text-lg text-gray-600">Expert advice and resources to help you succeed</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inspirationItems.map((item) => {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-150 overflow-hidden border border-gray-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <span className="text-primary font-medium group-hover:opacity-80 transition-opacity">
                    {item.ctaText} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

