import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Thermometer, Download, ArrowLeft, AlertCircle } from "lucide-react";
import { getSEOContentForResourcePage } from "@/data/quality-resource-seo-content";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Professional Cooking Temperature Chart | Booker Wholesale",
  description: "Professional temperature guide for beef, pork, lamb, chicken, and game. Safe cooking temperatures, doneness levels, resting times, and food safety standards for commercial kitchens.",
  keywords: "cooking temperatures, meat temperatures, safe cooking, doneness levels, food safety, professional kitchen, chef resources, internal temperature",
};

type TemperatureData = {
  meat: string;
  cut?: string;
  rare?: string;
  mediumRare?: string;
  medium?: string;
  mediumWell?: string;
  wellDone?: string;
  safe?: string;
  restingTime: string;
  notes?: string;
};

const beefTemperatures: TemperatureData[] = [
  {
    meat: "Beef Steaks",
    cut: "Ribeye, Sirloin, Fillet",
    rare: "50-52°C",
    mediumRare: "55-57°C",
    medium: "60-63°C",
    mediumWell: "65-68°C",
    wellDone: "70°C+",
    restingTime: "5-10 min",
    notes: "USDA recommends 63°C minimum for safety"
  },
  {
    meat: "Beef Roasts",
    cut: "Topside, Ribeye, Sirloin",
    rare: "52°C",
    mediumRare: "57°C",
    medium: "63°C",
    mediumWell: "68°C",
    wellDone: "72°C+",
    restingTime: "15-20 min",
    notes: "Rest covered with foil to carry-over cook"
  },
  {
    meat: "Beef Brisket",
    cut: "Low & slow cooking",
    safe: "90-95°C",
    restingTime: "30-60 min",
    notes: "Cook until probe tender, not just to temperature"
  },
  {
    meat: "Ground Beef",
    cut: "Burgers, Mince",
    safe: "71°C",
    restingTime: "3 min",
    notes: "Must reach 71°C throughout for food safety"
  },
];

const porkTemperatures: TemperatureData[] = [
  {
    meat: "Pork Chops",
    cut: "Loin, Rib chops",
    medium: "63°C",
    mediumWell: "68°C",
    wellDone: "71°C+",
    restingTime: "3-5 min",
    notes: "Modern pork safe at 63°C with slight pink"
  },
  {
    meat: "Pork Tenderloin",
    cut: "Fillet",
    medium: "63°C",
    mediumWell: "68°C",
    restingTime: "5-10 min",
    notes: "Can be served slightly pink"
  },
  {
    meat: "Pork Shoulder",
    cut: "Pulled pork",
    safe: "90-95°C",
    restingTime: "30-60 min",
    notes: "Cook until tender and pulls apart easily"
  },
  {
    meat: "Pork Belly",
    cut: "Crispy skin",
    safe: "75-80°C",
    restingTime: "10-15 min",
    notes: "High temp roast for crispy crackling"
  },
  {
    meat: "Sausages",
    cut: "Fresh pork sausages",
    safe: "71°C",
    restingTime: "2-3 min",
    notes: "No pink meat, juices run clear"
  },
];

const lambTemperatures: TemperatureData[] = [
  {
    meat: "Lamb Chops",
    cut: "Loin, Rib chops",
    rare: "50-52°C",
    mediumRare: "55-57°C",
    medium: "60-63°C",
    mediumWell: "65-68°C",
    wellDone: "70°C+",
    restingTime: "5 min",
    notes: "Best served medium-rare to medium"
  },
  {
    meat: "Lamb Leg",
    cut: "Whole or butterflied",
    rare: "52°C",
    mediumRare: "57°C",
    medium: "63°C",
    wellDone: "70°C+",
    restingTime: "15-20 min",
    notes: "Insert probe into thickest part"
  },
  {
    meat: "Lamb Shoulder",
    cut: "Slow roast",
    safe: "85-90°C",
    restingTime: "20-30 min",
    notes: "Cook low and slow until tender"
  },
  {
    meat: "Lamb Rack",
    cut: "French trimmed",
    mediumRare: "55-57°C",
    medium: "60-63°C",
    restingTime: "10 min",
    notes: "Premium cut, best medium-rare"
  },
];

const poultryTemperatures: TemperatureData[] = [
  {
    meat: "Chicken Breast",
    cut: "Boneless",
    safe: "74°C",
    restingTime: "5 min",
    notes: "Juices must run clear, no pink meat"
  },
  {
    meat: "Chicken Thighs",
    cut: "Bone-in or boneless",
    safe: "74-77°C",
    restingTime: "5 min",
    notes: "Can go slightly higher for better texture"
  },
  {
    meat: "Whole Chicken",
    cut: "Roasted",
    safe: "74°C",
    restingTime: "15-20 min",
    notes: "Check thickest part of thigh"
  },
  {
    meat: "Turkey",
    cut: "Whole bird",
    safe: "74°C",
    restingTime: "20-30 min",
    notes: "Breast and thigh both 74°C minimum"
  },
  {
    meat: "Duck Breast",
    cut: "Pan-roasted",
    mediumRare: "54-57°C",
    medium: "60-63°C",
    restingTime: "5-10 min",
    notes: "Can be served pink unlike chicken"
  },
];

