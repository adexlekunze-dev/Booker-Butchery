import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Flame, Clock, ThermometerSun } from 'lucide-react';
import { SEOContentSection } from '@/components/sectors/SEOContentSection';

export const metadata: Metadata = {
  title: 'Lamb Cuts Guide | Understanding Lamb Primal Cuts | Premium Butchery',
  description: 'Complete guide to lamb cuts including rack, leg, shoulder, and loin. Learn about cooking methods and how to select quality lamb for fine dining.',
  keywords: 'lamb cuts, lamb primal cuts, rack of lamb, lamb leg, lamb shoulder, lamb cooking guide',
};

const primalCuts = [
  {
    name: 'Rack',
    description: 'The most premium cut of lamb, featuring tender, well-marbled meat. Perfect for special occasions.',
    subCuts: ['Rack of Lamb', 'Rib Chops', 'Frenched Rack'],
    cookingMethods: ['Roasting', 'Grilling', 'Pan-Searing'],
    bestFor: 'Fine dining, special occasions, impressive presentations',
    tenderness: 'Highest',
    flavor: 'Excellent',
  },
  {
    name: 'Loin',
    description: 'Tender cut from along the spine. Yields premium chops and medallions.',
    subCuts: ['Loin Chops', 'Tenderloin', 'Noisettes', 'Saddle'],
    cookingMethods: ['Grilling', 'Pan-Searing', 'Roasting'],
    bestFor: 'Premium chops and medallions, upscale menus',
    tenderness: 'Very High',
    flavor: 'Excellent',
  },
  {
    name: 'Leg',
    description: 'Large, versatile cut perfect for roasting whole or broken into smaller portions.',
    subCuts: ['Whole Leg', 'Leg Steaks', 'Shank', 'Sirloin End'],
    cookingMethods: ['Roasting', 'Grilling', 'Braising'],
    bestFor: 'Traditional roasts, kebabs, and Mediterranean cuisine',
    tenderness: 'Medium-High',
    flavor: 'Very Good',
  },
  {
    name: 'Shoulder',
    description: 'Flavorful, well-marbled cut perfect for slow cooking and braising.',
    subCuts: ['Shoulder Roast', 'Shoulder Chops', 'Diced Shoulder'],
    cookingMethods: ['Slow Roasting', 'Braising', 'Stewing'],
    bestFor: 'Slow-cooked dishes, tagines, and curries',
    tenderness: 'Medium',
    flavor: 'Rich',
  },
  {
    name: 'Breast & Shank',
    description: 'Economical cuts with rich flavor, perfect for slow cooking.',
    subCuts: ['Breast', 'Shank', 'Riblets'],
    cookingMethods: ['Braising', 'Slow Roasting', 'Confit'],
    bestFor: 'Osso buco style, slow-cooked preparations',
    tenderness: 'Low (until cooked)',
    flavor: 'Excellent',
  },
];

const cookingTips = [
  {
    icon: ThermometerSun,
    title: 'Temperature Guide',
    tips: [
      'Rare: 115-120°F (46-49°C)',
      'Medium Rare: 125-130°F (52-54°C) - recommended',
      'Medium: 130-140°F (54-60°C)',
      'Medium Well: 140-150°F (60-66°C)',
      'Lamb is best served pink',
    ],
  },
  {
    icon: Clock,
    title: 'Resting Time',
    tips: [
      'Lamb chops: 5 minutes',
      'Rack of lamb: 10 minutes',
      'Leg roast: 15-20 minutes',
      'Shoulder: 20-30 minutes',
      'Tent loosely with foil',
    ],
  },
  {
    icon: Flame,
    title: 'Cooking Methods',
    tips: [
      'Premium cuts benefit from simple seasoning',
      'Rosemary and garlic are classic pairings',
      'Render fat cap for flavor',
      'Marinating tenderizes tougher cuts',
      'High heat searing locks in juices',
    ],
  },
];

