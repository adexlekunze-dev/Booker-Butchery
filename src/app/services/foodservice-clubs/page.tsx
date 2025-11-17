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
  Users,
  Beer,
  Star as StarIcon,
  ChefHat,
  Check,
  Star,
  ArrowRight,
  DollarSign,
  Calendar,
  Award,
  TrendingUp
} from "lucide-react";

export default function FoodserviceClubsPage() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(getSession());
  }, []);
  const clubs = [
    {
      id: "on-trade",
      name: "On Trade Club",
      icon: Beer,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80",
      perfectFor: ["Pubs & bars", "Restaurants", "Hotels"],
      includes: [
        "Drinks deals",
        "Bar snacks",
        "Pub essentials",
        "Regular promos",
      ],
      cta: "Join Now",
    },
    {
      id: "vip-trade",
      name: "VIP Trade Club",
      icon: StarIcon,
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
      perfectFor: [
        "High-volume restaurants",
        "Restaurant groups",
        "Large hotels",
      ],
      includes: [
        "Everything in On Trade",
        "Even better pricing",
        "Priority support",
        "Dedicated account mgr",
      ],
      cta: "Join Now",
    },
    {
      id: "catering",
      name: "Catering Club",
      icon: ChefHat,
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
      perfectFor: [
        "Event caterers",
        "Corporate catering",
        "Wedding venues",
      ],
      includes: [
        "Bulk buy pricing",
        "Event supplies",
        "Flexible ordering",
        "Seasonal offers",
      ],
      cta: "Join Now",
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Low Fixed Prices",
      description: "Save £££s annually on volume",
    },
    {
      icon: Calendar,
      title: "Predictable Costs",
      description: "Plan ahead with stable pricing",
    },
    {
      icon: Award,
      title: "Top Brands",
      description: "Premium quality at club prices",
    },
    {
      icon: TrendingUp,
      title: "Better Planning",
      description: "Manage cashflow easier",
    },
  ];

  const savingsTable = [
    { product: "Mozzarella 2.5kg", standard: "£12.99", club: "£10.49", saving: "£2.50" },
    { product: "Mayo 5L", standard: "£8.99", club: "£7.49", saving: "£1.50" },
    { product: "Veg Oil 20L", standard: "£28.99", club: "£24.99", saving: "£4.00" },
    { product: "Chicken 10kg", standard: "£42.50", club: "£38.99", saving: "£3.51" },
    { product: "Burger Buns 48pk", standard: "£4.99", club: "£4.29", saving: "£0.70" },
  ];

  const testimonials = [
    {
      quote: "We're signed up to Booker's On Trade Club and the benefits are incredible. The deals are great and run across a really strong range of top-quality brands.",
      name: "Simon Parton",
      business: "Rodeo's Main Steakhouse",
      rating: 5,
      club: "On Trade Club Member",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
    {
      quote: "Booker has been an amazing partner. First of all pricewise - we are a member of the VIP Trade Club, so we get even keener prices than the aisle prices.",
      name: "Steven McColm",
      business: "Box Glasgow, Glasgow",
      rating: 5,
      club: "VIP Trade Club Member",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    },
  ];

  const faqs = [
    {
      question: "Who can join?",
      answer: "Foodservice clubs are available to qualifying businesses. Eligibility depends on business type, size, and purchase volume. Contact us to check your eligibility.",
      category: "general" as const,
    },
    {
      question: "Is there a membership fee?",
      answer: "No, there's no additional fee to join a foodservice club. Just better prices on products you already buy.",
      category: "general" as const,
    },
    {
      question: "How long are club prices valid?",
      answer: "Club prices are typically locked in for 3-12 months, depending on the agreement. You'll be notified of any changes in advance.",
      category: "general" as const,
    },
    {
      question: "Can I join multiple clubs?",
      answer: "Most businesses qualify for one club based on their profile. Our team will recommend the best club for you.",
      category: "general" as const,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <SectorHero
        image="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80"
        headline="Join the Club and Save Big on Foodservice Essentials"
        subheadline="Exclusive member-only prices on your biggest sellers - from mozzarella to mayonnaise"
        valuePoints={[
          { text: "Fixed Low Prices on Top-Selling Items" },
          { text: "Exclusive Deals on Premium Brands" },
          { text: "Budget Better with Predictable Costs" },
          { text: "Priority Access to New Products" },
          { text: "No Additional Fees - Just Better Prices" },
        ]}
        primaryCTA={session?.user ? { text: "Join Your Local Club", href: "/contact" } : { text: "Register Your Interest", href: "/contact" }}
        secondaryCTA={session?.user ? { text: "View Benefits", href: "#benefits" } : { text: "Learn More", href: "#benefits" }}
      />

      {/* Benefits Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Join a Foodservice Club?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How Foodservice Clubs Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: "1️⃣",
                title: "Choose Your Club",
                description: "Pick the club that matches your business type. Check terms and conditions for eligibility.",
                details: [
                  "• On Trade Club (pubs, bars, restaurants)",
                  "• VIP Trade Club (high-volume foodservice)",
                  "• Catering Club (events, catering businesses)",
                ],
              },
              {
                step: "2️⃣",
                title: "Browse Exclusive Offers",
                description: "Access members-only prices on top sellers",
                details: [
                  "• Dairy products",
                  "• Cooking oils & sauces",
                  "• Frozen foods",
                  "• Beverages",
                  "• Cleaning supplies",
                ],
              },
              {
                step: "3️⃣",
                title: "Start Saving",
                description: "Budget better with locked-in low prices",
                details: [
                  "• No price fluctuations",
                  "• Plan costs in advance",
                  "• Better cash flow management",
                  "• Guaranteed savings",
                ],
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="text-4xl mb-4">{step.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  {step.details.map((detail, didx) => (
                    <li key={didx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Register Your Interest
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Available Clubs */}
      <section id="clubs" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Choose Your Foodservice Club
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {clubs.map((club) => {
              const Icon = club.icon;
              return (
                <div key={club.id} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  <div className="relative h-48">
                    <Image
                      src={club.image}
                      alt={club.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{club.name}</h3>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">PERFECT FOR:</h4>
                      <ul className="space-y-1">
                        {club.perfectFor.map((item, idx) => (
                          <li key={idx} className="text-gray-700">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">INCLUDES:</h4>
                      <ul className="space-y-2">
                        {club.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href="/contact">
                      <Button variant="primary" size="md" block>
                        {club.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-gray-600 mt-8">
            💡 All clubs include access to exclusive pricing across our biggest sellers - mozzarella to mayonnaise
          </p>
        </div>
      </section>

      {/* Sample Savings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Example Club Member Savings
          </h2>
          <p className="text-center text-gray-600 mb-8">
            See how much you could save with club membership
          </p>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">PRODUCT</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">STANDARD PRICE</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">CLUB PRICE</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">SAVING</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {savingsTable.map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 text-sm text-gray-900">{row.product}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-right">{row.standard}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary text-right">{row.club}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600 text-right">{row.saving}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-6 py-4 text-sm text-gray-900">TOTAL (1 order):</td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">£98.46</td>
                    <td className="px-6 py-4 text-sm text-primary text-right">£86.25</td>
                    <td className="px-6 py-4 text-sm text-green-600 text-right">£12.21</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-primary/10 border-t border-gray-200">
              <div className="space-y-2">
                <p className="text-gray-700">
                  💰 If you order these items weekly: <span className="font-semibold text-primary">Annual saving: £635</span>
                </p>
                <p className="text-gray-700">
                  💰 If you order these items twice weekly: <span className="font-semibold text-primary">Annual saving: £1,270</span>
                </p>
              </div>
              <div className="mt-6">
                <Link href="/contact">
                  <Button variant="primary" size="md">
                    Calculate Your Savings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Club Member Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-8 border border-gray-200">
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
                      <p className="text-primary font-semibold text-sm mt-2">
                        ⭐⭐⭐⭐⭐ {testimonial.club}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & Eligibility */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Terms & Conditions
          </h2>
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1600&q=80"
            alt="Ready to Start Saving with Foodservice Clubs?"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          {session?.user ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                Unlock Exclusive Foodservice Club Benefits
              </h2>
              <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
                Join your local club and start saving with member-only deals
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Join Your Local Club
                </Link>
                <Link
                  href="#benefits"
                  className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  View Club Benefits
                </Link>
              </div>
              <p className="text-white/80 drop-shadow">
                Or call our team: <a href="tel:03451204545" className="underline">0345 120 4545</a>
              </p>
              <div className="flex items-center justify-center gap-4 mt-6 text-sm drop-shadow">
                <Check className="w-5 h-5" />
                <span>Free to join</span>
                <Check className="w-5 h-5" />
                <span>No obligation</span>
                <Check className="w-5 h-5" />
                <span>Instant savings</span>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                Ready to Start Saving with Foodservice Clubs?
              </h2>
              <p className="text-xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
                Register your interest today and we'll help you choose the right club for your business
              </p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Register Your Interest
              </Link>
              <p className="mt-6 drop-shadow" style={{ color: '#FFFFFF' }}>
                Or call our team: <a href="tel:03451204545" className="underline">0345 120 4545</a>
              </p>
              <div className="flex items-center justify-center gap-4 mt-6 text-sm drop-shadow">
                <Check className="w-5 h-5" />
                <span>Free to join</span>
                <Check className="w-5 h-5" />
                <span>No obligation</span>
                <Check className="w-5 h-5" />
                <span>Instant savings</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForService("foodservice-clubs") && (
        <SEOContentSection content={getSEOContentForService("foodservice-clubs")!} />
      )}
    </main>
  );
}

