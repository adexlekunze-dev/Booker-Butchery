"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { SectorHero } from "@/components/sectors/SectorHero";
import { TrustBar } from "@/components/sectors/TrustBar";
import { SavingsCalculator } from "@/components/services/SavingsCalculator";
import { FAQAccordion } from "@/components/help/FAQAccordion";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { getSEOContentForService } from "@/data/service-seo-content";
import { 
  ShoppingCart, 
  Zap, 
  Sun, 
  Package, 
  Trash2, 
  Recycle,
  Star,
  Check,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { getSession } from "@/lib/mock-auth";

export default function HospitalityServicesPage() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(getSession());
  }, []);

  const trustStats = [
    { label: "Hospitality Businesses", value: "15,000+", icon: undefined },
    { label: "Average Rating", value: "4.8/5", icon: undefined },
    { label: "Annual Savings", value: "£100s", icon: undefined },
    { label: "Energy Savings", value: "20%", icon: undefined },
  ];

  const services = [
    {
      id: "tesco-top-up",
      title: "Top Up at Tesco",
      icon: ShoppingCart,
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
      savings: "Save £100s Every Year",
      description: "Shop 1,000s of vegan, gluten-free, and specialty items in convenient smaller pack sizes when you need them",
      steps: [
        "Shop at 3,500+ Tesco branches nationwide",
        "Scan your Booker card at checkout",
        "Earn 3% cashback + Clubcard prices",
        "Get voucher to spend at Booker",
      ],
      benefits: [
        "3% cashback on eligible specialty items",
        "Clubcard prices on top of cashback",
        "Extended opening hours (selected stores)",
        "Last-minute essentials always available",
      ],
      averageSaving: "£300+",
      cta: { primary: "Activate Top Up Service", secondary: "Learn More" },
      links: { primary: "#", secondary: "#" },
    },
    {
      id: "energy-switching",
      title: "Energy Switching Service",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      savings: "Save 20% on Energy Bills",
      description: "Partner with Saffron Business Solutions - 1,000s of businesses have saved an average of 20% at renewal",
      steps: [
        "Free energy bill review",
        "Compare rates across all suppliers",
        "Switch managed on your behalf",
        "Start saving from day one",
      ],
      benefits: [
        "Free, no-obligation advice",
        "Compare best rates from all suppliers",
        "Disruption-free switching (we handle everything)",
        "Lifetime support included",
      ],
      averageSaving: "£2,400/year",
      contact: {
        phone: "03448 222 802",
        email: "info@sb-solutions.co.uk",
        website: "www.saffronbusinesssolutions.co.uk",
      },
      cta: { primary: "Get Free Energy Review", secondary: null },
      links: { primary: "tel:03448222802", secondary: null },
    },
    {
      id: "solar-ev",
      title: "Solar Panels & EV Chargers",
      icon: Sun,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
      savings: "Generate Income While Cutting Costs",
      description: "Expert installation from Hawley Energy - turn empty spaces into revenue streams",
      features: {
        solar: [
          "Generate your own power",
          "Save from day one",
          "Reduce carbon footprint",
          "20+ year lifespan",
        ],
        ev: [
          "Transform car parks into income",
          "Attract eco-conscious customers",
          "Future-proof your business",
          "Installation & maintenance included",
        ],
      },
      roi: "5-7 years typical payback",
      contact: {
        phone: "01484 929545",
        website: "www.hawleyenergy.co.uk",
      },
      cta: { primary: "Request Free Site Assessment", secondary: null },
      links: { primary: "tel:01484929545", secondary: null },
    },
    {
      id: "custom-packaging",
      title: "Custom Branded Packaging",
      icon: Package,
      image: "https://images.unsplash.com/photo-1594736797933-d0c6f4b6dc3b?w=800&q=80",
      savings: "You Name It, We Print It",
      description: "Professional packaging personalized with your branding",
      options: [
        "Carrier bags",
        "Coffee cups & lids",
        "Food boxes & containers",
        "Napkins & serviettes",
        "Pizza boxes",
        "Paper bags",
        "Branded merchandise",
      ],
      benefits: [
        "Professional brand presence",
        "Customer recognition & loyalty",
        "Competitive pricing",
        "Fast turnaround",
        "No setup fees on large orders",
      ],
      contact: {
        phone: "0161 7884817",
        note: "dedicated print line",
      },
      cta: { primary: "Request Quote", secondary: "View Samples" },
      links: { primary: "tel:01617884817", secondary: "#" },
    },
    {
      id: "waste-sustainability",
      title: "Waste & Sustainability Solutions",
      icon: Trash2,
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80",
      savings: "Save Money, Save the Planet",
      services: [
        {
          name: "Trade Waste Collection",
          description: "Save money with member-only pricing from Reconomy",
          benefits: [
            "Book, track & manage collections online",
            "Special Booker member rates",
            "Flexible collection schedules",
            "All waste types covered",
          ],
          code: "bookerwaste",
          link: "https://www.collectmywaste.com",
        },
        {
          name: "Too Good To Go",
          description: "Fight food waste, attract customers, earn extra revenue",
          benefits: [
            "Sell surplus food at discounted prices",
            "Reduce waste & disposal costs",
            "Attract new eco-conscious customers",
            "Improve your sustainability profile",
          ],
          link: "https://toogoodtogo.co.uk",
        },
        {
          name: "Used Cooking Oil Recycling",
          description: "Get paid to recycle - receive vouchers for fresh oil",
          benefits: [
            "£££ vouchers for every collection",
            "Free collection service",
            "Environmentally responsible disposal",
            "Full compliance documentation",
          ],
          link: "/services/oil-recycling",
        },
      ],
    },
  ];

  const calculatorItems = [
    {
      label: "Top Up at Tesco (3% cashback)",
      calculate: (inputs: Record<string, number>) => {
        const monthlySpend = inputs.monthlyBookerSpend || 0;
        return Math.round((monthlySpend * 0.03) * 12);
      },
    },
    {
      label: "Energy Switching (20% saving)",
      calculate: (inputs: Record<string, number>) => {
        const monthlyEnergy = inputs.monthlyEnergyBill || 0;
        return Math.round((monthlyEnergy * 0.20) * 12);
      },
    },
    {
      label: "Waste Collection (15% saving)",
      calculate: () => 480,
    },
    {
      label: "Oil Recycling Vouchers",
      calculate: () => 120,
    },
  ];

  const calculatorInputs = [
    {
      id: "businessType",
      label: "Your Business Type",
      type: "select" as const,
      options: [
        { label: "Restaurant", value: 1 },
        { label: "Pub", value: 2 },
        { label: "Hotel", value: 3 },
        { label: "Cafe", value: 4 },
        { label: "Takeaway", value: 5 },
      ],
    },
    {
      id: "monthlyBookerSpend",
      label: "Monthly Booker Spend: £",
      placeholder: "0",
    },
    {
      id: "monthlyEnergyBill",
      label: "Monthly Energy Bill: £",
      placeholder: "0",
    },
  ];

  const testimonial = {
    quote: "My delivery terms are amazing with Booker, I get six deliveries a week. The energy switching saved us £180 per month, and the Tesco Top Up service means I never run out of specialty items for our menu.",
    name: "Lloyd Gardner",
    business: "Owner, Lloyd's Lounge, Exeter",
    rating: 5,
    since: "2019",
    savings: "£2,160 energy + £420 cashback",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <SectorHero
        image="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80"
        headline="Everything Your Hospitality Business Needs to Thrive"
        subheadline="From energy savings to menu support, access exclusive services designed to cut costs and boost profits"
        valuePoints={[
          { text: "Save 20% on Energy Bills" },
          { text: "3% Cashback at Tesco + Clubcard Savings" },
          { text: "Custom Branded Packaging" },
          { text: "£1,000s in Annual Waste Savings" },
          { text: "Solar Panel & EV Charger Installation" },
          { text: "Fight Food Waste with Too Good To Go" },
        ]}
        primaryCTA={session?.user ? { text: "Activate Your Services", href: "/account" } : { text: "Become a Member - Free", href: "/register" }}
        secondaryCTA={session?.user ? { text: "Speak to an Expert", href: "/contact" } : { text: "Explore Services", href: "#services" }}
      />

      {/* Trust Bar */}
      <TrustBar stats={trustStats} />

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hospitality Services - All Included With Membership
            </h2>
          </div>

          <div className="space-y-16">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      </div>

                      <div className="mb-4">
                        <span className="text-lg font-semibold text-primary">{service.savings}</span>
                      </div>

                      <p className="text-gray-600 mb-6">{service.description}</p>

                      {service.steps && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">HOW IT WORKS:</h4>
                          <ol className="space-y-2">
                            {service.steps.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <span className="text-primary font-semibold">{idx + 1}️⃣</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {service.benefits && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">BENEFITS:</h4>
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.features && (
                        <div className="mb-6 space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">SOLAR PANELS:</h4>
                            <ul className="space-y-1">
                              {service.features.solar.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-700">
                                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">EV CHARGERS:</h4>
                            <ul className="space-y-1">
                              {service.features.ev.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-700">
                                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {service.options && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">AVAILABLE OPTIONS:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {service.options.map((option, idx) => (
                              <li key={idx}>{option}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.services && (
                        <div className="space-y-6">
                          {service.services.map((subService, idx) => (
                            <div key={idx} className="border-t border-gray-200 pt-6">
                              <h4 className="font-semibold text-gray-900 mb-2">
                                {subService.name}
                              </h4>
                              <p className="text-gray-600 mb-3">{subService.description}</p>
                              <ul className="space-y-1 mb-3">
                                {subService.benefits?.map((benefit, bidx) => (
                                  <li key={bidx} className="flex items-start gap-2 text-gray-700 text-sm">
                                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                              {subService.code && (
                                <p className="text-sm text-gray-600 mb-2">
                                  Quote &apos;{subService.code}&apos; for exclusive pricing
                                </p>
                              )}
                              {subService.link && (
                                <a
                                  href={subService.link}
                                  target={subService.link.startsWith("http") ? "_blank" : undefined}
                                  rel={subService.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-semibold"
                                >
                                  {subService.link.startsWith("http") ? "Visit" : "Full details"}
                                  {subService.link.startsWith("http") && <ExternalLink className="w-4 h-4" />}
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {service.averageSaving && (
                        <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                          <span className="text-lg font-semibold text-primary">
                            💰 Average annual saving: {service.averageSaving}
                          </span>
                        </div>
                      )}

                      {service.roi && (
                        <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                          <span className="text-lg font-semibold text-primary">
                            💰 {service.roi}
                          </span>
                        </div>
                      )}

                      {service.contact && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            Or call: <a href={`tel:${service.contact.phone?.replace(/\s/g, '')}`} className="text-primary hover:underline">{service.contact.phone}</a>
                            {service.contact.email && (
                              <> | Email: <a href={`mailto:${service.contact.email}`} className="text-primary hover:underline">{service.contact.email}</a></>
                            )}
                            {service.contact.website && (
                              <> | Visit: <a href={`https://${service.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{service.contact.website}</a></>
                            )}
                            {service.contact.note && (
                              <> ({service.contact.note})</>
                            )}
                          </p>
                        </div>
                      )}

                      {service.cta && (
                        <div className="flex flex-wrap gap-4">
                          {service.cta.primary && (
                            <a href={service.links?.primary || "#"}>
                              <Button variant="primary" size="md">
                                {service.cta.primary}
                              </Button>
                            </a>
                          )}
                          {service.cta.secondary && (
                            <a href={service.links?.secondary || "#"}>
                              <Button variant="secondary" size="md">
                                {service.cta.secondary}
                              </Button>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <SavingsCalculator
        title="Calculate Your Potential Savings"
        description="See how much you could save with Booker services"
        items={calculatorItems}
        inputs={calculatorInputs}
        ctaText="Become a Member to Start Saving"
        ctaHref="/register"
      />

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Real Hospitality Business Results
          </h2>
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
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
                  <p className="text-gray-500 text-xs mt-1">
                    Booker Member since {testimonial.since}
                  </p>
                  <p className="text-primary font-semibold text-sm mt-2">
                    Annual Savings: {testimonial.savings}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Quick Access to Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Top Up at Tesco", action: "Activate", href: "#" },
              { title: "Energy Switching", action: "Get Quote", href: "#" },
              { title: "Packaging Print", action: "Order Now", href: "#" },
              { title: "Solar & EV Install", action: "Book Visit", href: "#" },
              { title: "Trade Waste", action: "Arrange", href: "#" },
              { title: "Oil Recycling", action: "Register", href: "/services/oil-recycling" },
            ].map((link, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">{link.title}</h3>
                <a href={link.href}>
                  <Button variant="primary" size="sm">
                    {link.action}
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1600&q=80"
            alt="Ready to Start Saving?"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          {session?.user ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                Maximize Your Hospitality Business Savings
              </h2>
              <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
                Activate services designed to reduce costs and streamline your operations
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Link
                  href="/account"
                  className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Activate Your Services
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Speak to an Expert
                </Link>
              </div>
              <p className="text-white/80 mt-6 drop-shadow">
                Questions? Call: <a href="tel:03451204545" className="underline">0345 120 4545</a>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                Ready to Start Saving?
              </h2>
              <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
                Join 15,000+ hospitality businesses saving with Booker
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Become a Member - Free
                </Link>
                <Link
                  href="/butchery/shop"
                  className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                >
                  Browse Products
                </Link>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90 text-sm drop-shadow">
                <Check className="w-5 h-5" />
                <span>Free membership</span>
                <Check className="w-5 h-5" />
                <span>Instant access</span>
                <Check className="w-5 h-5" />
                <span>£1,000s in savings</span>
              </div>
              <p className="text-white/80 mt-6 drop-shadow">
                Questions? Call: <a href="tel:03451204545" className="underline">0345 120 4545</a>
              </p>
            </>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForService("hospitality") && (
        <SEOContentSection content={getSEOContentForService("hospitality")!} />
      )}
    </main>
  );
}

