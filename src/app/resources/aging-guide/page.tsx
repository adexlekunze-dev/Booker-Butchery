import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft, Droplets, Wind, Thermometer, Calendar } from "lucide-react";
import { getSEOContentForResourcePage } from "@/data/quality-resource-seo-content";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Meat Aging Guide | Dry vs Wet Aging | Booker Wholesale",
  description: "Complete professional guide to dry aging and wet aging beef. Learn the aging process, timelines, flavor development, storage requirements, and temperature specifications for premium aged meat.",
  keywords: "dry aging, wet aging, aged beef, meat aging process, flavor development, beef aging, professional butchery, premium meat",
};

export default function AgingGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558030006-450675393462?w=1600&q=80"
            alt="Meat Aging Guide"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors drop-shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <Clock className="w-12 h-12" />
              </div>
              <div>
                <div className="text-white/90 text-sm font-semibold mb-1 drop-shadow-md">PROFESSIONAL RESOURCE</div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                  Meat Aging Guide
                </h1>
              </div>
            </div>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Complete guide to dry and wet aging. Process, timelines, flavor development, and storage requirements for premium aged beef.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What is Meat Aging?</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Aging beef is a time-honored process that enhances tenderness, concentrates flavor, and develops the complex characteristics that distinguish premium meat. During aging, natural enzymes break down muscle fibers and proteins, creating a more tender texture and intensifying the meat's natural flavors.
          </p>
          <p className="text-gray-700 leading-relaxed">
            There are two primary methods: <strong>dry aging</strong> and <strong>wet aging</strong>. Each method produces distinct characteristics and serves different culinary purposes. Understanding these processes helps you select the right aged beef for your menu.
          </p>
        </section>

        {/* Comparison Table */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Dry Aging vs Wet Aging</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Characteristic</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Dry Aging</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Wet Aging</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Environment</td>
                    <td className="px-6 py-4 text-gray-700">Open air in controlled chamber</td>
                    <td className="px-6 py-4 text-gray-700">Sealed vacuum packaging</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Typical Duration</td>
                    <td className="px-6 py-4 text-gray-700">21-60 days (optimal: 28-35 days)</td>
                    <td className="px-6 py-4 text-gray-700">7-28 days</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Moisture Loss</td>
                    <td className="px-6 py-4 text-gray-700">15-30% weight loss</td>
                    <td className="px-6 py-4 text-gray-700">Minimal (1-5%)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Flavor Profile</td>
                    <td className="px-6 py-4 text-gray-700">Intense, nutty, complex, umami-rich</td>
                    <td className="px-6 py-4 text-gray-700">Clean beef flavor, milder</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Texture</td>
                    <td className="px-6 py-4 text-gray-700">Very tender, concentrated</td>
                    <td className="px-6 py-4 text-gray-700">Tender, juicy</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Cost</td>
                    <td className="px-6 py-4 text-gray-700">Higher (due to weight loss & time)</td>
                    <td className="px-6 py-4 text-gray-700">More economical</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Shelf Life</td>
                    <td className="px-6 py-4 text-gray-700">Shorter once cut (3-5 days)</td>
                    <td className="px-6 py-4 text-gray-700">Longer in vacuum seal (14-21 days)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Best For</td>
                    <td className="px-6 py-4 text-gray-700">Premium steakhouses, special occasions</td>
                    <td className="px-6 py-4 text-gray-700">Everyday use, consistent quality</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Dry Aging Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Wind className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Dry Aging Process</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Process</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Dry aging involves hanging whole primals or sub-primals in a controlled environment where temperature, humidity, and airflow are precisely managed. The meat is exposed to air, allowing moisture to evaporate while natural enzymes tenderize the muscle fibers.
              </p>
              <p className="text-gray-700 leading-relaxed">
                As moisture evaporates, flavors concentrate and intensify. A dried crust forms on the exterior (called the "bark" or "pellicle"), which is trimmed away before cutting steaks, revealing deeply flavored, tender meat beneath.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Thermometer className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-gray-900">Temperature Control</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                  <li><strong>Optimal Range:</strong> 0-2°C (32-36°F)</li>
                  <li><strong>Critical:</strong> Must stay below 4°C to prevent spoilage</li>
                  <li><strong>Consistency:</strong> Temperature fluctuations affect quality</li>
                  <li><strong>Monitoring:</strong> Digital thermometers with alarms</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-gray-900">Humidity Control</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                  <li><strong>Optimal Range:</strong> 75-85% relative humidity</li>
                  <li><strong>Too Low (&lt;70%):</strong> Excessive drying, case hardening</li>
                  <li><strong>Too High (&gt;90%):</strong> Risk of bacterial growth</li>
                  <li><strong>Balance:</strong> Allows drying without spoilage</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Wind className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-gray-900">Air Circulation</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                  <li><strong>Essential:</strong> Gentle, consistent airflow</li>
                  <li><strong>Purpose:</strong> Even drying, prevents hot spots</li>
                  <li><strong>Fan Speed:</strong> Low to moderate (avoid over-drying)</li>
                  <li><strong>Direction:</strong> Should not blow directly on meat</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-gray-900">Aging Timeline</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                  <li><strong>7-14 days:</strong> Minimal aging, slight tenderness</li>
                  <li><strong>21-28 days:</strong> Noticeable flavor development</li>
                  <li><strong>28-35 days:</strong> Optimal balance (recommended)</li>
                  <li><strong>45-60+ days:</strong> Very intense, funky flavors</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-bold text-orange-900 mb-2">⚠️ Quality Requirements for Dry Aging</h4>
              <ul className="text-sm text-orange-800 space-y-1 ml-4 list-disc">
                <li>Only use whole primals or large sub-primals (ribeye, strip loin, sirloin)</li>
                <li>Minimum 2cm fat cap protects meat during aging</li>
                <li>Source from high-quality, well-marbled beef (Choice or Prime grade)</li>
                <li>Never dry age ground meat, thin cuts, or previously frozen meat</li>
                <li>Expect 15-30% trim loss (crust removal + moisture loss)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Wet Aging Section */}
        <section className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Droplets className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Wet Aging Process</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Process</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Wet aging involves vacuum-sealing beef in plastic packaging immediately after butchering and refrigerating it for a period of time. The meat ages in its own juices, allowing enzymatic tenderization to occur without moisture loss.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This method is more economical and widely used in the industry. While the flavor profile is milder compared to dry aging, wet-aged beef still benefits from improved tenderness and maintains its natural juiciness.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">Wet Aging Advantages</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                  <li><strong>No weight loss:</strong> Meat retains moisture, improving yield</li>
                  <li><strong>Consistent results:</strong> Less variation batch to batch</li>
                  <li><strong>Lower cost:</strong> No trim loss or expensive equipment</li>
                  <li><strong>Longer shelf life:</strong> Stays fresh in vacuum seal for weeks</li>
                </ul>
                <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                  <li><strong>Less space required:</strong> Can age in standard coolers</li>
                  <li><strong>Easier management:</strong> Simpler storage and handling</li>
                  <li><strong>Cleaner flavor:</strong> Appeals to broader customer base</li>
                  <li><strong>Faster turnaround:</strong> Optimal aging in 14-21 days</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3">Wet Aging Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">7</div>
                  <div>
                    <div className="font-semibold text-gray-900">7 Days</div>
                    <p className="text-sm text-gray-600">Minimal aging, slight improvement in tenderness</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">14</div>
                  <div>
                    <div className="font-semibold text-gray-900">14 Days</div>
                    <p className="text-sm text-gray-600">Good balance of tenderness and flavor (industry standard)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">21</div>
                  <div>
                    <div className="font-semibold text-gray-900">21-28 Days</div>
                    <p className="text-sm text-gray-600">Maximum tenderness, subtle flavor development</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">💡 Best Practices for Wet Aging</h4>
              <ul className="text-sm text-blue-800 space-y-1 ml-4 list-disc">
                <li>Store at 0-2°C consistently throughout aging period</li>
                <li>Inspect vacuum seals regularly - any loss of seal requires immediate use</li>
                <li>Label packages with cut date and expected aging completion</li>
                <li>Rotate stock: first in, first out (FIFO) system</li>
                <li>Pat meat dry after opening vacuum seal before cooking</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Flavor Development */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Flavor Development Over Time</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <h4 className="font-bold text-gray-900">Days 1-14: Foundation</h4>
              <p className="text-gray-700 text-sm">
                Enzymatic activity begins breaking down proteins. Meat becomes more tender but flavor changes are minimal. Wet aging is optimal in this range.
              </p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-bold text-gray-900">Days 21-28: Sweet Spot (Dry Aging)</h4>
              <p className="text-gray-700 text-sm">
                Pronounced tenderness and noticeable flavor concentration. Nutty, buttery notes develop. Classic dry-aged beef flavor emerges. Most popular range for steakhouses.
              </p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4">
              <h4 className="font-bold text-gray-900">Days 35-45: Bold & Complex</h4>
              <p className="text-gray-700 text-sm">
                Strong umami flavors, blue cheese-like notes. Very tender but may be too intense for some diners. Crust becomes thicker, requiring more trimming.
              </p>
            </div>
            <div className="border-l-4 border-pink-600 pl-4">
              <h4 className="font-bold text-gray-900">Days 60+: Extreme Aging</h4>
              <p className="text-gray-700 text-sm">
                Funky, pungent flavors similar to aged cheese. Extremely tender but polarizing taste. Significant weight loss (25-30%). Specialty markets only.
              </p>
            </div>
          </div>
        </section>

        {/* Selecting Aged Beef */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">How to Select Aged Beef</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-blue-100 mb-3">For Your Menu</h4>
              <ul className="text-sm text-blue-50 space-y-2 ml-4 list-disc">
                <li><strong>Premium Steakhouse:</strong> 28-35 day dry-aged ribeye, strip loin</li>
                <li><strong>Fine Dining:</strong> 21-28 day dry-aged for special cuts</li>
                <li><strong>Casual Dining:</strong> 14-21 day wet-aged for consistency</li>
                <li><strong>High Volume:</strong> 7-14 day wet-aged for cost control</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-blue-100 mb-3">What to Look For</h4>
              <ul className="text-sm text-blue-50 space-y-2 ml-4 list-disc">
                <li><strong>Color:</strong> Deep red (dry-aged may be darker)</li>
                <li><strong>Marbling:</strong> Well-distributed fat throughout</li>
                <li><strong>Crust (dry-aged):</strong> Even, not slimy or off-smelling</li>
                <li><strong>Seal (wet-aged):</strong> Intact vacuum, no air pockets</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Blackgate Reference */}
        <section className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">🥩 Our Blackgate Dry-Aged Beef</h3>
          <p className="text-gray-700 mb-4">
            At Booker Wholesale, our Blackgate range features premium British beef dry-aged for 28 days in carefully controlled conditions. This optimal aging period delivers the perfect balance of tenderness and rich, complex flavor without excessive trim loss.
          </p>
          <Link
            href="/quality/blackgate-aging"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors"
          >
            Learn more about our Blackgate aging process →
          </Link>
        </section>
      </div>

      {/* Final CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1600&q=80"
            alt="Premium Aged Beef"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Premium Aged Beef
          </h2>
          <p className="text-xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
            Experience the superior flavor and tenderness of properly aged beef. Browse our Blackgate range and wet-aged selections.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products?filter=blackgate">
              <Button variant="secondary" size="lg">
                Browse Blackgate Range
              </Button>
            </Link>
            <Link href="/quality/blackgate-aging">
              <Button
                variant="secondary"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600"
              >
                Learn About Our Aging Process
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForResourcePage("aging-guide") && (
        <SEOContentSection content={getSEOContentForResourcePage("aging-guide")!} />
      )}
    </main>
  );
}
