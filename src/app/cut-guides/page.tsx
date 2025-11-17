import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ChefHat, Award, TrendingUp } from 'lucide-react';
import { SEOContentSection } from '@/components/sectors/SEOContentSection';

export const metadata: Metadata = {
  title: 'Professional Butchery Cut Guides | Beef, Pork, Lamb, Chicken, Sausage | Chef Resources UK | Booker',
  description: 'Complete professional cut guides for chefs & caterers. Master beef primal cuts, pork belly, lamb rack, chicken portions, sausage types. Cooking methods, temperatures, applications for restaurants. Free expert guides from Booker wholesale butchery.',
  keywords: 'beef cuts guide, pork cuts guide, lamb cuts guide, chicken cuts guide, sausage guide, primal cuts, butchery guide, chef guide, cooking methods, meat cuts UK, professional butchery, wholesale meat guide, restaurant meat guide, catering meat guide, butcher cuts, meat temperature guide',
};

const cutGuides = [
  {
    slug: 'beef',
    title: 'Beef Cuts Guide',
    description: 'Complete guide to beef cuts from chuck to sirloin. Learn about primal cuts, cooking methods, and best uses for each cut.',
    image: '/images/categories/beef.jpg',
    icon: '🥩',
    color: 'bg-red-50 border-red-200',
  },
  {
    slug: 'pork',
    title: 'Pork Cuts Guide',
    description: 'Explore pork cuts from shoulder to loin. Discover the best cuts for roasting, grilling, and slow cooking.',
    image: '/images/categories/pork.jpg',
    icon: '🥓',
    color: 'bg-pink-50 border-pink-200',
  },
  {
    slug: 'lamb',
    title: 'Lamb Cuts Guide',
    description: 'Understanding lamb cuts from rack to leg. Perfect for fine dining and special occasions.',
    image: '/images/categories/lamb.jpg',
    icon: '🍖',
    color: 'bg-orange-50 border-orange-200',
  },
  {
    slug: 'chicken',
    title: 'Chicken Cuts Guide',
    description: 'Comprehensive guide to chicken cuts and portions. From whole birds to specific cuts for every dish.',
    image: '/images/categories/chicken.jpg',
    icon: '🍗',
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    slug: 'sausages',
    title: 'Sausages & Specialties Guide',
    description: 'Explore our range of sausages and specialty products. Traditional and contemporary varieties for every menu.',
    image: '/images/categories/sausages.jpg',
    icon: '🌭',
    color: 'bg-amber-50 border-amber-200',
  },
];

const benefits = [
  {
    icon: BookOpen,
    title: 'Educational Content',
    description: 'Detailed information about each cut, including anatomical location and characteristics.',
  },
  {
    icon: ChefHat,
    title: 'Cooking Methods',
    description: 'Recommended cooking techniques and temperatures for optimal results.',
  },
  {
    icon: Award,
    title: 'Quality Selection',
    description: 'Tips on selecting the best cuts for your specific menu requirements.',
  },
  {
    icon: TrendingUp,
    title: 'Menu Innovation',
    description: 'Discover new cuts and applications to enhance your culinary offerings.',
  },
];

