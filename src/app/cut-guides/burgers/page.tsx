import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Flame, Clock, ThermometerSun } from 'lucide-react';
import { SEOContentSection } from '@/components/sectors/SEOContentSection';

export const metadata: Metadata = {
  title: 'Burger Guide | Understanding Burger Types & Patties | Premium Butchery',
  description: 'Complete guide to burger types including beef burgers, gourmet patties, chicken burgers, and specialty burgers. Learn about meat blends, cooking methods, and menu applications.',
  keywords: 'burger guide, beef burgers, burger patties, gourmet burgers, chicken burgers, lamb burgers, burger cooking guide, restaurant burgers',
};

const burgerTypes = [
  {
    name: 'Classic Beef Burgers',
    description: 'Traditional beef patties made from premium chuck, short rib, or brisket blends. The foundation of any burger menu.',
    varieties: ['80/20 Chuck Blend', '70/30 Brisket Blend', 'Short Rib & Chuck Mix', 'Premium Sirloin Blend'],
    cookingMethods: ['Grilling', 'Flat-Top Griddle', 'Pan-Searing'],
    bestFor: 'Classic burgers, gastropub menus, fast-casual dining',
    fatContent: '20-30%',
    flavor: 'Rich & Beefy',
  },
  {
    name: 'Gourmet Beef Burgers',
    description: 'Premium blends featuring aged beef, specialty cuts, and unique flavor profiles for upscale menus.',
    varieties: ['Dry-Aged Beef Burgers', 'Wagyu Blend Burgers', 'Bone Marrow Burgers', 'Truffle-Infused Patties'],
    cookingMethods: ['Grilling', 'Charcoal Grilling', 'Sous Vide + Sear'],
    bestFor: 'Fine dining, premium burger concepts, special menus',
    fatContent: '15-25%',
    flavor: 'Complex & Premium',
  },
  {
    name: 'Chicken Burgers',
    description: 'Versatile poultry options from ground chicken patties to breaded breast fillets for health-conscious menus.',
    varieties: ['Ground Chicken Patties', 'Breaded Chicken Breast', 'Grilled Chicken Fillets', 'Buttermilk Fried Chicken'],
    cookingMethods: ['Grilling', 'Deep-Frying', 'Oven-Baking'],
    bestFor: 'Health-conscious menus, casual dining, quick service',
    fatContent: '10-15%',
    flavor: 'Mild & Versatile',
  },
  {
    name: 'Lamb Burgers',
    description: 'Distinctive flavor profiles with Mediterranean and Middle Eastern seasoning possibilities.',
    varieties: ['Greek Lamb Burgers', 'Moroccan Spiced Lamb', 'Mint & Feta Lamb Patties', 'Harissa Lamb Burgers'],
    cookingMethods: ['Grilling', 'Charcoal Grilling', 'Flat-Top'],
    bestFor: 'Mediterranean menus, gourmet concepts, seasonal specials',
    fatContent: '15-20%',
    flavor: 'Distinctive & Aromatic',
  },
  {
    name: 'Pork Burgers',
    description: 'Juicy and flavorful alternatives featuring ground pork or specialty sausage patties.',
    varieties: ['Ground Pork Patties', 'Italian Sausage Burgers', 'Chorizo Burgers', 'Bacon-Blended Patties'],
    cookingMethods: ['Grilling', 'Flat-Top Griddle', 'Pan-Frying'],
    bestFor: 'Casual dining, BBQ menus, creative burger concepts',
    fatContent: '20-25%',
    flavor: 'Rich & Savory',
  },
  {
    name: 'Specialty & Plant-Based',
    description: 'Alternative burgers including turkey, venison, and plant-based options for diverse dietary needs.',
    varieties: ['Turkey Burgers', 'Venison Burgers', 'Plant-Based Patties', 'Mushroom & Bean Burgers'],
    cookingMethods: ['Grilling', 'Pan-Searing', 'Oven-Baking'],
    bestFor: 'Health-focused menus, dietary accommodations, modern concepts',
    fatContent: 'Varies',
    flavor: 'Diverse Profiles',
  },
];

