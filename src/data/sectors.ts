import { LucideIcon } from "lucide-react";
import { ChefHat, Store, Utensils, GlassWater, Coffee, Beer, ShoppingBag, Heart, Leaf, Carrot, Fish, Drumstick, UtensilsCrossed, Truck, Users, CreditCard, Recycle, Award, MapPin, CheckCircle2 } from "lucide-react";

export interface SectorCategory {
  id: string;
  name: string;
  slug: string;
  icon?: LucideIcon;
}

export interface SectorBenefit {
  icon?: LucideIcon;
  title: string;
  description: string;
}

export interface SectorTestimonial {
  name: string;
  role: string;
  business: string;
  quote: string;
  rating: number;
}

export interface SectorResource {
  title: string;
  description: string;
  link: string;
  type: "guide" | "case-study" | "blog" | "video" | "tool";
}

export interface SectorOffer {
  id: string;
  title: string;
  description: string;
  discount?: string;
  validUntil?: string;
}

export interface SectorFAQ {
  question: string;
  answer: string;
}

export interface SectorTrustBadge {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface SectorBusinessSolution {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  link: string;
}

export interface Sector {
  id: string;
  name: string;
  slug: string;
  hero: {
    headline: string;
    subheadline: string;
    imageUrl?: string;
  };
  valuePoints: string[];
  categories: SectorCategory[];
  benefits: SectorBenefit[];
  testimonials: SectorTestimonial[];
  resources: SectorResource[];
  offers: SectorOffer[];
  seoContent?: string; // 200-300 words of keyword-optimized HTML content
  faqs?: SectorFAQ[]; // 5-6 sector-relevant FAQs
  trustBadges?: SectorTrustBadge[]; // Sector-specific trust badges (optional)
  businessSolutions?: SectorBusinessSolution[]; // 2-4 relevant services for this sector
  primaryTestimonial?: SectorTestimonial; // ONE best testimonial to showcase prominently
  socialProof?: {
    count: number;
    businessType: string;
    timePeriod: string;
  }; // For popular products section: "Ordered by {count} {businessType} this {timePeriod}"
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

export const sectors: Sector[] = [
  {
    id: "restaurants",
    name: "Restaurants",
    slug: "restaurants",
    hero: {
      headline: "Restaurant Supply Excellence",
      subheadline: "Chef-quality ingredients and professional service to help your restaurant thrive",
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200",
    },
    valuePoints: [
      "Chef-approved quality ingredients",
      "Consistent supply chain",
      "Competitive restaurant pricing",
      "Menu development support",
    ],
    categories: [
      { id: "fresh-meat", name: "Fresh Meat", slug: "fresh-meat", icon: Drumstick },
      { id: "poultry", name: "Poultry", slug: "poultry", icon: Drumstick },
      { id: "fish-seafood", name: "Fish & Seafood", slug: "fish-seafood", icon: Fish },
      { id: "fresh-produce", name: "Fresh Produce", slug: "greengrocery", icon: Carrot },
      { id: "beer-cider", name: "Beer & Cider", slug: "beer", icon: Beer },
      { id: "wine-spirits", name: "Wine & Spirits", slug: "wine-spirits", icon: GlassWater },
    ],
    benefits: [
      {
        title: "Chef Quality",
        description: "Premium ingredients selected by chefs, for chefs. Meet the standards your kitchen demands.",
      },
      {
        title: "Menu Consistency",
        description: "Reliable supply and consistent quality so your signature dishes taste the same every time.",
      },
      {
        title: "Cost Control",
        description: "Transparent pricing and volume discounts to help manage your food costs effectively.",
      },
      {
        title: "Kitchen Support",
        description: "Expert advice on ingredients, preparation techniques, and menu development from our food service team.",
      },
    ],
    testimonials: [
      {
        name: "Marcus Rodriguez",
        role: "Head Chef",
        business: "The Oak Restaurant",
        quote: "Booker understands what restaurants need. Quality, consistency, and service. They deliver on all fronts.",
        rating: 5,
      },
      {
        name: "Sophie Williams",
        role: "Owner",
        business: "The Garden Bistro",
        quote: "Their fresh produce and meat selection has elevated our menu. Customers notice the difference in quality.",
        rating: 5,
      },
    ],
    resources: [
      {
        title: "Menu Cost Calculator",
        description: "Calculate food costs and optimal pricing for menu items",
        link: "/resources/menu-cost-calculator",
        type: "tool",
      },
      {
        title: "Seasonal Menu Inspiration",
        description: "Create seasonal menus with our ingredient suggestions",
        link: "/resources/seasonal-menu-inspiration",
        type: "guide",
      },
      {
        title: "Kitchen Efficiency Guide",
        description: "Optimize your kitchen operations and reduce waste",
        link: "/resources/kitchen-efficiency-guide",
        type: "guide",
      },
    ],
    offers: [
      {
        id: "restaurant-startup",
        title: "New Restaurant Package",
        description: "Special pricing and setup support for new restaurants",
      },
      {
        id: "restaurant-regular",
        title: "Regular Order Discount",
        description: "Save 5% on orders placed on a regular schedule",
      },
    ],
    primaryTestimonial: {
      name: "Marcus Rodriguez",
      role: "Head Chef",
      business: "The Oak Restaurant",
      quote: "Booker understands what restaurants need. Quality, consistency, and service. They deliver on all fronts.",
      rating: 5,
    },
    socialProof: {
      count: 850,
      businessType: "restaurants",
      timePeriod: "month",
    },
    trustBadges: [
      { id: "chef-approved", title: "Chef Approved", description: "Selected by professionals", icon: ChefHat },
      { id: "consistency", title: "Consistent Quality", description: "Every order, every time", icon: CheckCircle2 },
      { id: "menu-support", title: "Menu Support", description: "Expert guidance available", icon: Utensils },
    ],
    businessSolutions: [
      { id: "hospitality", title: "Hospitality Services", description: "Comprehensive support including ordering assistance and account management.", link: "/services/hospitality", icon: UtensilsCrossed },
      { id: "delivery", title: "Click & Collect and Delivery", description: "Flexible ordering with next-day delivery or branch collection.", link: "/services/click-collect-delivery", icon: Truck },
      { id: "clubs", title: "Foodservice Clubs", description: "Exclusive member benefits and special offers for restaurants.", link: "/services/foodservice-clubs", icon: Users },
    ],
    faqs: [
      { question: "What types of products does Booker supply for restaurants?", answer: "Booker supplies a comprehensive range of chef-quality ingredients including fresh meat, poultry, fish & seafood, fresh produce, beverages, and specialty ingredients. Our catalog is specifically curated to meet the needs of professional restaurant kitchens." },
      { question: "How does delivery work for restaurants?", answer: "We offer reliable next-day delivery to restaurants across the UK. Orders placed before 3pm are delivered the next day. We also offer Click & Collect service if you prefer to pick up orders from your nearest branch." },
      { question: "Can I get help with menu development?", answer: "Yes, our food service team includes experts who can provide advice on ingredients, preparation techniques, and menu development. Your local account manager can connect you with our culinary experts." },
      { question: "Do you offer volume discounts for regular orders?", answer: "Yes, we offer competitive pricing and volume discounts for regular customers. Setting up a regular order schedule can save you up to 5% on your orders while ensuring consistent supply." },
      { question: "What quality standards do your products meet?", answer: "All our products meet or exceed industry standards for foodservice. Our chef-quality ingredients are selected by professionals and undergo rigorous quality checks to ensure consistency and freshness." },
      { question: "Can I track my orders?", answer: "Yes, you can track your orders through your online account. You'll receive notifications when your order is confirmed, dispatched, and delivered. Your account manager can also provide updates." },
    ],
    seoContent: `<p>Booker is the UK's leading <strong>restaurant wholesale supplier</strong>, providing quality ingredients and professional kitchen supplies to restaurants across the country. Our comprehensive range supports chefs and restaurant owners in creating exceptional dining experiences while managing food costs effectively.</p>
<p>From premium <a href="/meat-fish-poultry/shop">meat and seafood</a> to fresh <a href="/greengrocery/shop">greengrocery</a> and specialty ingredients, Booker offers the products professional kitchens need. Our <strong>restaurant supply</strong> service includes competitive wholesale pricing, reliable next-day delivery, and expert support from local account managers who understand the restaurant industry.</p>
<p>Whether you operate a fine dining establishment, casual restaurant, or bistro, our <strong>restaurant wholesale</strong> solutions help you maintain consistent quality while optimizing your supply chain. With over 170 branches and extensive product ranges, we make it easy to source everything your kitchen needs in one place.</p>`,
    cta: {
      headline: "Start Shopping for Restaurants",
      description: "Partner with Booker for reliable, high-quality ingredients that help your restaurant succeed.",
      primaryButton: {
        text: "Become a member",
        href: "/register",
      },
      secondaryButton: {
        text: "Shop all products",
        href: "/sectors/restaurants/shop",
      },
    },
  },
  {
    id: "pubs-bars",
    name: "Pubs & Bars",
    slug: "pubs-bars",
    hero: {
      headline: "Pub & Bar Supply Solutions",
      subheadline: "Complete beverage and food supply for pubs, bars, and hospitality venues",
      imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200",
    },
    valuePoints: [
      "Extensive beer, cider & spirits range",
      "Fresh pub food ingredients",
      "Competitive pricing on drinks",
      "Local branch network support",
    ],
    categories: [
      { id: "beer-cider", name: "Beer & Cider", slug: "beer", icon: Beer },
      { id: "wine-spirits", name: "Wine & Spirits", slug: "wine-spirits", icon: GlassWater },
      { id: "fresh-meat", name: "Pub Food Ingredients", slug: "fresh-meat", icon: Drumstick },
      { id: "snacks", name: "Snacks & Nibbles", slug: "snacks", icon: ShoppingBag },
      { id: "soft-drinks", name: "Soft Drinks", slug: "soft-drinks", icon: GlassWater },
      { id: "ice", name: "Ice", slug: "ice", icon: ShoppingBag },
    ],
    benefits: [
      {
        title: "Beverage Range",
        description: "Extensive selection of beers, ciders, wines, and spirits from leading brands and local breweries.",
      },
      {
        title: "Food Pairing",
        description: "Fresh ingredients for classic pub food, from quality meat for burgers to fresh produce for salads.",
      },
      {
        title: "Pricing Advantage",
        description: "Competitive wholesale pricing on beverages to protect your margins.",
      },
      {
        title: "Local Support",
        description: "Regional account managers who understand the local pub and bar market.",
      },
    ],
    testimonials: [
      {
        name: "Mike Harrison",
        role: "Landlord",
        business: "The Crown Inn",
        quote: "Booker's beer selection and pricing helps us compete. Their local branch makes ordering easy and deliveries are always on time.",
        rating: 5,
      },
      {
        name: "Lisa Park",
        role: "Manager",
        business: "The Riverside Bar",
        quote: "We've expanded our menu thanks to Booker's quality ingredients. The fresh meat for our burgers is excellent.",
        rating: 5,
      },
    ],
    resources: [
      {
        title: "Beverage Cost Calculator",
        description: "Calculate optimal pricing for drinks to maximize profitability",
        link: "/resources/beverage-cost-calculator",
        type: "tool",
      },
      {
        title: "Pub Food Menu Ideas",
        description: "Classic and contemporary pub food recipes and menu suggestions",
        link: "/resources/pub-food-menu-ideas",
        type: "guide",
      },
      {
        title: "Stock Management Guide",
        description: "Best practices for managing beverage and food inventory",
        link: "/resources/stock-management-guide",
        type: "guide",
      },
    ],
    offers: [
      {
        id: "pub-welcome",
        title: "New Pub Package",
        description: "Welcome discount and setup support for new pubs and bars",
      },
      {
        id: "pub-volume",
        title: "Volume Pricing",
        description: "Better rates for larger orders and regular customers",
      },
    ],
    primaryTestimonial: {
      name: "Mike Harrison",
      role: "Landlord",
      business: "The Crown Inn",
      quote: "Booker's beer selection and pricing helps us compete. Their local branch makes ordering easy and deliveries are always on time.",
      rating: 5,
    },
    socialProof: {
      count: 650,
      businessType: "pubs & bars",
      timePeriod: "month",
    },
    trustBadges: [
      { id: "extensive-range", title: "Extensive Beverage Range", description: "Beers, wines, spirits", icon: Beer },
      { id: "competitive-pricing", title: "Competitive Pricing", description: "Protect your margins", icon: Award },
      { id: "local-support", title: "Local Support", description: "Regional account managers", icon: MapPin },
    ],
    businessSolutions: [
      { id: "hospitality", title: "Hospitality Services", description: "Comprehensive support for pubs and bars including beverage ordering and account management.", link: "/services/hospitality", icon: UtensilsCrossed },
      { id: "delivery", title: "Click & Collect and Delivery", description: "Flexible ordering with next-day delivery or branch collection.", link: "/services/click-collect-delivery", icon: Truck },
      { id: "clubs", title: "Foodservice Clubs", description: "Exclusive member benefits and special offers for pubs and bars.", link: "/services/foodservice-clubs", icon: Users },
    ],
    faqs: [
      { question: "What beverages does Booker supply for pubs and bars?", answer: "Booker supplies an extensive range of beers, ciders, wines, spirits, and soft drinks from leading brands. We also offer products from local breweries to help you create a unique selection for your customers." },
      { question: "Do you offer competitive pricing on drinks?", answer: "Yes, we offer competitive wholesale pricing on all beverages to help protect your profit margins. Volume discounts are available for larger orders and regular customers." },
      { question: "Can I order pub food ingredients alongside beverages?", answer: "Yes, you can order everything from one place. We supply quality fresh meat for burgers, fresh produce for salads, snacks, and all other pub food essentials alongside your beverage orders." },
      { question: "How does local support work for pubs?", answer: "All pub and bar members have access to a dedicated regional account manager who understands the local market. They can help with ordering, product recommendations, and managing your account." },
      { question: "What are your delivery options for pubs?", answer: "We offer reliable next-day delivery for orders placed before 3pm. Alternatively, you can use our Click & Collect service to pick up orders from your nearest branch at a time that suits you." },
      { question: "Do you offer support for seasonal promotions?", answer: "Yes, our account managers can help you plan seasonal promotions and ensure you have the right products in stock. We can also provide recommendations based on successful promotions at other venues." },
    ],
    seoContent: `<p>Booker provides comprehensive <strong>pub supplies</strong> and <strong>bar wholesale</strong> solutions for pubs, bars, and hospitality venues across the UK. Our extensive range of beverages, fresh ingredients, and bar essentials helps publicans stock their bars efficiently while protecting profit margins.</p>
<p>Whether you're running a traditional local pub or a modern bar, we offer competitive pricing on <a href="/beer/shop">beer and cider</a>, wines, spirits, and soft drinks from leading brands. Our <strong>pub food ingredients</strong> range includes quality <a href="/meat-fish-poultry/shop">fresh meat</a> for burgers and pub classics, alongside fresh produce for salads and sides.</p>
<p>With over 170 branches nationwide, Booker makes it easy to order <strong>pub stock</strong> with local account management and reliable next-day delivery. Our <strong>wholesale pub supplies</strong> service supports venues of all sizes, from independent pubs to large bar chains, with flexible ordering options and competitive volume pricing.</p>`,
    cta: {
      headline: "Start Shopping for Pubs & Bars",
      description: "Get the drinks and food supplies your pub needs to succeed.",
      primaryButton: {
        text: "Become a member",
        href: "/register",
      },
      secondaryButton: {
        text: "Shop all products",
        href: "/sectors/pubs-bars/shop",
      },
    },
  },
  {
    id: "hotels",
    name: "Hotels",
    slug: "hotels",
    hero: {
      headline: "Hotel Supply Solutions",
      subheadline: "Comprehensive supply chain for hotel restaurants, bars, room service, and events",
      imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200",
    },
    valuePoints: [
      "Multi-department supply solution",
      "24/7 ordering and support",
      "Event and banquet support",
      "Flexible delivery schedules",
    ],
    categories: [
      { id: "fresh-meat", name: "Fresh Meat", slug: "fresh-meat", icon: Drumstick },
      { id: "fresh-produce", name: "Fresh Produce", slug: "greengrocery", icon: Carrot },
      { id: "beer-cider", name: "Beer & Cider", slug: "beer", icon: Beer },
      { id: "wine-spirits", name: "Wine & Spirits", slug: "wine-spirits", icon: GlassWater },
      { id: "breakfast", name: "Breakfast Items", slug: "breakfast", icon: ShoppingBag },
      { id: "room-service", name: "Room Service Supplies", slug: "room-service", icon: ShoppingBag },
    ],
    benefits: [
      {
        title: "Multi-Department",
        description: "Supply everything from restaurant ingredients to bar beverages to room service snacks from one supplier.",
      },
      {
        title: "Event Support",
        description: "Specialized support for weddings, conferences, and banquets with custom delivery scheduling.",
      },
      {
        title: "24/7 Service",
        description: "Round-the-clock ordering support and flexible delivery times to fit your hotel operations.",
      },
      {
        title: "Account Management",
        description: "Dedicated account managers who understand hotel operations and can coordinate multi-department orders.",
      },
    ],
    testimonials: [
      {
        name: "Robert Anderson",
        role: "Food & Beverage Director",
        business: "The Grand Plaza Hotel",
        quote: "Booker simplifies our supply chain. One supplier for multiple departments saves time and ensures consistency.",
        rating: 5,
      },
      {
        name: "Charlotte Moore",
        role: "Executive Chef",
        business: "Riverside Hotel",
        quote: "The quality and reliability help us maintain our high standards. Their event support is invaluable for large bookings.",
        rating: 5,
      },
    ],
    resources: [
      {
        title: "Hotel Supply Checklist",
        description: "Comprehensive checklist for hotel food and beverage supply",
        link: "/resources/hotel-supply-checklist",
        type: "guide",
      },
      {
        title: "Event Planning Guide",
        description: "Plan and execute successful hotel events and banquets",
        link: "/resources/event-planning-guide",
        type: "guide",
      },
      {
        title: "Multi-Department Ordering",
        description: "Best practices for coordinating orders across hotel departments",
        link: "/resources/multi-department-ordering",
        type: "guide",
      },
    ],
    offers: [
      {
        id: "hotel-partnership",
        title: "Hotel Partnership Program",
        description: "Tailored pricing and service packages for hotel chains",
      },
      {
        id: "hotel-event",
        title: "Event Support Package",
        description: "Special pricing and priority service for large events",
      },
    ],
    primaryTestimonial: {
      name: "Robert Anderson",
      role: "Food & Beverage Director",
      business: "The Grand Plaza Hotel",
      quote: "Booker simplifies our supply chain. One supplier for multiple departments saves time and ensures consistency.",
      rating: 5,
    },
    socialProof: {
      count: 420,
      businessType: "hotels",
      timePeriod: "month",
    },
    trustBadges: [
      { id: "multi-department", title: "Multi-Department Supply", description: "One supplier for all", icon: Store },
      { id: "24-7-support", title: "24/7 Support", description: "Always available", icon: CheckCircle2 },
      { id: "event-support", title: "Event Support", description: "Banquet & conference ready", icon: Award },
    ],
    businessSolutions: [
      { id: "hospitality", title: "Hospitality Services", description: "Comprehensive support for hotels including multi-department ordering and account management.", link: "/services/hospitality", icon: UtensilsCrossed },
      { id: "delivery", title: "Click & Collect and Delivery", description: "Flexible delivery scheduling to fit hotel operations.", link: "/services/click-collect-delivery", icon: Truck },
      { id: "billing", title: "Central Billing and Marketplace", description: "Streamlined billing solutions for multi-department hotel operations.", link: "/services/central-billing-marketplace", icon: CreditCard },
    ],
    faqs: [
      { question: "Can Booker supply multiple hotel departments?", answer: "Yes, we supply everything your hotel needs from one supplier - restaurant ingredients, bar beverages, room service snacks, and event catering supplies. This simplifies your procurement and ensures consistency across departments." },
      { question: "Do you offer flexible delivery scheduling for hotels?", answer: "Yes, we understand that hotels have unique operational needs. We offer flexible delivery schedules that can accommodate your restaurant, bar, and room service requirements, including early morning or late evening deliveries." },
      { question: "Can you support large events and banquets?", answer: "Yes, we provide dedicated support for large events, conferences, weddings, and banquets. Your account manager can help coordinate large orders and ensure timely delivery for special events." },
      { question: "What support is available for hotel operations?", answer: "All hotel members have access to dedicated account managers who understand hotel operations. We also offer 24/7 ordering support and can coordinate multi-department orders efficiently." },
      { question: "Do you offer volume discounts for hotels?", answer: "Yes, we offer competitive pricing and volume discounts for hotels, especially for those with regular orders across multiple departments. Hotel chains can benefit from our partnership programs with tailored pricing." },
      { question: "Can I order for room service operations?", answer: "Yes, we supply a wide range of snacks, beverages, and products suitable for room service. Your account manager can help you select appropriate products for your room service menu." },
    ],
    seoContent: `<p>Booker delivers comprehensive <strong>hotel supply solutions</strong> for hotels of all sizes, from boutique properties to large hotel chains. Our integrated supply service supports hotel restaurants, bars, room service, events, and catering operations with quality products and reliable delivery.</p>
<p>Our <strong>hotel wholesale</strong> range includes fresh ingredients for hotel restaurants, beverages for hotel bars, breakfast supplies, and event catering essentials. With competitive pricing and flexible ordering, we help hotel operators maintain service standards while controlling food and beverage costs.</p>
<p>Partnering with Booker simplifies your hotel supply chain with dedicated account management, next-day delivery across our network of 170+ branches, and specialized support for hotel chains. Our <strong>hotel catering supplies</strong> ensure your guests receive consistent quality across all dining experiences, from room service to large-scale events.</p>`,
    cta: {
      headline: "Start Shopping for Hotels",
      description: "Partner with Booker for reliable, comprehensive supply across all your hotel departments.",
      primaryButton: {
        text: "Become a member",
        href: "/register",
      },
      secondaryButton: {
        text: "Shop all products",
        href: "/sectors/hotels/shop",
      },
    },
  },
  {
    id: "events",
    name: "Events",
    slug: "events",
    hero: {
      headline: "Event Catering Solutions",
      subheadline: "Complete catering and supply solutions for weddings, conferences, festivals, and large-scale events",
      imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200",
    },
    valuePoints: [
      "Bulk pricing for large orders",
      "Flexible delivery schedules",
      "Event planning support",
      "Multi-day event supply",
    ],
    categories: [
      { id: "fresh-meat", name: "Fresh Meat", slug: "fresh-meat", icon: Drumstick },
      { id: "poultry", name: "Poultry", slug: "poultry", icon: Drumstick },
      { id: "fish-seafood", name: "Fish & Seafood", slug: "fish-seafood", icon: Fish },
      { id: "vegetables", name: "Fresh Vegetables", slug: "greengrocery", icon: Carrot },
      { id: "beer-cider", name: "Beer & Cider", slug: "beer", icon: Beer },
      { id: "wine-spirits", name: "Wine & Spirits", slug: "wine-spirits", icon: GlassWater },
    ],
    benefits: [
      {
        title: "Large-Scale Supply",
        description: "Capability to supply hundreds or thousands of guests with consistent quality across all quantities.",
      },
      {
        title: "Event Planning",
        description: "Dedicated support for menu planning, portioning, and delivery scheduling for your event.",
      },
      {
        title: "Flexible Delivery",
        description: "Custom delivery schedules to fit your event timeline, including multi-day events.",
      },
      {
        title: "Bulk Pricing",
        description: "Special pricing for large event orders with volume discounts available.",
      },
    ],
    testimonials: [
      {
        name: "Emma Thompson",
        role: "Events Director",
        business: "Elite Events",
        quote: "Booker made our wedding season seamless. The quality was excellent and deliveries were always on time.",
        rating: 5,
      },
    ],
    resources: [
      {
        title: "Event Planning Guide",
        description: "Complete guide to planning catering for large events",
        link: "/resources/event-planning-guide",
        type: "guide",
      },
    ],
    offers: [
      {
        id: "events-bulk",
        title: "Bulk Event Pricing",
        description: "Enhanced discounts for orders over 200 guests",
      },
    ],
    primaryTestimonial: {
      name: "Sarah Mitchell",
      role: "Event Coordinator",
      business: "Elite Events UK",
      quote: "Booker makes large event catering possible. Their bulk pricing and flexible delivery helped us successfully cater a 500-guest wedding. Everything arrived on time and the quality was outstanding.",
      rating: 5,
    },
    socialProof: {
      count: 320,
      businessType: "events",
      timePeriod: "month",
    },
    trustBadges: [
      { id: "bulk-pricing", title: "Bulk Pricing", description: "Best rates for large orders", icon: Award },
      { id: "flexible-delivery", title: "Flexible Delivery", description: "Schedule to your needs", icon: Truck },
      { id: "event-support", title: "Event Support", description: "Dedicated coordination", icon: CheckCircle2 },
    ],
    businessSolutions: [
      { id: "hospitality", title: "Hospitality Services", description: "Comprehensive event catering support including bulk ordering and coordination.", link: "/services/hospitality", icon: UtensilsCrossed },
      { id: "delivery", title: "Click & Collect and Delivery", description: "Flexible delivery options for events including venue delivery.", link: "/services/click-collect-delivery", icon: Truck },
      { id: "clubs", title: "Foodservice Clubs", description: "Exclusive member benefits for event professionals.", link: "/services/foodservice-clubs", icon: Users },
    ],
    faqs: [
      { question: "Can Booker handle large event orders?", answer: "Yes, we specialize in bulk orders for large events including weddings, conferences, and festivals. Our flexible delivery options and bulk pricing make it cost-effective to cater events of any size." },
      { question: "How far in advance should I place event orders?", answer: "We recommend placing orders at least 3-5 days in advance for large events to ensure availability and allow time for coordination. For very large events (500+ guests), 7-10 days is ideal." },
      { question: "Can you deliver directly to event venues?", answer: "Yes, we can deliver directly to event venues nationwide. Our logistics team can coordinate delivery times that fit your event schedule, including early morning or evening deliveries." },
      { question: "Do you offer multi-day event supply?", answer: "Yes, we can supply products for multi-day events including festivals and conferences. We can coordinate staggered deliveries to ensure freshness throughout the event." },
      { question: "What support is available for event planning?", answer: "Your account manager can help with product recommendations, quantities, and menu planning for events. We also provide event planning guides and can connect you with catering experts." },
      { question: "Do you supply disposable catering equipment?", answer: "Yes, we supply a wide range of disposable catering equipment including plates, cutlery, cups, and serving items. These can be ordered alongside your food ingredients." },
    ],
    seoContent: `<p>Booker is your trusted partner for <strong>event catering supplies</strong> and <strong>event wholesale</strong> solutions across the UK. Whether you're organizing corporate events, weddings, festivals, or private parties, we provide the ingredients and supplies needed to create memorable catering experiences.</p>
<p>Our comprehensive <strong>event supply</strong> range includes fresh ingredients, beverages, disposable catering equipment, and event essentials. From <a href="/meat-fish-poultry/shop">quality meat and fish</a> for hot meals to <a href="/greengrocery/shop">fresh produce</a> for salads and canapés, we help event caterers deliver exceptional food while managing costs effectively.</p>
<p>With flexible ordering, competitive wholesale pricing, and reliable delivery to venues nationwide, Booker supports event professionals in delivering successful catering services. Our local branches provide personalized service for large events, ensuring you have the right products when and where you need them.</p>`,
    cta: {
      headline: "Start Shopping for Events",
      description: "Partner with Booker for reliable, high-quality event catering solutions.",
      primaryButton: {
        text: "Become a member",
        href: "/register",
      },
      secondaryButton: {
        text: "Shop all products",
        href: "/sectors/events/shop",
      },
    },
  },
  {
    id: "coffee-shops-cafes",
    name: "Coffee Shops & Cafes",
    slug: "coffee-shops-cafes",
    hero: {
      headline: "Coffee Shop & Cafe Supply",
      subheadline: "Quality ingredients and supplies to keep your coffee shop or cafe running smoothly",
      imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200",
    },
    valuePoints: [
      "Fresh food ingredients",
      "Competitive pricing",
      "Regular delivery schedules",
      "Small order friendly",
    ],
    categories: [
      { id: "fresh-produce", name: "Fresh Produce", slug: "greengrocery", icon: Carrot },
      { id: "bakery", name: "Bakery Items", slug: "bakery", icon: ShoppingBag },
      { id: "dairy", name: "Dairy Products", slug: "dairy", icon: ShoppingBag },
      { id: "snacks", name: "Snacks & Pastries", slug: "snacks", icon: ShoppingBag },
      { id: "beverages", name: "Soft Drinks", slug: "soft-drinks", icon: GlassWater },
      { id: "packaging", name: "Takeaway Packaging", slug: "packaging", icon: ShoppingBag },
    ],
    benefits: [
      {
        title: "Food Menu Support",
        description: "Fresh ingredients for sandwiches, salads, pastries, and light meals to complement your coffee.",
      },
      {
        title: "Small Orders",
        description: "We welcome small, regular orders perfect for independent coffee shops and cafes.",
      },
      {
        title: "Consistent Supply",
        description: "Reliable delivery schedules to ensure you never run out of essential items.",
      },
      {
        title: "Cost Effective",
        description: "Competitive pricing designed for smaller businesses, helping you maintain healthy margins.",
      },
    ],
    testimonials: [
      {
        name: "Tom Richardson",
        role: "Owner",
        business: "Bean & Leaf Coffee",
        quote: "Booker helps us offer quality food alongside great coffee. Their fresh produce makes our sandwiches stand out.",
        rating: 5,
      },
    ],
    resources: [
      {
        title: "Coffee Shop Menu Ideas",
        description: "Menu suggestions and recipes for coffee shop food offerings",
        link: "/resources/coffee-shop-menu-ideas",
        type: "guide",
      },
    ],
    offers: [
      {
        id: "cafe-welcome",
        title: "New Cafe Offer",
        description: "10% off your first month of orders",
      },
    ],
    primaryTestimonial: {
      name: "James Thompson",
      role: "Owner",
      business: "Brew & Bite Café",
      quote: "Booker's quality ingredients and reliable delivery help us maintain consistency. The fresh produce for our sandwiches is always top quality and customers notice the difference.",
      rating: 5,
    },
    socialProof: {
      count: 580,
      businessType: "coffee shops & cafes",
      timePeriod: "month",
    },
    trustBadges: [
      { id: "quality-ingredients", title: "Quality Ingredients", description: "Premium products", icon: Award },
      { id: "consistent-supply", title: "Consistent Supply", description: "Reliable stock", icon: CheckCircle2 },
      { id: "competitive-pricing", title: "Competitive Pricing", description: "Protect margins", icon: Store },
    ],
    businessSolutions: [
      { id: "hospitality", title: "Hospitality Services", description: "Comprehensive support for coffee shops and cafes including product recommendations.", link: "/services/hospitality", icon: UtensilsCrossed },
      { id: "delivery", title: "Click & Collect and Delivery", description: "Convenient next-day delivery or branch collection for cafes.", link: "/services/click-collect-delivery", icon: Truck },
      { id: "clubs", title: "Foodservice Clubs", description: "Exclusive member benefits for coffee shops and cafes.", link: "/services/foodservice-clubs", icon: Users },
    ],
    faqs: [
      { question: "What products does Booker supply for coffee shops and cafes?", answer: "We supply a comprehensive range including fresh produce for sandwiches and salads, milk and dairy products, bakery items, snacks, beverages, and all essential cafe supplies. We focus on quality ingredients that help your cafe stand out." },
      { question: "Do you supply coffee beans?", answer: "While we supply many cafe essentials, coffee beans are typically sourced through specialist suppliers. However, we can help connect you with coffee suppliers and we stock all other ingredients you need for your cafe operations." },
      { question: "Can you help with menu development?", answer: "Yes, our account managers can provide advice on products and menu suggestions. We understand what works in coffee shops and cafes and can help you create appealing food offerings." },
      { question: "What delivery options are available for cafes?", answer: "We offer reliable next-day delivery for orders placed before 3pm. Alternatively, you can use our Click & Collect service to pick up orders from your nearest branch at a time that suits your cafe schedule." },
      { question: "Do you offer competitive pricing for independent cafes?", answer: "Yes, we offer competitive wholesale pricing that helps independent cafes compete effectively. Our pricing is transparent and we offer volume discounts for regular customers." },
      { question: "Can I get support from a local account manager?", answer: "Yes, all cafe members have access to a dedicated local account manager who understands the coffee shop and cafe industry. They can help with ordering, product recommendations, and account management." },
    ],
    seoContent: `<p>Booker supplies quality ingredients and professional equipment to <strong>coffee shops</strong> and <strong>cafes</strong> across the UK. Our comprehensive range helps independent cafes and coffee shop chains maintain consistent quality while managing costs effectively.</p>
<p>From premium coffee beans and milk to fresh pastries, sandwiches, and cafe supplies, our <strong>coffee shop wholesale</strong> service provides everything your cafe needs. We offer competitive pricing on essential ingredients like <a href="/greengrocery/shop">fresh produce</a> for salads and sandwiches, alongside specialty items that help differentiate your offering.</p>
<p>With local branch support and reliable next-day delivery, Booker makes it easy for coffee shop owners to access quality wholesale supplies. Our <strong>cafe supply</strong> solutions support independent operators and multi-site chains, helping you focus on serving great coffee while we handle your supply needs.</p>`,
    cta: {
      headline: "Start Shopping for Coffee Shops & Cafes",
      description: "Get the quality ingredients you need to keep your business thriving.",
      primaryButton: {
        text: "Become a member",
        href: "/register",
      },
      secondaryButton: {
        text: "Shop all products",
        href: "/sectors/coffee-shops-cafes/shop",
      },
    },
  },
  {
    id: "takeaways",
    name: "Takeaways",
    slug: "takeaways",
    hero: {
      headline: "Takeaway & Fast Service Supply",
      subheadline: "Essential ingredients, packaging, and supplies for takeaway and fast food businesses",
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200",
    },
    valuePoints: [
      "Takeaway packaging solutions",
      "Fresh ingredients",
      "Fast delivery options",
      "Competitive pricing",
    ],
    categories: [
      { id: "fresh-meat", name: "Fresh Meat", slug: "fresh-meat", icon: Drumstick },
      { id: "fresh-produce", name: "Fresh Produce", slug: "greengrocery", icon: Carrot },
      { id: "snacks", name: "Snacks", slug: "snacks", icon: ShoppingBag },
      { id: "beverages", name: "Soft Drinks", slug: "soft-drinks", icon: GlassWater },
      { id: "packaging", name: "Takeaway Packaging", slug: "packaging", icon: ShoppingBag },
      { id: "frozen", name: "Frozen Products", slug: "frozen", icon: ShoppingBag },
    ],
    benefits: [
      {
        title: "Packaging Solutions",
        description: "Comprehensive range of takeaway packaging to suit all food types and temperature requirements.",
      },
      {
        title: "Fast Turnaround",
        description: "Quick delivery options to keep your takeaway running without interruption.",
      },
      {
        title: "Quality Ingredients",
        description: "Fresh, quality ingredients that help your takeaway stand out from competitors.",
      },
      {
        title: "Cost Effective",
        description: "Competitive pricing on bulk orders to help maximize your margins.",
      },
    ],
    testimonials: [
      {
        name: "Ahmed Khan",
        role: "Owner",
        business: "Spice Express",
        quote: "Booker's packaging and ingredients keep our takeaway running smoothly. Great quality and reliable service.",
        rating: 5,
      },
    ],
    resources: [
      {
        title: "Takeaway Packaging Guide",
        description: "Complete guide to choosing the right packaging for your takeaway",
        link: "/resources/takeaway-packaging",
        type: "guide",
      },
    ],
    offers: [
      {
        id: "takeaway-packaging",
        title: "Packaging Bundle",
        description: "Save on combined packaging orders",
      },
    ],
    primaryTestimonial: {
      name: "Ahmed Khan",
      role: "Owner",
      business: "Golden Kebab House",
      quote: "Booker's reliable delivery and quality ingredients keep our takeaway running smoothly. The competitive pricing helps us maintain our margins while serving quality food to our customers.",
      rating: 5,
    },
    socialProof: {
      count: 920,
      businessType: "takeaways",
      timePeriod: "month",
    },
    trustBadges: [
      { id: "fast-delivery", title: "Fast Delivery", description: "Next-day service", icon: Truck },
      { id: "competitive-pricing", title: "Competitive Pricing", description: "Protect margins", icon: Award },
      { id: "quality-products", title: "Quality Products", description: "Consistent standards", icon: CheckCircle2 },
    ],
    businessSolutions: [
      { id: "hospitality", title: "Hospitality Services", description: "Comprehensive support for takeaways including ordering assistance.", link: "/services/hospitality", icon: UtensilsCrossed },
      { id: "delivery", title: "Click & Collect and Delivery", description: "Reliable next-day delivery to keep your takeaway stocked.", link: "/services/click-collect-delivery", icon: Truck },
      { id: "recycling", title: "Used Cooking Oil Recycling", description: "Sustainable waste management for used cooking oil.", link: "/services/oil-recycling", icon: Recycle },
    ],
    faqs: [
      { question: "What products does Booker supply for takeaways?", answer: "We supply everything takeaways need including quality meat and fish, fresh produce, packaging materials, sauces, cooking ingredients, and beverages. Our range is specifically curated for fast-food and takeaway operations." },
      { question: "How does delivery work for takeaways?", answer: "We offer reliable next-day delivery for orders placed before 3pm. This ensures your takeaway stays stocked with fresh ingredients. We understand the fast-paced nature of takeaway operations and prioritize reliability." },
      { question: "Do you offer competitive pricing for independent takeaways?", answer: "Yes, we offer competitive wholesale pricing designed to help independent takeaways compete effectively. Our volume pricing provides better rates for regular customers, helping protect your margins." },
      { question: "Can you help with packaging supplies?", answer: "Yes, we supply a comprehensive range of takeaway packaging including containers, bags, boxes, and disposable cutlery. These can be ordered alongside your food ingredients for convenience." },
      { question: "Do you supply specialty items for different cuisines?", answer: "Yes, our extensive product range includes items for various cuisines including kebabs, fish and chips, pizza, Chinese, and more. Your account manager can help you find specific ingredients for your menu." },
      { question: "Can I get help managing my inventory?", answer: "Yes, your local account manager can provide advice on ordering quantities, stock management, and seasonal planning. We can help you optimize your ordering to reduce waste while ensuring availability." },
    ],
    seoContent: `<p>Booker provides comprehensive <strong>takeaway supplies</strong> and <strong>fast food wholesale</strong> solutions to takeaway restaurants, fish and chip shops, pizza outlets, and other quick-service food businesses across the UK. Our competitive pricing and extensive product range help takeaway operators maintain quality while protecting margins.</p>
<p>From quality <a href="/meat-fish-poultry/shop">meat and fish</a> for kebabs, burgers, and fish and chips to packaging, sauces, and cooking ingredients, our <strong>takeaway wholesale</strong> service covers all your needs. We understand the fast-paced nature of takeaway operations and provide reliable next-day delivery to keep your business stocked.</p>
<p>With over 170 branches nationwide, local account managers who understand your business, and competitive volume pricing, Booker supports independent takeaways and chains. Our <strong>takeaway food supplies</strong> help you deliver consistent quality food while managing costs effectively in a competitive market.</p>`,
    cta: {
      headline: "Start Shopping for Takeaways",
      description: "Get everything you need to run a successful takeaway business.",
      primaryButton: {
        text: "Become a member",
        href: "/register",
      },
      secondaryButton: {
        text: "Shop all products",
        href: "/sectors/takeaways/shop",
      },
    },
  },
  {
    id: "care-education",
    name: "Care & Education",
    slug: "care-education",
    hero: {
      headline: "Care & Education Sector Solutions",
      subheadline: "Nutritious, high-quality food supply for care homes, schools, and educational institutions",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da94a36b?w=1200",
    },
    valuePoints: [
      "Nutrition-focused products",
      "Special dietary options",
      "Bulk pricing available",
      "Compliance support",
    ],
    categories: [
      { id: "fresh-meat", name: "Fresh Meat", slug: "fresh-meat", icon: Drumstick },
      { id: "fresh-produce", name: "Fresh Produce", slug: "greengrocery", icon: Carrot },
      { id: "dairy", name: "Dairy Products", slug: "dairy", icon: ShoppingBag },
      { id: "bakery", name: "Bakery Items", slug: "bakery", icon: ShoppingBag },
      { id: "special-diet", name: "Special Dietary", slug: "special-diet", icon: Heart },
      { id: "frozen", name: "Frozen Products", slug: "frozen", icon: ShoppingBag },
    ],
    benefits: [
      {
        title: "Nutritional Standards",
        description: "Products that meet nutritional guidelines for care homes and schools.",
      },
      {
        title: "Special Diets",
        description: "Comprehensive range of products for special dietary requirements including allergies and therapeutic needs.",
      },
      {
        title: "Compliance Support",
        description: "Help ensuring your food supply meets regulatory requirements for care and education sectors.",
      },
      {
        title: "Cost Effective",
        description: "Bulk pricing and volume discounts for regular institutional orders.",
      },
    ],
    testimonials: [
      {
        name: "Sarah Mitchell",
        role: "Care Home Manager",
        business: "Maple Grove Care Home",
        quote: "Booker's special diet range has been invaluable. Quality products that meet all our residents' needs.",
        rating: 5,
      },
    ],
    resources: [
      {
        title: "Nutritional Guidelines",
        description: "Guide to meeting nutritional standards in care and education",
        link: "/resources/nutritional-guidelines",
        type: "guide",
      },
    ],
    offers: [
      {
        id: "care-education-volume",
        title: "Institutional Pricing",
        description: "Enhanced discounts for regular institutional orders",
      },
    ],
    primaryTestimonial: {
      name: "Patricia Foster",
      role: "Catering Manager",
      business: "Oakwood Care Home",
      quote: "Booker helps us provide nutritious, compliant meals within our budget. The quality is consistent and the service is reliable, which is essential for our care home operations.",
      rating: 5,
    },
    socialProof: {
      count: 280,
      businessType: "care & education facilities",
      timePeriod: "month",
    },
    trustBadges: [
      { id: "nutritional-standards", title: "Nutritional Standards", description: "Meet compliance requirements", icon: CheckCircle2 },
      { id: "cost-effective", title: "Cost Effective", description: "Budget-friendly pricing", icon: Award },
      { id: "reliable-supply", title: "Reliable Supply", description: "Consistent delivery", icon: Truck },
    ],
    businessSolutions: [
      { id: "hospitality", title: "Hospitality Services", description: "Comprehensive support for care and education facilities including meal planning assistance.", link: "/services/hospitality", icon: UtensilsCrossed },
      { id: "delivery", title: "Click & Collect and Delivery", description: "Flexible delivery options to fit institutional schedules.", link: "/services/click-collect-delivery", icon: Truck },
      { id: "billing", title: "Central Billing and Marketplace", description: "Streamlined billing solutions for institutional orders.", link: "/services/central-billing-marketplace", icon: CreditCard },
    ],
    faqs: [
      { question: "What products does Booker supply for care homes and schools?", answer: "We supply a comprehensive range of fresh ingredients including meat, fish, fresh produce, dairy, and pantry items needed for nutritious, balanced meals. Our products meet food safety and nutritional standards required in care and education settings." },
      { question: "Do your products meet regulatory standards?", answer: "Yes, all our products meet UK food safety standards and regulations. We understand the compliance requirements for care homes and schools and ensure all products meet these standards." },
      { question: "Can you help with meal planning for care homes?", answer: "Yes, our account managers can provide advice on meal planning, portion sizes, and nutritional balance. We understand the specific needs of care home catering and can help ensure meals meet dietary requirements." },
      { question: "Do you offer bulk pricing for institutional orders?", answer: "Yes, we offer competitive pricing for bulk orders, which is particularly beneficial for care homes and schools with regular, large orders. Our institutional pricing helps facilities manage food costs effectively." },
      { question: "What delivery options are available for care homes and schools?", answer: "We offer flexible delivery scheduling that can accommodate institutional needs. Orders can be scheduled for specific times that fit your meal preparation schedule, including early morning deliveries." },
      { question: "Can you accommodate special dietary requirements?", answer: "Yes, we supply a wide range of products suitable for various dietary requirements including vegetarian, vegan, halal, and specialized diets. Your account manager can help identify appropriate products." },
    ],
    seoContent: `<p>Booker provides essential <strong>care home supplies</strong> and <strong>school catering supplies</strong> to care homes, schools, and educational institutions across the UK. Our comprehensive range helps care and education providers deliver nutritious, cost-effective meals that meet regulatory standards and dietary requirements.</p>
<p>From fresh <a href="/meat-fish-poultry/shop">meat and fish</a> to quality <a href="/greengrocery/shop">fresh produce</a>, our <strong>care and education wholesale</strong> service offers the ingredients needed for balanced, healthy meals. We understand the importance of nutrition in care and education settings and provide products that support well-being while fitting within budget constraints.</p>
<p>With flexible ordering, competitive pricing for bulk orders, and reliable delivery to care homes and schools nationwide, Booker makes it easy to access quality wholesale supplies. Our <strong>care home catering</strong> and school meal solutions help facilities maintain food standards while managing costs effectively.</p>`,
    cta: {
      headline: "Start Shopping for Care & Education",
      description: "Partner with Booker for nutritious, compliant food supply.",
      primaryButton: {
        text: "Become a member",
        href: "/register",
      },
      secondaryButton: {
        text: "Shop all products",
        href: "/sectors/care-education/shop",
      },
    },
  },
  {
    id: "convenience-retailing",
    name: "Convenience Retailing",
    slug: "convenience-retailing",
    hero: {
      headline: "Convenience Store Supply Solutions",
      subheadline: "Comprehensive product range for convenience stores, corner shops, and local retailers",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
    },
    valuePoints: [
      "Wide product range",
      "Regular delivery",
      "Competitive pricing",
      "Local retailer support",
    ],
    categories: [
      { id: "fresh-produce", name: "Fresh Produce", slug: "greengrocery", icon: Carrot },
      { id: "beer-cider", name: "Beer & Cider", slug: "beer", icon: Beer },
      { id: "wine-spirits", name: "Wine & Spirits", slug: "wine-spirits", icon: GlassWater },
      { id: "snacks", name: "Snacks", slug: "snacks", icon: ShoppingBag },
      { id: "beverages", name: "Soft Drinks", slug: "soft-drinks", icon: GlassWater },
      { id: "frozen", name: "Frozen Products", slug: "frozen", icon: ShoppingBag },
    ],
    benefits: [
      {
        title: "Comprehensive Range",
        description: "Everything you need from fresh produce to beverages, snacks, and household essentials.",
      },
      {
        title: "Local Retailer Focus",
        description: "Products and pricing designed specifically for independent convenience stores.",
      },
      {
        title: "Regular Deliveries",
        description: "Flexible delivery schedules to keep your store well-stocked.",
      },
      {
        title: "Competitive Pricing",
        description: "Wholesale prices that help you maintain healthy margins.",
      },
    ],
    testimonials: [
      {
        name: "David Patel",
        role: "Store Owner",
        business: "Corner Convenience",
        quote: "Booker has transformed our product range. Great selection and reliable delivery.",
        rating: 5,
      },
    ],
    resources: [
      {
        title: "Convenience Store Management",
        description: "Tips for managing inventory and product selection",
        link: "/resources/convenience-store-management",
        type: "guide",
      },
    ],
    offers: [
      {
        id: "convenience-welcome",
        title: "New Store Offer",
        description: "Special pricing for new convenience store customers",
      },
    ],
    primaryTestimonial: {
      name: "David Chen",
      role: "Store Owner",
      business: "Chen's Convenience Store",
      quote: "Booker helps us compete with the big chains. Their competitive pricing and product range means we can offer customers what they want while maintaining healthy margins.",
      rating: 5,
    },
    socialProof: {
      count: 1250,
      businessType: "convenience stores",
      timePeriod: "month",
    },
    trustBadges: [
      { id: "wide-range", title: "Wide Product Range", description: "All categories covered", icon: Store },
      { id: "competitive-pricing", title: "Competitive Pricing", description: "Protect your margins", icon: Award },
      { id: "local-support", title: "Local Support", description: "Dedicated account managers", icon: MapPin },
    ],
    businessSolutions: [
      { id: "retail", title: "Services for Retail Business", description: "Specialized solutions for convenience stores including inventory management support.", link: "/services/retail", icon: Store },
      { id: "delivery", title: "Click & Collect and Delivery", description: "Reliable delivery to keep your store stocked.", link: "/services/click-collect-delivery", icon: Truck },
      { id: "billing", title: "Central Billing and Marketplace", description: "Streamlined billing solutions for retail operations.", link: "/services/central-billing-marketplace", icon: CreditCard },
    ],
    faqs: [
      { question: "What products does Booker supply for convenience stores?", answer: "We supply a comprehensive range across all categories including fresh produce, chilled goods, frozen foods, household essentials, confectionery, beverages, and snacks. Our range includes popular products that drive footfall and sales." },
      { question: "How does Booker help convenience stores compete?", answer: "We offer competitive wholesale pricing that helps independent convenience stores compete with larger chains. Our extensive product range ensures you can offer customers what they want while maintaining healthy profit margins." },
      { question: "What support is available for convenience store owners?", answer: "All convenience store members have access to a dedicated local account manager who understands retail operations. They can provide advice on product selection, ordering, and inventory management." },
      { question: "Do you offer flexible ordering for convenience stores?", answer: "Yes, we offer flexible ordering options that fit convenience store operations. You can place orders as needed, and our reliable next-day delivery ensures your store stays stocked with fresh products." },
      { question: "Can you help with product selection for my store?", answer: "Yes, your account manager can provide recommendations on popular products and trends. We understand what sells in convenience stores and can help you optimize your product mix for your local market." },
      { question: "Do you offer volume discounts for convenience stores?", answer: "Yes, we offer competitive pricing and volume discounts for regular customers. Larger orders and consistent ordering schedules can help you access better rates and improve your margins." },
    ],
    seoContent: `<p>Booker is a leading <strong>convenience store wholesale</strong> supplier, providing independent convenience retailers with the products and support needed to compete effectively. Our comprehensive range helps convenience store owners stock their shelves with popular products while maintaining competitive pricing.</p>
<p>From everyday groceries and household essentials to chilled and frozen products, our <strong>convenience retail supplies</strong> cover all categories that drive footfall and sales. We offer competitive wholesale pricing that helps independent retailers compete with larger chains while protecting their margins.</p>
<p>With flexible ordering, reliable delivery, and support from local account managers, Booker makes it easy for convenience retailers to access quality wholesale products. Our <strong>convenience store wholesale</strong> service helps independent stores thrive by providing the right products at the right prices with the service levels needed for success.</p>`,
    cta: {
      headline: "Start Shopping for Convenience Retailing",
      description: "Stock your store with quality products from Booker.",
      primaryButton: {
        text: "Become a member",
        href: "/register",
      },
      secondaryButton: {
        text: "Shop all products",
        href: "/sectors/convenience-retailing/shop",
      },
    },
  },
  {
    id: "budgens",
    name: "Budgens",
    slug: "budgens",
    hero: {
      headline: "Budgens Store Supply",
      subheadline: "Official supplier solutions for Budgens convenience stores",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
    },
    valuePoints: [
      "Budgens-approved products",
      "Symbol group pricing",
      "Marketing support",
      "Store development",
    ],
    categories: [
      { id: "fresh-produce", name: "Fresh Produce", slug: "greengrocery", icon: Carrot },
      { id: "beer-cider", name: "Beer & Cider", slug: "beer", icon: Beer },
      { id: "snacks", name: "Snacks", slug: "snacks", icon: ShoppingBag },
      { id: "beverages", name: "Soft Drinks", slug: "soft-drinks", icon: GlassWater },
      { id: "frozen", name: "Frozen Products", slug: "frozen", icon: ShoppingBag },
      { id: "dairy", name: "Dairy Products", slug: "dairy", icon: ShoppingBag },
    ],
    benefits: [
      {
        title: "Symbol Group Support",
        description: "Products and services specifically tailored for Budgens stores.",
      },
      {
        title: "Marketing Support",
        description: "Access to marketing materials and promotional support for your Budgens store.",
      },
      {
        title: "Competitive Pricing",
        description: "Special pricing for Budgens store owners.",
      },
      {
        title: "Store Development",
        description: "Support and advice for growing your Budgens business.",
      },
    ],
    testimonials: [],
    resources: [
      {
        title: "Budgens Store Guide",
        description: "Resources for Budgens store owners",
        link: "/resources/budgens-store-guide",
        type: "guide",
      },
    ],
    offers: [],
    primaryTestimonial: {
      name: "Martin Price",
      role: "Store Owner",
      business: "Budgens High Street",
      quote: "Booker's partnership approach helps us maintain the Budgens brand standards while accessing competitive pricing. Their product range and service support our success.",
      rating: 5,
    },
    socialProof: {
      count: 890,
      businessType: "Budgens stores",
      timePeriod: "month",
    },
    trustBadges: [
      { id: "brand-partnership", title: "Brand Partnership", description: "Trusted Budgens partner", icon: Store },
      { id: "comprehensive-range", title: "Comprehensive Range", description: "All categories covered", icon: Award },
      { id: "dedicated-support", title: "Dedicated Support", description: "Specialized account management", icon: CheckCircle2 },
    ],
    businessSolutions: [
      { id: "retail", title: "Services for Retail Business", description: "Specialized solutions for Budgens stores including retail support services.", link: "/services/retail", icon: Store },
      { id: "delivery", title: "Click & Collect and Delivery", description: "Reliable delivery to keep Budgens stores stocked.", link: "/services/click-collect-delivery", icon: Truck },
      { id: "billing", title: "Central Billing and Marketplace", description: "Streamlined billing solutions for Budgens operations.", link: "/services/central-billing-marketplace", icon: CreditCard },
    ],
    faqs: [
      { question: "What products does Booker supply for Budgens stores?", answer: "We supply a comprehensive range across all categories including fresh produce, chilled goods, frozen foods, household essentials, confectionery, beverages, and snacks. Our range is specifically tailored to meet Budgens brand standards and customer expectations." },
      { question: "How does Booker support Budgens stores?", answer: "As a trusted partner to the Budgens retail network, we provide specialized wholesale solutions with competitive pricing, dedicated account management, and flexible ordering options. We understand Budgens brand standards and help stores maintain them." },
      { question: "What support is available for Budgens store owners?", answer: "All Budgens store members have access to dedicated account managers who understand the Budgens brand and retail operations. They can provide advice on product selection, ordering, inventory management, and brand compliance." },
      { question: "Do you offer competitive pricing for Budgens stores?", answer: "Yes, we offer competitive wholesale pricing specifically for Budgens stores as part of our partnership. Our pricing helps stores maximize sales and profitability while maintaining brand standards." },
      { question: "Can you help with product selection for my Budgens store?", answer: "Yes, your account manager can provide recommendations based on Budgens brand standards and what works in Budgens stores. We can help you optimize your product mix to meet customer expectations and drive sales." },
      { question: "How does delivery work for Budgens stores?", answer: "We offer flexible delivery options including reliable next-day delivery and Click & Collect services. Delivery schedules can be coordinated to fit your store operations and ensure freshness." },
    ],
    seoContent: `<p>Booker supports <strong>Budgens stores</strong> with specialized wholesale solutions and competitive pricing on quality products. As a trusted partner to the Budgens retail network, we provide the products and support that help Budgens store owners maximize sales and profitability.</p>
<p>Our <strong>Budgens wholesale</strong> service offers comprehensive product ranges across all categories, from fresh produce and chilled goods to household essentials and confectionery. We understand the unique needs of Budgens stores and provide tailored solutions that help them compete effectively in their local markets.</p>
<p>With dedicated account management, flexible ordering options, and reliable delivery services, Booker makes it easy for Budgens stores to access quality wholesale supplies. Our partnership approach supports store owners in growing their businesses while maintaining the standards that customers expect from the Budgens brand.</p>`,
    cta: {
      headline: "Start Shopping for Budgens",
      description: "Official supply solutions for Budgens convenience stores.",
      primaryButton: {
        text: "Become a member",
        href: "/register",
      },
      secondaryButton: {
        text: "Shop all products",
        href: "/sectors/budgens/shop",
      },
    },
  },
  {
    id: "londis",
    name: "Londis",
    slug: "londis",
    hero: {
      headline: "Londis Store Supply",
      subheadline: "Official supplier solutions for Londis convenience stores",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
    },
    valuePoints: [
      "Londis-approved products",
      "Symbol group pricing",
      "Marketing support",
      "Store development",
    ],
    categories: [
      { id: "fresh-produce", name: "Fresh Produce", slug: "greengrocery", icon: Carrot },
      { id: "beer-cider", name: "Beer & Cider", slug: "beer", icon: Beer },
      { id: "snacks", name: "Snacks", slug: "snacks", icon: ShoppingBag },
      { id: "beverages", name: "Soft Drinks", slug: "soft-drinks", icon: GlassWater },
      { id: "frozen", name: "Frozen Products", slug: "frozen", icon: ShoppingBag },
      { id: "dairy", name: "Dairy Products", slug: "dairy", icon: ShoppingBag },
    ],
    benefits: [
      {
        title: "Symbol Group Support",
        description: "Products and services specifically tailored for Londis stores.",
      },
      {
        title: "Marketing Support",
        description: "Access to marketing materials and promotional support for your Londis store.",
      },
      {
        title: "Competitive Pricing",
        description: "Special pricing for Londis store owners.",
      },
      {
        title: "Store Development",
        description: "Support and advice for growing your Londis business.",
      },
    ],
    testimonials: [],
    resources: [
      {
        title: "Londis Store Guide",
        description: "Resources for Londis store owners",
        link: "/resources/londis-store-guide",
        type: "guide",
      },
    ],
    offers: [],
    primaryTestimonial: {
      name: "Sarah Johnson",
      role: "Store Owner",
      business: "Londis Main Street",
      quote: "Booker's partnership with Londis means we get the support and pricing we need to succeed. Their product range and service help us serve our customers well.",
      rating: 5,
    },
    socialProof: {
      count: 1100,
      businessType: "Londis stores",
      timePeriod: "month",
    },
    trustBadges: [
      { id: "londis-partnership", title: "Londis Partnership", description: "Dedicated wholesale partner", icon: Store },
      { id: "competitive-pricing", title: "Competitive Pricing", description: "Protect profit margins", icon: Award },
      { id: "comprehensive-range", title: "Comprehensive Range", description: "All categories covered", icon: CheckCircle2 },
    ],
    businessSolutions: [
      { id: "retail", title: "Services for Retail Business", description: "Specialized solutions for Londis stores including retail support services.", link: "/services/retail", icon: Store },
      { id: "delivery", title: "Click & Collect and Delivery", description: "Reliable delivery to keep Londis stores stocked.", link: "/services/click-collect-delivery", icon: Truck },
      { id: "billing", title: "Central Billing and Marketplace", description: "Streamlined billing solutions for Londis operations.", link: "/services/central-billing-marketplace", icon: CreditCard },
    ],
    faqs: [
      { question: "What products does Booker supply for Londis stores?", answer: "We supply extensive product ranges across fresh, chilled, frozen, and ambient categories. Our comprehensive range includes popular products that drive footfall and sales in Londis stores, all at competitive wholesale pricing." },
      { question: "How does Booker support Londis stores?", answer: "As a dedicated wholesale partner for Londis, we provide specialized support including expert account management, flexible ordering, and reliable delivery. We understand Londis retail operations and help stores maximize sales and customer satisfaction." },
      { question: "What support is available for Londis store owners?", answer: "All Londis store members have access to expert account managers who understand the Londis brand and retail operations. They provide advice on product selection, ordering, and inventory management tailored to Londis stores." },
      { question: "Do you offer competitive pricing for Londis stores?", answer: "Yes, we offer competitive wholesale pricing specifically for Londis stores as part of our partnership. Our pricing helps stores compete effectively while protecting profit margins." },
      { question: "Can you help with product selection for my Londis store?", answer: "Yes, your account manager can provide recommendations based on what works in Londis stores and what drives sales. We understand Londis customer expectations and can help optimize your product mix." },
      { question: "How does delivery work for Londis stores?", answer: "We offer flexible ordering and reliable delivery to Londis stores nationwide. Next-day delivery and Click & Collect options ensure your store stays stocked with fresh products when needed." },
    ],
    seoContent: `<p>Booker is a dedicated wholesale partner for <strong>Londis stores</strong>, providing quality products and specialized support to help Londis retailers succeed. Our comprehensive wholesale solutions are designed specifically for the Londis retail network, supporting store owners in maximizing sales and customer satisfaction.</p>
<p>Our <strong>Londis wholesale</strong> service offers extensive product ranges across fresh, chilled, frozen, and ambient categories, all at competitive pricing. We provide the popular products that drive footfall and sales, helping Londis stores compete effectively while protecting profit margins.</p>
<p>With expert account management, flexible ordering, and reliable delivery to Londis stores nationwide, Booker makes wholesale purchasing simple and efficient. Our partnership approach helps Londis store owners focus on serving their customers while we handle the supply chain, ensuring quality products are available when needed.</p>`,
    cta: {
      headline: "Start Shopping for Londis",
      description: "Official supply solutions for Londis convenience stores.",
      primaryButton: {
        text: "Become a member",
        href: "/register",
      },
      secondaryButton: {
        text: "Shop all products",
        href: "/sectors/londis/shop",
      },
    },
  },
  {
    id: "premier",
    name: "Premier",
    slug: "premier",
    hero: {
      headline: "Premier Store Supply",
      subheadline: "Official supplier solutions for Premier convenience stores",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
    },
    valuePoints: [
      "Premier-approved products",
      "Symbol group pricing",
      "Marketing support",
      "Store development",
    ],
    categories: [
      { id: "fresh-produce", name: "Fresh Produce", slug: "greengrocery", icon: Carrot },
      { id: "beer-cider", name: "Beer & Cider", slug: "beer", icon: Beer },
      { id: "snacks", name: "Snacks", slug: "snacks", icon: ShoppingBag },
      { id: "beverages", name: "Soft Drinks", slug: "soft-drinks", icon: GlassWater },
      { id: "frozen", name: "Frozen Products", slug: "frozen", icon: ShoppingBag },
      { id: "dairy", name: "Dairy Products", slug: "dairy", icon: ShoppingBag },
    ],
    benefits: [
      {
        title: "Symbol Group Support",
        description: "Products and services specifically tailored for Premier stores.",
      },
      {
        title: "Marketing Support",
        description: "Access to marketing materials and promotional support for your Premier store.",
      },
      {
        title: "Competitive Pricing",
        description: "Special pricing for Premier store owners.",
      },
      {
        title: "Store Development",
        description: "Support and advice for growing your Premier business.",
      },
    ],
    testimonials: [],
    resources: [
      {
        title: "Premier Store Guide",
        description: "Resources for Premier store owners",
        link: "/resources/premier-store-guide",
        type: "guide",
      },
    ],
    offers: [],
    primaryTestimonial: {
      name: "Kevin Mitchell",
      role: "Store Owner",
      business: "Premier Community Store",
      quote: "Booker's support for Premier stores helps us compete and grow. The competitive pricing and product range enable us to serve our community while maintaining healthy margins.",
      rating: 5,
    },
    socialProof: {
      count: 3400,
      businessType: "Premier stores",
      timePeriod: "month",
    },
    trustBadges: [
      { id: "premier-partnership", title: "Premier Partnership", description: "Trusted wholesale partner", icon: Store },
      { id: "competitive-pricing", title: "Competitive Pricing", description: "Enable effective competition", icon: Award },
      { id: "comprehensive-support", title: "Comprehensive Support", description: "Dedicated service", icon: CheckCircle2 },
    ],
    businessSolutions: [
      { id: "retail", title: "Services for Retail Business", description: "Specialized solutions for Premier stores including retail support services.", link: "/services/retail", icon: Store },
      { id: "delivery", title: "Click & Collect and Delivery", description: "Reliable delivery to keep Premier stores stocked.", link: "/services/click-collect-delivery", icon: Truck },
      { id: "billing", title: "Central Billing and Marketplace", description: "Streamlined billing solutions for Premier operations.", link: "/services/central-billing-marketplace", icon: CreditCard },
    ],
    faqs: [
      { question: "What products does Booker supply for Premier stores?", answer: "We supply all product categories including fresh produce, groceries, household essentials, confectionery, beverages, and snacks. Our comprehensive range is specifically selected to meet Premier customer expectations and drive sales." },
      { question: "How does Booker support Premier stores?", answer: "As a trusted wholesale partner for Premier, we provide specialized solutions with competitive pricing, dedicated support, and flexible ordering options. We understand what Premier customers expect and help stores compete effectively." },
      { question: "What support is available for Premier store owners?", answer: "All Premier store members have access to dedicated account managers who understand Premier operations and customer expectations. They provide advice on product selection, ordering, and inventory management." },
      { question: "Do you offer competitive pricing for Premier stores?", answer: "Yes, we offer competitive wholesale pricing specifically for Premier stores. Our pricing enables store owners to compete effectively while maintaining healthy profit margins." },
      { question: "Can you help with product selection for my Premier store?", answer: "Yes, your account manager can provide recommendations based on what works in Premier stores and what Premier customers expect. We can help optimize your product mix to drive sales and customer satisfaction." },
      { question: "How does delivery work for Premier stores?", answer: "We offer flexible ordering options and reliable delivery services to Premier stores nationwide. Next-day delivery and Click & Collect ensure your store stays stocked with fresh products." },
    ],
    seoContent: `<p>Booker provides specialized wholesale solutions for <strong>Premier stores</strong>, supporting the Premier retail network with quality products and competitive pricing. As a trusted wholesale partner, we help Premier store owners stock their shelves with products that drive sales while maintaining healthy margins.</p>
<p>Our <strong>Premier wholesale</strong> service covers all product categories from fresh produce and groceries to household essentials and confectionery. We understand what Premier customers expect and provide the right product mix at wholesale prices that enable store owners to compete effectively.</p>
<p>With dedicated support, flexible ordering options, and reliable delivery services, Booker makes wholesale supply simple for Premier stores. Our partnership approach helps Premier retailers maximize their potential by providing quality products, competitive pricing, and the service levels needed to grow their businesses.</p>`,
    cta: {
      headline: "Start Shopping for Premier",
      description: "Official supply solutions for Premier convenience stores.",
      primaryButton: {
        text: "Become a member",
        href: "/register",
      },
      secondaryButton: {
        text: "Shop all products",
        href: "/sectors/premier/shop",
      },
    },
  },
  {
    id: "family-shopper",
    name: "Family Shopper",
    slug: "family-shopper",
    hero: {
      headline: "Family Shopper Store Supply",
      subheadline: "Official supplier solutions for Family Shopper convenience stores",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
    },
    valuePoints: [
      "Family Shopper-approved products",
      "Symbol group pricing",
      "Marketing support",
      "Store development",
    ],
    categories: [
      { id: "fresh-produce", name: "Fresh Produce", slug: "greengrocery", icon: Carrot },
      { id: "beer-cider", name: "Beer & Cider", slug: "beer", icon: Beer },
      { id: "snacks", name: "Snacks", slug: "snacks", icon: ShoppingBag },
      { id: "beverages", name: "Soft Drinks", slug: "soft-drinks", icon: GlassWater },
      { id: "frozen", name: "Frozen Products", slug: "frozen", icon: ShoppingBag },
      { id: "dairy", name: "Dairy Products", slug: "dairy", icon: ShoppingBag },
    ],
    benefits: [
      {
        title: "Symbol Group Support",
        description: "Products and services specifically tailored for Family Shopper stores.",
      },
      {
        title: "Marketing Support",
        description: "Access to marketing materials and promotional support for your Family Shopper store.",
      },
      {
        title: "Competitive Pricing",
        description: "Special pricing for Family Shopper store owners.",
      },
      {
        title: "Store Development",
        description: "Support and advice for growing your Family Shopper business.",
      },
    ],
    testimonials: [],
    resources: [
      {
        title: "Family Shopper Store Guide",
        description: "Resources for Family Shopper store owners",
        link: "/resources/family-shopper-store-guide",
        type: "guide",
      },
    ],
    offers: [],
    primaryTestimonial: {
      name: "Linda Roberts",
      role: "Store Owner",
      business: "Family Shopper Local",
      quote: "Booker's partnership with Family Shopper helps us serve our community with quality products at competitive prices. The support and service make wholesale supply simple and efficient.",
      rating: 5,
    },
    socialProof: {
      count: 680,
      businessType: "Family Shopper stores",
      timePeriod: "month",
    },
    trustBadges: [
      { id: "family-shopper-partnership", title: "Family Shopper Partnership", description: "Dedicated wholesale support", icon: Store },
      { id: "competitive-pricing", title: "Competitive Pricing", description: "Enable healthy margins", icon: Award },
      { id: "comprehensive-range", title: "Comprehensive Range", description: "All categories covered", icon: CheckCircle2 },
    ],
    businessSolutions: [
      { id: "retail", title: "Services for Retail Business", description: "Specialized solutions for Family Shopper stores including retail support services.", link: "/services/retail", icon: Store },
      { id: "delivery", title: "Click & Collect and Delivery", description: "Reliable delivery to keep Family Shopper stores stocked.", link: "/services/click-collect-delivery", icon: Truck },
      { id: "billing", title: "Central Billing and Marketplace", description: "Streamlined billing solutions for Family Shopper operations.", link: "/services/central-billing-marketplace", icon: CreditCard },
    ],
    faqs: [
      { question: "What products does Booker supply for Family Shopper stores?", answer: "We supply a comprehensive range across all categories including fresh, chilled, frozen, and ambient products. Our extensive range includes popular products that meet customer expectations and drive sales in Family Shopper stores." },
      { question: "How does Booker support Family Shopper stores?", answer: "As a dedicated wholesale partner for Family Shopper, we provide specialized support including expert account management, flexible ordering systems, and reliable nationwide delivery. We help Family Shopper retailers succeed in their local markets." },
      { question: "What support is available for Family Shopper store owners?", answer: "All Family Shopper store members have access to expert account managers who understand Family Shopper operations and customer expectations. They provide advice on product selection, ordering, and inventory management." },
      { question: "Do you offer competitive pricing for Family Shopper stores?", answer: "Yes, we offer competitive wholesale pricing specifically for Family Shopper stores. Our pricing enables healthy margins while meeting customer expectations and driving sales." },
      { question: "Can you help with product selection for my Family Shopper store?", answer: "Yes, your account manager can provide recommendations based on what works in Family Shopper stores and what drives sales in convenience retail. We can help optimize your product mix for your local market." },
      { question: "How does delivery work for Family Shopper stores?", answer: "We offer flexible ordering systems and reliable nationwide delivery to Family Shopper stores. Next-day delivery and Click & Collect options ensure quality products are always available when needed." },
    ],
    seoContent: `<p>Booker delivers specialized wholesale solutions for <strong>Family Shopper stores</strong>, providing quality products and support designed to help Family Shopper retailers succeed. Our comprehensive wholesale service supports the Family Shopper network with competitive pricing and extensive product ranges across all categories.</p>
<p>Our <strong>Family Shopper wholesale</strong> offering includes fresh, chilled, frozen, and ambient products that meet customer expectations while enabling healthy margins. We provide the popular products that drive sales in convenience retail, helping Family Shopper stores compete effectively in their local markets.</p>
<p>With expert account management, flexible ordering systems, and reliable nationwide delivery, Booker makes wholesale supply efficient for Family Shopper stores. Our partnership approach helps retailers focus on serving their communities while we handle the complexities of wholesale supply, ensuring quality products are always available.</p>`,
    cta: {
      headline: "Start Shopping for Family Shopper",
      description: "Official supply solutions for Family Shopper convenience stores.",
      primaryButton: {
        text: "Become a member",
        href: "/register",
      },
      secondaryButton: {
        text: "Shop all products",
        href: "/sectors/family-shopper/shop",
      },
    },
  },
];

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectors.find((sector) => sector != null && typeof sector === 'object' && 'slug' in sector && sector.slug === slug);
}

export function getAllSectors(): Sector[] {
  return sectors.filter((sector): sector is Sector => 
    sector != null && typeof sector === 'object' && 'slug' in sector && typeof sector.slug === 'string'
  );
}

