import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { BeefCutDiagram } from "@/components/diagrams/BeefCutDiagram";
import { getSEOContentForResourcePage } from "@/data/quality-resource-seo-content";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Interactive Beef Cuts Diagram | Professional Butchery Guide | Booker",
  description: "Interactive guide to beef primal cuts. Explore ribeye, sirloin, fillet, rump, brisket and more. Understand uses, pricing, and cooking methods for each cut.",
  keywords: "beef cuts, primal cuts, ribeye, sirloin, fillet, brisket, rump, butchery diagram, beef anatomy, meat cuts guide",
};

export default function BeefCutsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1600&q=80"
            alt="Interactive Beef Cuts Diagram"
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
                <BookOpen className="w-12 h-12" />
              </div>
              <div>
                <div className="text-white/90 text-sm font-semibold mb-1 drop-shadow-md">PROFESSIONAL RESOURCE</div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                  Interactive Beef Cuts Diagram
                </h1>
              </div>
            </div>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Explore beef primal cuts with our interactive diagram. Learn where each cut comes from, how to use it, and browse our products.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Interactive Diagram */}
        <BeefCutDiagram />

        {/* Understanding Beef Cuts */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Beef Primal Cuts</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              A beef carcass is broken down into primal cuts—large sections from specific parts of the animal. Each primal has unique characteristics based on the muscle's function, fat content, and connective tissue. Understanding these cuts helps you select the right beef for your cooking method and menu.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Cuts (Tender)</h3>
                <p className="text-sm text-gray-700 mb-3">
                  These cuts come from muscles that do less work, making them naturally tender. They command premium pricing and are best for quick, high-heat cooking.
                </p>
                <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                  <li><strong>Fillet (Tenderloin):</strong> Most tender, least marbled. Delicate flavor, premium price.</li>
                  <li><strong>Ribeye (Fore Rib):</strong> Highly marbled, rich flavor. The steakhouse favorite.</li>
                  <li><strong>Sirloin (Striploin):</strong> Good balance of tenderness and flavor. Leaner than ribeye.</li>
                  <li><strong>Rump:</strong> Lean and flavorful. Good value for steaks and roasting.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Working Cuts (Flavorful)</h3>
                <p className="text-sm text-gray-700 mb-3">
                  From harder-working muscles with more connective tissue. Require slow cooking but deliver exceptional flavor and tenderness when cooked properly.
                </p>
                <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                  <li><strong>Chuck & Blade:</strong> Shoulder area. Perfect for braising, stewing, ground beef.</li>
                  <li><strong>Brisket:</strong> Breast area. Classic for smoking, braising, salt beef.</li>
                  <li><strong>Shin (Shank):</strong> Lower leg. Rich flavor, needs long slow cooking.</li>
                  <li><strong>Flank:</strong> Abdominal area. Lean, flavorful, great for grilling when sliced thin.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cooking Methods by Cut */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recommended Cooking Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🔥 High-Heat Grilling</h3>
              <p className="text-sm text-gray-700 mb-3">
                Quick cooking over high heat. Best for tender, well-marbled cuts.
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                <li>Ribeye steaks</li>
                <li>Sirloin steaks</li>
                <li>Fillet steaks</li>
                <li>Rump steaks</li>
                <li>Thin-sliced flank</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🍖 Roasting</h3>
              <p className="text-sm text-gray-700 mb-3">
                Dry heat in the oven. For tender cuts or slow-roasting tougher joints.
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                <li>Ribeye joints</li>
                <li>Sirloin roasts</li>
                <li>Topside</li>
                <li>Fillet</li>
                <li>Rump roasts</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🥘 Braising & Stewing</h3>
              <p className="text-sm text-gray-700 mb-3">
                Low and slow with liquid. Perfect for tougher cuts with connective tissue.
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                <li>Chuck & blade</li>
                <li>Brisket</li>
                <li>Shin (shank)</li>
                <li>Silverside</li>
                <li>Short ribs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quality Factors */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Quality Factors to Consider</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Marbling</h3>
              <p className="text-sm text-gray-700 mb-3">
                Intramuscular fat distributed throughout the meat. More marbling = more flavor and juiciness. Premium cuts like ribeye have abundant marbling.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-xs text-red-900">
                  <strong>Pro Tip:</strong> Marbling melts during cooking, basting the meat from inside and creating that rich, buttery texture. Look for fine, evenly distributed marbling rather than large fat chunks.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Aging</h3>
              <p className="text-sm text-gray-700 mb-3">
                Dry-aging concentrates flavor and improves tenderness through enzymatic breakdown. Our Blackgate range is dry-aged for 28 days for optimal results.
              </p>
              <Link
                href="/resources/aging-guide"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm transition-colors"
              >
                Learn about aging process →
              </Link>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Breed & Feed</h3>
              <p className="text-sm text-gray-700 mb-3">
                British breeds raised on pasture develop excellent flavor. Grass-fed beef tends to be leaner with a more pronounced beef taste. Grain-finishing adds marbling.
              </p>
              <Link
                href="/quality/british-beef"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm transition-colors"
              >
                About our British beef →
              </Link>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Butchery Skill</h3>
              <p className="text-sm text-gray-700 mb-3">
                Proper butchery respects muscle structure, removes excess fat/silverskin correctly, and cuts against or with the grain as appropriate for each cut.
              </p>
              <Link
                href="/resources/butchery-specs"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm transition-colors"
              >
                View butchery specifications →
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* Final CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1600&q=80"
            alt="Browse Our Beef Range"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Browse Our Beef Range
          </h2>
          <p className="text-xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
            From premium Blackgate dry-aged ribeye to value-packed chuck for braising. 100% British beef with full traceability.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/butchery/shop?category=BEEF">
              <Button variant="secondary" size="lg">
                View All Beef Products
              </Button>
            </Link>
            <Link href="/butchery/shop?brand=Blackgate">
              <Button
                variant="secondary"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600"
              >
                Browse Blackgate Range
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      {getSEOContentForResourcePage("beef-cuts") && (
        <SEOContentSection content={getSEOContentForResourcePage("beef-cuts")!} />
      )}
    </main>
  );
}