const cookingTips = [
  {
    icon: ThermometerSun,
    title: 'Temperature Guide',
    tips: [
      'Beef: 160°F (71°C) for food safety',
      'Chicken/Turkey: 165°F (74°C) required',
      'Pork: 160°F (71°C) recommended',
      'Lamb: 160°F (71°C) for medium',
      'Use instant-read thermometer',
    ],
  },
  {
    icon: Clock,
    title: 'Cooking Times',
    tips: [
      '¼ lb patties: 3-4 min per side',
      '⅓ lb patties: 4-5 min per side',
      '½ lb patties: 5-6 min per side',
      'Thicker gourmet: 6-8 min per side',
      'Rest 2-3 minutes before serving',
    ],
  },
  {
    icon: Flame,
    title: 'Cooking Methods',
    tips: [
      'High heat: Creates proper crust',
      'Don\'t press patties while cooking',
      'Flip only once for best results',
      'Add cheese 1 minute before done',
      'Toast buns for better texture',
    ],
  },
];

export default function BurgerGuidePage() {
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
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80"
            alt="Burger Guide"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              Burger Guide
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Master the art of burger preparation with our comprehensive guide to patty types, meat blends, and cooking techniques
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Understanding Burger Types & Applications
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Burgers have evolved from simple fast-food offerings to sophisticated menu items spanning casual dining, gastropubs, and fine dining establishments. The key to exceptional burgers lies in selecting the right meat blend, fat content, and preparation method for your concept and customer base.
          </p>
          <p className="text-lg text-gray-600">
            From classic beef chuck blends to gourmet dry-aged patties, specialty poultry options to plant-based alternatives - understanding burger varieties and cooking techniques ensures consistent quality and guest satisfaction across all service styles.
          </p>
        </div>

        {/* Burger Types Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Burger Types & Applications
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {burgerTypes.map((burger) => (
              <div key={burger.name} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-orange-50 border-b-2 border-orange-200 px-6 py-4">
                  <h3 className="text-2xl font-bold text-gray-900">{burger.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{burger.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Varieties:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {burger.varieties.map((variety) => (
                          <li key={variety}>{variety}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Cooking Methods:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {burger.cookingMethods.map((method) => (
                          <li key={method}>{method}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Fat Content</div>
                      <div className="font-semibold text-gray-900">{burger.fatContent}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Flavor</div>
                      <div className="font-semibold text-gray-900">{burger.flavor}</div>
                    </div>
                    <div className="col-span-3 md:col-span-1">
                      <div className="text-sm text-gray-500 mb-1">Best For</div>
                      <div className="font-semibold text-gray-900">{burger.bestFor}</div>
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
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80"
            alt="Browse Our Burger Selection"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Browse Our Burger Selection
          </h2>
          <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
            Discover our range of premium burger patties from traditional beef to gourmet blends and specialty options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/butchery/shop?category=BURGERS"
              className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Shop Burger Products
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
      <SEOContentSection content={`<h2>Professional Burger Guide for Chefs, Caterers, and Restaurant Operations</h2>
<p>Understanding <strong>burger types</strong> and <strong>burger patties</strong> is essential for successful restaurant operations - whether you're an executive chef creating <strong>gourmet burgers</strong> for upscale dining, a head chef managing <strong>burger programs</strong> for casual dining chains, or a procurement manager sourcing <strong>quality burger patties</strong> for high-volume operations. Booker's <strong>burger guide</strong> provides comprehensive resources covering all burger categories - classic beef burgers, gourmet blends, chicken burgers, lamb burgers, pork burgers, and specialty options - with detailed cooking methods, temperature guides, and menu applications designed for UK chefs and food service professionals.</p>

<h3>Classic Beef Burgers: Foundation of Any Burger Menu</h3>
<p><strong>Classic beef burgers</strong> remain the cornerstone of burger programs across all service styles - built from <strong>ground beef blends</strong> that balance flavor, juiciness, and cost-effectiveness. The traditional <strong>80/20 chuck blend</strong> (80% lean meat, 20% fat) provides optimal juiciness and flavor for standard burger operations, while <strong>70/30 brisket blends</strong> offer richer taste for premium applications. <strong>Short rib and chuck blends</strong> deliver exceptional beefy flavor ideal for gastropub menus, and <strong>premium sirloin blends</strong> provide leaner options for health-conscious concepts. Professional chefs understand <strong>burger fat content</strong> drives flavor and texture - higher fat content (25-30%) creates juicier burgers with more flavor but requires careful cooking to avoid excessive shrinkage, while lower fat content (15-20%) produces leaner burgers that cook faster but risk drying out without proper technique. <strong>Cooking beef burgers</strong> requires reaching 160°F internal temperature for food safety while maintaining moisture - achieve this through proper heat control (medium-high heat), avoiding pressing patties (which squeezes out juices), flipping only once, and resting 2-3 minutes before service.</p>

<h3>Gourmet Beef Burgers: Premium Blends for Upscale Concepts</h3>
<p><strong>Gourmet burger programs</strong> differentiate restaurants through premium ingredients and sophisticated flavor profiles. <strong>Dry-aged beef burgers</strong> utilize aged beef (21-28 days) for concentrated umami flavor and tender texture - command premium pricing for fine dining and upscale casual concepts. <strong>Wagyu blend burgers</strong> incorporate Japanese Wagyu or American Wagyu beef for exceptional marbling and buttery texture - typically blended with chuck (30-50% Wagyu) to balance cost while delivering luxury experience. <strong>Bone marrow burgers</strong> feature beef mixed with roasted bone marrow for ultra-rich flavor and moisture, perfect for signature burger offerings. <strong>Truffle-infused burger patties</strong> blend ground beef with truffle oil or truffle pieces for earthy, luxurious profiles. Executive chefs develop <strong>custom burger blends</strong> - combining cuts like brisket, short rib, chuck, and sirloin in precise ratios to achieve desired flavor profiles, fat content, and price points. <strong>Gourmet burger cooking techniques</strong> include charcoal grilling for smoky char, sous vide followed by high-heat sear for precise doneness control, and smash burger technique (pressing thin patties on screaming hot griddle) for maximum crust development.</p>

<h3>Chicken Burgers: Versatile Options for Health-Conscious Menus</h3>
<p><strong>Chicken burgers</strong> provide essential alternatives for health-conscious guests and menu diversity. <strong>Ground chicken patties</strong> offer leaner protein (10-15% fat content) with mild flavor that accepts diverse seasonings - season aggressively as chicken lacks beef's inherent richness. <strong>Breaded chicken breast burgers</strong> deliver satisfying crunch and substantial texture, popular for casual dining and quick service. <strong>Grilled chicken fillets</strong> provide healthiest option with clean flavor profiles, while <strong>buttermilk fried chicken burgers</strong> satisfy indulgent cravings with crispy coating and juicy interior. <strong>Cooking chicken burgers safely</strong> requires 165°F internal temperature throughout - ground chicken patties cook 4-5 minutes per side on medium heat, breaded options need controlled frying at 350-375°F oil temperature, and grilled fillets benefit from brining or marinating to maintain moisture. Applications span <strong>buffalo chicken burgers</strong> (hot sauce-tossed with blue cheese), <strong>pesto chicken burgers</strong> (Italian-inspired with fresh basil), <strong>teriyaki chicken burgers</strong> (Asian glazed with pineapple), and <strong>Nashville hot chicken burgers</strong> (spicy contemporary trend).</p>

<h3>Lamb Burgers: Distinctive Flavors for Mediterranean and Gourmet Menus</h3>
<p><strong>Lamb burgers</strong> bring distinctive flavor profiles perfect for Mediterranean concepts, seasonal specials, and gourmet burger programs. <strong>Greek lamb burgers</strong> feature ground lamb seasoned with oregano, garlic, and lemon zest - topped with feta cheese, tzatziki sauce, cucumber, and tomato for authentic Mediterranean experience. <strong>Moroccan spiced lamb burgers</strong> incorporate cumin, coriander, cinnamon, and harissa for North African flavors, while <strong>mint and feta lamb patties</strong> balance lamb's richness with fresh herbs and tangy cheese. <strong>Harissa lamb burgers</strong> deliver heat and complexity for adventurous diners. Ground lamb typically contains 15-20% fat content - sufficient for juicy burgers without excessive greasiness. <strong>Cooking lamb burgers</strong> to 160°F produces medium doneness with slight pink center (lamb's optimal temperature), though guests may request well-done. <strong>Lamb burger applications</strong> work particularly well on artisanal buns (brioche, ciabatta), paired with Mediterranean vegetables (grilled eggplant, roasted red peppers), and complemented by yogurt-based sauces, tahini dressings, or spiced mayonnaises.</p>

<h3>Pork Burgers and Specialty Options: Creative Alternatives for Diverse Menus</h3>
<p><strong>Pork burgers</strong> offer juicy, flavorful alternatives with 20-25% fat content creating exceptionally moist patties. <strong>Ground pork burgers</strong> provide mild base for creative seasonings - Asian five-spice, sage and apple, BBQ rubs, or Cajun blends. <strong>Italian sausage burgers</strong> utilize seasoned pork sausage (fennel, garlic, herbs) for robust flavor without additional seasoning needed. <strong>Chorizo burgers</strong> feature Spanish or Mexican chorizo for spicy, smoky profiles perfect for Southwestern menus. <strong>Bacon-blended burger patties</strong> incorporate ground bacon into beef or pork for ultimate indulgence. <strong>Turkey burgers</strong> serve health-conscious guests with lean poultry (7-10% fat) requiring careful seasoning and cooking to avoid dryness - add moisture through grated vegetables, binding with egg, or mixing in small amounts of olive oil. <strong>Venison burgers</strong> appeal to adventurous diners with lean game meat (often blended with pork fat for moisture). <strong>Plant-based burger options</strong> accommodate vegetarian, vegan, and flexitarian guests - quality plant-based patties (pea protein, soy, mushroom-based) require different cooking techniques than meat burgers (lower heat, careful handling to prevent breaking).</p>

<h3>Burger Cooking Methods and Quality Control for Professional Kitchens</h3>
<p>Professional <strong>burger cooking techniques</strong> ensure food safety while maximizing flavor and texture. <strong>Grilling burgers</strong> - preheat grill to medium-high heat (400-450°F), oil grates to prevent sticking, place patties without pressing, flip once when juices appear on surface (3-4 minutes), continue cooking to target temperature (3-4 minutes more), add cheese final minute for proper melting. <strong>Flat-top griddle burgers</strong> - heat griddle to 375-400°F, place patties with space between each, resist urge to press (causes moisture loss), flip once for even crust development, scrape griddle between batches. <strong>Smash burgers</strong> - portion 2-3 oz beef balls, place on screaming hot griddle (450-500°F), immediately smash flat with burger press or spatula, cook 2 minutes until deeply crusted, flip and cook 1 minute, creates maximum Maillard reaction crust. <strong>Burger temperature control</strong> requires instant-read thermometers - insert horizontally into burger center avoiding touching griddle/grill. <strong>Burger quality standards</strong> - consistent portioning (use scales for accuracy), uniform thickness (⅓-½ inch for even cooking), gentle handling (overworking meat creates tough texture), proper seasoning (salt and pepper just before cooking, not during mixing), and quality control checks (temperature, appearance, taste testing).</p>

<h3>Why Professional Chefs Use Booker's Burger Guide</h3>
<p>Booker's comprehensive <strong>burger guide</strong> provides UK chefs, caterers, and food service professionals with detailed knowledge for successful burger programs. Each <strong>burger category</strong> includes meat blend recommendations and fat content guidance, cooking method instructions matched to burger type (grilling, griddle, frying, baking), internal temperature requirements for food safety compliance, topping and flavor pairing suggestions across global cuisines, menu application ideas for diverse concepts (casual dining, gastropubs, fine dining, quick service), and cost-per-portion analysis for pricing and profitability. Whether you're building <strong>classic burger menus</strong> with traditional beef patties, developing <strong>gourmet burger concepts</strong> with premium aged beef blends, offering <strong>chicken and turkey burger alternatives</strong> for health-conscious guests, creating <strong>specialty burger programs</strong> with lamb, pork, or plant-based options, or designing <strong>seasonal burger features</strong> with creative toppings and sauces - Booker's burger guide helps you make informed decisions that improve food quality, ensure food safety, control costs, and satisfy diverse guest preferences.</p>

<p>Master professional <strong>burger preparation and cooking</strong> with our complete <strong>burger guide</strong> - free resources for UK chefs, caterers, and food service professionals from Booker wholesale butchery.</p>`} />
    </div>
  );
}
