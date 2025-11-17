import { CheckCircle2, Award, Shield, Star, Truck, MapPin } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface BrandFAQ {
  question: string;
  answer: string;
}

export interface BrandTrustBadge {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  hero: {
    headline: string;
    subheadline: string;
    imageUrl?: string;
  };
  valuePoints: string[];
  categories: string[]; // Which product categories this brand appears in
  trustBadges?: BrandTrustBadge[];
  faqs?: BrandFAQ[];
  seoContent?: string; // 200-300 words of keyword-optimized HTML content
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

export const brands: Brand[] = [
  {
    id: "jacks",
    name: "Jack's",
    slug: "jacks",
    description: "Quality products at great value. Jack's brings you trusted essentials across meat, beverages, and produce.",
    hero: {
      headline: "Jack's - Quality Value Products",
      subheadline: "Trusted essentials. Great prices. Reliable quality across all categories.",
      imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80",
    },
    valuePoints: [
      "Competitive pricing",
      "Wide category coverage",
      "Reliable quality",
      "Consistent availability"
    ],
    categories: ["Meat, Fish & Poultry", "Beer, Cider and Alcoholic RTDs", "Greengrocery"],
    trustBadges: [
      {
        id: "value",
        title: "Great Value",
        description: "Competitive prices",
        icon: Award,
      },
      {
        id: "range",
        title: "Wide Range",
        description: "Across all categories",
        icon: CheckCircle2,
      },
      {
        id: "quality",
        title: "Quality Assured",
        description: "Rigorous standards",
        icon: Shield,
      },
      {
        id: "availability",
        title: "Always Available",
        description: "Stocked nationwide",
        icon: Truck,
      },
    ],
    faqs: [
      {
        question: "What categories does Jack's cover?",
        answer: "Jack's products are available across meat, fish & poultry, beer, cider & RTDs, and greengrocery categories. We offer great value essentials that businesses rely on.",
      },
      {
        question: "Is Jack's a value brand?",
        answer: "Yes, Jack's is positioned as a value brand offering competitive pricing without compromising on quality. All products meet our rigorous quality standards.",
      },
      {
        question: "Where can I find Jack's products?",
        answer: "Jack's products are available across all Booker branches and through our online ordering system. You can filter by brand when shopping to see all Jack's products.",
      },
      {
        question: "Are Jack's products British sourced?",
        answer: "Many Jack's products are British sourced, particularly in the meat and greengrocery categories. Product listings show origin information for each item.",
      },
      {
        question: "Does Jack's offer bulk pricing?",
        answer: "Yes, Jack's products benefit from Booker's bulk pricing structure. Speak with your account manager for custom pricing on large orders.",
      },
    ],
    seoContent: `<h2>Jack's - Quality Value Products for UK Businesses</h2>
<p>Jack's is one of Booker's leading <strong>value product ranges</strong>, offering quality essentials across <a href="/meat-fish-poultry">meat, fish & poultry</a>, <a href="/beer">beer, cider & RTDs</a>, and <a href="/greengrocery">greengrocery</a> categories. Trusted by thousands of UK businesses, Jack's combines competitive pricing with reliable quality standards, making it the ideal choice for cost-conscious operators without compromising on product excellence.</p>

<p>Our <strong>Jack's product range</strong> includes premium cuts of British meat, quality beverages, and fresh produce - all delivered through Booker's nationwide network of 170+ branches. With consistent availability, competitive pricing, and products that meet rigorous quality standards, Jack's helps businesses protect profit margins while maintaining high standards for their customers.</p>

<p>Whether you're running a restaurant, pub, hotel, or retail outlet, Jack's products offer excellent value across all major product categories. All items in the Jack's range undergo the same quality checks as our premium brands, ensuring reliable quality at accessible prices. <a href="/register">Join Booker today</a> to access the full Jack's range and start saving on your wholesale orders.</p>`,
    cta: {
      headline: "Start Shopping Jack's Products",
      description: "Browse quality value products across all categories",
      primaryButton: {
        text: "Shop Jack's",
        href: "/brands/jacks/shop",
      },
      secondaryButton: {
        text: "Become a Member",
        href: "/register",
      },
    },
  },
  {
    id: "euroshopper",
    name: "Euroshopper",
    slug: "euroshopper",
    description: "European quality at competitive prices. Euroshopper brings continental standards to UK businesses.",
    hero: {
      headline: "Euroshopper - European Quality Value",
      subheadline: "Continental quality. Competitive prices. Trusted across UK hospitality.",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
    },
    valuePoints: [
      "European quality standards",
      "Competitive pricing",
      "Wide product range",
      "Consistent quality"
    ],
    categories: ["Beer, Cider and Alcoholic RTDs", "Greengrocery"],
    trustBadges: [
      {
        id: "european",
        title: "European Quality",
        description: "Continental standards",
        icon: Award,
      },
      {
        id: "value",
        title: "Great Value",
        description: "Competitive pricing",
        icon: Star,
      },
      {
        id: "range",
        title: "Wide Selection",
        description: "Multiple categories",
        icon: CheckCircle2,
      },
      {
        id: "availability",
        title: "Always Stocked",
        description: "Reliable supply",
        icon: Truck,
      },
    ],
    faqs: [
      {
        question: "What is Euroshopper?",
        answer: "Euroshopper is a value brand offering European quality products at competitive prices. The range includes beverages and produce sourced to continental quality standards.",
      },
      {
        question: "Which categories does Euroshopper cover?",
        answer: "Euroshopper products are available in beer, cider & RTDs, and greengrocery categories, bringing European quality and value to UK businesses.",
      },
      {
        question: "Are Euroshopper products imported?",
        answer: "Many Euroshopper products are sourced from European suppliers, maintaining continental quality standards while offering competitive UK pricing.",
      },
      {
        question: "How does Euroshopper compare to other brands?",
        answer: "Euroshopper offers European quality standards at value pricing, making it an excellent choice for businesses seeking quality products without premium price tags.",
      },
      {
        question: "Can I order Euroshopper products in bulk?",
        answer: "Yes, Euroshopper products are available for bulk ordering. Contact your account manager for custom pricing on large orders.",
      },
    ],
    seoContent: `<h2>Euroshopper - European Quality Value Products</h2>
<p>Euroshopper brings <strong>European quality standards</strong> to UK businesses at competitive prices. Available across <a href="/beer">beer, cider & RTDs</a> and <a href="/greengrocery">greengrocery</a> categories, Euroshopper combines continental sourcing with accessible pricing, making it ideal for hospitality and retail businesses seeking quality without premium costs.</p>

<p>Our <strong>Euroshopper range</strong> features products sourced from European suppliers, meeting continental quality standards while offering great value. With consistent availability through Booker's 170+ branch network and competitive pricing that helps protect profit margins, Euroshopper is trusted by thousands of UK businesses across pubs, restaurants, hotels, and retail outlets.</p>

<p>Whether you need quality beverages or fresh produce, Euroshopper delivers European standards at accessible prices. All products undergo rigorous quality checks to ensure they meet our high standards. <a href="/register">Become a Booker member</a> to access the full Euroshopper range and start benefiting from European quality at competitive UK prices.</p>`,
    cta: {
      headline: "Start Shopping Euroshopper Products",
      description: "European quality at competitive prices",
      primaryButton: {
        text: "Shop Euroshopper",
        href: "/brands/euroshopper/shop",
      },
      secondaryButton: {
        text: "Become a Member",
        href: "/register",
      },
    },
  },
  {
    id: "caterpro",
    name: "CaterPro",
    slug: "caterpro",
    description: "Professional catering solutions. CaterPro is designed for commercial kitchens and high-volume operations.",
    hero: {
      headline: "CaterPro - Professional Catering Solutions",
      subheadline: "Designed for commercial kitchens. Built for high-volume operations.",
      imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80",
    },
    valuePoints: [
      "Commercial-grade quality",
      "High-volume optimized",
      "Professional standards",
      "Reliable supply"
    ],
    categories: ["Meat, Fish & Poultry"],
    trustBadges: [
      {
        id: "commercial",
        title: "Commercial Grade",
        description: "Professional quality",
        icon: Shield,
      },
      {
        id: "volume",
        title: "High Volume",
        description: "Built for scale",
        icon: Truck,
      },
      {
        id: "consistency",
        title: "Consistent Quality",
        description: "Reliable standards",
        icon: CheckCircle2,
      },
      {
        id: "support",
        title: "Expert Support",
        description: "Catering specialists",
        icon: Award,
      },
    ],
    faqs: [
      {
        question: "What is CaterPro designed for?",
        answer: "CaterPro is specifically designed for commercial kitchens and high-volume catering operations. Products are optimized for consistency, reliability, and professional kitchen requirements.",
      },
      {
        question: "Which categories does CaterPro cover?",
        answer: "CaterPro specializes in meat, fish & poultry products designed for commercial catering operations, offering professional-grade quality optimized for high-volume use.",
      },
      {
        question: "Is CaterPro suitable for large events?",
        answer: "Yes, CaterPro products are ideal for large events, conferences, and high-volume catering. Products are designed to maintain quality and consistency under commercial kitchen conditions.",
      },
      {
        question: "Can I get custom portioning with CaterPro?",
        answer: "Yes, CaterPro products can be custom portioned for your specific requirements. Contact your account manager to discuss custom ordering options.",
      },
      {
        question: "What quality standards does CaterPro meet?",
        answer: "CaterPro meets all commercial catering quality standards, with products specifically selected and tested for professional kitchen use and high-volume operations.",
      },
    ],
    seoContent: `<h2>CaterPro - Professional Catering Solutions for UK Businesses</h2>
<p>CaterPro is Booker's <strong>professional catering range</strong>, specifically designed for commercial kitchens and high-volume operations. Focusing on <a href="/meat-fish-poultry">meat, fish & poultry</a> products, CaterPro offers commercial-grade quality optimized for consistency, reliability, and the demands of professional catering environments.</p>

<p>Our <strong>CaterPro range</strong> features products selected and tested for professional kitchen use, ensuring consistent quality across large orders. Whether you're catering for events, conferences, hotels, or large-scale operations, CaterPro delivers the reliability and consistency that professional kitchens require. All products undergo rigorous quality checks to meet commercial catering standards.</p>

<p>With reliable supply through Booker's nationwide network and products designed for high-volume use, CaterPro helps professional catering businesses maintain quality while managing costs. <a href="/register">Join Booker</a> to access the full CaterPro range and benefit from products designed specifically for professional catering operations.</p>`,
    cta: {
      headline: "Start Shopping CaterPro Products",
      description: "Professional catering solutions for your business",
      primaryButton: {
        text: "Shop CaterPro",
        href: "/brands/caterpro/shop",
      },
      secondaryButton: {
        text: "Become a Member",
        href: "/register",
      },
    },
  },
  {
    id: "chefs-essentials",
    name: "Chef's Essentials",
    slug: "chefs-essentials",
    description: "Essential ingredients for professional kitchens. Chef's Essentials delivers the fundamentals chefs trust every day.",
    hero: {
      headline: "Chef's Essentials - Trusted Kitchen Fundamentals",
      subheadline: "The essential ingredients professional chefs rely on every day.",
      imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80",
    },
    valuePoints: [
      "Chef-trusted quality",
      "Everyday essentials",
      "Professional standards",
      "Consistent reliability"
    ],
    categories: ["Meat, Fish & Poultry"],
    trustBadges: [
      {
        id: "chef-trusted",
        title: "Chef Trusted",
        description: "Professional quality",
        icon: Award,
      },
      {
        id: "essentials",
        title: "Kitchen Essentials",
        description: "Daily fundamentals",
        icon: CheckCircle2,
      },
      {
        id: "consistency",
        title: "Always Consistent",
        description: "Reliable quality",
        icon: Shield,
      },
      {
        id: "availability",
        title: "Always Available",
        description: "Stocked nationwide",
        icon: Truck,
      },
    ],
    faqs: [
      {
        question: "What is Chef's Essentials?",
        answer: "Chef's Essentials is a range of fundamental ingredients trusted by professional chefs for everyday use. The range focuses on quality basics that form the foundation of professional cooking.",
      },
      {
        question: "Which products are in Chef's Essentials?",
        answer: "Chef's Essentials focuses on meat, fish & poultry products - the essential proteins that professional kitchens use daily. Products are selected for consistent quality and reliability.",
      },
      {
        question: "Is Chef's Essentials suitable for all kitchens?",
        answer: "Yes, Chef's Essentials is designed for all professional kitchens, from independent restaurants to large hotel chains. Products offer reliable quality at accessible prices.",
      },
      {
        question: "How does Chef's Essentials ensure consistency?",
        answer: "Chef's Essentials products undergo rigorous quality checks and are sourced from trusted suppliers to ensure consistent quality batch after batch, meal after meal.",
      },
      {
        question: "Can I customize orders with Chef's Essentials?",
        answer: "Yes, Chef's Essentials products can be ordered in custom quantities and portions. Contact your branch or account manager to discuss your specific requirements.",
      },
    ],
    seoContent: `<h2>Chef's Essentials - Trusted Kitchen Fundamentals</h2>
<p>Chef's Essentials is Booker's <strong>fundamental ingredient range</strong> trusted by professional chefs across the UK. Focusing on <a href="/meat-fish-poultry">meat, fish & poultry</a> products, Chef's Essentials delivers the quality basics that form the foundation of professional cooking, offering consistent reliability that chefs depend on every service.</p>

<p>Our <strong>Chef's Essentials range</strong> features products selected for their consistent quality, reliability, and professional kitchen suitability. Whether you're running a fine dining restaurant, bistro, or high-volume kitchen, Chef's Essentials provides the essential proteins you need with the consistency your menu demands. All products are quality-checked to ensure they meet professional standards.</p>

<p>Trusted by thousands of UK chefs, Chef's Essentials combines accessible pricing with reliable quality, helping professional kitchens maintain standards while managing costs. With products available across all Booker branches, Chef's Essentials ensures you always have access to the fundamentals. <a href="/register">Join Booker today</a> to access Chef's Essentials and build your menu on quality foundations.</p>`,
    cta: {
      headline: "Start Shopping Chef's Essentials",
      description: "The fundamentals professional chefs trust",
      primaryButton: {
        text: "Shop Chef's Essentials",
        href: "/brands/chefs-essentials/shop",
      },
      secondaryButton: {
        text: "Become a Member",
        href: "/register",
      },
    },
  },
  {
    id: "chefs-menu",
    name: "Chef's Menu",
    slug: "chefs-menu",
    description: "Menu-ready solutions for professional kitchens. Chef's Menu offers quality ingredients optimized for restaurant service.",
    hero: {
      headline: "Chef's Menu - Menu-Ready Solutions",
      subheadline: "Quality ingredients optimized for restaurant menus and professional service.",
      imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80",
    },
    valuePoints: [
      "Menu-optimized quality",
      "Restaurant-focused",
      "Professional standards",
      "Service-ready consistency"
    ],
    categories: ["Meat, Fish & Poultry"],
    trustBadges: [
      {
        id: "menu-ready",
        title: "Menu Ready",
        description: "Restaurant optimized",
        icon: Award,
      },
      {
        id: "quality",
        title: "Professional Quality",
        description: "Restaurant standards",
        icon: Shield,
      },
      {
        id: "consistency",
        title: "Service Consistent",
        description: "Batch after batch",
        icon: CheckCircle2,
      },
      {
        id: "support",
        title: "Menu Support",
        description: "Chef expertise",
        icon: Star,
      },
    ],
    faqs: [
      {
        question: "What makes Chef's Menu different?",
        answer: "Chef's Menu is specifically optimized for restaurant service, with products selected for their suitability for menu applications and consistent performance during service.",
      },
      {
        question: "Is Chef's Menu suitable for all types of restaurants?",
        answer: "Yes, Chef's Menu products are designed for all restaurant types, from fine dining to casual dining. Products are selected for their menu versatility and consistent quality.",
      },
      {
        question: "Can Chef's Menu products be used across multiple menu items?",
        answer: "Yes, Chef's Menu products are selected for their versatility, allowing chefs to use ingredients across multiple dishes while maintaining consistent quality.",
      },
      {
        question: "How does Chef's Menu ensure service consistency?",
        answer: "Chef's Menu products undergo quality checks to ensure consistent performance during service, with products tested for their reliability in professional kitchen environments.",
      },
      {
        question: "Are Chef's Menu products portion-controlled?",
        answer: "Many Chef's Menu products are available in portion-controlled formats suitable for restaurant service. Contact your account manager for specific options.",
      },
    ],
    seoContent: `<h2>Chef's Menu - Menu-Ready Solutions for Restaurants</h2>
<p>Chef's Menu is Booker's <strong>menu-optimized range</strong> for professional restaurants, offering <a href="/meat-fish-poultry">meat, fish & poultry</a> products specifically selected for their menu versatility and service consistency. Designed for restaurant kitchens, Chef's Menu helps chefs create consistent dishes while maintaining quality and managing costs.</p>

<p>Our <strong>Chef's Menu range</strong> features products tested and selected for their performance in restaurant service environments. Whether you're running a fine dining establishment, casual restaurant, or pub kitchen, Chef's Menu delivers ingredients that perform consistently across service. All products meet professional restaurant quality standards and are sourced for menu-ready reliability.</p>

<p>Trusted by professional chefs across the UK, Chef's Menu combines quality with versatility, allowing restaurants to build reliable menus without compromising on standards. <a href="/register">Join Booker</a> to access Chef's Menu and discover ingredients optimized for restaurant success.</p>`,
    cta: {
      headline: "Start Shopping Chef's Menu",
      description: "Menu-ready solutions for your restaurant",
      primaryButton: {
        text: "Shop Chef's Menu",
        href: "/brands/chefs-menu/shop",
      },
      secondaryButton: {
        text: "Become a Member",
        href: "/register",
      },
    },
  },
  {
    id: "chefs-premium",
    name: "Chef's Premium",
    slug: "chefs-premium",
    description: "Premium quality for discerning kitchens. Chef's Premium delivers exceptional ingredients for elevated dining.",
    hero: {
      headline: "Chef's Premium - Exceptional Quality",
      subheadline: "Premium ingredients for elevated dining and discerning palates.",
      imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80",
    },
    valuePoints: [
      "Premium quality standards",
      "Elevated dining focus",
      "Exceptional sourcing",
      "Discerning palate quality"
    ],
    categories: ["Meat, Fish & Poultry"],
    trustBadges: [
      {
        id: "premium",
        title: "Premium Quality",
        description: "Exceptional standards",
        icon: Award,
      },
      {
        id: "sourcing",
        title: "Premium Sourcing",
        description: "Select suppliers",
        icon: Star,
      },
      {
        id: "quality",
        title: "Elite Standards",
        description: "Discerning quality",
        icon: Shield,
      },
      {
        id: "expertise",
        title: "Chef Expertise",
        description: "Fine dining focus",
        icon: CheckCircle2,
      },
    ],
    faqs: [
      {
        question: "What makes Chef's Premium different?",
        answer: "Chef's Premium represents our highest quality tier, with products sourced from select suppliers and meeting exceptional standards suitable for fine dining and elevated dining experiences.",
      },
      {
        question: "Is Chef's Premium suitable for fine dining?",
        answer: "Yes, Chef's Premium is specifically designed for fine dining establishments and restaurants serving elevated cuisine. Products meet exceptional quality standards.",
      },
      {
        question: "How are Chef's Premium products sourced?",
        answer: "Chef's Premium products are sourced from select suppliers and producers who meet our exceptional quality standards, with additional quality checks throughout the supply chain.",
      },
      {
        question: "Are Chef's Premium products British sourced?",
        answer: "Many Chef's Premium products feature British sourcing, with products selected for their exceptional quality and provenance. Product listings show detailed sourcing information.",
      },
      {
        question: "Can I see Chef's Premium products before ordering?",
        answer: "Yes, many branches stock Chef's Premium products for viewing. Contact your local branch to arrange a viewing or speak with your account manager about product specifications.",
      },
    ],
    seoContent: `<h2>Chef's Premium - Exceptional Quality for Fine Dining</h2>
<p>Chef's Premium is Booker's <strong>highest quality tier</strong> for <a href="/meat-fish-poultry">meat, fish & poultry</a>, offering exceptional ingredients sourced from select suppliers and meeting premium standards suitable for fine dining and elevated dining experiences. Trusted by award-winning restaurants, Chef's Premium delivers ingredients that match the expectations of discerning chefs and customers.</p>

<p>Our <strong>Chef's Premium range</strong> features products selected for their exceptional quality, provenance, and performance in fine dining environments. With rigorous quality checks, select supplier relationships, and products chosen for their superior characteristics, Chef's Premium helps fine dining establishments create memorable dining experiences. All products undergo additional quality verification to ensure they meet our premium standards.</p>

<p>Whether you're operating a Michelin-starred restaurant or an upscale dining venue, Chef's Premium delivers ingredients worthy of your menu. <a href="/register">Join Booker</a> to access Chef's Premium and discover ingredients that elevate your culinary offerings.</p>`,
    cta: {
      headline: "Start Shopping Chef's Premium",
      description: "Exceptional quality for your kitchen",
      primaryButton: {
        text: "Shop Chef's Premium",
        href: "/brands/chefs-premium/shop",
      },
      secondaryButton: {
        text: "Become a Member",
        href: "/register",
      },
    },
  },
  {
    id: "blackgate",
    name: "Blackgate",
    slug: "blackgate",
    description: "Premium beverages for discerning venues. Blackgate offers quality drinks for hospitality and retail.",
    hero: {
      headline: "Blackgate - Premium Beverages",
      subheadline: "Quality drinks for discerning venues. Premium beverages you can trust.",
      imageUrl: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=1600&q=80",
    },
    valuePoints: [
      "Premium beverage quality",
      "Hospitality focused",
      "Quality sourcing",
      "Reliable supply"
    ],
    categories: ["Beer, Cider and Alcoholic RTDs"],
    trustBadges: [
      {
        id: "premium",
        title: "Premium Quality",
        description: "Quality beverages",
        icon: Award,
      },
      {
        id: "hospitality",
        title: "Hospitality Focus",
        description: "Venue optimized",
        icon: Star,
      },
      {
        id: "sourcing",
        title: "Quality Sourcing",
        description: "Select suppliers",
        icon: Shield,
      },
      {
        id: "availability",
        title: "Always Stocked",
        description: "Reliable supply",
        icon: Truck,
      },
    ],
    faqs: [
      {
        question: "What is Blackgate?",
        answer: "Blackgate is a premium beverage brand offering quality beer, cider, and RTDs for hospitality venues and retail outlets. Products are selected for their quality and suitability for on-trade and retail environments.",
      },
      {
        question: "Which types of beverages does Blackgate cover?",
        answer: "Blackgate focuses on beer, cider, and alcoholic RTDs, offering premium quality drinks suitable for pubs, bars, hotels, restaurants, and retail outlets.",
      },
      {
        question: "Is Blackgate suitable for on-trade venues?",
        answer: "Yes, Blackgate beverages are specifically selected for on-trade venues including pubs, bars, and restaurants, offering quality drinks that perform well in hospitality environments.",
      },
      {
        question: "Can I get Blackgate products for retail?",
        answer: "Yes, Blackgate products are also suitable for retail outlets. The range includes products that appeal to retail customers while maintaining premium quality standards.",
      },
      {
        question: "How does Blackgate ensure quality?",
        answer: "Blackgate products undergo quality checks and are sourced from trusted suppliers. Products are selected for their consistent quality and performance in hospitality and retail environments.",
      },
    ],
    seoContent: `<h2>Blackgate - Premium Beverages for UK Hospitality</h2>
<p>Blackgate is Booker's <strong>premium beverage brand</strong>, offering quality <a href="/beer">beer, cider, and alcoholic RTDs</a> selected for hospitality venues and retail outlets. With products chosen for their premium quality and suitability for on-trade and retail environments, Blackgate helps pubs, bars, hotels, restaurants, and retail businesses offer quality drinks while managing costs.</p>

<p>Our <strong>Blackgate range</strong> features beverages sourced from quality suppliers and selected for their performance in hospitality settings. Whether you're operating a traditional pub, modern bar, hotel, or retail outlet, Blackgate delivers drinks that meet premium standards. All products undergo quality checks to ensure consistent quality and performance.</p>

<p>Trusted by hospitality venues across the UK, Blackgate combines premium quality with accessible pricing, helping businesses maintain high standards while protecting profit margins. <a href="/register">Join Booker</a> to access the full Blackgate range and discover premium beverages that elevate your offering.</p>`,
    cta: {
      headline: "Start Shopping Blackgate Beverages",
      description: "Premium beverages for your venue",
      primaryButton: {
        text: "Shop Blackgate",
        href: "/brands/blackgate/shop",
      },
      secondaryButton: {
        text: "Become a Member",
        href: "/register",
      },
    },
  },
  {
    id: "clean-pro-plus",
    name: "Clean Pro+",
    slug: "clean-pro-plus",
    description: "Professional cleaning and hygiene solutions. Clean Pro+ supports commercial kitchens with reliable supplies.",
    hero: {
      headline: "Clean Pro+ - Professional Hygiene Solutions",
      subheadline: "Reliable cleaning and hygiene products for commercial kitchens.",
      imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600&q=80",
    },
    valuePoints: [
      "Professional hygiene",
      "Commercial kitchen focus",
      "Reliable supply",
      "Quality assured"
    ],
    categories: ["Greengrocery"],
    trustBadges: [
      {
        id: "hygiene",
        title: "Professional Hygiene",
        description: "Commercial standards",
        icon: Shield,
      },
      {
        id: "quality",
        title: "Quality Assured",
        description: "Tested & approved",
        icon: CheckCircle2,
      },
      {
        id: "reliability",
        title: "Always Available",
        description: "Reliable supply",
        icon: Truck,
      },
      {
        id: "commercial",
        title: "Commercial Grade",
        description: "Kitchen optimized",
        icon: Award,
      },
    ],
    faqs: [
      {
        question: "What is Clean Pro+?",
        answer: "Clean Pro+ is a range of professional cleaning and hygiene products designed for commercial kitchens. The range includes products that meet commercial hygiene standards.",
      },
      {
        question: "Which categories does Clean Pro+ cover?",
        answer: "Clean Pro+ focuses on greengrocery and related products that support commercial kitchen hygiene and cleaning operations, offering reliable supplies for professional environments.",
      },
      {
        question: "Are Clean Pro+ products safe for food contact?",
        answer: "Yes, Clean Pro+ products are selected for their safety and suitability for commercial kitchens, meeting all relevant food safety and hygiene standards.",
      },
      {
        question: "Can I get Clean Pro+ products in bulk?",
        answer: "Yes, Clean Pro+ products are available for bulk ordering, helping commercial kitchens maintain consistent hygiene standards cost-effectively.",
      },
      {
        question: "How does Clean Pro+ ensure quality?",
        answer: "Clean Pro+ products undergo quality and safety checks to ensure they meet commercial hygiene standards. All products are tested for their suitability in professional kitchen environments.",
      },
    ],
    seoContent: `<h2>Clean Pro+ - Professional Hygiene Solutions</h2>
<p>Clean Pro+ is Booker's <strong>professional hygiene range</strong> for commercial kitchens, offering cleaning and hygiene products within our <a href="/greengrocery">greengrocery</a> category. Designed to support commercial kitchen operations, Clean Pro+ delivers reliable supplies that help businesses maintain high hygiene standards while managing costs effectively.</p>

<p>Our <strong>Clean Pro+ range</strong> features products selected for their safety, effectiveness, and suitability for commercial kitchen environments. Whether you're operating a restaurant, hotel kitchen, or large-scale catering facility, Clean Pro+ provides the hygiene solutions you need. All products meet commercial hygiene and food safety standards, ensuring compliance and safety in professional environments.</p>

<p>With reliable supply through Booker's nationwide network and products designed for commercial use, Clean Pro+ helps businesses maintain hygiene standards without compromising on quality. <a href="/register">Join Booker</a> to access Clean Pro+ and ensure your kitchen has the professional hygiene supplies it needs.</p>`,
    cta: {
      headline: "Start Shopping Clean Pro+",
      description: "Professional hygiene solutions for your kitchen",
      primaryButton: {
        text: "Shop Clean Pro+",
        href: "/brands/clean-pro-plus/shop",
      },
      secondaryButton: {
        text: "Become a Member",
        href: "/register",
      },
    },
  },
  {
    id: "farm-fresh",
    name: "Farm Fresh",
    slug: "farm-fresh",
    description: "Fresh from British farms. Farm Fresh brings you the best of British produce with quality you can trust.",
    hero: {
      headline: "Farm Fresh - British Farm Produce",
      subheadline: "Fresh from British farms. Quality produce you can trust.",
      imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600&q=80",
    },
    valuePoints: [
      "British farm sourced",
      "Fresh quality",
      "Local produce",
      "Trusted standards"
    ],
    categories: ["Greengrocery"],
    trustBadges: [
      {
        id: "british",
        title: "British Sourced",
        description: "UK farms",
        icon: MapPin,
      },
      {
        id: "fresh",
        title: "Fresh Quality",
        description: "Farm to fork",
        icon: Star,
      },
      {
        id: "local",
        title: "Local Produce",
        description: "Supporting UK",
        icon: CheckCircle2,
      },
      {
        id: "quality",
        title: "Quality Assured",
        description: "Rigorous standards",
        icon: Shield,
      },
    ],
    faqs: [
      {
        question: "What is Farm Fresh?",
        answer: "Farm Fresh is a range of fresh produce sourced from British farms, offering quality greengrocery products with clear provenance and support for UK agriculture.",
      },
      {
        question: "Are all Farm Fresh products British?",
        answer: "Farm Fresh focuses on British-sourced produce where possible, supporting UK farmers and ensuring fresh, local quality. Product listings show origin information for each item.",
      },
      {
        question: "How fresh are Farm Fresh products?",
        answer: "Farm Fresh products are delivered fresh through Booker's temperature-controlled supply chain, ensuring produce reaches you at optimal freshness from British farms.",
      },
      {
        question: "Does Farm Fresh support British farmers?",
        answer: "Yes, Farm Fresh specifically supports British farmers and UK agriculture, with products sourced from UK farms wherever possible.",
      },
      {
        question: "Can I get seasonal Farm Fresh produce?",
        answer: "Yes, Farm Fresh includes seasonal British produce, allowing you to offer customers the best of British seasonal availability throughout the year.",
      },
    ],
    seoContent: `<h2>Farm Fresh - British Farm Produce for UK Businesses</h2>
<p>Farm Fresh is Booker's <strong>British-sourced produce range</strong>, offering quality <a href="/greengrocery">greengrocery</a> products directly from UK farms. With a focus on supporting British agriculture and delivering fresh, local produce, Farm Fresh helps businesses offer customers the best of British while supporting UK farmers.</p>

<p>Our <strong>Farm Fresh range</strong> features produce sourced from British farms, ensuring fresh quality and supporting UK agriculture. Whether you're running a restaurant, pub, hotel, or retail outlet, Farm Fresh delivers British produce with clear provenance. All products undergo quality checks to ensure they meet our high standards while maintaining their fresh-from-the-farm characteristics.</p>

<p>With regular deliveries through Booker's nationwide network and produce sourced from British farms, Farm Fresh ensures you always have access to quality British produce. <a href="/register">Join Booker</a> to access Farm Fresh and support British agriculture while offering customers the best of British produce.</p>`,
    cta: {
      headline: "Start Shopping Farm Fresh",
      description: "Fresh British produce for your business",
      primaryButton: {
        text: "Shop Farm Fresh",
        href: "/brands/farm-fresh/shop",
      },
      secondaryButton: {
        text: "Become a Member",
        href: "/register",
      },
    },
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find(brand => brand.slug === slug);
}

export function getAllBrands(): Brand[] {
  return brands.filter(brand => brand !== null && typeof brand === 'object');
}