export default function CutGuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1600&q=80"
            alt="Professional Butchery Cut Guides"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              Professional Butchery Cut Guides
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Master the art of meat selection with our comprehensive guides to cuts, cooking methods, and culinary applications
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Complete Resource for Meat Cuts
          </h2>
          <p className="text-lg text-gray-600">
            Whether you're a professional chef, caterer, or food service operator, our cut guides provide the knowledge you need to select the perfect cuts for your menu. Each guide covers primal cuts, sub-primals, cooking methods, and recommended applications.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Cut Guides Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Browse Cut Guides by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cutGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/cut-guides/${guide.slug}`}
                className="group bg-white rounded-lg shadow-sm border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-primary"
              >
                <div className={`p-6 ${guide.color} border-b-2`}>
                  <div className="text-6xl mb-3 text-center">{guide.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {guide.description}
                  </p>
                  <div className="text-primary font-semibold group-hover:underline">
                    View Guide →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1600&q=80"
            alt="Need Help Selecting the Right Cuts?"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Need Help Selecting the Right Cuts?
          </h2>
          <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
            Our team of butchery experts is here to help you choose the perfect cuts for your menu and advise on preparation techniques.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/butchery/shop"
              className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Browse All Products
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContentSection content={`<h2>Professional Butchery Cut Guides for Chefs, Caterers, and Food Service Professionals</h2>
<p>Understanding <strong>meat cuts</strong> is fundamental to running successful food service operations - whether you're an executive chef creating fine dining tasting menus, a head chef managing casual dining chains, or a catering manager planning large-scale events. Booker's <strong>professional butchery cut guides</strong> provide comprehensive resources covering beef primal cuts, pork cuts, lamb cuts, chicken portions, and sausage varieties - with detailed cooking methods, temperature guides, and culinary applications designed for UK chefs and caterers.</p>

<h3>Beef Cuts Guide: From Chuck to Sirloin</h3>
<p>Our <strong>beef cuts guide</strong> covers the complete anatomy of beef - from economical chuck roasts perfect for slow-cooked dishes to premium ribeye and sirloin steaks for fine dining. Executive chefs learn about 28-day aged beef, marbling grades, and portion specifications for tasting menus, while head chefs discover cost-effective cuts like brisket, short rib, and flank steak for casual dining operations. Each beef cut includes recommended cooking methods (grilling, roasting, braising, sous vide), internal temperature targets, and restaurant applications - helping you select the perfect cut whether you're plating Michelin-starred beef Wellington or serving gastropub burgers.</p>

<h3>Pork Cuts Guide: Shoulder to Belly</h3>
<p>The <strong>pork cuts guide</strong> explores pork primal cuts from shoulder (perfect for pulled pork and slow roasting) to pork belly (ideal for crackling, bacon, and Asian cuisine) and tender pork loin for quick-service restaurants. Chefs learn about different pork cuts for various cooking methods - pork shoulder for low-and-slow BBQ, pork chops for grilling, pork belly for roasting and confit, and pork tenderloin for pan-searing. Temperature guides ensure food safety while maintaining juiciness, and application recommendations help you match cuts to your menu style - from fine dining pork belly to casual dining pulled pork sandwiches.</p>

<h3>Lamb Cuts Guide: Rack, Leg, and Shoulder</h3>
<p>Our <strong>lamb cuts guide</strong> is tailored for fine dining and special occasion menus, covering premium cuts like rack of lamb (perfect for French trimming and elegant presentation), lamb leg (ideal for roasting and carving stations), lamb shoulder (excellent for slow-cooking and Middle Eastern cuisine), and lamb loin chops for quick preparation. Executive chefs discover seasonal lamb availability, aging recommendations, and presentation techniques, while catering managers learn about portion control and cooking temperatures for large-scale events. Each lamb cut includes cooking method recommendations and menu applications across cuisines.</p>

<h3>Chicken Cuts Guide: Whole Birds to Specific Portions</h3>
<p>The <strong>chicken cuts guide</strong> covers everything from whole chickens (economical for roasting and stock) to specific cuts - chicken breast (lean, quick-cooking, versatile), chicken thighs (flavorful, forgiving, budget-friendly), drumsticks (great for casual dining and events), and wings (perfect for pub menus and appetizers). Head chefs running high-volume operations learn about portioning, yield calculations, and cost control, while executive chefs discover supremes, ballotines, and specialty preparations. Temperature guidelines ensure food safety across all chicken applications, from grilled chicken breast to confit chicken thighs.</p>

<h3>Sausage Guide: Traditional to Contemporary Varieties</h3>
<p>Our <strong>sausage guide</strong> explores sausage types from traditional British bangers (perfect for full English breakfast and casual dining) to continental varieties (chorizo, merguez, Italian sausage) and specialty sausages for gourmet applications. Chefs learn about sausage casings, meat content standards, cooking methods (grilling, pan-frying, poaching, oven-roasting), and menu applications - from breakfast menus to charcuterie boards, pasta dishes to BBQ platters. The guide covers both fresh sausages and cured varieties, helping you select the right products for your menu concept.</p>

<h3>Why Professional Chefs Use Booker's Cut Guides</h3>
<p>Across all our <strong>professional cut guides</strong>, Booker provides the detailed knowledge UK chefs and food service professionals need to succeed. Each guide includes anatomical diagrams showing primal and sub-primal cuts, cooking method recommendations (grilling, roasting, braising, searing, sous vide), internal temperature targets for food safety and optimal doneness, culinary applications across cuisines and menu styles, and cost-per-portion guidance for menu pricing. Whether you're sourcing beef for fine dining, pork for casual dining chains, lamb for special occasions, chicken for high-volume operations, or sausages for breakfast menus - Booker's cut guides help you make informed decisions that improve your food quality, control costs, and enhance your culinary offerings.</p>

<p>Explore our complete collection of <strong>professional butchery cut guides</strong> above - free resources for UK chefs, caterers, and food service professionals from Booker wholesale butchery.</p>`} />
    </div>
  );
}
