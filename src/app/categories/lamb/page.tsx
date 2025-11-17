import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Truck, Users, ThermometerSnowflake, ChevronRight } from 'lucide-react';
import { SEOContentSection } from '@/components/sectors/SEOContentSection';
import { getSEOContentForCategory } from '@/data/category-seo-content';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Wholesale Lamb Suppliers | Premium British Lamb Rack, Leg, Shoulder, Chops | Fine Dining Lamb | Booker',
  description: 'Premium wholesale lamb supplier UK. British lamb including lamb rack, lamb leg, lamb shoulder, lamb chops for fine dining, hotels, special events. Spring lamb, hogget. Next-day delivery. Expert support from Booker wholesale.',
  keywords: 'wholesale lamb supplier, British lamb, lamb rack, lamb leg, lamb shoulder, lamb chops, spring lamb, hogget, fine dining lamb, wholesale lamb UK, restaurant lamb supplier, lamb cutlets, lamb shanks, butcher lamb',
};

const lambCuts = [
  {
    name: 'Lamb Rack',
    description: 'Premium cut for fine dining & French trimming',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80',
    href: '/butchery/shop?subcategory=Fresh%20Lamb&quality_tier=Premium',
  },
  {
    name: 'Lamb Leg',
    description: 'Perfect for roasting & carving stations',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80',
    href: '/butchery/shop?subcategory=Fresh%20Lamb',
  },
  {
    name: 'Lamb Shoulder',
    description: 'Ideal for slow cooking & Middle Eastern cuisine',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80',
    href: '/butchery/shop?subcategory=Fresh%20Lamb',
  },
  {
    name: 'Lamb Chops & Cutlets',
    description: 'Quick-cook cuts for grilling & pan-frying',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80',
    href: '/butchery/shop?subcategory=Fresh%20Lamb',
  },
];

const whyChooseFeatures = [
  {
    icon: Award,
    title: 'British Sourced',
    description: 'All lamb sourced from British farms with full traceability and quality assurance standards.',
  },
  {
    icon: ThermometerSnowflake,
    title: 'Seasonal Availability',
    description: 'Spring lamb for delicate flavor, hogget for richer taste - seasonal options for premium menus.',
  },
  {
    icon: Truck,
    title: 'Next-Day Delivery',
    description: 'Temperature-controlled delivery ensures lamb arrives in perfect condition. Order by 3pm.',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Local branch teams provide guidance on cuts, preparation, French trimming, and custom specifications.',
  },
];

const cutGuides = [
  {
    title: 'Lamb Cuts Guide',
    description: 'Complete guide to lamb cuts from rack to shoulder',
    href: '/cut-guides/lamb',
    icon: '🐑',
  },
  {
    title: 'Cooking Methods',
    description: 'French trimming, roasting and braising techniques',
    href: '/cut-guides/lamb',
    icon: '🔥',
  },
];

export default function LambCategoryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1600&q=80"
            alt="Premium British Lamb"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              Premium British Lamb
            </h1>
            <p className="text-xl md:text-2xl mb-6 drop-shadow-md leading-relaxed" style={{ color: '#FFFFFF' }}>
              From elegant lamb rack to succulent shoulder. British lamb for fine dining, hotels, and special occasions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/butchery/shop?category=LAMB"
                className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Browse All Lamb Products
               
              </Link>
              <Link
                href="/cut-guides/lamb"
                className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
              >
                View Lamb Cut Guide
               
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lamb Cuts Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Lamb Type</h2>
          <p className="text-lg text-gray-600 mb-8">Explore our comprehensive range of British lamb cuts for every culinary application</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lambCuts.map((cut) => (
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Why Choose Booker for Wholesale Lamb?</h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Trusted quality, expert support, and reliable delivery for UK restaurants and foodservice businesses
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-700 rounded-lg mb-4">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Lamb Cut Guides & Resources</h2>
          <p className="text-lg text-gray-600 mb-8">Professional guides to help you select the perfect cuts for your menu</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cutGuides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-lg border-2 border-gray-200 hover:border-amber-700 p-6 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{guide.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{guide.description}</p>
                    <span className="text-amber-700 font-semibold group-hover:underline inline-flex items-center gap-1">
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
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1600&q=80"
            alt="Order Premium British Lamb"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Ready to Order Premium British Lamb?
          </h2>
          <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
            Browse our complete range of lamb products and order for next-day delivery from your local branch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/butchery/shop?category=LAMB"
              className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Browse Lamb Products
             
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
      {getSEOContentForCategory("Lamb") && (
        <SEOContentSection content={getSEOContentForCategory("Lamb")!} />
      )}
    </main>
  );
}
