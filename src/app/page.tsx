"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Award, Truck, Users, Shield, Calendar, Thermometer, MapPin, Clock, Phone, Package, UtensilsCrossed, CreditCard } from "lucide-react";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { CategoryTrustBadgeRow } from "@/components/category/CategoryTrustBadgeRow";
import { PopularProductsPreview } from "@/components/category/PopularProductsPreview";
import { ICPSection } from "@/components/category/ICPSection";
import { BuyingGuidesSection } from "@/components/category/BuyingGuidesSection";
import { RecipeInspirationSection } from "@/components/category/RecipeInspirationSection";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { getSEOContentForCategory } from "@/data/category-seo-content";
import { useState, useEffect } from "react";
import { getSession } from "@/lib/mock-auth";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

  // Initialize session immediately if on client side
  const [session, setSession] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      return getSession();
    }
    return null;
  });

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);

    // Redirect authenticated users to dashboard
    if (currentSession?.user) {
      router.push('/dashboard');
      return;
    }

    const handleStorageChange = () => {
      const newSession = getSession();
      setSession(newSession);

      // Redirect to dashboard if user just logged in
      if (newSession?.user) {
        router.push('/dashboard');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, [router]);

  // Main butchery categories (6 hero categories displayed on homepage)
  const categories = [
    { name: "BEEF", count: 125, image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80" },
    { name: "PORK", count: 61, image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=800&q=80" },
    { name: "LAMB", count: 46, image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80" },
    { name: "CHICKEN", count: 49, image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&q=80" },
    { name: "SAUSAGES", count: 53, image: "https://images.unsplash.com/photo-1612161019796-3f6f1f7e6e1f?w=800&q=80" },
    { name: "BURGERS", count: 21, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" },
  ];

  const faqs = [
    {
      question: "What quality standards do your meat products meet?",
      answer: "All our meat, fish, and poultry products meet rigorous quality standards. Our beef and lamb are Red Tractor certified, our chicken is British-farmed, and our fish is sourced from MSC-certified sustainable fisheries. Every product undergoes strict quality checks before delivery."
    },
    {
      question: "How is the meat delivered and stored?",
      answer: "All fresh meat, fish, and poultry is delivered in temperature-controlled vehicles to ensure it stays at the optimal temperature throughout transit. Products arrive in insulated packaging and should be refrigerated immediately upon receipt. We recommend storing at 0-5°C for meat and poultry, and 0-2°C for fish."
    },
    {
      question: "Can I order specific cuts or custom portions?",
      answer: "Yes! For bulk orders or specific requirements, please speak with your local branch team. We can arrange custom cuts, portion sizes, and packaging to suit your business needs. Custom orders typically require 48 hours notice."
    },
    {
      question: "What's your returns policy for fresh meat products?",
      answer: "If you're not satisfied with the quality of any fresh meat, fish, or poultry product, contact us within 24 hours of delivery. We'll arrange a collection and provide a full refund or replacement. Your satisfaction is guaranteed."
    },
    {
      question: "Do you offer halal or kosher certified products?",
      answer: "Yes, we stock a range of halal-certified meat products. Please check product listings for certification details or speak with your branch for our full halal range. Kosher products are available through special order - contact your branch for details."
    }
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Hero Section (dual CTAs) */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1600&q=80"
            alt="Premium Wholesale Butchery"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              Premium Wholesale Butchery
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Chef-quality products. Red Tractor certified. Halal range available. Next-day delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              {!session?.user && (
                <Link href="/register">
                  <Button variant="primary" size="lg">
                    Become a Member
                  </Button>
                </Link>
              )}
              <Link href="/butchery/shop">
                <Button variant="primary" size="lg">
                  Shop All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Navigation */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 mb-8">Browse our complete butchery range - from traditional cuts to specialty items</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 bg-white"
              >
                <div className="aspect-[4/3] bg-gray-100 relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white font-bold text-xl mb-1" style={{ color: '#FFFFFF' }}>{category.name}</div>
                    <div className="text-white/90 text-sm" style={{ color: '#FFFFFF' }}>{category.count} products</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/butchery/shop">
              <Button variant="primary" size="lg">
                Browse All Products →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Popular Products Preview */}
      <PopularProductsPreview category="Meat, Fish & Poultry" limit={8} />

      {/* 4. ICP Persona Tiles (PROMINENT) */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <ICPSection />
      </div>

      {/* 6. Why Choose Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Booker?</h2>
          <p className="text-lg text-gray-600 mb-12">The trusted partner for quality, delivery, and expert support.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="w-16 h-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assured</h3>
              <p className="text-gray-600">British-sourced, quality-certified products from trusted suppliers. Every item meets rigorous standards.</p>
            </div>
            <div className="text-center">
              <Truck className="w-16 h-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Next-Day Delivery</h3>
              <p className="text-gray-600">Order by 3pm for next-day delivery. Temperature-controlled delivery ensures freshness.</p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-600">Local branch teams with expert knowledge. Custom cuts and personalized service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <TestimonialsCarousel />

      {/* 8. Mid-page CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {session?.user ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Browse Our Full Range</h2>
              <p className="text-xl mb-8 text-gray-600">Explore our complete butchery range at competitive wholesale prices</p>
              <Link href="/butchery/shop">
                <Button variant="primary" size="lg">
                  Browse All Products
                </Button>
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ready to Become a Member?</h2>
              <p className="text-xl mb-8 text-gray-600">Join thousands of chefs and businesses ordering premium butchery products</p>
              <Link href="/register">
                <Button variant="primary" size="lg">
                  Become a Member
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* 9. Recipe Inspiration */}
      <RecipeInspirationSection category="Meat, Fish & Poultry" />

      {/* 10. Professional Butchery Cut Guides */}
      <BuyingGuidesSection category="Meat, Fish & Poultry" />

      {/* 11. Business Services & Support */}
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

      {/* 12. FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 mb-8">Quick answers to common questions about our products and services.</p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
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

      {/* 14. Final CTA */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1600&q=80"
            alt="Start Your Wholesale Journey"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          {session?.user ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>Start Shopping Now</h2>
              <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>Browse our complete butchery range and add items to your basket</p>
              <Link
                href="/butchery/shop"
                className="inline-block px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Browse All Products
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>Ready to Become a Member?</h2>
              <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>Join Booker today and access wholesale prices on premium butchery products</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Become a Member
                </Link>
                <Link
                  href="/butchery/shop"
                  className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Browse Products
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 15. SEO Content Section */}
      {getSEOContentForCategory("Meat, Fish & Poultry") && (
        <SEOContentSection content={getSEOContentForCategory("Meat, Fish & Poultry")!} />
      )}
    </div>
  );
}
