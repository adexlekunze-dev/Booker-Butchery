"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { SectorHero } from "@/components/sectors/SectorHero";
import { FAQAccordion } from "@/components/help/FAQAccordion";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { getSEOContentForService } from "@/data/service-seo-content";
import { getSession, getUser } from "@/lib/mock-auth";
import { getBranchByCode } from "@/lib/data/branches";
import {
  ShoppingCart,
  Store,
  Truck,
  Check,
  Star,
  MapPin,
  ArrowRight
} from "lucide-react";

export default function ClickCollectDeliveryPage() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [openFaqCategory, setOpenFaqCategory] = useState<string | null>(null);

  useEffect(() => {
    setSession(getSession());
    setUser(getUser());
  }, []);

  const clickCollectFAQs = [
    {
      question: "What is Click & Collect?",
      answer: "Click & Collect lets you shop our full range online and collect your order from your chosen Booker branch. It's perfect when you need products quickly or want to avoid delivery charges.",
      category: "general" as const,
    },
    {
      question: "Is there a minimum order amount?",
      answer: "No, there's no minimum order for Click & Collect. Order as little or as much as you need.",
      category: "general" as const,
    },
    {
      question: "Do I have to pay in advance?",
      answer: "No, you can pay when you collect. We accept cash, card, and account payment at the branch.",
      category: "general" as const,
    },
    {
      question: "How will I know when my order is ready?",
      answer: "You'll receive a text message and email when your order is ready for collection. Most orders are ready within 2-4 hours.",
      category: "general" as const,
    },
    {
      question: "Is there a charge for Click & Collect?",
      answer: "No, Click & Collect is completely free. No fees, no minimum order.",
      category: "general" as const,
    },
    {
      question: "When do I get invoiced?",
      answer: "If you're paying by account, you'll be invoiced as normal when you collect your order.",
      category: "general" as const,
    },
  ];

  const deliveryFAQs = [
    {
      question: "What is your delivery policy?",
      answer: "We offer regular scheduled deliveries from your local Booker branch. You can arrange a standing order for specific days/times that work for your business.",
      category: "delivery" as const,
    },
    {
      question: "Do you deliver, or do I collect from the branch?",
      answer: "Both! You can choose delivery service or Click & Collect based on what works best for each order.",
      category: "delivery" as const,
    },
    {
      question: "How long does delivery take?",
      answer: "For scheduled deliveries, your order is delivered on your agreed day/time. One-off deliveries are typically within 1-2 working days from your local branch.",
      category: "delivery" as const,
    },
    {
      question: "When do you deliver?",
      answer: "Delivery days: Monday to Saturday. Times: Various slots between 7am-5pm (Exact times depend on your local branch).",
      category: "delivery" as const,
    },
    {
      question: "How much does delivery cost?",
      answer: "Delivery charges vary by location and order size. Your local branch can provide exact pricing. Many customers with regular scheduled deliveries receive preferential rates.",
      category: "general" as const,
    },
    {
      question: "My order arrived damaged - what do I do?",
      answer: "Contact your local branch immediately on the delivery day. We'll arrange a replacement or refund right away. Call 0345 120 4545 or your branch directly.",
      category: "quality-returns" as const,
    },
  ];

  const comparison = [
    {
      method: "Click & Collect",
      icon: ShoppingCart,
      steps: [
        "Browse & buy online",
        "Get ready text",
        "Collect when ready",
      ],
      benefits: [
        "Ready in hours",
        "No minimum order",
        "Save time",
        "Convenient",
      ],
      cta: "Shop Now",
      href: "/search",
    },
    {
      method: "Buy In-Store",
      icon: Store,
      steps: [
        "Visit branch",
        "Shop aisles & discover new items",
        "Pay & collect",
      ],
      benefits: [
        "Immediate access",
        "See before you buy",
        "Discover new lines",
        "Expert advice",
      ],
      cta: "Find Branch",
      href: "/branches",
    },
    {
      method: "Book a Delivery",
      icon: Truck,
      steps: [
        "Agree day & time",
        "Order your items",
        "Get regular deliveries",
      ],
      benefits: [
        "Scheduled drops",
        "Reliable service",
        "6-7 days per week",
        "Large orders",
      ],
      cta: "Book Now",
      href: "/contact",
    },
  ];

  const testimonial = {
    quote: "My delivery terms are amazing with Booker, I get six deliveries a week. Now that Booker has upgraded its website to show whether they can guarantee stock - that has been a huge benefit to us.",
    name: "Lloyd Gardner",
    business: "Owner, Lloyd's Lounge, Exeter",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <SectorHero
        image="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&q=80"
        headline="Shop Your Way - Your Business, Your Choice"
        subheadline="Buy in-store, click & collect, or get it delivered. Flexible shopping options designed for busy businesses"
        valuePoints={[
          { text: "Click & Collect - Ready in Hours" },
          { text: "Buy In-Store - Find What You Need Now" },
          { text: "Delivery - Regular Drops to Your Door" },
        ]}
        primaryCTA={session?.user ? { text: "Start Shopping", href: "/butchery/shop" } : { text: "Become a Member - Free", href: "/register" }}
        secondaryCTA={session?.user ? { text: "Find Your Branch", href: "/branches" } : { text: "Learn More", href: "#services" }}
      />

      {/* Comparison Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Choose Your Shopping Method
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {comparison.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.method} className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{method.method}</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">HOW IT WORKS</h4>
                      <ol className="space-y-2">
                        {method.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <span className="text-primary font-semibold">{idx + 1}️⃣</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">BENEFITS</h4>
                      <ul className="space-y-2">
                        {method.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <Link href={method.href}>
                        <Button variant="primary" size="md" block>
                          {method.cta}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Click & Collect Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80"
                  alt="Click & Collect"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  📦 Click & Collect - Detailed Information
                </h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Shop Online, Collect In-Store
                </h3>
                <p className="text-gray-600 mb-6">
                  Browse and buy online, then collect at your local branch at a time that suits you
                </p>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    ❓ Frequently Asked Questions
                  </h4>
                  <FAQAccordion faqs={clickCollectFAQs.slice(0, 3)} />
                </div>
                <Link href="/help/faq?category=click-collect">
                  <Button variant="secondary" size="md">
                    View All Click & Collect FAQs →
                  </Button>
                </Link>
                <div className="mt-6">
                  <Link href="/search">
                    <Button variant="primary" size="md" block>
                      Start Your Click & Collect Order
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Service Details */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 order-2 md:order-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  🚚 Delivery Service - Detailed Information
                </h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Regular Deliveries to Your Door
                </h3>
                <p className="text-gray-600 mb-6">
                  Get reliable deliveries from your local Booker branch
                </p>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    ❓ Frequently Asked Questions
                  </h4>
                  <FAQAccordion faqs={deliveryFAQs.slice(0, 3)} />
                </div>
                <Link href="/help/faq?category=delivery">
                  <Button variant="secondary" size="md">
                    View All Delivery FAQs →
                  </Button>
                </Link>
                <div className="mt-6">
                  <Link href="/contact">
                    <Button variant="primary" size="md" block>
                      Book Your Delivery Service
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-auto order-1 md:order-2">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="Delivery Service"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Our Customers Say
          </h2>
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.business}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Finder */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Find Your Local Booker Branch
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Discover Click & Collect and delivery options near you
          </p>
          <div className="max-w-2xl mx-auto bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-gray-900">
                {session?.user && user?.primary_branch_code ? "YOUR NEAREST BRANCH:" : "FIND YOUR NEAREST BRANCH:"}
              </h3>
            </div>
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-semibold text-gray-900">
                  {session?.user && user?.primary_branch_code ? (
                    (() => {
                      const branch = getBranchByCode(user.primary_branch_code);
                      return branch ? `Booker ${branch.name}` : "Booker Manchester Central";
                    })()
                  ) : (
                    "Use our branch finder to locate your nearest branch"
                  )}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">Click & Collect available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">Delivery service available</span>
                </div>
                <p className="text-sm text-gray-600">
                  Hours: Mon-Sat 6am-8pm, Sun 8am-4pm
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/branches">
                  <Button variant="primary" size="sm">
                    Get Directions
                  </Button>
                </Link>
                <Link href="/branches">
                  <Button variant="secondary" size="sm">
                    View Branch Details
                  </Button>
                </Link>
                <Link href="/search">
                  <Button variant="secondary" size="sm">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <Link href="/branches">
                <Button variant="primary" size="lg">
                  Find All Branches →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1600&q=80"
            alt="Ready to Start Shopping Your Way?"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          {session?.user ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                Choose Your Preferred Shopping Method
              </h2>
              <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
                Shop online, collect in-store, or schedule delivery - whatever works best
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Link
                  href="/butchery/shop"
                  className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Start Shopping - Click &amp; Collect
                </Link>
                <Link
                  href="/branches"
                  className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Find Your Branch - Shop In-Store
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Book Regular Delivery Service
                </Link>
              </div>
              <p className="text-white/80 drop-shadow">
                Questions? View our help pages or call: <a href="tel:03451204545" className="underline">0345 120 4545</a>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                Ready to Start Shopping Your Way?
              </h2>
              <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
                Choose the method that works best for your business
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Link
                  href="/search"
                  className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Shop Online - Click & Collect
                </Link>
                <Link
                  href="/branches"
                  className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Find Your Branch - Shop In-Store
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Book Regular Delivery Service
                </Link>
              </div>
              <p className="text-white/80 drop-shadow">
                Questions? View our help pages or call: <a href="tel:03451204545" className="underline">0345 120 4545</a>
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link href="/help/faq?category=click-collect" className="text-white/90 hover:text-white underline text-sm drop-shadow">
                  Click & Collect Help
                </Link>
                <Link href="/help/faq?category=delivery" className="text-white/90 hover:text-white underline text-sm drop-shadow">
                  Delivery Help
                </Link>
                <Link href="/contact" className="text-white/90 hover:text-white underline text-sm drop-shadow">
                  Contact Support
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForService("click-collect-delivery") && (
        <SEOContentSection content={getSEOContentForService("click-collect-delivery")!} />
      )}
    </main>
  );
}

