import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowLeft, Flag, TrendingUp, Shield, Users, Leaf, Award } from "lucide-react";
import { getSEOContentForQualityPage } from "@/data/quality-resource-seo-content";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "100% British Beef | Farm to Fork Traceability | Booker Wholesale",
  description: "100% British beef with complete farm-to-fork traceability. Supporting British farmers, ensuring highest welfare standards, and delivering sustainable, quality beef.",
  keywords: "British beef, UK beef, farm to fork, traceability, Red Tractor, British meat, sustainable beef, grass-fed beef",
};

export default function BritishBeefPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?w=1600&q=80"
            alt="British Beef Traceability"
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
                <Flag className="w-12 h-12" />
              </div>
              <div>
                <div className="text-white/90 text-sm font-semibold mb-1 drop-shadow-md">100% BRITISH</div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                  British Beef Traceability
                </h1>
              </div>
            </div>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
              100% British beef with complete farm-to-fork traceability. Supporting British farmers, ensuring the highest welfare and sustainability standards, and delivering exceptional quality.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Introduction */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Proudly British, Fully Traceable</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Every piece of beef in our range comes from cattle born, raised, and processed in the United Kingdom. We work exclusively with British farms and abattoirs that meet or exceed Red Tractor farm assurance standards.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                This isn't just about patriotism—it's about quality, safety, and accountability. British beef production operates under some of the strictest animal welfare, environmental, and food safety regulations in the world. When you choose British beef from Booker, you're choosing:
              </p>
              <ul className="text-gray-700 space-y-2 ml-6">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Complete traceability from farm to fork</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Highest animal welfare standards</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Support for British farmers and rural communities</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Lower food miles and environmental impact</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Independently audited quality assurance</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?w=800&q=80"
                  alt="British cattle grazing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-xl">
                <div className="text-5xl font-bold mb-1">100%</div>
                <div className="text-sm font-semibold">British Sourced</div>
              </div>
            </div>
          </div>
        </section>

        {/* Traceability Journey */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Farm-to-Fork Traceability Journey</h2>
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600" style={{top: '4rem'}} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
              {/* Step 1 */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600 relative z-10">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-3">British Farm</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Cattle born and raised on Red Tractor assured British farms. Pasture-based with natural grazing.
                </p>
                <div className="text-xs text-blue-600 font-semibold">
                  • Farm registration number
                </div>
                <div className="text-xs text-blue-600 font-semibold">
                  • Cattle passport issued
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 relative z-10">
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-3">Lifetime Tracking</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Every animal tagged with unique ID. Movements recorded in national database (BCMS).
                </p>
                <div className="text-xs text-blue-600 font-semibold">
                  • Individual ear tag number
                </div>
                <div className="text-xs text-blue-600 font-semibold">
                  • Movement records
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-400 relative z-10">
                <div className="bg-blue-400 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-3">UK Abattoir</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Processed at licensed UK abattoirs. Veterinary inspection. Welfare standards enforced.
                </p>
                <div className="text-xs text-blue-600 font-semibold">
                  • Slaughter batch number
                </div>
                <div className="text-xs text-blue-600 font-semibold">
                  • Health certificates
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-300 relative z-10">
                <div className="bg-blue-300 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-4">
                  4
                </div>
                <h3 className="font-bold text-gray-900 mb-3">Processing</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Cut and packed in approved UK facilities. Lot codes link to source farms. Cold chain maintained.
                </p>
                <div className="text-xs text-blue-600 font-semibold">
                  • Batch/lot codes
                </div>
                <div className="text-xs text-blue-600 font-semibold">
                  • Pack date
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-200 relative z-10">
                <div className="bg-blue-200 text-gray-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-4">
                  5
                </div>
                <h3 className="font-bold text-gray-900 mb-3">Your Kitchen</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Delivered to you with full documentation. Trace back to originating farm on request.
                </p>
                <div className="text-xs text-blue-600 font-semibold">
                  • Invoice/delivery note
                </div>
                <div className="text-xs text-blue-600 font-semibold">
                  • Traceability on demand
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-900 font-semibold mb-2">Complete End-to-End Visibility</p>
            <p className="text-sm text-blue-800">
              Using the batch code on your product, we can trace it back through the supply chain to the exact farms where the cattle were raised. This level of transparency is unique to British beef and gives you complete confidence in your supply chain.
            </p>
          </div>
        </section>

        {/* Red Tractor Certification */}
        <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-red-600 text-white rounded-full p-4">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">Red Tractor</div>
                  <div className="text-red-600 font-semibold">Farm Assured</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The Red Tractor logo is Britain's biggest food assurance scheme, covering food safety, animal welfare, and environmental protection. All our beef suppliers are Red Tractor certified.
              </p>
              <h4 className="font-bold text-gray-900 mb-3">What Red Tractor Guarantees:</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex gap-2">
                  <Shield className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span><strong>Food Safety:</strong> Rigorous hygiene and safety standards throughout production</span>
                </li>
                <li className="flex gap-2">
                  <Shield className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span><strong>Animal Welfare:</strong> High standards for housing, handling, transport, and slaughter</span>
                </li>
                <li className="flex gap-2">
                  <Shield className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span><strong>Environmental Protection:</strong> Responsible land management and sustainability practices</span>
                </li>
                <li className="flex gap-2">
                  <Shield className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span><strong>Traceability:</strong> Full chain of custody from farm to retail</span>
                </li>
                <li className="flex gap-2">
                  <Shield className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span><strong>Independent Audits:</strong> Regular inspections by qualified assessors</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <h4 className="font-bold text-gray-900 mb-4 text-center">Red Tractor Standards</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">✓</div>
                  <div className="text-sm text-gray-700">Annual farm inspections with unannounced spot checks</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">✓</div>
                  <div className="text-sm text-gray-700">Full medicine and treatment records maintained</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">✓</div>
                  <div className="text-sm text-gray-700">Strict controls on antibiotics and growth promoters</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">✓</div>
                  <div className="text-sm text-gray-700">Protected animal welfare during transport and handling</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">✓</div>
                  <div className="text-sm text-gray-700">Environmental stewardship and biodiversity protection</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supporting British Farmers */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Supporting British Farmers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">65,000+</div>
              <div className="text-sm text-gray-600">British beef farmers</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1.9M</div>
              <div className="text-sm text-gray-600">Cattle in the UK</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-orange-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">£3.1B</div>
              <div className="text-sm text-gray-600">Annual UK beef production value</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed text-center">
              When you choose British beef from Booker, you're directly supporting British farming families, preserving rural communities, and maintaining the beautiful British countryside. Our farmers take pride in producing world-class beef while caring for the land and their animals. By choosing British, you're investing in a sustainable future for UK agriculture.
            </p>
          </div>
        </section>

        {/* Sustainability */}
        <section className="bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <Leaf className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Sustainable British Beef</h2>
            <p className="text-green-100 max-w-3xl mx-auto">
              British beef farming is among the most sustainable in the world. Our grass-based systems, strict environmental regulations, and continuous improvement programs ensure responsible production.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="font-bold mb-3">Grass-Fed Heritage</h4>
              <p className="text-sm text-green-100">
                British cattle are predominantly grass-fed, grazing on pastures for much of the year. This natural diet requires no imported feed crops and maintains carbon-sequestering grasslands that support biodiversity.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="font-bold mb-3">Lower Food Miles</h4>
              <p className="text-sm text-green-100">
                Sourcing from British farms means dramatically reduced transport distances compared to imported beef. Less transport means lower carbon emissions and fresher products.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="font-bold mb-3">Environmental Stewardship</h4>
              <p className="text-sm text-green-100">
                UK farmers manage hedgerows, woodlands, and wetlands that provide habitats for wildlife. Rotational grazing improves soil health and prevents erosion. Strict regulations on waste and water usage protect the environment.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="font-bold mb-3">Continuous Improvement</h4>
              <p className="text-sm text-green-100">
                UK beef farmers have reduced greenhouse gas emissions intensity by 29% since 1990. Ongoing research and innovation continue to improve efficiency and reduce environmental impact.
              </p>
            </div>
          </div>
        </section>

        {/* Welfare Standards */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">World-Leading Welfare Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">On-Farm Welfare</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <div className="text-blue-600 font-bold text-lg flex-shrink-0">✓</div>
                  <div><strong>Natural Behavior:</strong> Cattle graze outdoors for most of the year, expressing natural behaviors</div>
                </li>
                <li className="flex gap-3">
                  <div className="text-blue-600 font-bold text-lg flex-shrink-0">✓</div>
                  <div><strong>Comfortable Housing:</strong> When housed, cattle have dry, well-ventilated shelter with adequate space</div>
                </li>
                <li className="flex gap-3">
                  <div className="text-blue-600 font-bold text-lg flex-shrink-0">✓</div>
                  <div><strong>Health Monitoring:</strong> Regular veterinary checks, immediate treatment of illness or injury</div>
                </li>
                <li className="flex gap-3">
                  <div className="text-blue-600 font-bold text-lg flex-shrink-0">✓</div>
                  <div><strong>Good Nutrition:</strong> Quality feed and constant access to fresh water</div>
                </li>
                <li className="flex gap-3">
                  <div className="text-blue-600 font-bold text-lg flex-shrink-0">✓</div>
                  <div><strong>Low Stress:</strong> Calm handling, minimal interventions, family groups kept together</div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transport & Processing</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <div className="text-blue-600 font-bold text-lg flex-shrink-0">✓</div>
                  <div><strong>Journey Time Limits:</strong> Strict maximum journey times, rest periods enforced</div>
                </li>
                <li className="flex gap-3">
                  <div className="text-blue-600 font-bold text-lg flex-shrink-0">✓</div>
                  <div><strong>Proper Vehicles:</strong> Approved livestock transporters with suitable bedding and ventilation</div>
                </li>
                <li className="flex gap-3">
                  <div className="text-blue-600 font-bold text-lg flex-shrink-0">✓</div>
                  <div><strong>Handling Training:</strong> All handlers trained in low-stress cattle management</div>
                </li>
                <li className="flex gap-3">
                  <div className="text-blue-600 font-bold text-lg flex-shrink-0">✓</div>
                  <div><strong>Stunning Required:</strong> Immediate stunning before slaughter (except halal/kosher exemptions)</div>
                </li>
                <li className="flex gap-3">
                  <div className="text-blue-600 font-bold text-lg flex-shrink-0">✓</div>
                  <div><strong>Veterinary Supervision:</strong> Official veterinarian present at all slaughterhouses</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-900 font-semibold mb-2">UK Leads the World in Animal Welfare</p>
            <p className="text-sm text-blue-800">
              The UK has some of the highest animal welfare standards globally. The Animal Welfare Act 2006 and associated regulations set strict requirements that go beyond EU minimums. British farmers and processors take animal welfare seriously—it's the right thing to do and produces better quality beef.
            </p>
          </div>
        </section>

      </div>

      {/* Final CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1600&q=80"
            alt="Choose British, Choose Quality"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Choose British, Choose Quality
          </h2>
          <p className="text-xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
            100% British beef with full traceability, world-leading welfare standards, and exceptional taste. Support British farmers while serving the best.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products?category=beef">
              <Button variant="secondary" size="lg">
                Browse British Beef Range
              </Button>
            </Link>
            <Link href="/resources/butchery-specs">
              <Button
                variant="secondary"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600"
              >
                View Butchery Specifications
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForQualityPage("british-beef") && (
        <SEOContentSection content={getSEOContentForQualityPage("british-beef")!} />
      )}
    </main>
  );
}
