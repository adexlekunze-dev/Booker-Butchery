"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { SectorHero } from "@/components/sectors/SectorHero";
import { FAQAccordion } from "@/components/help/FAQAccordion";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { getSEOContentForService } from "@/data/service-seo-content";
import { getSession } from "@/lib/mock-auth";
import {
  ShoppingBag,
  CreditCard,
  Check,
  ArrowRight,
  Store,
  Package,
  TrendingUp,
  Shield
} from "lucide-react";

export default function CentralBillingMarketplacePage() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(getSession());
  }, []);
  const faqs = [
    {
      question: "What is the Marketplace?",
      answer: "The Marketplace is an expanded product range that gives you access to thousands of additional products beyond what's available in your local Booker branch. Order through your Booker account and everything arrives together.",
      category: "general" as const,
    },
    {
      question: "What is Central Billing?",
      answer: "Central Billing allows you to consolidate invoices from multiple Booker branches into a single monthly statement. Perfect for businesses operating from multiple locations or ordering from different branches.",
      category: "general" as const,
    },
    {
      question: "Can I use Marketplace without Central Billing?",
      answer: "Yes, Marketplace orders can be invoiced through your regular branch account or paid at checkout. Central Billing is optional but highly recommended for multi-location businesses.",
      category: "general" as const,
    },
    {
      question: "How long does Marketplace delivery take?",
      answer: "Marketplace items are typically delivered within 3-7 working days, depending on the supplier. Items are shipped directly to your chosen delivery address.",
      category: "delivery" as const,
    },
    {
      question: "Is there a minimum order for Marketplace?",
      answer: "Minimum order requirements vary by supplier. Most Marketplace suppliers have reasonable minimums, and you can combine items from multiple suppliers in one order.",
      category: "general" as const,
    },
    {
      question: "How do I access Marketplace products?",
      answer: "Marketplace products are available online through your Booker account. Look for the 'Marketplace' badge on product listings. You can also browse the full Marketplace catalog when logged in.",
      category: "general" as const,
    },
  ];

  const marketplaceBenefits = [
    {
      icon: ShoppingBag,
      title: "Extended Range",
      description: "Access 10,000+ additional products from trusted suppliers",
    },
    {
      icon: Package,
      title: "Unified Ordering",
      description: "Order everything in one place, one account, one invoice",
    },
    {
      icon: TrendingUp,
      title: "Competitive Pricing",
      description: "Best prices across thousands of suppliers",
    },
    {
      icon: Shield,
      title: "Trusted Suppliers",
      description: "All Marketplace suppliers are vetted and approved",
    },
  ];

  const billingBenefits = [
    "Single monthly statement for all branches",
    "Simplified accounting & reconciliation",
    "Better cash flow management",
    "Reduced admin time",
    "Clear visibility of spend across locations",
    "Flexible payment terms",
  ];

  const combinedBenefits = [
    "One account for branch stock + Marketplace",
    "Single monthly invoice",
    "Unified ordering experience",
    "Complete spend visibility",
    "Simplified supplier management",
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <SectorHero
        image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
        headline="Access More Products, Simplify Your Billing"
        subheadline="Marketplace gives you access to 10,000+ additional products. Central Billing consolidates everything into one simple monthly invoice"
        valuePoints={[
          { text: "10,000+ Additional Products via Marketplace" },
          { text: "Single Monthly Invoice via Central Billing" },
          { text: "One Account, One Ordering Experience" },
          { text: "Trusted, Vetted Suppliers Only" },
          { text: "Perfect for Multi-Location Businesses" },
        ]}
        primaryCTA={session?.user ? { text: "Set Up Central Billing", href: "/contact" } : { text: "Become a Member - Free", href: "/register" }}
        secondaryCTA={session?.user ? { text: "Browse Marketplace", href: "/search?marketplace=true" } : { text: "Learn More", href: "#services" }}
      />

      {/* Two-Column Explanation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Marketplace Column */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Marketplace</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Access thousands of additional products beyond your local branch stock
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Browse 10,000+ additional products",
                  "Order through your Booker account",
                  "Items delivered to your address",
                  "All suppliers vetted & approved",
                  "Competitive pricing across suppliers",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="#marketplace-details">
                <Button variant="primary" size="md" block>
                  Learn More About Marketplace →
                </Button>
              </Link>
            </div>

            {/* Central Billing Column */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Central Billing</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Consolidate invoices from multiple branches into one monthly statement
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Single monthly invoice",
                  "All branches on one account",
                  "Simplified accounting",
                  "Better cash flow visibility",
                  "Reduced admin time",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="#billing-details">
                <Button variant="primary" size="md" block>
                  Learn More About Central Billing →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Deep Dive */}
      <section id="marketplace-details" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Marketplace - Access Thousands More Products
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            The Marketplace expands your product range dramatically, giving you access to items not available in branch, all through your existing Booker account
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Marketplace"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What You Can Access Through Marketplace
              </h3>
              <ul className="space-y-3">
                {[
                  "Specialty ingredients & hard-to-find items",
                  "Equipment & smallwares",
                  "Packaging & disposables",
                  "Cleaning & hygiene supplies",
                  "Beverages & specialty drinks",
                  "Frozen & chilled products",
                  "Dry goods & store cupboard essentials",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {marketplaceBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="bg-white rounded-lg p-6 border border-gray-200 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How Marketplace Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1️⃣",
                  title: "Browse & Shop",
                  description: "Search and browse Marketplace products just like branch stock. Look for the 'Marketplace' badge to identify extended range items.",
                },
                {
                  step: "2️⃣",
                  title: "Add to Basket",
                  description: "Mix branch products and Marketplace items in the same order. Everything goes into one basket for easy checkout.",
                },
                {
                  step: "3️⃣",
                  title: "One Invoice, One Delivery",
                  description: "Marketplace items are delivered alongside your branch order where possible, or separately if needed. All on one invoice.",
                },
              ].map((step, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-6">
                  <div className="text-4xl mb-4">{step.step}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Central Billing Deep Dive */}
      <section id="billing-details" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Central Billing - Simplify Multi-Location Accounting
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Perfect for businesses with multiple locations, Central Billing consolidates all your Booker invoices into one monthly statement
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Central Billing"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Who Is Central Billing For?
              </h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Restaurant groups with multiple locations",
                  "Hotel chains ordering from different branches",
                  "Multi-site retailers",
                  "Catering companies serving various venues",
                  "Any business ordering from 2+ Booker branches",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">KEY BENEFITS:</h3>
              <div className="bg-primary/10 rounded-lg p-6">
                <ul className="space-y-2">
                  {billingBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">How Central Billing Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1️⃣",
                  title: "Set Up Account",
                  description: "Speak with your account manager to enable Central Billing across your branches",
                },
                {
                  step: "2️⃣",
                  title: "Order from Any Branch",
                  description: "Continue ordering from any Booker branch as normal, or use Marketplace",
                },
                {
                  step: "3️⃣",
                  title: "Consolidated Invoicing",
                  description: "All orders from all branches are combined into one monthly statement",
                },
                {
                  step: "4️⃣",
                  title: "Single Payment",
                  description: "Pay one invoice per month, simplifying your accounts payable process",
                },
              ].map((step, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6">
                  <div className="text-4xl mb-4">{step.step}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Combined Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Use Marketplace + Central Billing Together
          </h2>
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <p className="text-lg text-gray-700 mb-6 text-center">
              Combine both services for the ultimate streamlined experience
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {combinedBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Set Up Central Billing & Marketplace Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="bg-gray-50 rounded-xl p-8">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1600&q=80"
            alt="Ready to Expand Your Product Range?"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          {session?.user ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                Expand Your Product Range &amp; Simplify Billing
              </h2>
              <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
                Set up central billing and access thousands of marketplace products
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Set Up Central Billing
                </Link>
                <Link
                  href="/search?marketplace=true"
                  className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Browse Marketplace
                </Link>
              </div>
              <p className="text-white/80 drop-shadow">
                Questions? Call: <a href="tel:03451204545" className="underline">0345 120 4545</a> or speak to your account manager
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                Ready to Expand Your Product Range and Simplify Billing?
              </h2>
              <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
                Get access to thousands more products and streamline your accounting with Marketplace and Central Billing
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Link
                  href="/search?marketplace=true"
                  className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Browse Marketplace Products
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Set Up Central Billing
                </Link>
              </div>
              <p className="text-white/80 drop-shadow">
                Questions? Call: <a href="tel:03451204545" className="underline">0345 120 4545</a> or speak to your account manager
              </p>
            </>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForService("central-billing-marketplace") && (
        <SEOContentSection content={getSEOContentForService("central-billing-marketplace")!} />
      )}
    </main>
  );
}