export default function CookingTemperaturesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=1600&q=80"
            alt="Cooking Temperature Chart"
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
                <Thermometer className="w-12 h-12" />
              </div>
              <div>
                <div className="text-white/90 text-sm font-semibold mb-1 drop-shadow-md">PROFESSIONAL RESOURCE</div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                  Cooking Temperature Chart
                </h1>
              </div>
            </div>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Professional temperature guide for all meats. Safe cooking temperatures, doneness levels, and resting times for commercial kitchens.
            </p>
          </div>
        </div>
      </section>

      {/* Food Safety Alert */}
      <section className="py-8 bg-orange-50 border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-orange-900 mb-2">Food Safety Notice</h3>
              <p className="text-orange-800 text-sm">
                These temperatures are based on UK Food Standards Agency and USDA guidelines. Always verify meat is cooked to safe internal temperatures. Use a calibrated probe thermometer inserted into the thickest part of the meat, away from bone, fat, or gristle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Beef Temperatures */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Beef Temperatures</h2>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Cut</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Rare</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Medium-Rare</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Medium</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Medium-Well</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Well Done</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Resting Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {beefTemperatures.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-900">{item.meat}</div>
                        {item.cut && <div className="text-sm text-gray-600">{item.cut}</div>}
                        {item.notes && <div className="text-xs text-orange-600 mt-1">{item.notes}</div>}
                      </td>
                      <td className="px-4 py-3 text-center text-sm">{item.rare || "—"}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-red-600">{item.mediumRare || "—"}</td>
                      <td className="px-4 py-3 text-center text-sm">{item.medium || "—"}</td>
                      <td className="px-4 py-3 text-center text-sm">{item.mediumWell || "—"}</td>
                      <td className="px-4 py-3 text-center text-sm">{item.wellDone || item.safe || "—"}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium">{item.restingTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pork Temperatures */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Pork Temperatures</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-pink-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Cut</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Medium</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Medium-Well</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Well Done / Safe</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Resting Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {porkTemperatures.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-900">{item.meat}</div>
                        {item.cut && <div className="text-sm text-gray-600">{item.cut}</div>}
                        {item.notes && <div className="text-xs text-orange-600 mt-1">{item.notes}</div>}
                      </td>
                      <td className="px-4 py-3 text-center text-sm">{item.medium || "—"}</td>
                      <td className="px-4 py-3 text-center text-sm">{item.mediumWell || "—"}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-pink-600">{item.wellDone || item.safe || "—"}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium">{item.restingTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Lamb Temperatures */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Lamb Temperatures</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Cut</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Rare</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Medium-Rare</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Medium</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Well Done / Safe</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Resting Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {lambTemperatures.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-900">{item.meat}</div>
                        {item.cut && <div className="text-sm text-gray-600">{item.cut}</div>}
                        {item.notes && <div className="text-xs text-orange-600 mt-1">{item.notes}</div>}
                      </td>
                      <td className="px-4 py-3 text-center text-sm">{item.rare || "—"}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-purple-600">{item.mediumRare || "—"}</td>
                      <td className="px-4 py-3 text-center text-sm">{item.medium || "—"}</td>
                      <td className="px-4 py-3 text-center text-sm">{item.wellDone || item.safe || "—"}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium">{item.restingTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Poultry Temperatures */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Poultry Temperatures</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-yellow-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Safe Temperature</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Resting Time</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {poultryTemperatures.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-900">{item.meat}</div>
                        {item.cut && <div className="text-sm text-gray-600">{item.cut}</div>}
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-yellow-700">
                        {item.safe || item.mediumRare || item.medium || "—"}
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-medium">{item.restingTime}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">🌡️ Using a Probe Thermometer</h3>
              <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                <li>Insert into the thickest part of the meat</li>
                <li>Avoid touching bone, fat, or gristle</li>
                <li>Calibrate your thermometer regularly (ice water = 0°C, boiling water = 100°C)</li>
                <li>Clean and sanitize probe between uses</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">⏰ Resting is Critical</h3>
              <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                <li>Temperature rises 3-5°C during resting (carryover cooking)</li>
                <li>Allows juices to redistribute throughout the meat</li>
                <li>Cover loosely with foil while resting</li>
                <li>Rest time varies by size: 5 min for steaks, 20+ min for roasts</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">🔥 Different Cooking Methods</h3>
              <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                <li>Grilling: Higher heat, monitor closely to prevent burning</li>
                <li>Roasting: Lower temp, longer time for even cooking</li>
                <li>Sous vide: Precise temp control, no carryover cooking</li>
                <li>Pan-searing: High heat finish, finish in oven for thick cuts</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">⚠️ Food Safety Standards</h3>
              <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                <li>Ground meats: Always cook to 71°C minimum</li>
                <li>Poultry: Always cook to 74°C minimum (except duck breast)</li>
                <li>Whole cuts of beef/lamb: Can be served rare if seared</li>
                <li>Pork: Safe at 63°C with 3-minute rest (modern standards)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="text-center bg-white rounded-lg shadow-md p-8">
          <Download className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Download for Your Kitchen</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Print this temperature chart and keep it in your kitchen for quick reference. Ensure food safety and perfect results every time.
          </p>
          <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
            Download PDF Chart
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Laminated charts available for commercial kitchens - contact your account manager
          </p>
        </section>
      </div>

      {/* Final CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1600&q=80"
            alt="Perfect Cooking Every Time"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Perfect Cooking Every Time
          </h2>
          <p className="text-xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
            Source premium quality meats and cook them to perfection. Browse our complete range of professional-grade beef, pork, lamb, and poultry.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products?category=beef">
              <Button variant="secondary" size="lg">
                Browse Premium Meats
              </Button>
            </Link>
            <Link href="/resources">
              <Button
                variant="secondary"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600"
              >
                More Professional Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForResourcePage("cooking-temperatures") && (
        <SEOContentSection content={getSEOContentForResourcePage("cooking-temperatures")!} />
      )}
    </main>
  );
}
