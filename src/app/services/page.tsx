import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import {
  UtensilsCrossed,
  Store,
  Truck,
  Users,
  CreditCard,
  Recycle,
  ChevronRight
} from "lucide-react";
import { SEOContentSection } from '@/components/sectors/SEOContentSection';

export const metadata: Metadata = {
  title: 'Business Services & Support for Hospitality, Retail & Foodservice | Click & Collect, Central Billing | Booker',
  description: 'Comprehensive business services for UK food businesses. Hospitality services, retail solutions, click & collect delivery, foodservice clubs, central billing, and oil recycling. Streamline operations with Booker wholesale support services.',
  keywords: 'business services, hospitality services, retail business services, click and collect, delivery services, foodservice clubs, central billing, marketplace, oil recycling, wholesale services, restaurant services, catering services, hotel services, pub services, convenience store services',
};

const services = [
  {
    id: "hospitality",
    title: "Hospitality Services",
    description: "Comprehensive services tailored for restaurants, hotels, pubs, bars, and catering businesses.",
    icon: UtensilsCrossed,
    href: "/services/hospitality",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
  },
  {
    id: "retail",
    title: "Services for Retail Business",
    description: "Specialized solutions for convenience stores, retail outlets, and independent retailers.",
    icon: Store,
    href: "/services/retail",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
  },
  {
    id: "delivery",
    title: "Click & Collect and Delivery",
    description: "Flexible fulfillment options to suit your business needs. Order online, collect at branch or get delivered.",
    icon: Truck,
    href: "/services/click-collect-delivery",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&q=80",
  },
  {
    id: "clubs",
    title: "Foodservice Clubs",
    description: "Exclusive member benefits, discounts, and special offers for foodservice businesses.",
    icon: Users,
    href: "/services/foodservice-clubs",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
  },
  {
    id: "billing",
    title: "Central Billing and Marketplace",
    description: "Streamlined billing solutions and access to our comprehensive marketplace platform.",
    icon: CreditCard,
    href: "/services/central-billing-marketplace",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  },
  {
    id: "recycling",
    title: "Used Cooking Oil Recycling",
    description: "Sustainable waste management solutions for used cooking oil collection and recycling.",
    icon: Recycle,
    href: "/services/oil-recycling",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1200&q=80",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80"
            alt="Business Services & Support"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
              Business Services & Support
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md" style={{ color: '#FFFFFF' }}>
              Comprehensive solutions designed to support your operations and help your business thrive
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              return (
                <Link
                  key={service.id}
                  href={service.href}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary transform hover:-translate-y-1"
                >
                  {/* Hero Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Chevron */}
                    <div className="absolute top-4 right-4">
                      <ChevronRight className="w-5 h-5 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Learn More Link */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <span className="text-primary font-semibold text-sm group-hover:underline inline-flex items-center gap-1">
                        Learn More
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1600&q=80"
            alt="Need Help Choosing the Right Service?"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            Need Help Choosing the Right Service?
          </h2>
          <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
            Our team is here to help you find the perfect solutions for your business needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Contact Us
            </Link>
            <Link
              href="/help"
              className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
            >
              Visit Help Centre
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContentSection content={`<h2>Comprehensive Business Services for UK Hospitality, Retail, and Foodservice Operations</h2>
<p>Running a successful food business requires more than quality products - you need reliable <strong>business services and support</strong> that streamline operations, reduce costs, and help your business grow. Booker provides comprehensive business solutions tailored for restaurants, hotels, pubs, bars, catering companies, convenience stores, and independent retailers across the UK. From hospitality services to retail business solutions, click & collect delivery to central billing, our business support services are designed around the real-world challenges UK food businesses face every day.</p>

<h3>Hospitality Services: Tailored Solutions for Restaurants, Hotels, Pubs & Catering</h3>
<p>Our <strong>hospitality services</strong> provide comprehensive support for restaurants (fine dining to casual dining), hotels (boutique to chains), pubs (community locals to gastro pubs), bars (cocktail bars to nightclubs), and catering businesses (wedding caterers to corporate event companies). Hospitality-focused services include dedicated account management for menu planning and seasonal procurement, custom cutting and butchery services for portion control, volume discounts for multi-site operations, next-day delivery to minimize storage requirements, and expert consultation on menu development and cost management. Whether you're running a Michelin-starred restaurant requiring premium aged beef, managing a hotel group needing centralized procurement, or operating a busy pub requiring reliable supplies for weekend rushes - Booker's hospitality services provide the support food service professionals need to succeed.</p>

<h3>Services for Retail Business: Solutions for Convenience Stores & Independent Retailers</h3>
<p>Independent retailers, convenience stores, farm shops, and specialty food retailers need <strong>retail business services</strong> that understand the unique challenges of retail operations - balancing inventory levels, managing cash flow, responding to local customer preferences, and competing with larger chains. Our retail business solutions include flexible ordering with low minimum requirements, competitive wholesale pricing to protect retail margins, fast stock replenishment to avoid stockouts on popular items, merchandising support and point-of-sale materials, and seasonal promotions and special offers for retail customers. From corner shops stocking everyday essentials to specialty butchers offering premium cuts, farm shops selling local produce to ethnic grocery stores serving specific communities - Booker supports independent retailers with business services that help you compete effectively and serve your local community.</p>

<h3>Click & Collect and Delivery: Flexible Fulfillment Options for Every Business</h3>
<p>Modern food businesses need flexible <strong>fulfillment options</strong> that fit their operational requirements and cash flow needs. Booker's <strong>click & collect and delivery services</strong> provide the flexibility UK food businesses demand. Click & collect allows you to order online and collect from your nearest Booker branch - perfect for businesses with transport who want to inspect products before taking delivery, avoid delivery fees, and collect outside standard delivery hours. Next-day delivery provides reliable temperature-controlled delivery direct to your business - ideal for businesses without transport, high-volume operations requiring regular large deliveries, and multi-site operations needing centralized ordering with individual site delivery. Combined fulfillment lets you mix click & collect and delivery on the same order - collect urgent items today while scheduling bulk deliveries for next day, optimizing your procurement costs and operational efficiency.</p>

<h3>Foodservice Clubs: Exclusive Member Benefits, Discounts & Special Offers</h3>
<p>Our <strong>foodservice clubs</strong> provide exclusive member benefits designed specifically for professional food businesses. Club membership includes volume-based discounts (higher purchasing volumes unlock greater savings), seasonal promotions and special offers on key categories, early access to new products and limited-time deals, exclusive events and training sessions for professional development, and dedicated account management for personalized service. Whether you're a chef looking to discover new ingredients and cooking techniques, a procurement manager seeking to maximize cost savings, or a retail manager wanting to stay ahead of consumer trends - foodservice club membership provides the benefits, discounts, and support that help food businesses thrive in competitive markets.</p>

<h3>Central Billing and Marketplace: Streamlined Procurement for Multi-Site Operations</h3>
<p>Multi-site hospitality groups, hotel chains, and retail operations need <strong>central billing solutions</strong> that simplify financial management while maintaining operational flexibility. Booker's <strong>central billing and marketplace</strong> services provide single-invoice billing for all locations (one invoice consolidates all branch purchases, simplifying accounts payable), centralized procurement with site-level flexibility (corporate controls key purchasing while sites can order as needed), comprehensive reporting and analytics (track spending by location, category, and time period), credit management and flexible payment terms, and marketplace access to thousands of products beyond core wholesale range. From hotel groups managing procurement across multiple properties to restaurant chains standardizing core ingredients while allowing site-specific customization - central billing streamlines financial operations while the marketplace provides access to the comprehensive product range your business needs.</p>

<h3>Used Cooking Oil Recycling: Sustainable Waste Management Solutions</h3>
<p>Restaurants, hotels, pubs, and catering businesses producing used cooking oil need compliant, sustainable <strong>waste management solutions</strong>. Our <strong>used cooking oil recycling service</strong> provides regular collection schedules tailored to your business volume, compliant waste transfer documentation for environmental regulations, secure containers and safe handling procedures, sustainable recycling (oil converted to biodiesel and other products), and competitive pricing with potential rebates for high-volume generators. From fish and chip shops producing large volumes of used oil to hotel kitchens managing multiple fryer stations, pub kitchens serving fried food menus to catering companies operating across multiple sites - our oil recycling service helps you manage waste responsibly, maintain regulatory compliance, and contribute to environmental sustainability.</p>

<h3>Why UK Food Businesses Choose Booker Services</h3>
<p>Across all our <strong>business services</strong> - hospitality services, retail business solutions, click & collect and delivery, foodservice clubs, central billing, and oil recycling - Booker delivers the comprehensive support UK food businesses need to succeed. Dedicated account management provides personalized service and expert consultation, flexible solutions adapt to your specific business requirements, competitive pricing and member discounts protect your margins, reliable delivery and fulfillment options ensure operational continuity, and expert support helps you navigate challenges and seize opportunities. Whether you're running a restaurant, hotel, pub, bar, catering company, convenience store, or independent retailer - Booker's business services provide the support, solutions, and savings that help UK food businesses thrive.</p>

<p>Explore our complete range of <strong>business services and support solutions</strong> above - designed for UK hospitality, retail, and foodservice professionals from Booker wholesale.</p>`} />
    </main>
  );
}


