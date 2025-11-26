import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Truck, Users, ThermometerSnowflake, ChevronRight } from 'lucide-react';
import { SEOContentSection } from '@/components/sectors/SEOContentSection';
import { getSEOContentForCategory } from '@/data/category-seo-content';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Wholesale Pork Suppliers | British Pork Belly, Loin, Shoulder, Chops | Red Tractor Certified | Booker Demo',
  description: 'Premium wholesale pork supplier UK. Fresh British pork including pork belly, pork loin, pork shoulder, pork chops for restaurants, pubs, catering. Red Tractor certified. Next-day delivery. Expert support from Booker Demo wholesale.',
  keywords: 'wholesale pork supplier, British pork, pork belly, pork loin, pork shoulder, pork chops, pulled pork, pork ribs, wholesale pork UK, restaurant pork supplier, Red Tractor pork, butcher pork, pork supplier UK, wholesale meat',
};

const porkCuts = [
  {
    name: 'Pork Belly',
    description: 'Perfect for crackling, roasting & Asian cuisine',
    image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=800&q=80',
    href: '/butchery/shop?category=PORK&subcategory=Belly',
  },
  {
    name: 'Pork Loin & Tenderloin',
    description: 'Lean, tender cuts for quick cooking',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80',
    href: '/butchery/shop?category=PORK&subcategory=Loin',
  },
  {
    name: 'Pork Shoulder',
    description: 'Ideal for pulled pork & slow cooking',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80',
    href: '/butchery/shop?category=PORK&subcategory=Shoulder',
  },
  {
    name: 'Pork Chops & Ribs',
    description: 'Great for grilling and BBQ',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80',
    href: '/butchery/shop?category=PORK&subcategory=Ribs',
  },
];

const whyChooseFeatures = [
  {
    icon: Award,
    title: 'Red Tractor Certified',
    description: 'All pork sourced from British farms meeting the highest animal welfare and quality standards.',
  },
  {
    icon: ThermometerSnowflake,
    title: 'Versatile Cuts',
    description: 'From premium pork belly to economical shoulder - cuts for every menu and cooking method.',
  },
  {
    icon: Truck,
    title: 'Next-Day Delivery',
    description: 'Temperature-controlled delivery ensures pork arrives in perfect condition. Order by 3pm.',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Local branch teams provide guidance on cuts, preparation methods, and custom specifications.',
  },
];

const cutGuides = [
  {
    title: 'Pork Cuts Guide',
    description: 'Complete guide to pork cuts from shoulder to loin',
    href: '/cut-guides/pork',
    icon: '🐷',
  },
  {
    title: 'Cooking Methods',
    description: 'Perfect crackling, pulled pork and roasting techniques',
    href: '/cut-guides/pork',
    icon: '🔥',
  },
];

export default function PorkCategoryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=1600&q=80"
            alt="Premium British Pork"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              Premium British Pork
            </h1>
            <p className="text-xl md:text-2xl mb-6 drop-shadow-md leading-relaxed" style={{ color: '#FFFFFF' }}>
              From succulent pork belly to tender loin. Red Tractor certified British pork for restaurants, pubs, and catering.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/butchery/shop?category=PORK"
                className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Browse All Pork Products
               
              </Link>
              <Link
                href="/cut-guides/pork"
                className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
              >
                View Pork Cut Guide
               
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pork Cuts Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Pork Type</h2>
          <p className="text-lg text-gray-600 mb-8">Explore our comprehensive range of British pork cuts for every culinary application</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {porkCuts.map((cut) => (
              <Link
                key={cut.name}
                href={cut.href}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-square relative">
                  <Image
                    src={cut.image}
                    alt={cut.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1" style={{ color: '#FFFFFF' }}>{cut.name}</h3>
                    <p className="text-sm opacity-90" style={{ color: '#FFFFFF' }}>{cut.description}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <ChevronRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Why Choose Booker Demo for Wholesale Pork?</h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Trusted quality, expert support, and reliable delivery for UK restaurants and foodservice businesses
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 text-pink-700 rounded-lg mb-4">
                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cut Guides Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pork Cut Guides & Resources</h2>
          <p className="text-lg text-gray-600 mb-8">Professional guides to help you select the perfect cuts for your menu</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cutGuides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-lg border-2 border-gray-200 hover:border-pink-700 p-6 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{guide.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-700 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{guide.description}</p>
                    <span className="text-pink-700 font-semibold group-hover:underline inline-flex items-center gap-1">
                      View Guide
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=1600&q=80"
            alt="Order Premium British Pork"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Ready to Order Premium British Pork?
          </h2>
          <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
            Browse our complete range of pork products and order for next-day delivery from your local branch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/butchery/shop?category=PORK"
              className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Browse Pork Products
             
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
            >
              Contact Our Team
             
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForCategory("Pork") && (
        <SEOContentSection content={getSEOContentForCategory("Pork")!} />
      )}
    </main>
  );
}
