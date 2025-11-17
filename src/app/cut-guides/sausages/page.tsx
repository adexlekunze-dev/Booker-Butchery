import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Flame, Clock, ThermometerSun } from 'lucide-react';
import { SEOContentSection } from '@/components/sectors/SEOContentSection';

export const metadata: Metadata = {
  title: 'Sausages & Specialties Guide | Understanding Sausage Types | Premium Butchery',
  description: 'Complete guide to sausages and specialty products including traditional, gourmet, and breakfast sausages. Perfect for diverse menu applications.',
  keywords: 'sausages, sausage types, breakfast sausages, gourmet sausages, specialty meats',
};

const sausageCategories = [
  {
    name: 'Traditional British Sausages',
    description: 'Classic pork sausages with bread rusk and traditional seasoning. The backbone of British breakfast and pub menus.',
    varieties: ['Cumberland', 'Lincolnshire', 'Pork & Herb', 'Premium Pork'],
    cookingMethods: ['Pan-Frying', 'Grilling', 'Oven-Baking'],
    bestFor: 'Full English breakfast, bangers & mash, toad in the hole',
    meatContent: '70-97%',
    casing: 'Natural or Collagen',
  },
  {
    name: 'Continental Sausages',
    description: 'European-style sausages with authentic recipes and premium ingredients.',
    varieties: ['Bratwurst', 'Chorizo', 'Italian', 'Toulouse', 'Merguez'],
    cookingMethods: ['Grilling', 'Pan-Frying', 'Poaching then Grilling'],
    bestFor: 'Mediterranean menus, BBQ, gourmet offerings',
    meatContent: '80-100%',
    casing: 'Natural Hog',
  },
  {
    name: 'Breakfast Sausages',
    description: 'Smaller format sausages perfect for breakfast service and portion control.',
    varieties: ['Chipolatas', 'Cocktail Sausages', 'Breakfast Links', 'Mini Sausages'],
    cookingMethods: ['Pan-Frying', 'Oven-Baking', 'Grilling'],
    bestFor: 'Breakfast menus, buffets, and canapés',
    meatContent: '70-85%',
    casing: 'Sheep or Slim Collagen',
  },
  {
    name: 'Gourmet & Premium Sausages',
    description: 'High meat content sausages with premium ingredients and unique flavor profiles.',
    varieties: ['Venison & Red Wine', 'Pork & Apple', 'Lamb & Mint', 'Free-Range Chicken'],
    cookingMethods: ['Pan-Frying', 'Grilling', 'Slow Roasting'],
    bestFor: 'Upscale menus, special occasions, and differentiation',
    meatContent: '85-97%',
    casing: 'Natural',
  },
  {
    name: 'Specialty Products',
    description: 'Value-added products including burgers, meatballs, and formed items.',
    varieties: ['Beef Burgers', 'Chicken Burgers', 'Meatballs', 'Koftas', 'Faggots'],
    cookingMethods: ['Grilling', 'Frying', 'Oven-Baking'],
    bestFor: 'Quick service, diverse menus, and consistent portioning',
    meatContent: 'Varies',
    casing: 'None',
  },
];

const cookingTips = [
  {
    icon: ThermometerSun,
    title: 'Temperature Guide',
    tips: [
      'Pork sausages: 155-160°F (68-71°C)',
      'Beef sausages: 160°F (71°C)',
      'Chicken sausages: 165°F (74°C)',
      'Pre-cooked: Heat to 140°F (60°C)',
      'Always check internal temperature',
    ],
  },
  {
    icon: Clock,
    title: 'Cooking Times',
    tips: [
      'Standard sausages: 12-15 minutes',
      'Chipolatas: 8-10 minutes',
      'Thick sausages: 15-20 minutes',
      'Turn every 3-4 minutes',
      'Rest 2-3 minutes before serving',
    ],
  },
  {
    icon: Flame,
    title: 'Cooking Methods',
    tips: [
      'Medium heat prevents bursting',
      "Don't prick sausages (keeps moisture in)",
      'Brush with oil for grilling',
      'Even browning on all sides',
      'Oven-bake for large batches',
    ],
  },
];

