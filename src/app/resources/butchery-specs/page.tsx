import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, ArrowLeft, Scale, Ruler, BookOpen } from "lucide-react";
import { getSEOContentForResourcePage } from "@/data/quality-resource-seo-content";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Butchery Specifications & Standards | Booker Wholesale",
  description: "Industry-standard butchery specifications for beef, pork, and lamb. Cut definitions, yield percentages, portioning standards, quality grading, and professional butchery references.",
  keywords: "butchery specifications, meat cuts, yield percentages, portioning standards, quality grading, butchery standards, professional butchery",
};

type CutSpec = {
  cut: string;
  code?: string;
  weight?: string;
  yield?: string;
  portionSize?: string;
  description: string;
};

const beefPrimalCuts: CutSpec[] = [
  {
    cut: "Fore Rib (Ribeye)",
    code: "UNECE 2150",
    weight: "9-12 kg",
    yield: "8-10%",
    portionSize: "225-300g steaks",
    description: "Premium cut from ribs 6-12. Highly marbled, excellent for steaks and roasting. Contains ribeye muscle, spinalis, and cap."
  },
  {
    cut: "Striploin (Sirloin)",
    code: "UNECE 2160",
    weight: "7-10 kg",
    yield: "6-8%",
    portionSize: "225-280g steaks",
    description: "From the short loin. Leaner than ribeye but tender. Ideal for steaks, roasting. Well-defined grain structure."
  },
  {
    cut: "Fillet (Tenderloin)",
    code: "UNECE 2190",
    weight: "2.5-3.5 kg",
    yield: "2-3%",
    portionSize: "175-225g steaks",
    description: "Most tender cut from the loin. Minimal marbling, delicate flavor. Premium pricing. Includes chateaubriand, tournedos."
  },
  {
    cut: "Rump",
    code: "UNECE 2200",
    weight: "8-11 kg",
    yield: "7-9%",
    portionSize: "200-250g steaks",
    description: "From the hindquarter. Lean, flavorful cut. Good for steaks, roasting, dicing. Contains multiple muscles."
  },
  {
    cut: "Topside",
    code: "UNECE 2210",
    weight: "9-12 kg",
    yield: "8-10%",
    portionSize: "N/A (roasting joint)",
    description: "Lean roasting joint from the hindquarter. Minimal fat, even grain. Ideal for slow roasting or braising."
  },
  {
    cut: "Silverside",
    code: "UNECE 2220",
    weight: "7-10 kg",
    yield: "6-8%",
    portionSize: "N/A (braising/corning)",
    description: "From the hindquarter. Traditional for salt beef/corned beef. Requires slow cooking methods."
  },
  {
    cut: "Brisket",
    code: "UNECE 2320",
    weight: "7-9 kg",
    yield: "6-8%",
    portionSize: "150-200g sliced",
    description: "Breast/lower chest. High connective tissue. Perfect for low and slow smoking, braising. Point and flat cuts."
  },
  {
    cut: "Chuck & Blade",
    code: "UNECE 2050",
    weight: "15-20 kg",
    yield: "12-15%",
    portionSize: "200g diced",
    description: "Shoulder area. Flavorful, requires slow cooking. Ideal for stewing, braising, ground beef."
  },
];

