import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getICPBySlug, icpPersonas } from "@/data/icp-personas";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, Star } from "lucide-react";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return icpPersonas.map((icp) => ({
    slug: icp.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const icp = getICPBySlug(slug);

  if (!icp) {
    return {
      title: "ICP Not Found",
    };
  }

  return {
    title: `${icp.name} | ${icp.hero.headline} | Premium Butchery`,
    description: icp.hero.subheadline,
    keywords: `${icp.name}, wholesale butchery, premium meat supplier, ${icp.productCategories.join(", ").toLowerCase()}`,
  };
}

export default async function ICPPage({ params }: Props) {
  const { slug } = await params;
  const icp = getICPBySlug(slug);

  if (!icp) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={icp.hero.imageUrl}
            alt={icp.hero.headline}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              {icp.hero.headline}
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md leading-relaxed" style={{ color: '#FFFFFF' }}>
              {icp.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={icp.cta.primaryButton.href}>
                <Button variant="primary" size="lg">
                  {icp.cta.primaryButton.text}
                </Button>
              </Link>
              {icp.cta.secondaryButton && (
                <Link href={icp.cta.secondaryButton.href}>
                  <Button variant="secondary" size="lg">
                    {icp.cta.secondaryButton.text}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Challenges We Solve for {icp.name}s
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              We understand your unique operational challenges and provide tailored solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {icp.solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <div key={solution.id} className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 border border-orange-100 hover:shadow-lg transition-shadow">
                  {Icon && (
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-lg mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why {icp.name}s Choose Booker
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by professionals across the UK for quality, service, and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {icp.benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-orange-500 transition-all">
                  {Icon && (
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {icp.trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.id} className="flex items-start gap-4">
                  {Icon && (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-gray-900 mb-1">{badge.title}</div>
                    <div className="text-sm text-gray-600">{badge.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-orange-100">
            <div className="flex gap-1 mb-6">
              {[...Array(icp.testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-gray-900 mb-8 leading-relaxed font-medium">
              "{icp.testimonial.quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {icp.testimonial.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-gray-900 text-lg">{icp.testimonial.name}</div>
                <div className="text-gray-600">{icp.testimonial.role}</div>
                <div className="text-gray-500 text-sm">{icp.testimonial.business}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse Products for {icp.name}s
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Explore our range tailored to your specific needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {icp.productCategories.map((category) => (
              <Link
                key={category}
                href={`/butchery/shop?category=${category}`}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border-2 border-gray-200 hover:border-orange-500 transition-all text-center hover:shadow-lg"
              >
                <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {category}
                </div>
                <div className="flex items-center justify-center gap-2 text-primary text-sm font-semibold">
                  <span>Browse</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions from {icp.name}s like you
            </p>
          </div>

          <div className="space-y-6">
            {icp.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1600&q=80"
            alt={icp.cta.headline}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            {icp.cta.headline}
          </h2>
          <p className="text-xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
            {icp.cta.description}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={icp.cta.primaryButton.href}>
              <Button variant="secondary" size="lg">
                {icp.cta.primaryButton.text}
              </Button>
            </Link>
            {icp.cta.secondaryButton && (
              <Link href={icp.cta.secondaryButton.href}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600"
                >
                  {icp.cta.secondaryButton.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <SEOContentSection content={icp.seoContent} />
    </div>
  );
}
