"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Award, Truck, Users, Shield, MapPin, UtensilsCrossed, CreditCard } from "lucide-react";
import { getBrandBySlug } from "@/data/brands";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { CategoryTrustBadgeRow } from "@/components/category/CategoryTrustBadgeRow";
import { BrandPopularProductsPreview } from "@/components/category/BrandPopularProductsPreview";
import { ICPSection } from "@/components/category/ICPSection";
import { BuyingGuidesSection } from "@/components/category/BuyingGuidesSection";
import { RecipeInspirationSection } from "@/components/category/RecipeInspirationSection";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { getSession } from "@/lib/mock-auth";
import { getProducts } from "@/lib/data/products";
import { getUser } from "@/lib/mock-auth";

export function BrandDetailClient({ slug }: { slug: string }) {
  const brand = getBrandBySlug(slug);
  const [session, setSession] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);

    const handleStorageChange = () => {
      setSession(getSession());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (brand) {
      // Get product counts for each category this brand appears in
      const user = getUser();
      const branchCode = user?.primary_branch_code;
      const counts: Record<string, number> = {};

      brand.categories.forEach((category) => {
        const result = getProducts({
          brands: [brand.name],
          category,
          branchCode,
        });
        counts[category] = result.products.length;
      });

      setCategoryCounts(counts);
    }
  }, [brand]);

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Brand not found</p>
      </div>
    );
  }

  // Top 4 services for Service Features section
  const topServices = [
    {
      id: "hospitality",
      title: "Hospitality Services",
      description: "Comprehensive services tailored for restaurants, hotels, pubs, bars, and catering businesses.",
      href: "/services/hospitality",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
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
    {
      id: "billing",
      title: "Central Billing and Marketplace",
      description: "Streamlined billing and marketplace solutions for your business operations.",
      href: "/services/central-billing-marketplace",
      image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&q=80",
    },
  ];

  // Category route mapping
  const categoryRouteMap: Record<string, string> = {
    "Meat, Fish & Poultry": "/meat-fish-poultry",
    "Beer, Cider and Alcoholic RTDs": "/beer",
    "Greengrocery": "/greengrocery",
  };

  // Category image mapping
  const categoryImageMap: Record<string, string> = {
    "Meat, Fish & Poultry": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80",
    "Beer, Cider and Alcoholic RTDs": "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=800&q=80",
    "Greengrocery": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80",
  };

  // Category icon mapping
  const categoryIconMap: Record<string, string> = {
    "Meat, Fish & Poultry": "🥩",
    "Beer, Cider and Alcoholic RTDs": "🍺",
    "Greengrocery": "🥬",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Hero Section (dual CTAs) */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={brand.hero.imageUrl || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80"}
            alt={brand.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              {brand.hero.headline}
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
              {brand.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              {!session?.user && (
                <Link href="/register">
                  <Button variant="primary" size="lg">
                    Become a Member
                  </Button>
                </Link>
              )}
              <Link href={`/brands/${slug}/shop`}>
                <Button variant="primary" size="lg">
                  Shop {brand.name}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Badge Row */}
      {brand.trustBadges && brand.trustBadges.length > 0 ? (
        <section className="py-8 bg-gray-50 border-b border-gray-200">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex md:flex-wrap md:justify-center gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible scrollbar-hide -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
              {brand.trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-4 py-3 hover:shadow-md transition-shadow flex-shrink-0 md:flex-1 min-w-[200px] md:min-w-0"
                  >
                    <div className="flex-shrink-0">
                      {Icon && <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 mb-0.5">
                        {badge.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {badge.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <CategoryTrustBadgeRow category={brand.categories[0] || "Products"} />
      )}

      {/* 3. Popular Products Preview */}
      <BrandPopularProductsPreview brandName={brand.name} brandSlug={slug} />

      {/* 4. ICP Persona Solutions (PROMINENT) */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <ICPSection />
      </div>

      {/* 5. Shop by Category - Show categories this brand appears in */}
      {brand.categories.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 mb-8">Browse {brand.name} products across our categories.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brand.categories.map((category) => {
                const route = categoryRouteMap[category] || "/search";
                const image = categoryImageMap[category] || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80";
                const icon = categoryIconMap[category] || "📦";
                const count = categoryCounts[category] || 0;

                return (
                  <Link
                    key={category}
                    href={`${route}/shop?brand=${encodeURIComponent(brand.name)}`}
                    className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 bg-white"
                  >
                    <div className="aspect-video bg-gray-100 relative">
                      <Image
                        src={image}
                        alt={category}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="text-2xl mb-1">{icon}</div>
                        <div className="text-white font-semibold text-sm" style={{ color: '#FFFFFF' }}>{category}</div>
                        <div className="text-white/90 text-xs" style={{ color: '#FFFFFF' }}>{count} {brand.name} products</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. Why Choose Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose {brand.name}?</h2>
          <p className="text-lg text-gray-600 mb-12">{brand.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="w-16 h-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assured</h3>
              <p className="text-gray-600">{brand.name} products meet rigorous quality standards, ensuring consistent quality you can trust.</p>
            </div>
            <div className="text-center">
              <Truck className="w-16 h-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reliable Supply</h3>
              <p className="text-gray-600">{brand.name} products are consistently available through Booker's nationwide network.</p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trusted by Businesses</h3>
              <p className="text-gray-600">{brand.name} is trusted by thousands of UK businesses across all sectors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <TestimonialsCarousel />

      {/* 8. Mid-page CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ready to Shop {brand.name}?</h2>
          <p className="text-xl mb-8 text-gray-600">Browse our full {brand.name} range and place your order today</p>
          <Link href={`/brands/${slug}/shop`}>
            <Button variant="primary" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </section>

      {/* 9. Recipe Inspiration */}
      {brand.categories.length > 0 && (
        <RecipeInspirationSection category={brand.categories[0]} />
      )}

      {/* 10. Service Features (Top 4 from services) */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Business Services & Support</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl">Comprehensive business solutions designed to support your operations and help your business thrive.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topServices.map((service) => {
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

      {/* 11. Educational Content/Buying Guides */}
      {brand.categories.length > 0 && (
        <BuyingGuidesSection category={brand.categories[0]} />
      )}

      {/* 12. FAQ Section */}
      {brand.faqs && brand.faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 mb-8">Quick answers to common questions about {brand.name} products.</p>
            <div className="space-y-4">
              {brand.faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <span className="text-primary text-2xl">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-white">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 13. Final CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" style={{ color: '#FFFFFF' }}>
            {brand.cta.headline}
          </h2>
          {brand.cta.description && (
            <p className="text-xl mb-8 text-white opacity-90" style={{ color: '#FFFFFF' }}>
              {brand.cta.description}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={brand.cta.primaryButton.href}>
              <Button variant="secondary" size="lg">
                {brand.cta.primaryButton.text}
              </Button>
            </Link>
            {brand.cta.secondaryButton && (
              <Link href={brand.cta.secondaryButton.href}>
                <Button variant="secondary" size="lg">
                  {brand.cta.secondaryButton.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 14. SEO Content Section */}
      {brand.seoContent && (
        <SEOContentSection content={brand.seoContent} />
      )}
    </div>
  );
}