const porkPrimalCuts: CutSpec[] = [
  {
    cut: "Pork Loin",
    code: "UNECE 3110",
    weight: "4-6 kg",
    yield: "10-12%",
    portionSize: "175-225g chops",
    description: "From the back. Lean, tender cut. Includes loin chops, tenderloin, back ribs. Can be roasted whole or portioned."
  },
  {
    cut: "Pork Belly",
    code: "UNECE 3130",
    weight: "5-7 kg",
    yield: "12-15%",
    portionSize: "150-200g portions",
    description: "Underside cut. High fat content, rich flavor. Used for bacon, pork belly roasts, braising. Requires skin scoring."
  },
  {
    cut: "Pork Shoulder",
    code: "UNECE 3050",
    weight: "6-9 kg",
    yield: "15-18%",
    portionSize: "150g pulled pork",
    description: "Upper foreleg and shoulder blade. Marbled, flavorful. Ideal for slow roasting, pulled pork, stewing."
  },
  {
    cut: "Pork Leg (Ham)",
    code: "UNECE 3140",
    weight: "8-12 kg",
    yield: "20-25%",
    portionSize: "200g roast slices",
    description: "Hind leg. Lean, large joint. Perfect for roasting, curing for ham. Can be divided into topside, silverside, knuckle."
  },
  {
    cut: "Spare Ribs",
    code: "UNECE 3125",
    weight: "1.5-2.5 kg",
    yield: "3-5%",
    portionSize: "400-500g rack",
    description: "From the belly area. Meaty ribs with good fat marbling. Popular for BBQ, slow cooking, grilling."
  },
];

const lambPrimalCuts: CutSpec[] = [
  {
    cut: "Lamb Leg",
    code: "UNECE 4140",
    weight: "2.5-3.5 kg",
    yield: "25-30%",
    portionSize: "175-200g roast slices",
    description: "Hind leg. Versatile, lean cut. Can be roasted whole, butterflied, or divided into steaks. Premium roasting joint."
  },
  {
    cut: "Lamb Shoulder",
    code: "UNECE 4050",
    weight: "2-3 kg",
    yield: "20-25%",
    portionSize: "150g portions",
    description: "Forequarter. Well-marbled, flavorful. Ideal for slow roasting, braising, dicing for stews and curries."
  },
  {
    cut: "Lamb Rack",
    code: "UNECE 4110",
    weight: "0.8-1.2 kg",
    yield: "8-10%",
    portionSize: "3-4 cutlets (200g)",
    description: "Premium cut from ribs 6-12. French-trimmed for presentation. Tender, impressive for special occasions."
  },
  {
    cut: "Lamb Loin",
    code: "UNECE 4120",
    weight: "0.6-1 kg",
    yield: "6-8%",
    portionSize: "150-175g chops",
    description: "From the back between ribs and leg. Tender, lean cut. Includes loin chops and noisettes."
  },
  {
    cut: "Lamb Breast",
    code: "UNECE 4130",
    weight: "0.8-1.2 kg",
    yield: "8-10%",
    portionSize: "200g portions",
    description: "Lower chest area. Fatty cut with good flavor. Requires slow cooking, braising, or rolling and stuffing."
  },
  {
    cut: "Lamb Neck",
    code: "UNECE 4030",
    weight: "0.5-0.8 kg",
    yield: "5-7%",
    portionSize: "N/A (stewing)",
    description: "From the neck area. Economical cut with excellent flavor. Perfect for slow-cooked stews, tagines, curries."
  },
];

const qualityGrades = [
  {
    grade: "Prime (US) / Select (UK)",
    marbling: "Abundant",
    characteristics: "Highest quality. Extensive marbling throughout. Exceptional tenderness, flavor, juiciness. ~2-3% of production.",
    bestFor: "Premium steakhouses, high-end dining, special occasions"
  },
  {
    grade: "Choice (US) / Standard (UK)",
    marbling: "Moderate",
    characteristics: "High quality. Good marbling with less than Prime. Very tender and flavorful. ~50% of production.",
    bestFor: "Quality restaurants, retail, everyday premium dining"
  },
  {
    grade: "Select (US) / Commercial (UK)",
    marbling: "Slight",
    characteristics: "Good quality. Leaner than Choice. Less tender, may require marinating or slow cooking. ~30% of production.",
    bestFor: "Cost-conscious operations, lean menu options, braising cuts"
  },
];