const menuApplications = [
  {
    meal: 'Breakfast',
    dishes: ['Full English Breakfast', 'Sausage Baps', 'Breakfast Wraps', 'Breakfast Buffet'],
  },
  {
    meal: 'Lunch',
    dishes: ['Sausage Rolls', 'Bangers & Mash', 'Sausage Sandwiches', 'Toad in the Hole'],
  },
  {
    meal: 'Dinner',
    dishes: ['Sausage Casserole', 'Pasta with Sausage', 'BBQ Platters', 'Gourmet Sausage Boards'],
  },
  {
    meal: 'Bar & Snacks',
    dishes: ['Cocktail Sausages', 'Pigs in Blankets', 'Sausage Platter', 'Scotch Eggs'],
  },
];

export default function SausagesGuidePage() {
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
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1600&q=80"
            alt="Sausages & Specialties Guide"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              Sausages & Specialties Guide
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Discover our range of sausages and specialty products for every menu occasion
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Understanding Sausages & Specialty Products
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Sausages are one of the most versatile and profitable items in foodservice. From traditional breakfast sausages to gourmet varieties, understanding meat content, casing types, and cooking methods ensures consistent quality and customer satisfaction.
          </p>
          <p className="text-lg text-gray-600">
            Premium sausages typically have 85%+ meat content with natural casings, while economy options may include bread rusk and collagen casings. Both have their place depending on your menu positioning and target audience.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Sausage Categories & Applications
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {sausageCategories.map((category) => (
              <div key={category.name} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-amber-50 border-b-2 border-amber-200 px-6 py-4">
                  <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{category.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Varieties:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {category.varieties.map((variety) => (
                          <li key={variety}>{variety}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Cooking Methods:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {category.cookingMethods.map((method) => (
                          <li key={method}>{method}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Meat Content</div>
                      <div className="font-semibold text-gray-900">{category.meatContent}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Casing Type</div>
                      <div className="font-semibold text-gray-900">{category.casing}</div>
                    </div>
                    <div className="col-span-3 md:col-span-1">
                      <div className="text-sm text-gray-500 mb-1">Best For</div>
                      <div className="font-semibold text-gray-900">{category.bestFor}</div>
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-lg mb-4">
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

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Menu Applications by Service Period
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuApplications.map((app) => (
              <div key={app.meal} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {app.meal}
                </h3>
                <ul className="space-y-2">
                  {app.dishes.map((dish) => (
                    <li key={dish} className="text-gray-600 text-sm flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1600&q=80"
            alt="Browse Our Sausage Selection"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Browse Our Sausage Selection
          </h2>
          <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
            Discover our range of sausages and specialty products from traditional to gourmet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/butchery/shop?category=SAUSAGES"
              className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Shop Sausage Products
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
      <SEOContentSection content={`<h2>Professional Sausages and Specialty Products Guide for Chefs and Food Service</h2>
<p>Understanding <strong>sausages</strong> and <strong>specialty meat products</strong> expands menu possibilities across all dayparts - whether you're an executive chef featuring <strong>artisan sausages</strong> on fine dining charcuterie boards, a head chef managing <strong>breakfast sausages</strong> for all-day dining operations, or a procurement manager sourcing diverse <strong>sausage varieties</strong> for pub menus and casual dining. Booker's <strong>sausages guide</strong> provides comprehensive resources covering traditional <strong>British sausages</strong>, continental varieties, specialty sausages, and cooking methods designed for UK chefs and food service professionals.</p>

<h3>Traditional British Sausages: Classics for Breakfast and Comfort Food Menus</h3>
<p><strong>Traditional British sausages</strong> (also called <strong>bangers</strong>) form the foundation of breakfast menus and comfort food offerings - typically made from pork (though beef, chicken, and vegetarian varieties available), containing 40-60% meat with rusk or breadcrumbs as filler, natural or synthetic casings, and regional seasoning variations. <strong>Cumberland sausages</strong> feature coarsely ground pork with black pepper and herbs, traditionally sold in long coils rather than links. <strong>Lincolnshire sausages</strong> contain sage as the dominant herb flavor, medium grind texture. <strong>Gloucester Old Spot sausages</strong> showcase heritage pork breeds with distinctive flavor profiles. Chefs discover <strong>cooking British sausages</strong> - <strong>pan-frying sausages</strong> (low-medium heat, turn frequently, cook to 165°F internal temperature), <strong>grilling sausages</strong> (moderate heat to avoid bursting casings), <strong>baking sausages</strong> (oven-roasting at 375-400°F), and <strong>poaching then finishing</strong> (gentle cooking followed by browning). Applications include <strong>full English breakfast</strong>, <strong>sausage and mash</strong>, <strong>toad in the hole</strong>, <strong>sausage rolls</strong>, and pub classics.</p>

<h3>Continental Sausages: Global Flavors for Contemporary Menus</h3>
<p><strong>Continental sausages</strong> bring international flavors to diverse menu applications. <strong>Italian sausages</strong> include <strong>Italian sweet sausage</strong> (fennel seed seasoning, mild flavor, perfect for pasta and pizza), <strong>Italian hot sausage</strong> (red pepper flakes add heat, ideal for robust dishes), and opportunities for grilling, braising, or removing from casings for crumbled applications. <strong>Spanish chorizo</strong> comes in two forms - <strong>cured chorizo</strong> (firm, sliceable, smoky paprika flavor, ready-to-eat for charcuterie boards and tapas) and <strong>fresh chorizo</strong> (requires cooking, spicy and rich, perfect for paella, stews, and contemporary plating). <strong>French sausages</strong> elevate charcuterie programs - <strong>Toulouse sausage</strong> (coarsely ground pork with wine and garlic, essential for cassoulet), <strong>Merguez sausage</strong> (North African-French lamb and beef sausage with harissa spices, grilled for street food and contemporary presentations), and <strong>boudin blanc</strong> (delicate white sausage with cream and eggs). <strong>German sausages</strong> provide versatility - <strong>bratwurst</strong> (grilled or pan-fried, beer-braised applications, Oktoberfest menus), <strong>knockwurst</strong> (garlic-heavy, shorter and fatter than brats), and <strong>weisswurst</strong> (Bavarian veal and pork sausage, traditional breakfast).</p>

<h3>Breakfast Sausages and Patties: All-Day Dining Essentials</h3>
<p><strong>Breakfast sausages</strong> dominate morning menus across all food service segments - available as <strong>breakfast sausage links</strong> (traditional small links, easy portioning, classic presentation), <strong>breakfast sausage patties</strong> (round flat discs, perfect for breakfast sandwiches and McMuffin-style service), and <strong>bulk breakfast sausage</strong> (loose ground meat for biscuits and gravy, stuffing applications, custom portioning). Seasoning profiles include <strong>mild breakfast sausage</strong> (traditional sage-forward flavor, broad appeal), <strong>hot breakfast sausage</strong> (red pepper flakes add heat for adventurous guests), <strong>maple breakfast sausage</strong> (sweet and savory balance, contemporary twist), and <strong>chicken or turkey breakfast sausage</strong> (leaner alternatives for health-conscious menus). Chefs master <strong>cooking breakfast sausages</strong> for high-volume service - batch cooking on flat-top griddles, holding at proper temperature in warming units, and maintaining food safety standards. Applications span <strong>full breakfast plates</strong>, <strong>breakfast sandwiches</strong>, <strong>breakfast burritos</strong>, <strong>sausage gravy and biscuits</strong>, and all-day breakfast menus.</p>

<h3>Specialty and Artisan Sausages: Premium Products for Contemporary Dining</h3>
<p><strong>Specialty sausages</strong> elevate menus with unique flavor profiles and premium positioning. <strong>Game sausages</strong> appeal to adventurous diners - <strong>venison sausages</strong> (lean, rich flavor, often blended with pork fat), <strong>wild boar sausages</strong> (intense flavor, rustic presentations), and <strong>duck sausages</strong> (rich, fatty, perfect for fine dining applications). <strong>Chicken and turkey sausages</strong> provide health-conscious alternatives - <strong>chicken apple sausage</strong> (sweet and savory, popular for breakfast and brunch), <strong>turkey sausage</strong> (lower fat option for calorie-conscious guests), and creative flavor combinations (sun-dried tomato, spinach and feta, chipotle). <strong>Lamb sausages</strong> bring Mediterranean and Middle Eastern flavors - <strong>merguez</strong> mentioned above, <strong>rosemary lamb sausages</strong> for contemporary plating, and <strong>Greek-style lamb sausages</strong> with oregano and lemon. <strong>Vegetarian and vegan sausages</strong> meet plant-based demand - meat-free alternatives using soy, wheat protein, vegetables, or legumes with traditional sausage seasonings and textures.</p>

<h3>Cured and Smoked Sausages: Charcuterie and Ready-to-Eat Applications</h3>
<p><strong>Cured sausages</strong> provide ready-to-eat options for charcuterie boards, appetizers, and cold applications. <strong>Salami varieties</strong> span global traditions - <strong>Italian salami</strong> (Genoa, Milano, soppressata - each with unique grind, seasoning, and aging), <strong>Spanish salchichón</strong> (similar to salami with Spanish spicing), and <strong>French saucisson sec</strong> (dry-cured in various regional styles). <strong>Pepperoni</strong> dominates pizza applications but also features on antipasto plates and contemporary presentations. <strong>Chorizo</strong> (cured Spanish version) slices for tapas, charcuterie, and flavor accents in contemporary dishes. <strong>Smoked sausages</strong> require minimal preparation - <strong>kielbasa</strong> (Polish smoked sausage, versatile for grilling, sautéing, or adding to stews), <strong>andouille</strong> (Cajun smoked sausage essential for jambalaya and gumbo), <strong>smoked bratwurst</strong>, and <strong>hot dogs/frankfurters</strong> (fully cooked, ready for grilling or steaming). These products offer convenience - already cooked, long shelf life, quick service applications.</p>

<h3>Sausage Cooking Methods and Temperature Guidelines</h3>
<p><strong>Fresh sausage cooking</strong> requires proper technique to ensure food safety and quality results. All fresh sausages must reach <strong>165°F internal temperature</strong> (use probe thermometer in the center of the thickest link). <strong>Pan-frying sausages</strong> - use low-medium heat to prevent bursting casings, turn frequently for even browning, avoid high heat that cooks exterior before interior reaches safe temperature, cook 12-15 minutes for most links. <strong>Grilling sausages</strong> - use moderate direct heat, turn frequently, watch for flare-ups from fat dripping, consider pre-poaching for thick sausages before grilling. <strong>Baking sausages</strong> - arrange on sheet pan, roast at 375-400°F for 20-25 minutes, flip halfway through for even browning. <strong>Poaching sausages</strong> - simmer in water, beer, or stock at 160-180°F until cooked through, then finish by grilling or pan-frying for color and texture. <strong>Braising sausages</strong> - brown first, add liquid and aromatics (onions, peppers, beer, wine), simmer until cooked and flavors meld. Avoid piercing sausages before or during cooking - keeps juices inside for better flavor and texture.</p>

<h3>Sausage Selection: Quality Standards and Menu Applications</h3>
<p>Understanding <strong>sausage quality</strong> helps chefs select appropriate products for their operations. <strong>Meat content</strong> varies significantly - premium sausages contain 80-97% meat with minimal filler, standard British sausages typically 40-60% meat with rusk or breadcrumbs, economy sausages may contain higher filler percentages affecting texture and flavor. <strong>Casing types</strong> impact texture and cooking - <strong>natural casings</strong> (hog, sheep, or beef intestines providing traditional snap and texture, preferred for artisan products), <strong>collagen casings</strong> (edible, uniform size, economical for mass production), and <strong>synthetic casings</strong> (removed before eating, used for some specialty products). <strong>Sausage applications by daypart</strong> - breakfast service (traditional breakfast sausages, links and patties, sausage gravy), lunch and dinner (Italian sausages for pasta and sandwiches, bratwurst for grilling, specialty sausages for contemporary plating), appetizers and small plates (sliced cured sausages for charcuterie, grilled sausage bites, sausage rolls), and all-day applications (sausage sandwiches, hot dogs, sausage pizza toppings).</p>

<h3>Why Professional Chefs Use Booker's Sausages Guide</h3>
<p>Booker's comprehensive <strong>sausages and specialty products guide</strong> provides UK chefs, caterers, and food service professionals with detailed knowledge for menu development and operational success. Each <strong>sausage category</strong> includes ingredient profiles and meat content standards, <strong>cooking methods</strong> matched to sausage type (grilling, pan-frying, baking, braising, poaching), internal temperature guidelines for food safety (165°F for fresh sausages), menu applications across dayparts and cuisines (breakfast, lunch, dinner, appetizers, British, Italian, Spanish, German, contemporary), storage and handling requirements for fresh and cured products, and cost-per-portion analysis for menu pricing. Whether you're sourcing <strong>traditional British sausages</strong> for breakfast and pub menus, <strong>Italian sausages</strong> for pasta and pizza applications, <strong>specialty sausages</strong> for charcuterie boards and contemporary dining, <strong>breakfast sausages</strong> for all-day operations, or <strong>cured sausages</strong> for ready-to-eat service - Booker's sausages guide helps you make informed decisions that expand menu variety, control costs, and satisfy diverse guest preferences.</p>

<p>Explore professional <strong>sausage varieties and specialty products</strong> with our complete <strong>sausages guide</strong> - free resources for UK chefs, caterers, and food service professionals from Booker wholesale butchery.</p>`} />


    </div>
  );
}
