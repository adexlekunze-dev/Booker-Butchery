import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft, Thermometer, Droplets, Wind, Award, TrendingUp, Check } from "lucide-react";
import { getSEOContentForQualityPage } from "@/data/quality-resource-seo-content";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Blackgate 28-Day Dry-Aged Beef | Premium British Beef | Booker",
  description: "Discover the Blackgate dry-aging process. 28 days of controlled aging transforms premium British beef into restaurant-grade steaks with intense flavor and exceptional tenderness.",
  keywords: "Blackgate beef, dry aged beef, 28 day aged, premium beef, British beef, dry aging process, aged steak",
};

export default function BlackgateAgingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558030006-450675393462?w=1600&q=80"
            alt="Blackgate Dry-Aged Beef"
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
                <Clock className="w-12 h-12" />
              </div>
              <div>
                <div className="text-white/90 text-sm font-semibold mb-1 drop-shadow-md">PREMIUM RANGE</div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                  Blackgate Dry-Aged Beef
                </h1>
              </div>
            </div>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
              28 days of precision dry-aging transforms exceptional British beef into restaurant-grade steaks with intense flavor, buttery texture, and unmatched tenderness.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Introduction */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Art of Dry Aging</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Blackgate represents our commitment to delivering restaurant-quality beef to professional kitchens. Each primal cut is carefully selected from premium British cattle and aged for exactly <strong>28 days</strong> in our purpose-built aging chambers.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                During this time, natural enzymatic processes break down muscle fibers, creating exceptional tenderness. Simultaneously, controlled moisture evaporation concentrates the beef's natural flavors, developing the complex, nutty, umami-rich taste that defines world-class dry-aged beef.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The result? Steaks that rival the finest steakhouses in London, available exclusively to Booker customers at wholesale pricing.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80"
                  alt="Dry-aged beef"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-6 rounded-lg shadow-xl">
                <div className="text-5xl font-bold mb-1">28</div>
                <div className="text-sm font-semibold">Days Aged</div>
              </div>
            </div>
          </div>
        </section>

        {/* The Aging Process */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Blackgate Aging Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">1. Selection</h3>
              <p className="text-sm text-gray-700">
                Only premium British beef from trusted farms. Minimum marbling score required. Large primals with 2cm+ fat cap to protect during aging.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <div className="bg-amber-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Thermometer className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">2. Chamber Control</h3>
              <p className="text-sm text-gray-700">
                Hung in climate-controlled chambers. Temperature: 0-2°C. Humidity: 75-85%. Constant monitoring ensures perfect conditions 24/7.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">3. Time & Patience</h3>
              <p className="text-sm text-gray-700">
                28 days of enzymatic tenderization and flavor development. Weekly inspections. The sweet spot between flavor and yield.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">4. Expert Butchery</h3>
              <p className="text-sm text-gray-700">
                Dried crust carefully trimmed by master butchers. Steaks cut to specification. Quality control at every step.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Thermometer className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-3">Temperature</h3>
              <div className="text-4xl font-bold text-blue-400 mb-2">0-2°C</div>
              <p className="text-sm text-gray-400">
                Precise temperature control prevents spoilage while allowing enzymatic activity
              </p>
            </div>
            <div className="text-center">
              <Droplets className="w-12 h-12 mx-auto mb-4 text-teal-400" />
              <h3 className="text-xl font-bold mb-3">Humidity</h3>
              <div className="text-4xl font-bold text-teal-400 mb-2">75-85%</div>
              <p className="text-sm text-gray-400">
                Optimal moisture balance for controlled drying without case hardening
              </p>
            </div>
            <div className="text-center">
              <Wind className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-3">Airflow</h3>
              <div className="text-4xl font-bold text-green-400 mb-2">Gentle</div>
              <p className="text-sm text-gray-400">
                Consistent circulation ensures even drying across all surfaces
              </p>
            </div>
          </div>
        </section>

        {/* Flavor Development Timeline */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Flavor Development: 28-Day Journey</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-center">
                <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg">Day 0</div>
              </div>
              <div className="flex-1 border-l-4 border-gray-300 pl-6 pb-6">
                <h4 className="font-bold text-gray-900 mb-2">Fresh Beef</h4>
                <p className="text-sm text-gray-600">
                  Premium British beef selected. Clean, fresh beef flavor. Good tenderness from high-quality source.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-center">
                <div className="bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded-lg">Day 7</div>
              </div>
              <div className="flex-1 border-l-4 border-blue-400 pl-6 pb-6">
                <h4 className="font-bold text-gray-900 mb-2">Early Changes</h4>
                <p className="text-sm text-gray-600">
                  Surface begins to dry. Enzymatic activity starts breaking down proteins. Slight improvement in tenderness. Minimal flavor change.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-center">
                <div className="bg-amber-100 text-amber-700 font-bold py-2 px-4 rounded-lg">Day 14</div>
              </div>
              <div className="flex-1 border-l-4 border-amber-400 pl-6 pb-6">
                <h4 className="font-bold text-gray-900 mb-2">Flavor Emergence</h4>
                <p className="text-sm text-gray-600">
                  Dried crust forming. Noticeable tenderness improvement. First hints of nutty, concentrated beef flavor developing.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-center">
                <div className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg">Day 21</div>
              </div>
              <div className="flex-1 border-l-4 border-orange-500 pl-6 pb-6">
                <h4 className="font-bold text-gray-900 mb-2">Intensification</h4>
                <p className="text-sm text-gray-600">
                  Pronounced dry-aged character. Rich, complex flavors. Buttery texture. Excellent tenderness throughout.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-center">
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-2 px-4 rounded-lg">Day 28</div>
              </div>
              <div className="flex-1 border-l-4 border-amber-600 pl-6">
                <h4 className="font-bold text-gray-900 mb-2">Blackgate Perfection ⭐</h4>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Peak flavor balance.</strong> Intense umami, nutty notes with hints of blue cheese. Exceptional tenderness. Restaurant-quality beef. The Blackgate signature.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-900">
                    <strong>Why 28 days?</strong> This is the sweet spot where flavor intensity peaks while maintaining optimal yield. Beyond 35 days, flavors become too funky for most diners and trim loss increases significantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison: Blackgate vs Regular Beef */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Blackgate vs Standard Beef</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Characteristic</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Blackgate 28-Day</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Standard Fresh Beef</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Flavor Intensity</td>
                    <td className="px-6 py-4 text-gray-700">Rich, nutty, umami-packed, complex</td>
                    <td className="px-6 py-4 text-gray-700">Clean beef flavor, straightforward</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Tenderness</td>
                    <td className="px-6 py-4 text-gray-700">Exceptional - melts in mouth</td>
                    <td className="px-6 py-4 text-gray-700">Good (if high quality source)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Moisture Content</td>
                    <td className="px-6 py-4 text-gray-700">Concentrated (20% moisture loss)</td>
                    <td className="px-6 py-4 text-gray-700">High moisture, juicy</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Crust Formation</td>
                    <td className="px-6 py-4 text-gray-700">Superior Maillard reaction, deep crust</td>
                    <td className="px-6 py-4 text-gray-700">Good browning, standard crust</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Price Point</td>
                    <td className="px-6 py-4 text-gray-700">Premium (accounts for aging & trim)</td>
                    <td className="px-6 py-4 text-gray-700">Standard wholesale pricing</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Best For</td>
                    <td className="px-6 py-4 text-gray-700">Steakhouses, signature dishes, specials</td>
                    <td className="px-6 py-4 text-gray-700">Everyday menu, high volume</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Chef Tips */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Chef's Guide to Blackgate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Preparation</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Room Temperature:</strong> Remove from fridge 60-90 minutes before cooking for even temperature throughout</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Pat Dry:</strong> Dry surface thoroughly with paper towels - essential for perfect crust</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Season Generously:</strong> Coarse salt and fresh black pepper only - let the beef shine</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>High Smoke Point Oil:</strong> Use clarified butter or high-quality vegetable oil</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cooking</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Searing Hot Pan:</strong> Cast iron or heavy steel pan, smoking hot before steak hits</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Don't Move It:</strong> 3-4 minutes undisturbed for perfect crust, then flip once</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Finish in Oven:</strong> For thick cuts (3cm+), finish at 180°C to desired temp</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Rest Properly:</strong> 10 minutes minimum, loosely tented with foil</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-amber-100 border-2 border-amber-300 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              <strong>Pro Tip:</strong> Blackgate's concentrated flavors mean you can serve smaller portions (175-200g) while maintaining perceived value. The intense flavor satisfies more than a larger standard steak.
            </p>
          </div>
        </section>

      </div>

      {/* Final CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1600&q=80"
            alt="Experience Blackgate Premium Beef"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Experience Blackgate Premium Beef
          </h2>
          <p className="text-xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
            Restaurant-quality dry-aged beef, delivered to your kitchen. Browse our complete Blackgate range today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products?filter=blackgate">
              <Button variant="secondary" size="lg">
                Browse Blackgate Range
              </Button>
            </Link>
            <Link href="/resources/aging-guide">
              <Button
                variant="secondary"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600"
              >
                Learn More About Aging
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForQualityPage("blackgate-aging") && (
        <SEOContentSection content={getSEOContentForQualityPage("blackgate-aging")!} />
      )}
    </main>
  );
}
