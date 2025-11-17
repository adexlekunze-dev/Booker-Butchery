import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Flame, Clock, ThermometerSun } from 'lucide-react';
import { SEOContentSection } from '@/components/sectors/SEOContentSection';

export const metadata: Metadata = {
  title: 'Beef Cuts Guide | Understanding Beef Primal Cuts | Premium Butchery',
  description: 'Complete guide to beef cuts including chuck, rib, loin, sirloin, round, and brisket. Learn about cooking methods, best uses, and how to select quality beef for your menu.',
  keywords: 'beef cuts, beef primal cuts, ribeye, sirloin, chuck, brisket, beef cooking guide, butchery guide',
};

const primalCuts = [
  {
    name: 'Chuck',
    description: 'From the shoulder area, chuck is well-marbled and flavorful. Perfect for slow cooking, braising, and ground beef.',
    subCuts: ['Chuck Roast', 'Chuck Steak', 'Flat Iron Steak', 'Denver Steak'],
    cookingMethods: ['Braising', 'Slow Roasting', 'Grinding'],
    bestFor: 'Stews, pot roasts, burgers, and slow-cooked dishes',
    tenderness: 'Medium',
    flavor: 'Rich',
  },
  {
    name: 'Rib',
    description: 'Premium section containing the most tender and marbled cuts. Home to ribeye and prime rib.',
    subCuts: ['Ribeye Steak', 'Prime Rib', 'Short Ribs', 'Back Ribs'],
    cookingMethods: ['Grilling', 'Roasting', 'Pan-Searing'],
    bestFor: 'Premium steaks, roasts, and special occasions',
    tenderness: 'Very High',
    flavor: 'Excellent',
  },
  {
    name: 'Loin (Short Loin & Tenderloin)',
    description: 'The most tender section of beef, yielding premium steaks with minimal connective tissue.',
    subCuts: ['T-Bone', 'Porterhouse', 'Strip Steak', 'Tenderloin/Filet Mignon'],
    cookingMethods: ['Grilling', 'Pan-Searing', 'Broiling'],
    bestFor: 'Premium steakhouse offerings and fine dining',
    tenderness: 'Highest',
    flavor: 'Mild to Medium',
  },
  {
    name: 'Sirloin',
    description: 'Lean and flavorful cuts from the hip area. Great value with good flavor and moderate tenderness.',
    subCuts: ['Top Sirloin', 'Bottom Sirloin', 'Tri-Tip', 'Sirloin Tip'],
    cookingMethods: ['Grilling', 'Roasting', 'Stir-Frying'],
    bestFor: 'Versatile menu applications, good value steaks',
    tenderness: 'Medium-High',
    flavor: 'Good',
  },
  {
    name: 'Round',
    description: 'Lean cuts from the rear leg. Less tender but very lean, ideal for roasting and thin slicing.',
    subCuts: ['Top Round', 'Bottom Round', 'Eye of Round', 'Rump Roast'],
    cookingMethods: ['Slow Roasting', 'Braising', 'Thin Slicing'],
    bestFor: 'Roast beef, deli meats, and budget-conscious menus',
    tenderness: 'Low-Medium',
    flavor: 'Mild',
  },
  {
    name: 'Brisket',
    description: 'From the breast/chest area. Requires long, slow cooking to break down connective tissue.',
    subCuts: ['Whole Brisket', 'Flat Cut', 'Point Cut'],
    cookingMethods: ['Smoking', 'Braising', 'Slow Roasting'],
    bestFor: 'BBQ, corned beef, and low-and-slow preparations',
    tenderness: 'Low (until cooked)',
    flavor: 'Rich',
  },
  {
    name: 'Plate & Flank',
    description: 'Flavorful, grainy cuts from the belly area. Great for marinating and quick, high-heat cooking.',
    subCuts: ['Skirt Steak', 'Flank Steak', 'Hanger Steak'],
    cookingMethods: ['Grilling', 'Stir-Frying', 'Fajitas'],
    bestFor: 'Marinated dishes, fajitas, and Asian cuisine',
    tenderness: 'Medium',
    flavor: 'Very Good',
  },
  {
    name: 'Shank',
    description: 'The leg portion with lots of connective tissue. Perfect for stocks, soups, and osso buco.',
    subCuts: ['Fore Shank', 'Hind Shank', 'Cross-Cut Shank'],
    cookingMethods: ['Braising', 'Stock Making'],
    bestFor: 'Osso buco, beef stock, and slow-cooked dishes',
    tenderness: 'Low (until braised)',
    flavor: 'Excellent',
  },
];

