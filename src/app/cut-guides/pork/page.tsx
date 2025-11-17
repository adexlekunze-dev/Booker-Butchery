import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Flame, Clock, ThermometerSun } from 'lucide-react';
import { SEOContentSection } from '@/components/sectors/SEOContentSection';

export const metadata: Metadata = {
  title: 'Pork Cuts Guide | Understanding Pork Primal Cuts | Premium Butchery',
  description: 'Complete guide to pork cuts including shoulder, loin, belly, and leg. Learn about cooking methods, best uses, and how to select quality pork for your menu.',
  keywords: 'pork cuts, pork primal cuts, pork loin, pork belly, pork shoulder, pork cooking guide, butchery guide',
};

const primalCuts = [
  {
    name: 'Shoulder (Boston Butt & Picnic)',
    description: 'Well-marbled and flavorful cut from the front leg and shoulder. Perfect for slow roasting and pulled pork.',
    subCuts: ['Boston Butt', 'Picnic Shoulder', 'Shoulder Steaks', 'Ground Pork'],
    cookingMethods: ['Slow Roasting', 'Braising', 'Smoking'],
    bestFor: 'Pulled pork, roasts, and slow-cooked applications',
    tenderness: 'Medium (when cooked low & slow)',
    flavor: 'Rich & Flavorful',
  },
  {
    name: 'Loin',
    description: 'The most tender section of pork, running along the back. Yields premium chops and roasts.',
    subCuts: ['Pork Chops', 'Tenderloin', 'Back Ribs', 'Loin Roast', 'Crown Roast'],
    cookingMethods: ['Grilling', 'Roasting', 'Pan-Searing'],
    bestFor: 'Premium chops, medallions, and special occasion roasts',
    tenderness: 'Very High',
    flavor: 'Mild & Sweet',
  },
  {
    name: 'Belly',
    description: 'Fatty, flavorful cut from the underside. The source of bacon and perfect for confit and slow cooking.',
    subCuts: ['Pork Belly', 'Bacon', 'Pancetta', 'Spare Ribs'],
    cookingMethods: ['Slow Roasting', 'Braising', 'Curing', 'Smoking'],
    bestFor: 'Bacon, porchetta, Asian cuisine, and rich preparations',
    tenderness: 'Medium',
    flavor: 'Very Rich',
  },
  {
    name: 'Leg (Ham)',
    description: 'Large, lean cut from the rear leg. Can be fresh or cured. Versatile for roasting and curing.',
    subCuts: ['Fresh Ham', 'Ham Steaks', 'Shank Portion', 'Butt Portion'],
    cookingMethods: ['Roasting', 'Braising', 'Curing'],
    bestFor: 'Roast ham, escalopes, and cured products',
    tenderness: 'Medium',
    flavor: 'Mild',
  },
  {
    name: 'Side & Ribs',
    description: 'Contains various rib cuts, each with different characteristics and cooking applications.',
    subCuts: ['Baby Back Ribs', 'Spare Ribs', 'St. Louis Ribs', 'Rib Tips'],
    cookingMethods: ['Smoking', 'Grilling', 'Braising', 'Oven Roasting'],
    bestFor: 'BBQ, Asian ribs, and slow-cooked preparations',
    tenderness: 'Medium',
    flavor: 'Excellent',
  },
];

const cookingTips = [
  {
    icon: ThermometerSun,
    title: 'Temperature Guide',
    tips: [
      'Medium: 145°F (63°C) - USDA recommended',
      'Well Done: 160°F (71°C)',
      'Ground Pork: 160°F (71°C) minimum',
      'Pulled Pork: 195-205°F (90-96°C)',
      'Modern pork is safe at lower temps',
    ],
  },
  {
    icon: Clock,
    title: 'Resting Time',
    tips: [
      'Pork chops: 3-5 minutes',
      'Tenderloin: 5-10 minutes',
      'Roasts: 15-20 minutes',
      'Shoulder: 30-45 minutes',
      'Cover with foil while resting',
    ],
  },
  {
    icon: Flame,
    title: 'Cooking Methods',
    tips: [
      'Tender cuts: Quick, high heat',
      'Tough cuts: Low & slow',
      'Pork benefits from brining',
      "Don't overcook lean cuts",
      'Fat cap adds flavor - keep it on',
    ],
  },
];

