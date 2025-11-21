import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Star, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getQualityLandingPageSEO } from "@/data/quality-resource-seo-content";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";

export const metadata: Metadata = {
  title: "Quality & Provenance | Booker Wholesale Meats",
  description: "Discover our commitment to quality. Explore our Blackgate dry-aging process, halal certification standards, and British beef traceability from farm to kitchen.",
  keywords: "quality meat, Blackgate aging, halal certified, British beef, meat provenance, food traceability, premium meat",
};

const qualityStories = [
  {
    title: "Blackgate Dry-Aged Beef",
    description: "Our premium 28-day dry-aging process transforms exceptional British beef into restaurant-grade steaks with intense flavor and unmatched tenderness.",
    icon: Clock,
    href: "/quality/blackgate-aging",
    color: "from-amber-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
    badge: "Premium Range"
  },
  {
    title: "Halal Certification",
    description: "Rigorously certified halal meats meeting the highest religious and quality standards. Full traceability and certified processing.",
    icon: Star,
    href: "/quality/halal-certification",
    color: "from-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80",
    badge: "Certified Halal"
  },
  {
    title: "British Beef Traceability",
    description: "100% British beef with full farm-to-fork traceability. Supporting British farmers and ensuring the highest welfare and sustainability standards.",
    icon: MapPin,
    href: "/quality/british-beef",
    color: "from-blue-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?w=800&q=80",
    badge: "British & Traceable"
  },
];

export default function QualityPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1600&q=80"
            alt="Quality & Provenance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <Award className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                  Quality & Provenance
                </h1>
              </div>
            </div>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Every cut tells a story. Discover our commitment to exceptional quality, rigorous standards, and complete transparency from farm to kitchen.
            </p>
            <div className="flex flex-wrap gap-6 text-white/90 drop-shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm font-semibold">100% British Sourcing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm font-semibold">Full Traceability</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm font-semibold">Certified Standards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Stories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qualityStories.map((story) => {
              const Icon = story.icon;
              return (
                <Link
                  key={story.href}
                  href={story.href}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${story.image})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-80`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-full">
                        {story.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {story.description}
                    </p>
                    <span className="inline-flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                      Read Full Story →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Quality Commitments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">British Sourcing</h3>
              <p className="text-sm text-gray-600">
                Supporting UK farmers with 100% British beef, pork, and lamb from trusted farms.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Certified Quality</h3>
              <p className="text-sm text-gray-600">
                Red Tractor, organic, halal, and premium certifications ensuring highest standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Expert Aging</h3>
              <p className="text-sm text-gray-600">
                28-day dry-aging in controlled conditions for exceptional flavor and tenderness.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Full Traceability</h3>
              <p className="text-sm text-gray-600">
                Complete farm-to-fork transparency. Know exactly where your meat comes from.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Banner */}
      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Industry Certifications & Standards</h2>
            <p className="text-gray-400">Recognized quality assurance you can trust</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">Red Tractor</div>
              <div className="text-xs text-gray-400 mt-1">Farm Assured</div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">Organic</div>
              <div className="text-xs text-gray-400 mt-1">Soil Association</div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-500">Halal</div>
              <div className="text-xs text-gray-400 mt-1">HMC Certified</div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">British Meat</div>
              <div className="text-xs text-gray-400 mt-1">Quality Mark</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1600&q=80"
            alt="Quality You Can Taste"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Quality You Can Taste, Standards You Can Trust
          </h2>
          <p className="text-xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
            Browse our premium selection of British meats, aged to perfection and certified to the highest standards.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/butchery/shop">
              <Button variant="secondary" size="lg">
                Browse All Products
              </Button>
            </Link>
            <Link href="/butchery/shop?brand=Blackgate">
              <Button
                variant="secondary"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600"
              >
                View Blackgate Range
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContentSection content={getQualityLandingPageSEO()} />
    </main>
  );
}
