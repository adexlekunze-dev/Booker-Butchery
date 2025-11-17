"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { SectorHero } from "@/components/sectors/SectorHero";
import { TrustBar } from "@/components/sectors/TrustBar";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { getSEOContentForService } from "@/data/service-seo-content";
import { 
  Zap, 
  Wrench, 
  BarChart3, 
  Trash2, 
  Truck,
  Store,
  Check,
  Star,
  ExternalLink
} from "lucide-react";
import { getSession } from "@/lib/mock-auth";

export default function RetailServicesPage() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(getSession());
  }, []);

  const services = [
    {
      id: "energy",
      title: "Cut Energy Costs - Save £1,000s",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1517816428104-797678247c24?w=800&q=80",
      description: "Free energy advice and disruption-free switching from trusted partners",
      steps: [
        "Free energy bill review (no obligation)",
        "Compare all available tariffs",
        "Switch managed on your behalf",
        "Start saving immediately",
      ],
      benefits: [
        "Average 20% savings at renewal",
        "No disruption to your supply",
        "Expert ongoing support",
        "Best rates from all suppliers",
      ],
      saving: "£1,800/year",
      contact: { phone: "03448 222 802" },
    },
    {
      id: "fixtures",
      title: "Fixtures & Equipment Savings",
      icon: Wrench,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      description: "Exclusive member discounts on equipment and fixtures",
      options: [
        "In-store media & digital screens",
        "Marketing materials & POS",
        "Security systems & CCTV",
        "ATM machines (earn extra revenue)",
        "Drinks & vending machines",
        "Refrigeration equipment",
        "Shelving & displays",
      ],
      benefits: [
        "Member-only pricing",
        "Professional installation",
        "Maintenance packages available",
        "Flexible payment terms",
      ],
      contact: { phone: "0808 178 6844" },
    },
    {
      id: "merchandising",
      title: "Sales & Merchandising Support",
      icon: BarChart3,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      description: "Expert help to propel your profits",
      offer: "Get personalized support from our retail development team to optimize your store",
      features: [
        "Store layout optimization",
        "Range planning & category management",
        "Merchandising best practices",
        "Promotional planning",
        "Margin improvement strategies",
        "Competitor analysis",
        "Sales data insights",
      ],
      whoFor: [
        "Independent convenience stores",
        "Symbol group partners",
        "Multi-site retailers",
      ],
      note: "Free initial consultation included",
      contact: { 
        phone: "0808 178 6844",
        email: "CustomerServices@bookerretail.co.uk",
      },
    },
    {
      id: "waste",
      title: "Trade Waste Collection",
      icon: Trash2,
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80",
      description: "Save money with member-only pricing",
      features: [
        "Special Booker member rates",
        "Online booking & tracking",
        "Flexible collection schedules",
        "All waste types covered",
        "Recycling options included",
        "Reliable service",
      ],
      code: "bookerwaste",
      saving: "15-20% vs standard rates",
      link: "https://www.collectmywaste.com",
    },
    {
      id: "scoot",
      title: "Scoot Home Delivery Service",
      icon: Truck,
      image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80",
      description: "Bring your store to customers' doors",
      availableFor: ["Premier", "Londis", "Budgens", "Family Shopper stores"],
      whatIs: "A complete home delivery solution that lets your customers shop online and receive deliveries from your store",
      benefits: [
        "Increase sales & customer loyalty",
        "Compete with major retailers",
        "Grow your customer base",
        "Easy-to-use platform",
        "Full support & training",
      ],
      contact: { email: "CustomerServices@bookerretail.co.uk" },
    },
  ];

  const symbolGroups = [
    { name: "Premier", stores: "3,900+ stores", href: "#" },
    { name: "Londis", stores: "2,000+ stores", href: "#" },
    { name: "Budgens", stores: "Trusted brand", href: "#" },
    { name: "Family Shopper", stores: "Value focused", href: "#" },
  ];

  const testimonial = {
    quote: "The merchandising support helped me increase sales by 18% in just 3 months. The energy switching saved £150 per month, and the waste collection service cut our costs by 20%. Booker's retail services are invaluable.",
    name: "Independent Retailer",
    rating: 5,
    since: "2020",
    results: "18% sales increase + £1,800 annual savings",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <SectorHero
        image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80"
        headline="Specialist Services to Help Your Retail Business Grow"
        subheadline="Get more from your Booker membership with services designed to increase profits and reduce costs"
        valuePoints={[
          { text: "Save £1,000s on Energy Bills" },
          { text: "Exclusive Fixtures & Equipment Discounts" },
          { text: "Expert Sales & Merchandising Support" },
          { text: "Trade Waste Savings" },
          { text: "Home Delivery Service (Scoot)" },
          { text: "Symbol Group Options" },
        ]}
        primaryCTA={session?.user ? { text: "Activate Your Services", href: "/account" } : { text: "Become a Member - Free", href: "/register" }}
        secondaryCTA={session?.user ? { text: "Speak to an Expert", href: "/contact" } : { text: "Explore Services", href: "#services" }}
      />

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Retail Services - Designed for Your Success
          </h2>

          <div className="space-y-16">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
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

                      {service.options && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">EXCLUSIVE MEMBER DISCOUNTS ON:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {service.options.map((option, idx) => (
                              <li key={idx}>{option}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.features && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">FEATURES:</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.offer && (
                        <p className="text-gray-700 mb-6">{service.offer}</p>
                      )}

                      {service.whatIs && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2">WHAT IS SCOOT?</h4>
                          <p className="text-gray-700">{service.whatIs}</p>
                        </div>
                      )}

                      {service.availableFor && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2">ELIGIBILITY:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {service.availableFor.map((item, idx) => (
                              <li key={idx}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.whoFor && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2">WHO IT'S FOR:</h4>
                          <ul className="space-y-1">
                            {service.whoFor.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.saving && (
                        <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                          <span className="text-lg font-semibold text-primary">
                            💰 Typical convenience store saves: {service.saving}
                          </span>
                        </div>
                      )}

                      {service.note && (
                        <p className="text-primary font-semibold mb-6">💡 {service.note}</p>
                      )}

                      {service.code && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            Quote &apos;{service.code}&apos; when booking
                          </p>
                        </div>
                      )}

                      {service.saving && service.id === "waste" && (
                        <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                          <span className="text-lg font-semibold text-primary">
                            💰 {service.saving}
                          </span>
                        </div>
                      )}

                      {service.link && (
                        <div className="mb-6">
                          <a
                            href={service.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1 font-semibold"
                          >
                            Visit: {service.link.replace("https://", "")}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          {service.code && (
                            <p className="text-sm text-gray-600 mt-2">
                              (Use code: {service.code})
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4">
                        {service.id === "energy" && (
                          <a href={`tel:${service.contact?.phone?.replace(/\s/g, '')}`}>
                            <Button variant="primary" size="md">
                              Get Free Energy Review
                            </Button>
                          </a>
                        )}
                        {service.id === "fixtures" && (
                          <a href={`tel:${service.contact?.phone?.replace(/\s/g, '')}`}>
                            <Button variant="primary" size="md">
                              Explore Equipment Offers
                            </Button>
                          </a>
                        )}
                        {service.id === "merchandising" && (
                          <a href={`tel:${service.contact?.phone?.replace(/\s/g, '')}`}>
                            <Button variant="primary" size="md">
                              Request Support Visit
                            </Button>
                          </a>
                        )}
                        {service.id === "waste" && (
                          <a href={service.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="primary" size="md">
                              Arrange Collection Now
                            </Button>
                          </a>
                        )}
                        {service.id === "scoot" && (
                          <a href={`mailto:${service.contact?.email}`}>
                            <Button variant="primary" size="md">
                              Learn More About Scoot
                            </Button>
                          </a>
                        )}
                        {service.contact?.phone && service.id !== "energy" && service.id !== "fixtures" && service.id !== "merchandising" && (
                          <p className="text-sm text-gray-600">
                            Call: <a href={`tel:${service.contact.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">{service.contact.phone}</a>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Symbol Group Promotion */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Grow Faster with a Symbol Group
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Join Premier, Londis, Budgens or Family Shopper
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {symbolGroups.map((group) => (
              <div key={group.name} className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <Store className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">{group.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{group.stores}</p>
                <a href={group.href}>
                  <Button variant="primary" size="sm">
                    Learn More
                  </Button>
                </a>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">BENEFITS:</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                "National brand recognition",
                "Marketing support & advertising",
                "Store design & refit assistance",
                "Access to exclusive services like Scoot",
                "Increased footfall & sales",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a href="#">
                <Button variant="primary" size="md">
                  Explore Symbol Groups
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Retail Success Story
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
                  <p className="text-gray-500 text-xs mt-1">
                    ⭐⭐⭐⭐⭐ Member since {testimonial.since}
                  </p>
                  <p className="text-primary font-semibold text-sm mt-2">
                    Results: {testimonial.results}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Quick Links to Retail Services
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Energy Switching",
              "Equipment Discounts",
              "Expert Support",
              "Trade Waste",
              "Scoot Delivery",
              "Symbol Groups",
            ].map((service, idx) => (
              <a key={idx} href="#services">
                <Button variant="secondary" size="md">
                  {service}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1600&q=80"
            alt="Get More with Your Booker Membership"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          {session?.user ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                Grow Your Retail Business with Booker Services
              </h2>
              <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
                Access tools and services designed to help your retail business thrive
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
              <p className="text-white/80 drop-shadow">
                Questions? Call: <a href="tel:08081786844" className="underline">0808 178 6844</a>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                Get More with Your Booker Membership
              </h2>
              <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
                Access all these services designed to help your retail business grow and thrive
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
              <p className="text-white/80 drop-shadow">
                Questions? Call: <a href="tel:08081786844" className="underline">0808 178 6844</a>
              </p>
            </>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForService("retail") && (
        <SEOContentSection content={getSEOContentForService("retail")!} />
      )}
    </main>
  );
}

