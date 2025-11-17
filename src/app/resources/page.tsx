import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Thermometer, Clock, Award, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getResourcesLandingPageSEO } from "@/data/quality-resource-seo-content";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";

export const metadata: Metadata = {
  title: "Professional Kitchen Resources | Booker Wholesale",
  description: "Professional butchery and cooking resources for chefs. Temperature charts, aging guides, butchery specifications, and downloadable kitchen references.",
  keywords: "cooking resources, temperature chart, meat aging guide, butchery specifications, chef resources, kitchen reference",
};

const resources = [
  {
    title: "Cooking Temperature Chart",
    description: "Professional temperature guide for all meats. Safe cooking temps, doneness levels, and resting times.",
    icon: Thermometer,
    href: "/resources/cooking-temperatures",
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Meat Aging Guide",
    description: "Complete guide to dry and wet aging. Process, timelines, flavor development, and storage requirements.",
    icon: Clock,
    href: "/resources/aging-guide",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Butchery Specifications",
    description: "Industry-standard butchery specs. Cut definitions, yields, portioning standards, and quality grading.",
    icon: Award,
    href: "/resources/butchery-specs",
    color: "from-green-500 to-teal-500",
  },
  {
    title: "Interactive Beef Cuts",
    description: "Interactive diagram showing beef primal cuts. Explore where each cut comes from and best cooking methods.",
    icon: Grid3x3,
    href: "/resources/beef-cuts",
    color: "from-purple-500 to-pink-500",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=1600&q=80"
            alt="Professional Kitchen Resources"
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
                <BookOpen className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                  Professional Kitchen Resources
                </h1>
              </div>
            </div>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Essential guides and reference materials for professional kitchens. Downloadable charts, comprehensive guides, and industry standards.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary transform hover:-translate-y-1"
                >
                  <div className={`h-40 bg-gradient-to-br ${resource.color} flex items-center justify-center`}>
                    <Icon className="w-20 h-20 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {resource.description}
                    </p>
                    <span className="inline-flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                      View Resource →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Use Professional Resources?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Industry Standards</h3>
              <p className="text-gray-600">
                Follow professional guidelines used by top restaurants and butcheries worldwide.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Ensure consistent quality and food safety with tested temperatures and processes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Thermometer className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Kitchen Reference</h3>
              <p className="text-gray-600">
                Download and print for easy reference in your professional kitchen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1600&q=80"
            alt="Professional Excellence"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Professional Excellence Starts Here
          </h2>
          <p className="text-xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
            Source premium meats and cook them to perfection with our professional resources and expert guidance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products">
              <Button variant="secondary" size="lg">
                Browse All Products
              </Button>
            </Link>
            <Link href="/quality">
              <Button
                variant="secondary"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600"
              >
                Explore Our Quality Standards
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContentSection content={getResourcesLandingPageSEO()} />
    </main>
  );
}