export default function LambCutGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/cut-guides" className="inline-flex items-center text-primary hover:text-orange-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Cut Guides
          </Link>
        </div>
      </div>

      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558030006-450675393462?w=1600&q=80"
            alt="Lamb Cuts Guide"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              Lamb Cuts Guide
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Master lamb cuts from rack to leg, perfect for fine dining and special occasions
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Understanding Lamb Primal Cuts
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Lamb is prized for its tender, flavorful meat with distinctive taste. The younger the animal, the milder and more tender the meat. Spring lamb (3-5 months) is the most delicate, while regular lamb (under 1 year) offers more developed flavor.
          </p>
          <p className="text-lg text-gray-600">
            Lamb cuts from the loin and rack are extremely tender and best served medium-rare to medium. Cuts from the shoulder and leg benefit from slower cooking to break down connective tissue while maintaining moisture.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Lamb Primal Cuts & Applications
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {primalCuts.map((cut) => (
              <div key={cut.name} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-orange-50 border-b-2 border-orange-200 px-6 py-4">
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

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Professional Cooking Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cookingTips.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-lg mb-4">
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
            src="https://images.unsplash.com/photo-1558030006-450675393462?w=1600&q=80"
            alt="Browse Our Lamb Selection"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Browse Our Lamb Selection
          </h2>
          <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
            Discover our premium lamb products perfect for fine dining and special occasions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/butchery/shop?category=LAMB"
              className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Shop Lamb Products
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
      <SEOContentSection content={`<h2>Professional Lamb Cuts Guide for Chefs, Caterers, and Fine Dining Operations</h2>
<p>Understanding <strong>lamb cuts</strong> is essential for fine dining, special occasion menus, and contemporary gastronomy - whether you're an executive chef featuring <strong>rack of lamb</strong> as a signature dish, a head chef managing <strong>lamb shoulder</strong> for braising and slow-cooked preparations, or a catering manager planning <strong>lamb leg</strong> for carving stations. Booker's <strong>lamb cuts guide</strong> provides comprehensive resources covering all major <strong>lamb primal cuts</strong> - rack, loin, leg, shoulder, breast, and shank - with detailed cooking methods, temperature guides, and culinary applications designed for UK chefs and food service professionals.</p>

<h3>Rack of Lamb: The Premium Cut for Fine Dining Presentations</h3>
<p><strong>Rack of lamb</strong> represents the pinnacle of lamb cuts - eight ribs from the rib primal, perfectly suited for elegant presentations and premium pricing. Executive chefs master <strong>French-trimmed rack of lamb</strong> (clean bones exposed for dramatic presentation), <strong>crown roast of lamb</strong> (two racks tied in circular crown shape for special occasions), and individual <strong>lamb chops</strong> (cut between bones for plated service). Preparation techniques include <strong>roasting rack of lamb</strong> - season with herbs (rosemary, thyme, garlic), sear all sides for caramelization, roast at 375-400°F to internal temperature of 125-130°F for medium-rare (the optimal doneness for lamb's delicate flavor), rest 10 minutes before carving. Fine dining applications feature herb crusts (Dijon mustard and panko with fresh herbs), pistachio crusts, tapenade coatings, and modern presentations with seasonal vegetables and refined sauces.</p>

<h3>Lamb Leg: Versatile Cut for Roasting and Carving Stations</h3>
<p><strong>Lamb leg</strong> provides exceptional value and versatility for diverse operations - <strong>whole leg of lamb</strong> (bone-in for traditional roasting and carving, feeds 8-10 guests), <strong>boneless leg of lamb</strong> (easier to carve, perfect for stuffing and rolling), <strong>lamb leg steaks</strong> (cut from the leg for grilling and quick cooking), and <strong>butterflied leg of lamb</strong> (opened flat for even grilling or roasting). Chefs discover <strong>roasting lamb leg</strong> techniques - score fat, insert garlic slivers and rosemary, season generously, roast at 325°F to 135°F internal temperature for medium-rare (about 20 minutes per pound), rest before carving. Applications span cuisines - traditional British Sunday roast with mint sauce, Greek-style butterflied leg with oregano and lemon, Moroccan-spiced leg with cumin and coriander, and contemporary presentations with seasonal glazes.</p>

<h3>Lamb Shoulder: Rich, Flavorful Cut for Braising and Slow Cooking</h3>
<p><strong>Lamb shoulder</strong> delivers rich flavor and exceptional value through slow-cooking methods - well-marbled with fat and connective tissue that transforms into tender, succulent meat with proper technique. <strong>Bone-in lamb shoulder</strong> provides maximum flavor for traditional braises, while <strong>boneless lamb shoulder</strong> allows for stuffing, rolling, and portioning. Head chefs master <strong>braising lamb shoulder</strong> - sear all sides to develop color, add aromatics (onions, garlic, herbs), incorporate liquid (wine, stock), cover and braise at 300-325°F for 3-4 hours until fork-tender. Applications include <strong>slow-roasted lamb shoulder</strong> (Greek kleftiko, Middle Eastern preparations), <strong>pulled lamb</strong> (shred for tacos, flatbreads, contemporary presentations), <strong>lamb stew and tagine</strong> (Moroccan and North African cuisine), and modern nose-to-tail preparations.</p>

<h3>Lamb Loin and Saddle: Premium Cuts for Quick Cooking</h3>
<p><strong>Lamb loin</strong> from the back provides tender, lean meat ideal for quick, high-heat cooking - <strong>lamb loin chops</strong> (equivalent to T-bone or porterhouse, containing both loin and tenderloin), <strong>lamb loin roast</strong> (boneless loin rolled for elegant presentations), and <strong>lamb tenderloin</strong> (smallest, most tender cut, mild flavor). <strong>Saddle of lamb</strong> (both loins connected across the backbone) creates impressive presentations for special occasions. Cooking techniques emphasize quick methods - <strong>grilling lamb loin chops</strong> (3-4 minutes per side to medium-rare), <strong>pan-searing lamb loin</strong> (high heat sear, finish in oven), and <strong>roasting loin roast</strong> (herbs and garlic, quick roast to 130°F internal temperature). Fine dining applications feature lamb loin medallions with refined sauces, herb-crusted preparations, and elegant plating techniques.</p>

<h3>Specialty Lamb Cuts: Shanks, Breast, and Contemporary Applications</h3>
<p><strong>Lamb shanks</strong> have become menu stars through braising and contemporary presentations - the lower leg portion contains bone, marrow, and connective tissue that creates rich, unctuous dishes when slow-cooked. Chefs master <strong>braised lamb shanks</strong> - sear shanks, add aromatics and liquid, braise at 300°F for 2-3 hours until meat pulls easily from bone. Applications include <strong>red wine-braised lamb shanks</strong> (classic French preparation), <strong>Moroccan lamb shanks</strong> (with apricots, almonds, and warming spices), and contemporary plating with creamy polenta or root vegetable purees. <strong>Lamb breast</strong> offers economical, fatty cut perfect for slow roasting, rolling and stuffing, or cutting into <strong>lamb riblets</strong> for BBQ-style preparations. <strong>Lamb neck</strong> provides collagen-rich meat ideal for stocks, stews, and nose-to-tail menus.</p>

<h3>Lamb Cooking Methods and Temperature Guide for Professional Kitchens</h3>
<p>Professional <strong>lamb cooking temperatures</strong> optimize flavor and texture - <strong>rare lamb</strong> (120-125°F, cool red center, not recommended for most guests), <strong>medium-rare lamb</strong> (130-135°F, warm pink center, optimal for most cuts and preferred doneness), <strong>medium lamb</strong> (135-145°F, warm pink throughout, acceptable for guests who prefer more doneness), <strong>well-done lamb</strong> (155°F+, fully cooked, only for specific guest requests or slow-cooked preparations). <strong>High-heat lamb cooking methods</strong> work best for tender cuts - <strong>grilling lamb</strong> (rack, chops, butterflied leg), <strong>pan-searing lamb</strong> (chops, loin, cutlets), roasting at high temperature (rack, loin). <strong>Slow-cooking lamb methods</strong> transform tougher cuts - <strong>braising lamb</strong> (shoulder, shanks, neck), <strong>slow roasting lamb</strong> (shoulder, breast), <strong>stewing lamb</strong> (shoulder, neck, breast for traditional preparations).</p>

<h3>Selecting Quality Lamb: Age, Origin, and Seasonal Considerations</h3>
<p>Understanding <strong>lamb quality</strong> helps chefs select appropriate products for their menus. <strong>UK lamb sourcing</strong> includes domestic British lamb (available year-round with peak season in spring and summer, mild flavor, tender texture), New Zealand lamb (imported, grass-fed, distinctive flavor, leaner), and specialty lamb breeds (Salt Marsh lamb, Welsh Mountain lamb, unique characteristics). <strong>Lamb age classifications</strong> - spring lamb (3-5 months, most tender, delicate flavor, premium pricing), lamb (under 1 year, standard category, excellent for most applications), and yearling mutton (1-2 years, stronger flavor, requires longer cooking). Chefs consider <strong>seasonality</strong> - spring lamb arrives March-June with premium tenderness, summer lamb June-September offers excellent value, while autumn-winter lamb suits heartier preparations. Premium operations may feature <strong>grass-fed lamb</strong> (cleaner flavor, leaner), <strong>grain-finished lamb</strong> (more marbling, milder taste), or specialty production methods.</p>

<h3>Why Professional Chefs Use Booker's Lamb Cuts Guide</h3>
<p>Booker's comprehensive <strong>lamb cuts guide</strong> provides UK chefs, caterers, and fine dining professionals with detailed knowledge for success. Each <strong>lamb primal cut</strong> includes anatomical information and cut characteristics, <strong>lamb sub-cuts</strong> with specific applications and presentation techniques, <strong>lamb cooking methods</strong> matched to cut properties (grilling, roasting, braising, searing), internal temperature guidelines for optimal doneness and food safety, culinary applications across global cuisines (French, Greek, Middle Eastern, Moroccan, contemporary), and cost-per-portion guidance for menu pricing and profitability. Whether you're sourcing <strong>rack of lamb</strong> for fine dining tasting menus, <strong>lamb leg</strong> for carving stations and special occasions, <strong>lamb shoulder</strong> for braised features and contemporary presentations, <strong>lamb shanks</strong> for signature dishes, or <strong>lamb loin</strong> for quick-service premium offerings - Booker's lamb cuts guide helps you make informed decisions that elevate food quality, manage costs, and expand your culinary repertoire.</p>

<p>Master professional <strong>lamb butchery</strong> with our complete <strong>lamb cuts guide</strong> - free resources for UK chefs, caterers, and fine dining professionals from Booker wholesale butchery.</p>`} />


    </div>
  );
}
