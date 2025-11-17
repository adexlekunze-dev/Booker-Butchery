import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Flame, Clock, ThermometerSun } from 'lucide-react';
import { SEOContentSection } from '@/components/sectors/SEOContentSection';

export const metadata: Metadata = {
  title: 'Chicken Cuts Guide | Understanding Chicken Portions | Premium Butchery',
  description: 'Complete guide to chicken cuts including breast, thighs, wings, and whole birds. Learn about portion control and cooking methods for foodservice.',
  keywords: 'chicken cuts, chicken portions, chicken breast, chicken thighs, chicken cooking guide',
};

const chickenCuts = [
  {
    name: 'Breast',
    description: 'Lean, versatile white meat. Available bone-in, boneless, skin-on, or skinless.',
    cuts: ['Whole Breast', 'Split Breast', 'Boneless Skinless', 'Tenders', 'Supreme (with wing)'],
    cookingMethods: ['Grilling', 'Pan-Searing', 'Baking', 'Poaching'],
    bestFor: 'Health-conscious menus, quick service, and versatile applications',
    meat: 'White',
    flavor: 'Mild',
  },
  {
    name: 'Thighs & Drumsticks (Legs)',
    description: 'Dark meat with more fat and flavor. Stays moist during cooking and very forgiving.',
    cuts: ['Bone-In Thighs', 'Boneless Thighs', 'Drumsticks', 'Whole Leg'],
    cookingMethods: ['Braising', 'Grilling', 'Frying', 'Slow Roasting'],
    bestFor: 'Flavorful dishes, cost-effective menus, and extended cooking',
    meat: 'Dark',
    flavor: 'Rich',
  },
  {
    name: 'Wings',
    description: 'Popular appetizer cut with skin, perfect for frying and saucing.',
    cuts: ['Whole Wings', 'Drumettes', 'Flats', 'Tips'],
    cookingMethods: ['Frying', 'Baking', 'Grilling', 'Smoking'],
    bestFor: 'Bar menus, appetizers, and casual dining',
    meat: 'Mixed',
    flavor: 'Good',
  },
  {
    name: 'Whole Bird',
    description: 'Complete chicken for roasting or breaking down in-house for fresh cuts.',
    cuts: ['Whole Roaster', 'Poussin', 'Cornish Hen'],
    cookingMethods: ['Roasting', 'Spatchcocking', 'Rotisserie', 'Butchering'],
    bestFor: 'Traditional roasts, special presentations, and in-house butchery',
    meat: 'Mixed',
    flavor: 'Excellent',
  },
  {
    name: 'Specialty Cuts',
    description: 'Value-added and specialized chicken products for specific applications.',
    cuts: ['Ground Chicken', 'Chicken Mince', 'Diced Breast', 'Strips', 'Goujons'],
    cookingMethods: ['Varies by Cut'],
    bestFor: 'Burgers, stir-fries, quick service, and prep efficiency',
    meat: 'White or Mixed',
    flavor: 'Depends on Cut',
  },
];

const cookingTips = [
  {
    icon: ThermometerSun,
    title: 'Temperature Guide',
    tips: [
      'All Chicken: 165°F (74°C) - USDA minimum',
      'Dark meat: can go to 175°F for tenderness',
      'Ground chicken: 165°F minimum',
      'Always use meat thermometer',
      'Check thickest part of meat',
    ],
  },
  {
    icon: Clock,
    title: 'Resting Time',
    tips: [
      'Chicken breast: 5 minutes',
      'Chicken thighs: 3-5 minutes',
      'Whole chicken: 10-15 minutes',
      'Large roasters: 15-20 minutes',
      'Carryover cooking adds 5°F',
    ],
  },
  {
    icon: Flame,
    title: 'Cooking Methods',
    tips: [
      'Brining improves moisture retention',
      'Dry skin thoroughly before cooking',
      'Higher heat for crispy skin',
      'Dark meat is more forgiving',
      'White meat cooks faster than dark',
    ],
  },
];

