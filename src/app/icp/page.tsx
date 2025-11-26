import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { icpPersonas } from "@/data/icp-personas";
import { ChevronRight } from "lucide-react";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";

export const metadata: Metadata = {
  title: "Wholesale Butchery Solutions by Role | Executive Chefs, Head Chefs, Procurement, Butchers | Booker Demo",
  description: "Find your perfect wholesale butchery solution. Tailored for executive chefs (fine dining), head chefs (casual dining), procurement managers (hotels/catering), and butcher shop owners. Red Tractor certified, competitive pricing, next-day delivery UK-wide.",
  keywords: "wholesale butchery, executive chef meat supplier, head chef supplier, procurement manager wholesale, butcher shop wholesale, fine dining meat supplier, casual dining meat supplier, hotel meat procurement, independent butcher wholesale, Red Tractor beef, premium wholesale meat UK",
};

export default function ICPIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80"
            alt="Find Your Perfect Wholesale Butchery Solution"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              Find Your Perfect Wholesale Butchery Solution
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Tailored solutions for executive chefs, casual dining operations, hotel procurement teams, and independent butchers
            </p>
          </div>
        </div>
      </section>

      {/* ICP Tiles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Select Your Business Type
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Discover how Booker Demo supports your specific needs with quality products, competitive pricing, and expert service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {icpPersonas.map((icp) => (
              <Link
                key={icp.id}
                href={`/icp/${icp.slug}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-orange-500 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={icp.hero.imageUrl}
                    alt={icp.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                      {icp.name}
                    </h3>
                    <p className="text-white/90 text-sm line-clamp-2 drop-shadow-md" style={{ color: '#FFFFFF' }}>
                      {icp.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Key Pain Points Preview */}
                  <ul className="space-y-2 mb-6">
                    {icp.painPoints.slice(0, 3).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-orange-600 font-semibold group-hover:text-orange-700 transition-colors">
                      Explore Solutions →
                    </span>
                    <div className="w-8 h-8 rounded-full bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center transition-colors">
                      <ChevronRight className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Booker */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Professionals Choose Booker Demo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by chefs, procurement managers, and butchers across the UK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assured</h3>
              <p className="text-gray-600">Red Tractor certified beef and lamb. British-sourced products with full traceability.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Pricing</h3>
              <p className="text-gray-600">Wholesale prices with volume discounts. Protect your margins without compromising quality.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-600">Dedicated account management. Custom cutting, menu consultation, and butchery expertise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1600&q=80"
            alt="Ready to Find Your Solution?"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Ready to Find Your Solution?
          </h2>
          <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
            Join thousands of professionals ordering premium wholesale butchery from Booker Demo
          </p>
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
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContentSection content={`<h2>Wholesale Butchery Solutions Tailored to Your Needs</h2>
<p>Finding the right <strong>wholesale butchery supplier</strong> for your specific business needs can transform your operations - whether you're running a Michelin-starred restaurant, managing procurement for a hotel group, operating a multi-site casual dining chain, or running an independent butcher shop. Booker Demo provides role-specific wholesale meat solutions designed around the unique challenges and requirements of executive chefs, head chefs, procurement managers, and butcher shop owners across the UK.</p>

<h3>Executive Chefs: Premium Cuts for Fine Dining Excellence</h3>
<p>Executive chefs in high-end restaurants and fine dining establishments require more than standard wholesale meat - you need premium quality, consistent portioning, and full traceability for menu storytelling. Our <strong>executive chef solutions</strong> include Red Tractor certified beef, 28-day aged ribeye and sirloin, premium rack of lamb, veal escalopes, and seasonal game birds. Custom cutting services, portion control to your exact specifications, and dedicated account management ensure your tasting menus and signature dishes maintain the quality standards fine dining demands. With next-day delivery and temperature-controlled transport, Booker Demo supports executive chefs with the reliability premium kitchens require.</p>

<h3>Head Chefs: Consistent Quality for Multi-Site Operations</h3>
<p>Head chefs managing casual dining chains, gastropub groups, and multi-location restaurants face a different challenge - maintaining consistent quality and portion sizing across all sites while hitting GP targets. Our <strong>head chef wholesale solutions</strong> provide standardized products with volume discounts, centralized ordering for multiple locations, and single-invoice billing to streamline operations. High-volume essentials like chicken breast fillets, burger patties, sausages, and pork belly maintain the same quality across every delivery, ensuring customers get the same experience whether they visit your Manchester, Birmingham, or London location. Reliable stock availability means no menu disruption from stockouts on signature dishes.</p>

<h3>Procurement Managers: Streamlined Bulk Ordering for Hospitality</h3>
<p>Procurement managers for hotels, catering companies, and multi-venue hospitality groups need suppliers who understand bulk purchasing, multi-department operations, and financial efficiency. Our <strong>procurement manager solutions</strong> include central billing (single invoice for all departments and locations), competitive volume pricing, dedicated account management, and reliable next-day delivery for events and functions. From banqueting chicken to fine dining beef, room service breakfast sausages to wedding function lamb - one account manages all your butchery procurement with the flexibility each department needs while maintaining centralized financial control.</p>

<h3>Butcher Shop Owners: Quality Wholesale for Independent Retailers</h3>
<p>Independent butchers and farm shop owners need <strong>wholesale meat suppliers</strong> who understand retail challenges - competitive trade pricing, flexible ordering without large minimums, and quality products customers trust. Our <strong>butcher shop solutions</strong> provide Red Tractor certified beef and lamb with full provenance documentation, competitive wholesale prices with volume discounts to protect retail margins, and flexible ordering (no large minimums required). Whether you're a traditional high street butcher, a farm shop selling local products, or a specialty meat retailer, Booker Demo supports your business with quality wholesale meat that builds your reputation and supports business growth.</p>

<h3>Why UK Food Service Professionals Choose Booker Demo</h3>
<p>Across all roles - executive chefs, head chefs, procurement managers, and butcher shop owners - Booker Demo delivers the quality, service, and pricing that UK food service professionals demand. Red Tractor certified beef and lamb, British-sourced chicken, and MSC-certified fish provide the quality assurance customers expect. Competitive wholesale pricing with volume discounts protects your margins whether you're plating fine dining dishes or serving casual dining menus. Next-day delivery UK-wide with temperature-controlled transport ensures peak freshness, while dedicated account management provides custom cutting, menu consultation, and butchery expertise tailored to your role.</p>

<p>From premium cuts for executive chefs to bulk ordering for procurement managers, consistent quality for head chefs to trade pricing for butcher shops - Booker Demo's role-specific wholesale butchery solutions help UK food service professionals succeed. Explore our tailored solutions above to find the perfect match for your business needs.</p>`} />
    </div>
  );
}