export default function ButcherySpecsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1600&q=80"
            alt="Butchery Specifications"
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
                <Award className="w-12 h-12" />
              </div>
              <div>
                <div className="text-white/90 text-sm font-semibold mb-1 drop-shadow-md">PROFESSIONAL RESOURCE</div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                  Butchery Specifications
                </h1>
              </div>
            </div>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Industry-standard butchery specifications. Cut definitions, yields, portioning standards, and quality grading for professional kitchens.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Butchery Standards</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Professional butchery specifications ensure consistency, quality control, and efficient kitchen operations. These industry standards define how carcasses are broken down, how cuts are trimmed, and what yields to expect.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This guide follows <strong>UNECE (United Nations Economic Commission for Europe)</strong> standards for meat cutting and classification, which are widely adopted across the UK and Europe for commercial meat trading.
          </p>
        </section>

        {/* Beef Primal Cuts */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">Beef Primal Cuts</h2>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Cut Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">UNECE Code</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Typical Weight</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Carcass Yield</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Description & Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {beefPrimalCuts.map((cut, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-900">{cut.cut}</div>
                        {cut.portionSize && <div className="text-xs text-gray-600 mt-1">Portion: {cut.portionSize}</div>}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-mono">{cut.code}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium">{cut.weight}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-red-600">{cut.yield}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{cut.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pork Primal Cuts */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-8 h-8 text-pink-600" />
            <h2 className="text-3xl font-bold text-gray-900">Pork Primal Cuts</h2>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-pink-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Cut Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">UNECE Code</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Typical Weight</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Carcass Yield</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Description & Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {porkPrimalCuts.map((cut, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-900">{cut.cut}</div>
                        {cut.portionSize && <div className="text-xs text-gray-600 mt-1">Portion: {cut.portionSize}</div>}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-mono">{cut.code}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium">{cut.weight}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-pink-600">{cut.yield}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{cut.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Lamb Primal Cuts */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Lamb Primal Cuts</h2>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Cut Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">UNECE Code</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Typical Weight</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Carcass Yield</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Description & Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {lambPrimalCuts.map((cut, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-900">{cut.cut}</div>
                        {cut.portionSize && <div className="text-xs text-gray-600 mt-1">Portion: {cut.portionSize}</div>}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-mono">{cut.code}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium">{cut.weight}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-purple-600">{cut.yield}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{cut.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quality Grading */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Quality Grading Systems</h2>
          </div>
          <p className="text-gray-700 mb-6">
            Quality grades evaluate beef based on marbling (intramuscular fat), maturity, color, and texture. Higher grades command premium pricing but ensure superior eating quality.
          </p>
          <div className="space-y-4">
            {qualityGrades.map((grade, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">{grade.grade}</h4>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                        {grade.marbling} Marbling
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{grade.characteristics}</p>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-900">Best For: </span>
                      <span className="text-gray-700">{grade.bestFor}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portioning Standards */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Professional Portioning Standards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4">Beef Steaks</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Fillet:</strong> 175-225g (6-8oz)</li>
                <li><strong>Ribeye:</strong> 225-300g (8-10oz)</li>
                <li><strong>Sirloin/Strip:</strong> 225-280g (8-10oz)</li>
                <li><strong>Rump:</strong> 200-250g (7-9oz)</li>
                <li><strong>Sharing Steak:</strong> 500-700g (18-25oz)</li>
              </ul>
              <p className="text-xs text-gray-600 mt-4">
                Thickness: 2.5-3.5cm for optimal cooking
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4">Pork & Lamb</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Pork Chops:</strong> 175-225g (6-8oz)</li>
                <li><strong>Pork Belly:</strong> 150-200g (5-7oz)</li>
                <li><strong>Lamb Chops:</strong> 150-175g (5-6oz)</li>
                <li><strong>Lamb Cutlets:</strong> 3-4 bones (200g)</li>
                <li><strong>Lamb Leg Steak:</strong> 175-200g (6-7oz)</li>
              </ul>
              <p className="text-xs text-gray-600 mt-4">
                Adjust for bone-in cuts: add 30-40% weight
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4">Roasting Joints</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Beef Rib:</strong> 200-250g per person</li>
                <li><strong>Beef Topside:</strong> 150-200g per person</li>
                <li><strong>Pork Loin:</strong> 175-225g per person</li>
                <li><strong>Pork Shoulder:</strong> 200-250g per person</li>
                <li><strong>Lamb Leg:</strong> 175-200g per person</li>
              </ul>
              <p className="text-xs text-gray-600 mt-4">
                Includes bone weight and trim allowance
              </p>
            </div>
          </div>
        </section>

        {/* Yield & Trim Standards */}
        <section className="bg-orange-50 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl font-bold text-gray-900">Yield & Trim Loss Calculations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Expected Trim Loss</h4>
              <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                <li><strong>Whole Primal to Retail Cuts:</strong> 15-25% trim loss</li>
                <li><strong>Fat Cap Trimming:</strong> 5-10% (depends on specification)</li>
                <li><strong>Silverskin Removal:</strong> 3-5% (fillet, tenderloins)</li>
                <li><strong>Bone-In to Boneless:</strong> 20-30% (includes bone weight)</li>
                <li><strong>Dry Aging Trim:</strong> 15-30% (crust removal + moisture)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Kitchen Yield Factors</h4>
              <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                <li><strong>Cooking Loss (Steaks):</strong> 20-25% shrinkage</li>
                <li><strong>Cooking Loss (Roasts):</strong> 25-30% shrinkage</li>
                <li><strong>Cooking Loss (Braising):</strong> 30-40% shrinkage</li>
                <li><strong>Portioning Waste:</strong> 5-10% (end cuts, irregulars)</li>
                <li><strong>Total Raw to Plate:</strong> 40-50% yield typical</li>
              </ul>
            </div>
          </div>
          <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mt-6">
            <p className="text-sm text-orange-900">
              <strong>Example Calculation:</strong> To serve 50 guests 225g cooked steaks, order: 50 guests × 225g × 2.0 (50% yield) = <strong>22.5kg raw beef minimum</strong>
            </p>
          </div>
        </section>

        {/* Reference Guide */}
        <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Professional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-green-100 mb-3">Industry Standards</h4>
              <ul className="text-sm text-green-50 space-y-2 ml-4 list-disc">
                <li>UNECE Standard for Bovine Meat (Beef & Veal)</li>
                <li>UNECE Standard for Porcine Meat (Pork)</li>
                <li>UNECE Standard for Ovine Meat (Lamb & Mutton)</li>
                <li>USDA Institutional Meat Purchase Specifications (IMPS)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-green-100 mb-3">UK Grading Systems</h4>
              <ul className="text-sm text-green-50 space-y-2 ml-4 list-disc">
                <li>EUROP Classification (E, U, R, O, P grades)</li>
                <li>Fat Classification (1-5 scale)</li>
                <li>Red Tractor Assured Standards</li>
                <li>British Meat Standards for Quality</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Cut Diagrams CTA */}
        <section className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">📐 Interactive Beef Cuts Diagram Now Available!</h3>
          <p className="text-gray-700 mb-4">
            Interactive SVG diagram showing exactly where each cut comes from on the carcass, with hover details and direct links to products.
          </p>
          <Link
            href="/resources/beef-cuts"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors"
          >
            Explore the Interactive Beef Cuts Diagram →
          </Link>
        </section>
      </div>

      {/* Final CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1600&q=80"
            alt="Professional Standards"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Professional Standards
          </h2>
          <p className="text-xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
            Source premium cuts that meet professional specifications. Browse our complete range of expertly butchered meats.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products?category=beef">
              <Button variant="secondary" size="lg">
                Browse Beef Products
              </Button>
            </Link>
            <Link href="/resources/beef-cuts">
              <Button
                variant="secondary"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600"
              >
                View Interactive Cut Diagrams
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForResourcePage("butchery-specs") && (
        <SEOContentSection content={getSEOContentForResourcePage("butchery-specs")!} />
      )}
    </main>
  );
}