const cookingTips = [
  {
    icon: ThermometerSun,
    title: 'Temperature Guide',
    tips: [
      'Rare: 120-130°F (49-54°C)',
      'Medium Rare: 130-135°F (54-57°C)',
      'Medium: 135-145°F (57-63°C)',
      'Medium Well: 145-155°F (63-68°C)',
      'Well Done: 155°F+ (68°C+)',
    ],
  },
  {
    icon: Clock,
    title: 'Resting Time',
    tips: [
      'Steaks: 5-10 minutes',
      'Roasts: 15-30 minutes',
      'Large roasts: 30-45 minutes',
      'Always tent with foil',
      'Internal temp rises 5-10°F',
    ],
  },
  {
    icon: Flame,
    title: 'Cooking Methods',
    tips: [
      'Tender cuts: High heat (grilling, searing)',
      'Tough cuts: Low & slow (braising, smoking)',
      'Always bring meat to room temp first',
      'Pat dry for better searing',
      'Season generously',
    ],
  },
];

export default function BeefCutGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/cut-guides" className="inline-flex items-center text-primary hover:text-orange-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Cut Guides
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=1600&q=80"
            alt="Beef Cuts Guide"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              Beef Cuts Guide
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Master the art of beef selection with our comprehensive guide to primal cuts, cooking methods, and culinary applications
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Understanding Beef Primal Cuts
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Beef is divided into eight primal cuts: chuck, rib, loin, sirloin, round, brisket, plate, and shank. Each primal cut contains different sub-cuts with varying levels of tenderness, marbling, and flavor. Understanding these differences is key to selecting the right cut for your cooking method and desired outcome.
          </p>
          <p className="text-lg text-gray-600">
            As a general rule, cuts from the middle of the animal (rib and loin) are the most tender because these muscles do less work. Cuts from the shoulder (chuck) and rear (round) work harder and require slower cooking methods to break down connective tissue and achieve tenderness.
          </p>
        </div>

        {/* Primal Cuts Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Beef Primal Cuts & Applications
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {primalCuts.map((cut) => (
              <div key={cut.name} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-red-50 border-b-2 border-red-200 px-6 py-4">
                  <h3 className="text-2xl font-bold text-gray-900">{cut.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{cut.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Sub-Cuts:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {cut.subCuts.map((subCut) => (
                          <li key={subCut}>{subCut}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Cooking Methods:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {cut.cookingMethods.map((method) => (
                          <li key={method}>{method}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Tenderness</div>
                      <div className="font-semibold text-gray-900">{cut.tenderness}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Flavor</div>
                      <div className="font-semibold text-gray-900">{cut.flavor}</div>
                    </div>
                    <div className="col-span-3 md:col-span-1">
                      <div className="text-sm text-gray-500 mb-1">Best For</div>
                      <div className="font-semibold text-gray-900">{cut.bestFor}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cooking Tips */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Professional Cooking Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cookingTips.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-lg mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.tips.map((tip) => (
                      <li key={tip} className="text-gray-600 text-sm flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=1600&q=80"
            alt="Browse Our Beef Selection"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Browse Our Beef Selection
          </h2>
          <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
            Discover our premium beef products sourced from trusted suppliers. From everyday cuts to premium aged beef.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/butchery/shop?category=BEEF"
              className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Shop Beef Products
            </Link>
            <Link
              href="/cut-guides"
              className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
            >
              View Other Guides
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContentSection content={`<h2>Professional Beef Cuts Guide for Chefs, Caterers, and Food Service Professionals</h2>
<p>Understanding <strong>beef cuts</strong> is essential for running successful restaurant, catering, and food service operations - whether you're an executive chef sourcing premium <strong>ribeye steaks</strong> for fine dining, a head chef managing <strong>beef portions</strong> for casual dining chains, or a procurement manager optimizing costs with versatile <strong>chuck roasts</strong> and <strong>brisket</strong>. Booker's <strong>beef cuts guide</strong> provides comprehensive resources covering all eight <strong>beef primal cuts</strong> - chuck, rib, loin, sirloin, round, brisket, plate, and shank - with detailed cooking methods, temperature guides, and culinary applications designed for UK chefs and food service professionals.</p>

<h3>Premium Beef Cuts: Rib and Loin for Fine Dining</h3>
<p>The <strong>rib primal cut</strong> produces the most sought-after <strong>premium beef</strong> including <strong>ribeye steaks</strong> (richly marbled with exceptional flavor), <strong>prime rib roasts</strong> (perfect for special occasions and carving stations), and <strong>short ribs</strong> (ideal for braising and contemporary presentations). Executive chefs discover <strong>28-day aged beef</strong> options, <strong>marbling grades</strong>, and presentation techniques for tasting menus. The <strong>loin primal cut</strong> yields the most tender beef including <strong>tenderloin/filet mignon</strong> (buttery tender, mild flavor), <strong>strip steaks/New York strip</strong> (balanced tenderness and flavor), <strong>T-bone steaks</strong> (strip and tenderloin in one cut), and <strong>porterhouse steaks</strong> (larger T-bone with more tenderloin). These <strong>premium beef cuts</strong> are best prepared with high-heat cooking methods - <strong>grilling beef steaks</strong>, <strong>pan-searing beef</strong>, or broiling - with target temperatures of 130-135°F for medium-rare perfection.</p>

<h3>Versatile Beef Cuts: Chuck, Sirloin, and Round for All Operations</h3>
<p><strong>Chuck beef cuts</strong> from the shoulder area provide exceptional value for diverse applications - <strong>chuck roast</strong> (perfect for pot roasts, braising, and slow-cooked dishes), <strong>chuck steaks</strong> (great for marinating and grilling), <strong>flat iron steaks</strong> (tender, flavorful, growing in popularity), <strong>Denver steaks</strong> (hidden gem for steakhouse menus), and <strong>ground beef</strong> (burgers, meatballs, Bolognese). Head chefs running casual dining operations discover economical <strong>beef cuts</strong> that deliver rich flavor through low-and-slow cooking. <strong>Sirloin beef cuts</strong> balance value and quality - <strong>top sirloin steaks</strong> (lean, flavorful, versatile), <strong>tri-tip roasts</strong> (perfect for slicing and carving), and <strong>sirloin tip</strong> (great for stir-fries and fajitas). <strong>Round beef cuts</strong> from the rear leg are lean and economical - <strong>top round</strong> and <strong>bottom round</strong> (ideal for roast beef and deli applications), <strong>eye of round</strong> (very lean, best for thin slicing), perfect for budget-conscious menus.</p>

<h3>Specialty Beef Cuts: Brisket, Plate, Flank, and Shank</h3>
<p><strong>Beef brisket</strong> from the breast area has become a menu star through BBQ and contemporary applications - <strong>whole packer brisket</strong> (includes both flat and point cuts for smoking), <strong>brisket flat</strong> (leaner, uniform thickness, easier to slice), <strong>brisket point</strong> (more marbling, perfect for burnt ends). Chefs learn <strong>smoking brisket</strong> techniques (low and slow at 225-250°F for 12-16 hours), <strong>braising brisket</strong> for traditional dishes, and creative brisket applications for modern menus. <strong>Plate and flank cuts</strong> deliver intense <strong>beef flavor</strong> - <strong>skirt steak</strong> (the authentic cut for fajitas), <strong>flank steak</strong> (lean, grainy texture, perfect for marinating and grilling), <strong>hanger steak</strong> (butcher's favorite, tender and flavorful). These cuts benefit from marinades, quick high-heat cooking, and slicing against the grain. <strong>Beef shank</strong> provides essential foundation for stocks, soups, and <strong>osso buco</strong> - cross-cut shanks reveal marrow bones perfect for braising and presentation.</p>

<h3>Beef Cooking Methods and Temperature Guide for Professional Kitchens</h3>
<p>Mastering <strong>beef cooking methods</strong> ensures perfect results across all cuts and applications. <strong>High-heat beef cooking</strong> (grilling, pan-searing, broiling) works best for tender cuts from the rib and loin - preheat cooking surface to high heat, bring beef to room temperature, pat dry for better crust formation, season generously, sear without moving to develop crust, and finish to target temperature. <strong>Low-and-slow beef cooking</strong> (braising, smoking, slow roasting) transforms tougher cuts from chuck, brisket, and shank - sear beef first to develop flavor, add liquid and aromatics, cook at 275-325°F for braising or 225-250°F for smoking until fork-tender. Professional <strong>beef temperature guidelines</strong>: Rare 120-130°F (cool red center), Medium-Rare 130-135°F (warm red center, optimal for most steaks), Medium 135-145°F (warm pink center), Medium-Well 145-155°F (slightly pink center), Well-Done 155°F+ (no pink, fully cooked). Always rest steaks 5-10 minutes and roasts 15-30 minutes before slicing - internal temperature rises 5-10°F during resting.</p>

<h3>Selecting Quality Beef: Grading, Aging, and Sourcing for Restaurants</h3>
<p>Understanding <strong>beef quality grades</strong> helps chefs select appropriate products for their menus and budgets. UK <strong>beef sourcing</strong> focuses on origin, breed, and production methods - British beef breeds (Aberdeen Angus, Hereford, Shorthorn), grass-fed vs grain-finished profiles, and farm assurance standards. <strong>Beef marbling</strong> (intramuscular fat) indicates tenderness, juiciness, and flavor - higher marbling provides richer taste and better texture, essential for premium steakhouse operations. <strong>Aged beef</strong> develops enhanced flavor and tenderness - <strong>28-day aged beef</strong> (industry standard for premium operations, balanced flavor development), <strong>dry-aged beef</strong> (21-45+ days, concentrated flavors, tender texture, higher cost, premium applications), <strong>wet-aged beef</strong> (vacuum-sealed aging, more economical, good for high-volume operations). Chefs select aging based on menu positioning, customer expectations, and cost parameters.</p>

<h3>Why Professional Chefs Use Booker's Beef Cuts Guide</h3>
<p>Booker's comprehensive <strong>beef cuts guide</strong> provides UK chefs, caterers, and food service professionals with the detailed knowledge needed to succeed. Each <strong>beef primal cut</strong> includes anatomical information showing muscle location and characteristics, <strong>beef sub-cuts</strong> with specific applications and menu uses, <strong>beef cooking methods</strong> matched to cut characteristics (grilling, roasting, braising, smoking, searing), internal temperature targets for food safety and optimal doneness, culinary applications across cuisines (steakhouse, casual dining, BBQ, fine dining, ethnic cuisine), and cost-per-portion guidance for menu pricing and profitability. Whether you're sourcing <strong>premium ribeye</strong> for fine dining tasting menus, <strong>versatile chuck</strong> for casual dining pot roasts, <strong>lean sirloin</strong> for health-conscious menus, <strong>brisket</strong> for BBQ operations, or <strong>ground beef</strong> for burgers and Bolognese - Booker's beef cuts guide helps you make informed decisions that improve food quality, control costs, and enhance your culinary offerings.</p>

<p>Master professional <strong>beef butchery</strong> with our complete <strong>beef cuts guide</strong> - free resources for UK chefs, caterers, and food service professionals from Booker wholesale butchery.</p>`} />
    </div>
  );
}
