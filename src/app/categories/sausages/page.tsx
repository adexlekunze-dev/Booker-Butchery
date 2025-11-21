import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Truck, Users, ThermometerSnowflake, ChevronRight } from 'lucide-react';
import { SEOContentSection } from '@/components/sectors/SEOContentSection';
import { getSEOContentForCategory } from '@/data/category-seo-content';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Wholesale Sausage Suppliers | British Pork Sausages, Gourmet, Continental | Cumberland, Chorizo | Booker',
  description: 'Premium wholesale sausage supplier UK. British pork sausages, gourmet sausages, continental varieties (chorizo, Italian, merguez), vegetarian sausages for restaurants, pubs, breakfast menus. Next-day delivery from Booker wholesale.',
  keywords: 'wholesale sausages, British pork sausages, gourmet sausages, Cumberland sausages, Lincolnshire sausages, chorizo, Italian sausages, breakfast sausages, vegetarian sausages, restaurant sausage supplier, wholesale sausages UK, bangers, chipolatas',
};

const sausageTypes = [
  {
    name: 'Traditional British Sausages',
    description: 'Perfect for full English breakfast & pub menus',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80',
    href: '/butchery/shop?category=SAUSAGES&subcategory=General',
  },
  {
    name: 'Gourmet & Specialty Sausages',
    description: 'Premium varieties for gastropubs',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80',
    href: '/butchery/shop?category=SAUSAGES&subcategory=General&quality_tier=Premium',
  },
  {
    name: 'Continental Sausages',
    description: 'Chorizo, Italian, merguez for diverse menus',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80',
    href: '/butchery/shop?category=SAUSAGES&subcategory=General',
  },
  {
    name: 'Vegetarian & Alternative',
    description: 'Plant-based and poultry sausages',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80',
    href: '/butchery/shop?category=SAUSAGES&subcategory=General',
  },
];

const whyChooseFeatures = [
  {
    icon: Award,
    title: 'British Quality',
    description: 'Traditional and gourmet sausages made with British pork from Red Tractor certified farms.',
  },
  {
    icon: ThermometerSnowflake,
    title: 'Diverse Range',
    description: 'From traditional bangers to continental varieties - sausages for every menu style and cuisine.',
  },
  {
    icon: Truck,
    title: 'Next-Day Delivery',
    description: 'Temperature-controlled delivery ensures sausages arrive in perfect condition. Order by 3pm.',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Local branch teams provide guidance on varieties, meat content, and menu applications.',
  },
];

const cutGuides = [
  {
    title: 'Sausage Guide',
    description: 'Complete guide to sausage varieties and types',
    href: '/cut-guides/sausages',
    icon: '🌭',
  },
  {
    title: 'Cooking Methods',
    description: 'Grilling, pan-frying and oven techniques',
    href: '/cut-guides/sausages',
    icon: '🔥',
  },
];

export default function SausagesCategoryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1600&q=80"
            alt="Premium British Sausages"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              Premium British Sausages
            </h1>
            <p className="text-xl md:text-2xl mb-6 drop-shadow-md leading-relaxed" style={{ color: '#FFFFFF' }}>
              From traditional breakfast sausages to gourmet varieties. British sausages for restaurants, pubs, and breakfast menus.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/butchery/shop?category=SAUSAGES"
                className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Browse All Sausage Products
               
              </Link>
              <Link
                href="/cut-guides/sausages"
                className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
              >
                View Sausage Guide
               
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sausage Types Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Sausage Type</h2>
          <p className="text-lg text-gray-600 mb-8">Explore our comprehensive range of sausages for every culinary application</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sausageTypes.map((type) => (
              <Link
                key={type.name}
                href={type.href}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-square relative">
                  <Image
                    src={type.image}
                    alt={type.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1" style={{ color: '#FFFFFF' }}>{type.name}</h3>
                    <p className="text-sm opacity-90" style={{ color: '#FFFFFF' }}>{type.description}</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Why Choose Booker for Wholesale Sausages?</h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Trusted quality, expert support, and reliable delivery for UK restaurants and foodservice businesses
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-700 rounded-lg mb-4">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sausage Guides & Resources</h2>
          <p className="text-lg text-gray-600 mb-8">Professional guides to help you select the perfect varieties for your menu</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cutGuides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-lg border-2 border-gray-200 hover:border-orange-700 p-6 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{guide.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{guide.description}</p>
                    <span className="text-orange-700 font-semibold group-hover:underline inline-flex items-center gap-1">
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
            src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1600&q=80"
            alt="Order Premium British Sausages"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Ready to Order Premium British Sausages?
          </h2>
          <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
            Browse our complete range of sausage products and order for next-day delivery from your local branch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/butchery/shop?category=SAUSAGES"
              className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Browse Sausage Products
             
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
      {getSEOContentForCategory("Sausages") && (
        <SEOContentSection content={getSEOContentForCategory("Sausages")!} />
      )}
    </main>
  );
}