export default function ChickenCutGuidePage() {
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
            src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=1600&q=80"
            alt="Chicken Cuts Guide"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              Chicken Cuts Guide
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Master chicken portioning and selection for efficient, profitable menu operations
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Understanding Chicken Cuts & Portions
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Chicken is the most versatile protein in foodservice, with cuts ranging from premium boneless breasts to economical whole birds. Understanding portion sizes and yield percentages is critical for menu costing and consistency.
          </p>
          <p className="text-lg text-gray-600">
            White meat (breast) is leaner with mild flavor and cooks quickly, while dark meat (thighs and drumsticks) has more fat, richer flavor, and stays moist longer. Each has its place in a well-balanced menu.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Chicken Cuts & Applications
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {chickenCuts.map((cut) => (
              <div key={cut.name} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-yellow-50 border-b-2 border-yellow-200 px-6 py-4">
                  <h3 className="text-2xl font-bold text-gray-900">{cut.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{cut.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Available Cuts:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {cut.cuts.map((c) => (
                          <li key={c}>{c}</li>
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
                      <div className="text-sm text-gray-500 mb-1">Meat Type</div>
                      <div className="font-semibold text-gray-900">{cut.meat}</div>
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg mb-4">
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
            src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=1600&q=80"
            alt="Browse Our Chicken Selection"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Browse Our Chicken Selection
          </h2>
          <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
            Discover our range of chicken products from whole birds to portion-controlled cuts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/butchery/shop?category=CHICKEN"
              className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Shop Chicken Products
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
      <SEOContentSection content={`<h2>Professional Chicken Cuts Guide for Chefs, Caterers, and High-Volume Food Operations</h2>
<p>Understanding <strong>chicken cuts</strong> and <strong>chicken portions</strong> is essential for cost-effective food service operations - whether you're an executive chef featuring <strong>chicken supreme</strong> on fine dining menus, a head chef managing <strong>chicken breast</strong> and <strong>chicken thighs</strong> for casual dining, or a procurement manager optimizing costs with <strong>whole chickens</strong> for maximum yield. Booker's <strong>chicken cuts guide</strong> provides comprehensive resources covering all <strong>chicken portions</strong> - whole birds, breast, thighs, drumsticks, wings, and specialty cuts - with detailed cooking methods, portion control, yield calculations, and culinary applications designed for UK chefs and food service professionals.</p>

<h3>Whole Chicken: Economical Choice for Maximum Yield and Versatility</h3>
<p><strong>Whole chickens</strong> provide exceptional value for operations that can utilize all parts - standard sizes range from 1.2kg (poussin/small) to 2.5kg+ (large roasters), offering flexibility for diverse applications. Chefs discover <strong>roasting whole chicken</strong> techniques - season cavity with aromatics (lemon, garlic, herbs), truss for even cooking, roast at 375-400°F to internal temperature of 165°F in the thickest part of the thigh (about 20 minutes per pound), rest before carving. Applications include <strong>rotisserie chicken</strong> (popular for takeaway and casual dining), <strong>roast chicken dinners</strong> (traditional Sunday roast, family-style service), <strong>chicken stock production</strong> (utilizing carcasses for soup bases and sauces), and <strong>chicken fabrication</strong> (breaking down whole birds for cost savings and portion control). Head chefs running high-volume operations learn butchery techniques - separating breast, thighs, drumsticks, and wings for different menu applications while maximizing food cost efficiency.</p>

<h3>Chicken Breast: Lean, Versatile Cut for Contemporary Menus</h3>
<p><strong>Chicken breast</strong> dominates modern menus for its lean profile, quick cooking, and versatility - available <strong>boneless skinless chicken breast</strong> (most popular, uniform cooking, easy portioning), <strong>bone-in skin-on chicken breast</strong> (more flavor, natural presentation, slightly lower cost), and <strong>chicken breast fillets</strong> (smaller portions from the breast). Preparation methods span techniques - <strong>grilling chicken breast</strong> (marinate first, grill to 165°F internal temperature, rest before slicing), <strong>pan-searing chicken</strong> (achieve golden crust, finish in oven for even cooking), <strong>baking chicken breast</strong> (oven-roasting at 375-400°F), <strong>poaching chicken</strong> (gentle cooking in liquid for tender, moist results), and <strong>sous vide chicken breast</strong> (precise temperature control at 145-150°F for optimal texture). Applications include <strong>grilled chicken Caesar salad</strong>, <strong>chicken piccata and marsala</strong>, <strong>chicken stir-fries</strong>, <strong>chicken burgers and sandwiches</strong>, and contemporary plating with seasonal vegetables. <strong>Chicken supreme</strong> (French-trimmed breast with wing bone attached) elevates fine dining presentations.</p>

<h3>Chicken Thighs: Flavorful, Forgiving Cut for Diverse Cooking Methods</h3>
<p><strong>Chicken thighs</strong> offer superior flavor, moisture retention, and cost advantages over breast meat - available <strong>boneless skinless chicken thighs</strong> (convenient, versatile, perfect for marinades and quick cooking), <strong>bone-in skin-on chicken thighs</strong> (more flavor, crispy skin possibilities, traditional presentations), and opportunities for creative applications. The higher fat content makes thighs more forgiving during cooking and provides richer flavor profiles. Chefs discover <strong>cooking chicken thighs</strong> - <strong>braising chicken thighs</strong> (brown first, add liquid and aromatics, braise until tender), <strong>roasting chicken thighs</strong> (crispy skin at high heat, juicy interior), <strong>grilling chicken thighs</strong> (marinated for BBQ and ethnic cuisines), <strong>confit chicken thighs</strong> (slow-cooking in fat for exceptional tenderness), and <strong>fried chicken thighs</strong> (breaded and deep-fried for Southern-style preparations). Applications span global cuisines - <strong>chicken adobo</strong> (Filipino braised thighs), <strong>chicken tagine</strong> (Moroccan spiced preparations), <strong>coq au vin</strong> (French wine-braised classic), <strong>teriyaki chicken</strong> (Japanese glazed thighs), and modern gastropub presentations.</p>

<h3>Chicken Drumsticks and Wings: Popular Cuts for Casual Dining and Events</h3>
<p><strong>Chicken drumsticks</strong> (lower leg portion) provide affordable, crowd-pleasing cuts perfect for casual dining, catering, and family-style service - natural handle for finger food applications, dark meat with good flavor, economical pricing. Preparation methods include <strong>baked chicken drumsticks</strong> (seasoned and oven-roasted until crispy), <strong>fried chicken drumsticks</strong> (breaded and deep-fried), <strong>BBQ chicken drumsticks</strong> (grilled or smoked with sauce), and <strong>braised chicken drumsticks</strong> (slow-cooked until tender). <strong>Chicken wings</strong> have become menu stars through Buffalo wings and global flavor profiles - available whole wings (includes drumette, flat, and tip) or separated portions. Chefs master <strong>cooking chicken wings</strong> - <strong>fried chicken wings</strong> (crispy exterior, tossed in sauce), <strong>baked chicken wings</strong> (healthier preparation with good results), <strong>grilled chicken wings</strong> (smoky char and BBQ applications), and <strong>confit chicken wings</strong> (luxury preparation). Flavor applications include <strong>Buffalo wings</strong> (classic hot sauce and blue cheese), <strong>Asian chicken wings</strong> (soy-ginger, Korean gochujang, teriyaki), <strong>dry-rubbed wings</strong> (spice blends without sauce), and contemporary gourmet preparations.</p>

<h3>Specialty Chicken Cuts and Offal for Contemporary Menus</h3>
<p><strong>Specialty chicken cuts</strong> offer creative menu opportunities and nose-to-tail utilization - <strong>chicken oysters</strong> (two small, tender morsels near the backbone, considered the chef's treat), <strong>chicken tenderloins</strong> (small muscle under the breast, perfect for quick cooking and kids' menus), <strong>chicken skin</strong> (rendered for schmaltz, fried for crispy garnish, crackling applications), and <strong>chicken feet</strong> (Asian cuisine, stock production, collagen-rich). <strong>Chicken offal</strong> provides opportunities for adventurous menus - <strong>chicken liver</strong> (pâté, terrines, sautéed preparations, economical protein), <strong>chicken hearts</strong> (grilled yakitori, braised preparations), and <strong>chicken gizzards</strong> (slow-cooked until tender, traditional soul food applications). <strong>Chicken carcasses and bones</strong> create foundation for stocks, broths, and sauces - roasted bones produce rich, golden chicken stock essential for soups, sauces, and risottos.</p>

<h3>Chicken Cooking Methods and Food Safety for Professional Kitchens</h3>
<p><strong>Chicken food safety</strong> requires strict temperature control - all chicken must reach minimum internal temperature of <strong>165°F</strong> to eliminate harmful bacteria. Professional kitchens use calibrated thermometers to verify temperatures in the thickest part of the meat. <strong>High-heat chicken cooking</strong> - <strong>grilling chicken</strong> (direct heat for breasts, thighs, drumsticks, wings), <strong>pan-searing chicken</strong> (achieve crust before finishing in oven), <strong>frying chicken</strong> (breaded and deep-fried at 350-375°F oil temperature), <strong>roasting chicken</strong> (dry heat at 375-425°F for whole birds and portions). <strong>Moist-heat chicken cooking</strong> - <strong>poaching chicken</strong> (gentle simmering in liquid for tender results, perfect for chicken salad), <strong>braising chicken</strong> (combination method for thighs, drumsticks, and tough cuts), <strong>steaming chicken</strong> (Asian preparations, healthy cooking method). <strong>Resting chicken</strong> allows juices to redistribute - rest whole chickens 15-20 minutes, breasts and portions 5-10 minutes before slicing or serving.</p>

<h3>Chicken Portion Control and Yield Management for Food Cost Optimization</h3>
<p>Managing <strong>chicken portions</strong> and understanding yield percentages helps control food costs and maintain consistency. <strong>Chicken breast portioning</strong> - standard sizes range from 4oz (small/kids' menu) to 8-10oz (generous adult portion), with 6oz being common for casual dining. <strong>Whole chicken yield calculations</strong> help operations decide between whole birds and pre-portioned cuts - whole 2kg chicken yields approximately 50-55% usable meat after fabrication (breast 30-35%, thighs 15-18%, drumsticks 12-15%, wings 8-10%), with remaining weight in bones, skin, and trim (utilized for stock). <strong>Chicken cost analysis</strong> - while whole chickens cost less per pound, labor for fabrication must be considered; pre-portioned cuts save labor but cost more; boneless skinless chicken breast commands premium pricing but offers ease and speed; chicken thighs provide best value for flavor and cost. Operations balance cost, labor, storage, and menu requirements when selecting chicken products.</p>

<h3>Why Professional Chefs Use Booker's Chicken Cuts Guide</h3>
<p>Booker's comprehensive <strong>chicken cuts guide</strong> provides UK chefs, caterers, and food service professionals with detailed knowledge for success. Each <strong>chicken portion</strong> includes anatomical information and cut characteristics, <strong>chicken cooking methods</strong> matched to cut properties (grilling, roasting, braising, frying, poaching), internal temperature guidelines for food safety (165°F minimum), portion sizes and yield calculations for cost management, culinary applications across global cuisines (American, Asian, European, Latin American, Middle Eastern), and cost-per-portion analysis for menu profitability. Whether you're sourcing <strong>whole chickens</strong> for maximum yield and versatility, <strong>chicken breast</strong> for health-conscious contemporary menus, <strong>chicken thighs</strong> for flavorful braised dishes and ethnic cuisine, <strong>chicken wings</strong> for bar menus and appetizers, or <strong>specialty chicken cuts</strong> for creative applications - Booker's chicken cuts guide helps you make informed decisions that optimize food quality, control costs, and expand your menu offerings.</p>

<p>Master professional <strong>chicken butchery and portioning</strong> with our complete <strong>chicken cuts guide</strong> - free resources for UK chefs, caterers, and food service professionals from Booker wholesale butchery.</p>`} />


    </div>
  );
}
