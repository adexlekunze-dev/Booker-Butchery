import { LucideIcon } from "lucide-react";
import {
  ChefHat,
  Users,
  Building2,
  Store,
  Award,
  Truck,
  CreditCard,
  CheckCircle2,
  Clock,
  Shield,
  TrendingUp,
  Percent,
  Package,
  ThermometerSun
} from "lucide-react";

export interface ICPBenefit {
  icon?: LucideIcon;
  title: string;
  description: string;
}

export interface ICPTestimonial {
  name: string;
  role: string;
  business: string;
  quote: string;
  rating: number;
}

export interface ICPFAQ {
  question: string;
  answer: string;
}

export interface ICPTrustBadge {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface ICPSolution {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface ICPPersona {
  id: string;
  name: string;
  slug: string;
  shortDescription: string; // For tiles
  hero: {
    headline: string;
    subheadline: string;
    imageUrl: string;
  };
  painPoints: string[];
  solutions: ICPSolution[];
  benefits: ICPBenefit[];
  testimonial: ICPTestimonial;
  productCategories: string[]; // Category names they care about most
  trustBadges: ICPTrustBadge[];
  faqs: ICPFAQ[];
  seoContent: string; // 200-300 words keyword-optimized
  cta: {
    headline: string;
    description: string;
    primaryButton: {
      text: string;
      href: string;
    };
    secondaryButton?: {
      text: string;
      href: string;
    };
  };
}

export const icpPersonas: ICPPersona[] = [
  {
    id: "executive-chef",
    name: "Executive Chef",
    slug: "executive-chef",
    shortDescription: "Premium cuts and specialty items for fine dining excellence",
    hero: {
      headline: "Premium Wholesale Butchery for Executive Chefs",
      subheadline: "Elevate your fine dining menu with Red Tractor certified beef, premium lamb, and specialty cuts. Consistent quality, trusted provenance, expert support.",
      imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1600&q=80",
    },
    painPoints: [
      "Inconsistent quality and portion sizes from suppliers",
      "Difficulty sourcing premium specialty cuts on demand",
      "Need for reliable provenance and traceability",
      "Time-sensitive delivery for menu planning",
    ],
    solutions: [
      {
        id: "premium-quality",
        title: "Premium Quality Assurance",
        description: "Red Tractor certified beef, premium aged options, and specialty cuts with full traceability. Every cut meets fine dining standards.",
        icon: Award,
      },
      {
        id: "specialty-cuts",
        title: "Specialty Cuts On Demand",
        description: "Access veal escalopes, rack of lamb, aged ribeye, and specialty items. Custom cutting available for signature dishes.",
        icon: ChefHat,
      },
      {
        id: "next-day-delivery",
        title: "Next-Day Delivery",
        description: "Order by 3pm for next-day delivery. Temperature-controlled transport ensures peak freshness for your tasting menus.",
        icon: Truck,
      },
      {
        id: "dedicated-support",
        title: "Dedicated Account Support",
        description: "Expert butchery team understands fine dining needs. Custom orders, portion control, and menu consultation available.",
        icon: Users,
      },
    ],
    benefits: [
      {
        icon: Award,
        title: "Red Tractor Certified",
        description: "British-sourced, quality-assured beef and lamb with full traceability for menu storytelling.",
      },
      {
        icon: ThermometerSun,
        title: "Premium Aged Options",
        description: "28-day aged beef, seasonal lamb, and specialty cuts that elevate your signature dishes.",
      },
      {
        icon: CheckCircle2,
        title: "Consistent Portioning",
        description: "Restaurant-quality cuts with consistent sizing for plating precision and cost control.",
      },
      {
        icon: Clock,
        title: "Flexible Ordering",
        description: "Order online 24/7. Last-minute additions for tasting menus. Custom cutting with 48hrs notice.",
      },
    ],
    testimonial: {
      name: "Marcus Foster",
      role: "Executive Chef",
      business: "The Savoy Manchester",
      quote: "Booker's premium beef and lamb selection has transformed our tasting menus. The quality is exceptional, traceability is perfect for our discerning guests, and the reliability means I can focus on creativity, not sourcing issues.",
      rating: 5,
    },
    productCategories: ["BEEF", "LAMB", "VEAL", "POULTRY & GAME"],
    trustBadges: [
      {
        id: "red-tractor",
        title: "Red Tractor Certified",
        description: "British farms, quality assured, fully traceable supply chain",
        icon: Shield,
      },
      {
        id: "aged-beef",
        title: "Premium Aged Beef",
        description: "28-day aged ribeye, sirloin, and specialty cuts available",
        icon: Award,
      },
      {
        id: "custom-cuts",
        title: "Custom Butchery",
        description: "Bespoke cutting and portioning for signature dishes",
        icon: ChefHat,
      },
    ],
    faqs: [
      {
        question: "Can I order custom cuts for signature dishes?",
        answer: "Yes! Our expert butchery team can provide custom cuts, portion sizes, and special preparations. Custom orders typically require 48 hours notice. Contact your local branch or account manager to discuss your requirements.",
      },
      {
        question: "What's the provenance and traceability of your meat?",
        answer: "All our beef and lamb is Red Tractor certified with full farm-to-fork traceability. We can provide provenance documentation for menu storytelling and customer inquiries. Our beef is sourced from British and Irish farms, with aging options available.",
      },
      {
        question: "How consistent is the quality and portion sizing?",
        answer: "We maintain rigorous quality standards with consistent portioning across all orders. Each cut undergoes strict quality checks. For fine dining operations, we offer premium grading and can provide portion-controlled cuts to your exact specifications.",
      },
      {
        question: "Do you offer premium specialty cuts like veal and game?",
        answer: "Yes! We stock veal escalopes, cutlets, and osso buco. Our game selection includes duck, guinea fowl, and seasonal game birds. Availability varies by season - speak with your account manager for current offerings.",
      },
      {
        question: "What's the lead time for urgent menu changes?",
        answer: "Standard orders placed by 3pm arrive next day. For urgent requirements or last-minute menu changes, contact your branch directly. We'll do our best to accommodate same-day or emergency orders where possible.",
      },
    ],
    seoContent: `<h2>Premium Wholesale Butchery for Fine Dining Restaurants</h2>
<p>Executive chefs running high-end restaurants and fine dining establishments need more than just meat suppliers - you need a <strong>premium butchery partner</strong> who understands the demands of Michelin-starred kitchens and tasting menu operations. Booker provides <strong>Red Tractor certified beef and lamb</strong>, premium aged cuts, and specialty items with the quality, consistency, and traceability your discerning guests expect.</p>

<p>Our <strong>wholesale butchery range</strong> includes 28-day aged ribeye, premium rack of lamb, veal escalopes, and seasonal game - all sourced from British farms with full provenance documentation. Whether you're creating tasting menus, seasonal à la carte dishes, or signature plates, our expert butchery team provides custom cutting, portion control, and menu consultation to bring your culinary vision to life.</p>

<p>With next-day delivery across Manchester and the North West, temperature-controlled transport, and flexible ordering 24/7, we make premium meat sourcing simple and reliable. From prime cuts to offal and specialty items, Booker supports executive chefs with the quality, service, and expertise fine dining demands.</p>`,
    cta: {
      headline: "Ready to Elevate Your Menu?",
      description: "Join executive chefs across the UK ordering premium butchery products from Booker",
      primaryButton: {
        text: "Browse Premium Cuts",
        href: "/butchery/shop",
      },
      secondaryButton: {
        text: "Speak to Butchery Expert",
        href: "/contact",
      },
    },
  },
  {
    id: "head-chef",
    name: "Head Chef",
    slug: "head-chef",
    shortDescription: "Consistent quality and value for casual dining operations",
    hero: {
      headline: "Wholesale Meat Supplier for Casual Dining Chains",
      subheadline: "Quality beef, chicken, and pork for consistent menu delivery across locations. Competitive pricing, reliable stock, and flexible delivery.",
      imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80",
    },
    painPoints: [
      "Maintaining consistent quality across multiple locations",
      "Managing food costs and GP targets",
      "Stock availability for high-volume menus",
      "Balancing quality with competitive pricing",
    ],
    solutions: [
      {
        id: "consistent-quality",
        title: "Consistent Quality & Portioning",
        description: "Same quality chicken breast, burger patties, and cuts across all your locations. Standardized portioning for menu consistency.",
        icon: CheckCircle2,
      },
      {
        id: "competitive-pricing",
        title: "Competitive Wholesale Pricing",
        description: "Volume discounts, special offers, and competitive pricing on high-volume items. Protect your GP while maintaining quality.",
        icon: Percent,
      },
      {
        id: "reliable-stock",
        title: "Reliable Stock Availability",
        description: "Consistent stock of chicken breasts, beef burgers, pork belly, and menu essentials. No menu disruption from stockouts.",
        icon: Package,
      },
      {
        id: "multi-location",
        title: "Multi-Location Delivery",
        description: "Centralized ordering with delivery to multiple sites. Streamlined operations and reduced admin overhead.",
        icon: Truck,
      },
    ],
    benefits: [
      {
        icon: TrendingUp,
        title: "Protect Your GP",
        description: "Competitive pricing on high-volume items. Volume discounts and special offers for chain operations.",
      },
      {
        icon: CheckCircle2,
        title: "Menu Consistency",
        description: "Same quality and portion sizes across all locations. Standardized products for operational efficiency.",
      },
      {
        icon: Package,
        title: "Stock Reliability",
        description: "Consistent availability of menu essentials. Never face stockouts on your signature dishes.",
      },
      {
        icon: CreditCard,
        title: "Central Billing",
        description: "Single invoice for multiple locations. Streamlined financial operations and simplified accounting.",
      },
    ],
    testimonial: {
      name: "Sarah Mitchell",
      role: "Head Chef & Operations Manager",
      business: "The Burger Co. (12 locations)",
      quote: "Booker keeps our operations running smoothly across all 12 sites. Consistent burger patties, reliable chicken breasts, and competitive pricing mean we hit our GP targets while delivering quality our customers love. The centralized ordering saves us hours every week.",
      rating: 5,
    },
    productCategories: ["CHICKEN", "BEEF", "BURGERS", "PORK"],
    trustBadges: [
      {
        id: "consistent-quality",
        title: "Consistent Quality",
        description: "Same products across all deliveries and locations",
        icon: CheckCircle2,
      },
      {
        id: "competitive-pricing",
        title: "Volume Discounts",
        description: "Special pricing for multi-location operations",
        icon: Percent,
      },
      {
        id: "reliable-delivery",
        title: "Multi-Site Delivery",
        description: "Reliable delivery to all your locations",
        icon: Truck,
      },
    ],
    faqs: [
      {
        question: "Can you deliver to multiple locations with one order?",
        answer: "Yes! We offer centralized ordering with delivery to multiple sites across the UK. You can manage all locations from one account with central billing, making operations more efficient and reducing administrative overhead.",
      },
      {
        question: "Do you offer volume discounts for chain operations?",
        answer: "Absolutely. We provide competitive wholesale pricing with volume discounts for multi-location businesses. Contact your account manager to discuss pricing tiers based on your ordering volumes across all sites.",
      },
      {
        question: "How do you ensure quality consistency across deliveries?",
        answer: "We maintain strict quality control with consistent portioning and grading across all products. Each delivery undergoes the same quality checks, ensuring your customers get the same experience whether they visit your Manchester, Birmingham, or London location.",
      },
      {
        question: "What's your stock availability like for high-volume items?",
        answer: "We stock high volumes of casual dining essentials - chicken breasts, burger patties, sausages, and pork belly. Our purchasing team forecasts demand to maintain consistent availability, so you won't face menu disruption from stockouts.",
      },
      {
        question: "Can we get custom products for our signature dishes?",
        answer: "Yes! For chain operations, we can provide custom burger blends, marinated chicken, or portioned cuts specific to your menu. Custom products typically require minimum order quantities and lead times - speak with your account manager for details.",
      },
    ],
    seoContent: `<h2>Wholesale Meat Supplier for Casual Dining Restaurants & Chains</h2>
<p>Head chefs managing casual dining restaurants, gastropubs, and multi-location chains face unique challenges - delivering consistent quality across sites while hitting GP targets and managing food costs. Booker provides <strong>wholesale meat supply</strong> with the consistency, availability, and competitive pricing casual dining operations demand.</p>

<p>Our range includes high-volume essentials like chicken breast fillets, beef burger patties, pork belly, sausages, and bacon - all with consistent portioning and quality across every delivery. Whether you're running a 3-site gastropub group or a 20-location casual dining chain, our centralized ordering, multi-location delivery, and volume discounts streamline your operations and protect your margins.</p>

<p>With reliable stock availability, next-day delivery, and flexible ordering, Booker supports head chefs with the operational efficiency and cost control that chain restaurants need. From menu staples to seasonal specials, we're your partner for consistent quality and value.</p>`,
    cta: {
      headline: "Ready to Streamline Your Operations?",
      description: "Join casual dining chains ordering from Booker for consistent quality and competitive pricing",
      primaryButton: {
        text: "Browse Wholesale Range",
        href: "/butchery/shop",
      },
      secondaryButton: {
        text: "Discuss Volume Pricing",
        href: "/contact",
      },
    },
  },
  {
    id: "procurement-manager",
    name: "Procurement Manager",
    slug: "procurement-manager",
    shortDescription: "Streamlined ordering and competitive pricing for hotels and catering",
    hero: {
      headline: "Wholesale Butchery for Hotels & Catering Procurement",
      subheadline: "Simplify bulk ordering with competitive pricing, central billing, and multi-site delivery. Quality products, streamlined operations, reliable service.",
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80",
    },
    painPoints: [
      "Managing procurement across multiple venues or departments",
      "Balancing quality requirements with budget constraints",
      "Administrative overhead of multiple supplier invoices",
      "Ensuring delivery reliability for events and functions",
    ],
    solutions: [
      {
        id: "central-billing",
        title: "Central Billing & Ordering",
        description: "Single account for hotel groups or catering operations. One invoice covering all departments and locations. Reduced admin overhead.",
        icon: CreditCard,
      },
      {
        id: "bulk-pricing",
        title: "Competitive Bulk Pricing",
        description: "Volume discounts on high-volume items. Special pricing for hotel and catering operations. Protect your budgets without compromising quality.",
        icon: Percent,
      },
      {
        id: "multi-department",
        title: "Multi-Department Ordering",
        description: "Separate orders for restaurant, banqueting, room service, and events - all on one account. Streamlined procurement management.",
        icon: Building2,
      },
      {
        id: "reliable-delivery",
        title: "Reliable Delivery & Service",
        description: "Next-day delivery for events and functions. Temperature-controlled transport. Dedicated account management for procurement support.",
        icon: Truck,
      },
    ],
    benefits: [
      {
        icon: CreditCard,
        title: "Simplified Billing",
        description: "Single invoice for all departments and locations. Reduced admin time and simplified financial reconciliation.",
      },
      {
        icon: Percent,
        title: "Volume Discounts",
        description: "Competitive bulk pricing across your entire operation. Special rates for hotel and catering businesses.",
      },
      {
        icon: Package,
        title: "Wide Product Range",
        description: "From banqueting chicken to fine dining beef. One supplier for diverse menu requirements across all departments.",
      },
      {
        icon: Users,
        title: "Dedicated Support",
        description: "Account manager understands hotel and catering needs. Support for events, functions, and seasonal demand spikes.",
      },
    ],
    testimonial: {
      name: "David Chen",
      role: "Procurement Manager",
      business: "Riverside Hotel Group (5 properties)",
      quote: "Switching to Booker transformed our procurement operations. Central billing saved us countless admin hours, volume pricing improved our margins, and reliable delivery means our events teams can count on us. One account for restaurants, banqueting, and room service - it's exactly what we needed.",
      rating: 5,
    },
    productCategories: ["CHICKEN", "BEEF", "LAMB", "PORK", "SAUSAGES"],
    trustBadges: [
      {
        id: "central-billing",
        title: "Central Billing",
        description: "Single invoice for all departments and locations",
        icon: CreditCard,
      },
      {
        id: "volume-pricing",
        title: "Volume Pricing",
        description: "Competitive discounts for bulk purchasing",
        icon: Percent,
      },
      {
        id: "account-manager",
        title: "Dedicated Support",
        description: "Account manager for procurement assistance",
        icon: Users,
      },
    ],
    faqs: [
      {
        question: "How does central billing work for hotel groups?",
        answer: "We provide a single account covering all your properties and departments (restaurant, banqueting, room service, etc.). You receive one consolidated invoice with detailed breakdowns by location/department, simplifying your financial operations and reducing administrative overhead.",
      },
      {
        question: "What volume discounts are available for catering operations?",
        answer: "We offer tiered pricing based on order volumes across your entire operation. Larger volumes unlock better rates on high-usage items like chicken, beef, and pork. Your account manager will work with you to structure pricing that fits your procurement budgets and volume forecasts.",
      },
      {
        question: "Can different departments order independently?",
        answer: "Yes! While you have central billing, each department (restaurant, banqueting, events, room service) can place separate orders based on their specific needs. This gives operational flexibility while maintaining centralized financial management.",
      },
      {
        question: "How reliable is delivery for events and functions?",
        answer: "We understand catering events can't tolerate delays. Next-day delivery as standard, with priority handling for event orders. Temperature-controlled transport ensures products arrive in perfect condition. For critical events, speak with your account manager about guaranteed delivery windows.",
      },
      {
        question: "Do you support seasonal demand spikes (Christmas, weddings, etc.)?",
        answer: "Absolutely. Work with your account manager to forecast seasonal demand for Christmas parties, summer weddings, and conference season. We can pre-allocate stock and adjust delivery schedules to support your busiest periods without disruption.",
      },
    ],
    seoContent: `<h2>Wholesale Meat Supplier for Hotels & Catering Procurement</h2>
<p>Procurement managers for hotels, catering companies, and multi-venue hospitality groups need suppliers who understand bulk purchasing, multi-department operations, and financial efficiency. Booker provides <strong>wholesale butchery supply</strong> with central billing, competitive volume pricing, and the operational support that hotel and catering procurement demands.</p>

<p>Our comprehensive range covers diverse needs - from fine dining beef for your restaurant to bulk chicken for banqueting, from breakfast sausages for room service to premium lamb for wedding functions. With a single account managing all departments and locations, you reduce admin overhead while maintaining the flexibility each team needs.</p>

<p>Dedicated account management, reliable next-day delivery, and volume discounts help procurement teams balance quality requirements with budget constraints. Whether you're managing a single hotel or a multi-property group, Booker streamlines your wholesale meat procurement with the service and pricing hospitality operations require.</p>`,
    cta: {
      headline: "Ready to Streamline Procurement?",
      description: "Join hotels and catering operations using Booker for simplified ordering and competitive pricing",
      primaryButton: {
        text: "Explore Wholesale Range",
        href: "/butchery/shop",
      },
      secondaryButton: {
        text: "Speak to Procurement Team",
        href: "/contact",
      },
    },
  },
  {
    id: "butcher-shop-owner",
    name: "Butcher Shop Owner",
    slug: "butcher-shop-owner",
    shortDescription: "Quality wholesale supply for independent butchers and farm shops",
    hero: {
      headline: "Wholesale Butchery for Independent Butchers & Farm Shops",
      subheadline: "Quality beef, pork, and lamb for retail butchers. Red Tractor certified, competitive trade pricing, and flexible ordering to support your business.",
      imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1600&q=80",
    },
    painPoints: [
      "Sourcing quality meat at competitive wholesale prices",
      "Maintaining product variety without large minimum orders",
      "Building customer trust with provenance and quality assurance",
      "Managing cash flow with flexible payment terms",
    ],
    solutions: [
      {
        id: "trade-pricing",
        title: "Competitive Trade Pricing",
        description: "Wholesale prices for butchers, farm shops, and specialty retailers. Volume discounts and special offers to protect your retail margins.",
        icon: Percent,
      },
      {
        id: "quality-assured",
        title: "Red Tractor Quality",
        description: "British-sourced, Red Tractor certified beef and lamb. Full provenance documentation to support your customer storytelling.",
        icon: Award,
      },
      {
        id: "flexible-ordering",
        title: "Flexible Ordering",
        description: "No large minimum orders required. Order what you need, when you need it. Perfect for independent butchers managing varied stock.",
        icon: Package,
      },
      {
        id: "wide-range",
        title: "Complete Butchery Range",
        description: "From primal cuts to specialty items. Beef, pork, lamb, chicken, sausages, and burgers - all from one trusted wholesale supplier.",
        icon: Store,
      },
    ],
    benefits: [
      {
        icon: Award,
        title: "British Quality",
        description: "Red Tractor certified beef and lamb. Quality assurance your customers trust and value.",
      },
      {
        icon: Percent,
        title: "Retail Margins",
        description: "Competitive wholesale pricing with volume discounts. Protect your margins while offering great value.",
      },
      {
        icon: CheckCircle2,
        title: "Provenance Documentation",
        description: "Full traceability and farm provenance. Build customer trust with transparency and quality storytelling.",
      },
      {
        icon: Truck,
        title: "Next-Day Delivery",
        description: "Order by 3pm for next-day delivery. Temperature-controlled transport ensures peak freshness for your display.",
      },
    ],
    testimonial: {
      name: "James Richardson",
      role: "Owner",
      business: "Richardson's Family Butchers",
      quote: "As an independent butcher, Booker gives me access to the same quality Red Tractor beef my customers expect, but at wholesale prices that protect my margins. The flexible ordering means I'm not stuck with large minimums, and the provenance documentation helps me tell the quality story my customers value.",
      rating: 5,
    },
    productCategories: ["BEEF", "PORK", "LAMB", "SAUSAGES", "BURGERS"],
    trustBadges: [
      {
        id: "red-tractor",
        title: "Red Tractor Certified",
        description: "British farms with full quality assurance",
        icon: Shield,
      },
      {
        id: "trade-pricing",
        title: "Trade Pricing",
        description: "Competitive wholesale prices for retail butchers",
        icon: Percent,
      },
      {
        id: "flexible-orders",
        title: "Flexible Orders",
        description: "No large minimums - order what you need",
        icon: Package,
      },
    ],
    faqs: [
      {
        question: "What are your minimum order requirements?",
        answer: "We don't enforce large minimum orders, making us ideal for independent butchers and farm shops. Order the products you need in quantities that suit your business. For very small orders, standard delivery charges apply - speak with your branch for details.",
      },
      {
        question: "Can you provide provenance documentation for customers?",
        answer: "Yes! All our beef and lamb is Red Tractor certified with full farm-to-fork traceability. We can provide provenance documentation and certification details to support your customer storytelling and quality claims.",
      },
      {
        question: "What's the pricing structure for retail butchers?",
        answer: "We offer competitive wholesale trade pricing for butchers and specialty retailers. Volume discounts are available based on order sizes. Your account manager will work with you to structure pricing that protects your retail margins while offering your customers great value.",
      },
      {
        question: "Do you offer custom cutting or specialty items?",
        answer: "Absolutely. Our butchery team can provide custom cuts, specialty items, and specific preparations for your retail needs. Custom orders typically require 48 hours notice and may have minimum quantity requirements depending on the cut.",
      },
      {
        question: "How does delivery work for smaller businesses?",
        answer: "Standard next-day delivery for orders placed by 3pm. All products arrive in temperature-controlled vehicles with insulated packaging. For independent butchers, we can often coordinate delivery with your local branch to optimize delivery schedules and reduce costs.",
      },
    ],
    seoContent: `<h2>Wholesale Meat Supplier for Independent Butchers & Farm Shops</h2>
<p>Independent butchers and farm shop owners need <strong>wholesale meat suppliers</strong> who understand retail challenges - competitive trade pricing, flexible ordering without large minimums, and quality products your customers trust. Booker provides <strong>Red Tractor certified beef and lamb</strong>, quality pork and chicken, and a complete butchery range with the provenance and pricing independent butchers need.</p>

<p>Our wholesale range includes primal cuts, portioned steaks, sausages, burgers, and specialty items - all from British farms with full traceability documentation. Whether you're a traditional high street butcher, a farm shop selling your own and other local products, or a specialty meat retailer, we support your business with quality, competitive pricing, and flexible ordering.</p>

<p>With next-day delivery, no large minimums, and volume discounts to protect your retail margins, Booker makes wholesale butchery supply simple and reliable. From everyday cuts to specialty items for discerning customers, we're your partner for quality wholesale meat that builds your reputation and supports your business growth.</p>`,
    cta: {
      headline: "Ready to Partner with Booker?",
      description: "Join independent butchers across the UK ordering quality wholesale meat from Booker",
      primaryButton: {
        text: "Browse Wholesale Range",
        href: "/butchery/shop",
      },
      secondaryButton: {
        text: "Discuss Trade Pricing",
        href: "/contact",
      },
    },
  },
];

export function getICPBySlug(slug: string): ICPPersona | undefined {
  return icpPersonas.find((icp) => icp.slug === slug);
}
