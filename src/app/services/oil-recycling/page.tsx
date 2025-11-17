"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { SectorHero } from "@/components/sectors/SectorHero";
import { SavingsCalculator } from "@/components/services/SavingsCalculator";
import { FAQAccordion } from "@/components/help/FAQAccordion";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { getSEOContentForService } from "@/data/service-seo-content";
import { getSession } from "@/lib/mock-auth";
import {
  Recycle,
  Truck,
  PoundSterling,
  Check,
  Leaf,
  Clock,
  Award,
  ArrowRight
} from "lucide-react";

export default function OilRecyclingPage() {
  const [session, setSession] = useState<any>(null);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    setSession(getSession());
  }, []);

  const valueProps = [
    {
      icon: PoundSterling,
      title: "Get Paid to Recycle",
      description: "Receive vouchers for every collection",
    },
    {
      icon: Leaf,
      title: "Environmentally Responsible",
      description: "100% recycled into biodiesel",
    },
    {
      icon: Clock,
      title: "Regular Collections",
      description: "Scheduled pickups that fit your schedule",
    },
    {
      icon: Award,
      title: "Full Compliance",
      description: "Complete documentation provided",
    },
  ];

  const processSteps = [
    {
      step: "1️⃣",
      title: "Use Your Cooking Oil",
      description: "Cook as normal - we collect used oil",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80",
    },
    {
      step: "2️⃣",
      title: "Store in Collection Containers",
      description: "We provide sealed containers for safe storage",
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&q=80",
    },
    {
      step: "3️⃣",
      title: "We Collect on Schedule",
      description: "Regular collections, usually monthly or quarterly",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    },
  ];

  const faqs = [
    {
      question: "How much do I get paid per litre?",
      answer: "Payment rates vary based on current market prices and collection volume. Typically, businesses receive between £0.20-£0.40 per litre, paid as vouchers redeemable against fresh cooking oil purchases at any Booker branch.",
      category: "general" as const,
    },
    {
      question: "How often do you collect?",
      answer: "Collection frequency depends on your usage. High-volume sites may have monthly collections, while smaller businesses typically have quarterly collections. We work with you to establish the best schedule.",
      category: "general" as const,
    },
    {
      question: "Do I need special containers?",
      answer: "Yes, we provide sealed, food-grade collection containers free of charge. These are designed for safe storage and easy collection.",
      category: "general" as const,
    },
    {
      question: "What happens to the used oil?",
      answer: "100% of collected oil is recycled into biodiesel, a sustainable fuel alternative. This process reduces waste and contributes to lower carbon emissions.",
      category: "general" as const,
    },
    {
      question: "Is there a minimum volume?",
      answer: "Minimum collection volumes vary by location. Generally, we collect from businesses using 20+ litres per month. Contact us to discuss your specific situation.",
      category: "general" as const,
    },
    {
      question: "Do I need to filter the oil?",
      answer: "No, we accept used cooking oil in any condition. Food particles and debris are fine - our recycling process handles everything.",
      category: "general" as const,
    },
    {
      question: "How do I get paid?",
      answer: "You receive vouchers via email or post that can be redeemed against fresh cooking oil purchases at any Booker branch. Vouchers are typically issued within 7-14 days of collection.",
      category: "general" as const,
    },
    {
      question: "What documentation do I receive?",
      answer: "You'll receive a collection certificate for each pickup showing volume collected, date, and proof of responsible disposal. This helps with environmental compliance and audits.",
      category: "general" as const,
    },
    {
      question: "Can I use this service if I'm not a Booker customer?",
      answer: "The service is primarily available to Booker members. If you're not currently a member, you can sign up for free membership to access the recycling service.",
      category: "general" as const,
    },
    {
      question: "Is there a contract?",
      answer: "No long-term contract required. You can start and stop the service as needed, though regular collections help maximize your voucher value.",
      category: "general" as const,
    },
  ];

  const calculatorItems = [
    {
      label: "Annual Voucher Value",
      calculate: (inputs: Record<string, number>) => {
        const litresPerWeek = inputs.litresPerWeek || 0;
        const pricePerLitre = inputs.pricePerLitre || 0.30;
        return Math.round((litresPerWeek * pricePerLitre) * 52);
      },
    },
    {
      label: "Fresh Oil Savings",
      calculate: (inputs: Record<string, number>) => {
        // Estimate savings from voucher redemptions on fresh oil
        const annualVouchers = inputs.litresPerWeek || 0;
        return Math.round((annualVouchers * 0.05) * 52);
      },
    },
  ];

  const calculatorInputs = [
    {
      id: "businessType",
      label: "Your Business Type",
      type: "select" as const,
      options: [
        { label: "Restaurant", value: 1 },
        { label: "Fish & Chip Shop", value: 2 },
        { label: "Takeaway", value: 3 },
        { label: "Hotel", value: 4 },
        { label: "Pub/Bar", value: 5 },
      ],
    },
    {
      id: "litresPerWeek",
      label: "Litres of Cooking Oil Used Per Week",
      placeholder: "0",
    },
    {
      id: "pricePerLitre",
      label: "Expected Payment Per Litre (£)",
      placeholder: "0.30",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <SectorHero
        image="https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1200&q=80"
        headline="Get Paid to Recycle Your Used Cooking Oil"
        subheadline="Turn waste into vouchers - receive £££s for every collection, redeemable against fresh cooking oil at Booker"
        valuePoints={[
          { text: "£££ Vouchers for Every Collection" },
          { text: "100% Recycled into Biodiesel" },
          { text: "Free Collection Service" },
          { text: "Full Compliance Documentation" },
          { text: "Regular Scheduled Pickups" },
        ]}
        primaryCTA={session?.user ? { text: "Book Oil Collection", href: "/contact" } : { text: "Register Now", href: "/contact" }}
        secondaryCTA={session?.user ? { text: "Calculate Savings", href: "#calculator" } : { text: "Learn More", href: "#calculator" }}
      />

      {/* Value Proposition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Recycle Your Cooking Oil with Booker?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {valueProps.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div key={idx} className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{prop.title}</h3>
                  <p className="text-sm text-gray-600">{prop.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            How the Oil Recycling Process Works
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Simple 3-step process - from collection to voucher
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden border border-gray-200">
                <div className="relative h-48">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-4xl mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Registration & Collection Process
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "1. Register Your Business",
                details: [
                  "Contact Booker to set up your recycling account",
                  "We'll assess your usage and determine collection frequency",
                  "Free collection containers provided",
                  "No setup fees or contracts required",
                ],
              },
              {
                title: "2. Store Used Oil Safely",
                details: [
                  "Pour used oil into provided sealed containers",
                  "Containers are food-grade and leak-proof",
                  "Store containers in a safe, accessible location",
                  "No filtering or preparation needed",
                ],
              },
              {
                title: "3. Regular Collections",
                details: [
                  "We collect on your agreed schedule",
                  "Collections typically monthly or quarterly",
                  "Flexible scheduling to fit your operations",
                  "Full documentation provided with each collection",
                ],
              },
              {
                title: "4. Receive Your Vouchers",
                details: [
                  "Vouchers issued within 7-14 days of collection",
                  "Redeemable against fresh cooking oil at any Booker branch",
                  "No expiry date on vouchers",
                  "Track your collections and voucher balance online",
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.details.map((detail, didx) => (
                    <li key={didx} className="flex items-start gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-16 bg-gray-50">
        <SavingsCalculator
          title="Calculate Your Potential Earnings from Oil Recycling"
          description="See how much you could earn from recycling your used cooking oil"
          items={calculatorItems}
          inputs={calculatorInputs}
          ctaText="Register for Oil Recycling Service"
          ctaHref="/contact"
        />
      </section>

      {/* Environmental Impact */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Environmental Impact
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                When you recycle with Booker, you're contributing to a sustainable future
              </p>
              <ul className="space-y-4">
                {[
                  "100% of collected oil is recycled into biodiesel",
                  "Reduces waste sent to landfill",
                  "Lowers carbon footprint",
                  "Supports renewable energy production",
                  "Meets environmental compliance requirements",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Leaf className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80"
                alt="Environmental Impact"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* Contact & Support */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Get Started Today
          </h2>
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to Start Earning from Your Used Cooking Oil?
              </h3>
              <p className="text-gray-600 mb-6">
                Contact us to register and get your free collection containers
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">📞 Phone</h4>
                <a href="tel:03451204545" className="text-primary hover:underline">
                  0345 120 4545
                </a>
                <p className="text-sm text-gray-600 mt-1">Mon-Fri 8am-6pm</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">📧 Email</h4>
                <a href="mailto:oilrecycling@booker.co.uk" className="text-primary hover:underline">
                  oilrecycling@booker.co.uk
                </a>
                <p className="text-sm text-gray-600 mt-1">We'll respond within 24 hours</p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Register for Oil Recycling
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1600&q=80"
            alt="Turn Your Waste into Savings"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          {session?.user ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                Start Your Oil Recycling Service
              </h2>
              <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
                Book your free collection and turn waste into savings
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Book Oil Collection
                </Link>
                <Link
                  href="#calculator"
                  className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Calculate Savings
                </Link>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm drop-shadow">
                <Check className="w-5 h-5" />
                <span>Free collection containers</span>
                <Check className="w-5 h-5" />
                <span>No setup fees</span>
                <Check className="w-5 h-5" />
                <span>Flexible scheduling</span>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                Turn Your Waste into Savings
              </h2>
              <p className="text-xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
                Join thousands of businesses earning from used cooking oil while protecting the environment
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Register Now - Free Setup
                </Link>
                <Link
                  href="tel:03451204545"
                  className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Call 0345 120 4545
                </Link>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm drop-shadow">
                <Check className="w-5 h-5" />
                <span>Free collection containers</span>
                <Check className="w-5 h-5" />
                <span>No setup fees</span>
                <Check className="w-5 h-5" />
                <span>Flexible scheduling</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForService("oil-recycling") && (
        <SEOContentSection content={getSEOContentForService("oil-recycling")!} />
      )}
    </main>
  );
}

