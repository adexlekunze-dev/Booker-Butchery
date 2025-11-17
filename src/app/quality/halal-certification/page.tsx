import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowLeft, CheckCircle, Shield, FileCheck, Users, MapPin, Clock, Check } from "lucide-react";
import { getSEOContentForQualityPage } from "@/data/quality-resource-seo-content";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Halal Certified Meats | HMC Certified | Booker Wholesale",
  description: "Rigorously certified halal meats meeting the highest religious and quality standards. Full traceability, certified processing, and trusted halal beef, lamb, and chicken.",
  keywords: "halal meat, halal certified, HMC certified, halal beef, halal lamb, halal chicken, Islamic meat, zabihah",
};

export default function HalalCertificationPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1600&q=80"
            alt="Halal Certified Meats"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <Link
            href="/quality"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors drop-shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Quality Stories
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <Star className="w-12 h-12" />
              </div>
              <div>
                <div className="text-white/90 text-sm font-semibold mb-1 drop-shadow-md">CERTIFIED HALAL</div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                  Halal Certification
                </h1>
              </div>
            </div>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Rigorously certified halal meats meeting the highest religious and quality standards. Complete traceability from certified farms to your kitchen.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Introduction */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Halal Commitment</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                At Booker Wholesale, we understand the importance of halal certification for Muslim communities and businesses serving them. Our halal range is <strong>certified by the Halal Monitoring Committee (HMC)</strong>, the UK's leading halal certification body known for its strict adherence to Islamic principles.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Every product in our halal range is traceable from farm to fork. We work exclusively with HMC-approved suppliers and abattoirs, ensuring complete compliance with zabihah requirements at every stage.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you're running a restaurant, takeaway, hotel, or catering business, our halal range provides the quality and assurance your customers expect.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <Shield className="w-16 h-16" />
                  <div>
                    <div className="text-3xl font-bold">HMC</div>
                    <div className="text-emerald-100 text-sm">Certified</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-200 flex-shrink-0" />
                    <span className="text-sm">Hand zabihah by Muslim slaughtermen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-200 flex-shrink-0" />
                    <span className="text-sm">No stunning before slaughter</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-200 flex-shrink-0" />
                    <span className="text-sm">Full traceability from farm to fork</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-200 flex-shrink-0" />
                    <span className="text-sm">Regular audits and inspections</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-200 flex-shrink-0" />
                    <span className="text-sm">Tayyib (wholesome) animal welfare</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Our Halal Different */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Makes Our Halal Different?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500">
              <div className="bg-emerald-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">HMC Gold Standard</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We exclusively use HMC certification, the most stringent halal standard in the UK. No stunning, hand slaughter only, full Islamic compliance.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-teal-500">
              <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Muslim Slaughtermen</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                All slaughter performed by trained Muslim slaughtermen who recite Tasmiyah (Bismillah) for each animal in accordance with Islamic law.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Complete Traceability</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Every product is traceable to HMC-approved farms and abattoirs. Full documentation available on request for your compliance needs.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">No Cross-Contamination</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Processed in dedicated halal facilities with separate equipment, storage, and transport. Zero risk of cross-contamination with non-halal products.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Regular Audits</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                HMC conducts unannounced inspections and regular audits of all suppliers. Continuous monitoring ensures standards never slip.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-orange-500">
              <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Tayyib Standards</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Not just halal, but tayyib (wholesome). Animals raised humanely, fed quality feed, and treated with care in accordance with Islamic principles.
              </p>
            </div>
          </div>
        </section>

        {/* The Halal Process */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Halal Certification Process</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-emerald-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center">1</div>
              </div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Farm Approval</h4>
                <p className="text-sm text-gray-700">
                  Only HMC-approved farms selected. Animal welfare standards verified. Feed must be halal-compliant (no animal by-products). Regular farm inspections conducted.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-emerald-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center">2</div>
              </div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Transport</h4>
                <p className="text-sm text-gray-700">
                  Animals transported in approved vehicles with minimal stress. Journey times minimized. Welfare monitored throughout. Segregated from non-halal livestock.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-emerald-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center">3</div>
              </div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Pre-Slaughter</h4>
                <p className="text-sm text-gray-700">
                  Animals rested in lairage. Water provided. Calm environment maintained. Health inspection by qualified veterinarian. <strong>No stunning applied</strong> (as per HMC standards).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-emerald-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center">4</div>
              </div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Zabihah Slaughter</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Performed by trained Muslim slaughterman. Animal must be alive and healthy. Sharp knife used to ensure swift, humane cut. Tasmiyah recited: "Bismillah, Allahu Akbar" (In the name of Allah, Allah is the Greatest).
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded p-3">
                  <p className="text-xs text-emerald-900">
                    <strong>Islamic Requirements Met:</strong> Cut severs trachea, esophagus, and both carotid arteries and jugular veins in single motion. Blood must drain completely from carcass.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-emerald-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center">5</div>
              </div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Processing & Packaging</h4>
                <p className="text-sm text-gray-700">
                  Processed in dedicated halal-only facilities. Equipment never used for non-halal products. HMC seal applied to packaging. Full traceability codes recorded.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-emerald-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center">6</div>
              </div>
              <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Distribution & Delivery</h4>
                <p className="text-sm text-gray-700">
                  Transported in dedicated halal vehicles. Stored separately in our warehouses. Delivered with full certification documentation. Chain of custody maintained.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Halal Product Range */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Halal Product Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-red-200 rounded-lg p-6 hover:border-red-500 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Halal Beef</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Ribeye Steaks</li>
                <li>• Sirloin Steaks</li>
                <li>• Rump Steaks</li>
                <li>• Topside Joints</li>
                <li>• Silverside</li>
                <li>• Brisket</li>
                <li>• Mince (various fat %)</li>
                <li>• Diced Beef</li>
                <li>• Beef Burgers</li>
              </ul>
            </div>

            <div className="border-2 border-purple-200 rounded-lg p-6 hover:border-purple-500 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Halal Lamb</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Lamb Chops</li>
                <li>• Lamb Leg (whole & half)</li>
                <li>• Lamb Shoulder</li>
                <li>• Lamb Rack</li>
                <li>• Lamb Neck</li>
                <li>• Lamb Mince</li>
                <li>• Diced Lamb</li>
                <li>• Lamb Kofta</li>
              </ul>
            </div>

            <div className="border-2 border-yellow-200 rounded-lg p-6 hover:border-yellow-500 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Halal Chicken</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Whole Chickens</li>
                <li>• Chicken Breast</li>
                <li>• Chicken Thighs</li>
                <li>• Chicken Drumsticks</li>
                <li>• Chicken Wings</li>
                <li>• Chicken Mince</li>
                <li>• Diced Chicken</li>
                <li>• Chicken Tikka Pieces</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">All products clearly marked with HMC certification</p>
            <Link
              href="/products?filter=halal"
              className="inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
            >
              Browse Halal Products
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">What is the difference between HMC and other halal certifications?</h4>
              <p className="text-sm text-gray-700">
                HMC is recognized as the strictest halal certification in the UK. Unlike some other certifications, HMC <strong>does not permit any form of stunning</strong> before slaughter and requires hand zabihah by Muslim slaughtermen only. Many Muslims specifically seek HMC certification for this reason.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Is your halal meat stunned?</h4>
              <p className="text-sm text-gray-700">
                <strong>No.</strong> All our halal meat is non-stunned and certified by HMC. Animals are conscious at the time of slaughter in accordance with traditional Islamic zabihah requirements.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Can I get certification documents for my business?</h4>
              <p className="text-sm text-gray-700">
                Yes. We provide HMC certification documents with every delivery. Additional certificates and audit reports are available on request from your account manager. Many restaurants display these certificates for customer confidence.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">How can I be sure there's no cross-contamination?</h4>
              <p className="text-sm text-gray-700">
                Our halal products are processed in dedicated halal-only facilities with separate equipment, storage areas, and transport. The HMC conducts surprise audits to verify segregation is maintained at all times. Products are clearly labeled and stored separately in our warehouses.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Is the feed given to animals halal?</h4>
              <p className="text-sm text-gray-700">
                Yes. HMC requires that animals are fed only halal-compliant feed with no animal by-products. This ensures the meat is not just halal in slaughter method, but also tayyib (wholesome and pure) throughout the animal's life.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">What about animal welfare?</h4>
              <p className="text-sm text-gray-700">
                Islamic principles require excellent animal welfare. Animals must be healthy, well-fed, and treated humanely. Our suppliers follow both Islamic welfare standards and UK legal requirements. Sick or injured animals cannot be slaughtered for halal. The zabihah method, when performed correctly by trained slaughtermen, is swift and humane.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Final CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1600&q=80"
            alt="Trust in Every Cut"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Trust in Every Cut
          </h2>
          <p className="text-xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
            HMC-certified halal meats you can trust. Complete traceability, rigorous standards, and uncompromising quality.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products?filter=halal">
              <Button variant="secondary" size="lg">
                Browse Halal Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600"
              >
                Contact Us for More Info
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForQualityPage("halal-certification") && (
        <SEOContentSection content={getSEOContentForQualityPage("halal-certification")!} />
      )}
    </main>
  );
}