export default function PorkCutGuidePage() {
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
            src="https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=1600&q=80"
            alt="Pork Cuts Guide"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              Pork Cuts Guide
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Explore pork cuts from shoulder to loin, and discover the versatility of this chef's favorite protein
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Understanding Pork Primal Cuts
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Pork is divided into four main primal cuts: shoulder, loin, belly, and leg. Modern pork is leaner than in the past, making cooking methods and temperatures critical for tender, juicy results.
          </p>
          <p className="text-lg text-gray-600">
            The loin provides the most tender cuts with minimal fat, while the shoulder and belly offer rich, flavorful meat perfect for slow cooking. Understanding moisture content and fat distribution helps you choose the right cut for each application.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Pork Primal Cuts & Applications
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {primalCuts.map((cut) => (
              <div key={cut.name} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-pink-50 border-b-2 border-pink-200 px-6 py-4">
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 text-pink-600 rounded-lg mb-4">
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
            src="https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=1600&q=80"
            alt="Browse Our Pork Selection"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Browse Our Pork Selection
          </h2>
          <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
            Discover our premium pork products from trusted suppliers. From everyday cuts to specialty items.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/butchery/shop?category=PORK"
              className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Shop Pork Products
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
      <SEOContentSection content={`<h2>Professional Pork Cuts Guide for Chefs, Caterers, and Food Service Professionals</h2>
<p>Understanding <strong>pork cuts</strong> is essential for diverse culinary operations - whether you're an executive chef featuring <strong>pork belly</strong> and <strong>pork loin</strong> on fine dining menus, a head chef managing <strong>pork shoulder</strong> for BBQ and slow-cooked dishes, or a procurement manager sourcing versatile <strong>pork chops</strong> for casual dining. Booker's <strong>pork cuts guide</strong> provides comprehensive resources covering all major <strong>pork primal cuts</strong> - shoulder, loin, belly, leg, and ribs - with detailed cooking methods, temperature guides, and culinary applications designed for UK chefs and food service professionals.</p>

<h3>Pork Shoulder: The Foundation for Pulled Pork and Slow-Cooked Dishes</h3>
<p><strong>Pork shoulder</strong> (also called <strong>pork butt</strong> or <strong>Boston butt</strong>) from the front leg provides exceptional value for slow-cooking applications. This well-marbled cut contains enough fat and connective tissue to remain moist during extended cooking, making it perfect for <strong>pulled pork</strong> (low and slow smoking or braising until fork-tender), <strong>pork carnitas</strong> (Mexican slow-cooked and crisped pork), <strong>pork stews and braises</strong>, and <strong>ground pork</strong> for sausages and meatballs. Head chefs running BBQ operations discover optimal <strong>smoking pork shoulder</strong> techniques - season generously with rub, smoke at 225-250°F for 12-16 hours until internal temperature reaches 195-205°F, rest before pulling. The <strong>picnic shoulder</strong> (lower portion) contains more bone and skin, ideal for traditional roasts, stocks, and authentic ethnic cuisine preparations.</p>

<h3>Pork Loin: Lean, Versatile Cuts for Quick-Service and Fine Dining</h3>
<p><strong>Pork loin</strong> runs along the back and provides the leanest, most tender pork cuts - <strong>pork loin roast</strong> (center-cut roast perfect for stuffing, rolling, and elegant presentations), <strong>pork tenderloin</strong> (the most tender cut, mild flavor, quick-cooking, ideal for medallions and whole roast presentations), <strong>pork chops</strong> (bone-in or boneless, from rib chops to center-cut to loin chops), and <strong>back ribs/baby back ribs</strong> (curved ribs from the loin, leaner than spare ribs, popular for grilling and smoking). Executive chefs discover <strong>pork tenderloin</strong> applications - pan-searing for caramelization, roasting to 145°F internal temperature, slicing into medallions for plating, stuffing and tying for special presentations. <strong>Pork chops</strong> offer versatility across cuisines - grilling for BBQ menus, pan-frying for comfort food, braising for European preparations, breading and frying for schnitzel and katsu.</p>

<h3>Pork Belly: Premium Cut for Contemporary Cuisine and Asian Applications</h3>
<p><strong>Pork belly</strong> has transformed from utility cut to menu star, prized for its rich marbling and versatility. This fatty cut from the underside yields <strong>pork belly strips</strong> (perfect for roasting with crispy skin, braising for Asian cuisine, or curing for bacon), <strong>pork belly squares</strong> (ideal for portioning and plating in fine dining), and opportunities for creative preparations. Chefs master <strong>roasting pork belly</strong> - score skin, season, roast low and slow until tender, finish with high heat for crackling. <strong>Pork belly applications</strong> span cuisines - <strong>Chinese pork belly</strong> (braised with soy, star anise, and aromatics), <strong>Korean pork belly</strong> (grilled samgyeopsal), ramen toppings (slow-braised and glazed chashu), modern gastropub presentations (crispy pork belly with seasonal vegetables), and bacon production (curing and smoking for restaurant-quality bacon).</p>

<h3>Pork Leg: Economical Cuts for Roasting and Traditional Preparations</h3>
<p><strong>Pork leg</strong> (also called <strong>fresh ham</strong> when uncured) provides lean, economical cuts ideal for large-format roasting and traditional applications. <strong>Pork leg roast</strong> serves banquets, carving stations, and Sunday roast menus - score skin, season generously, roast at 325°F to internal temperature of 145°F, rest before carving. <strong>Pork leg steaks</strong> offer budget-friendly alternatives to pork chops for casual dining. <strong>Pork hocks/shanks</strong> from the lower leg provide collagen-rich cuts perfect for stocks, soups, and slow-braised preparations. When cured and smoked, pork leg becomes <strong>ham</strong> - a separate category with diverse applications from breakfast menus to holiday centerpieces.</p>

<h3>Pork Ribs and Specialty Cuts for BBQ and Contemporary Menus</h3>
<p><strong>Pork spare ribs</strong> from the belly section are meatier and fattier than back ribs - perfect for <strong>BBQ ribs</strong> (smoking with dry rub or finishing with sauce), <strong>St. Louis-style ribs</strong> (spare ribs trimmed to rectangular shape), and Asian preparations (Chinese char siu ribs, Filipino adobo ribs). Chefs learn <strong>smoking pork ribs</strong> techniques - remove membrane from bone side, apply rub, smoke at 225-250°F using 3-2-1 method (3 hours unwrapped, 2 hours wrapped, 1 hour unwrapped with sauce). <strong>Specialty pork cuts</strong> offer creative menu opportunities - <strong>pork cheeks</strong> (perfect for braising, rich flavor, tender texture), <strong>pork jowl</strong> (Italian guanciale production, rich and fatty), <strong>pork skin</strong> (crackling, chicharrones, crispy garnishes), and <strong>pork offal</strong> (liver, kidneys, trotters for nose-to-tail menus).</p>

<h3>Pork Cooking Methods and Temperature Guide for Professional Kitchens</h3>
<p>Modern <strong>pork cooking temperatures</strong> have evolved - USDA now recommends 145°F internal temperature for <strong>pork chops</strong>, <strong>pork tenderloin</strong>, and <strong>pork roasts</strong> (with 3-minute rest), resulting in juicy, slightly pink pork. <strong>Low-and-slow pork cooking</strong> for shoulder and ribs requires higher temperatures (195-205°F internal) to break down collagen and connective tissue for pull-apart tenderness. <strong>High-heat pork cooking methods</strong> - grilling pork chops (4-5 minutes per side to 145°F), pan-searing pork tenderloin (sear all sides, finish in oven), stir-frying pork strips (high heat, quick cooking). <strong>Slow-cooking pork methods</strong> - braising pork shoulder (low liquid, 275-300°F oven until tender), smoking pork (225-250°F with wood smoke), sous vide pork (precise temperature control, 140-145°F for chops and tenderloin).</p>

<h3>Why Professional Chefs Use Booker's Pork Cuts Guide</h3>
<p>Booker's comprehensive <strong>pork cuts guide</strong> provides UK chefs, caterers, and food service professionals with detailed knowledge for success. Each <strong>pork primal cut</strong> includes anatomical information and cut characteristics, <strong>pork sub-cuts</strong> with specific menu applications, <strong>pork cooking methods</strong> matched to cut properties (grilling, roasting, braising, smoking, frying), internal temperature guidelines for food safety and optimal texture, culinary applications across global cuisines (BBQ, Asian, European, Latin American), and cost-per-portion guidance for menu profitability. Whether you're sourcing <strong>pork shoulder</strong> for BBQ pulled pork, <strong>pork tenderloin</strong> for fine dining medallions, <strong>pork belly</strong> for contemporary gastropub menus, <strong>pork chops</strong> for casual dining value menus, or <strong>specialty pork cuts</strong> for nose-to-tail cooking - Booker's pork cuts guide helps you make informed decisions that improve food quality, control costs, and expand your culinary offerings.</p>

<p>Master professional <strong>pork butchery</strong> with our complete <strong>pork cuts guide</strong> - free resources for UK chefs, caterers, and food service professionals from Booker wholesale butchery.</p>`} />


    </div>
  );
}
