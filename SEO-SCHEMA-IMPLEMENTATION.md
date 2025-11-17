# Killer SEO Schema Implementation Guide
## Comprehensive Structured Data for Booker Prototype

**Last Updated:** 2024  
**Status:** Implementation Plan  
**Note:** This is a prototype - ensure proper robots.txt/noindex before production indexing

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Current State](#current-state)
3. [Implementation Strategy](#implementation-strategy)
4. [Schema Types to Implement](#schema-types-to-implement)
5. [File Structure](#file-structure)
6. [Code Implementation](#code-implementation)
7. [Testing & Validation](#testing--validation)
8. [Deployment Checklist](#deployment-checklist)

---

## 🎯 Overview

This document outlines the comprehensive SEO schema implementation for the Booker Prototype e-commerce platform. The goal is to implement structured data (JSON-LD) that will help search engines understand the content, improve rich snippets in search results, and enhance overall SEO performance.

### Key Objectives
- ✅ Implement all relevant Schema.org types
- ✅ Add dynamic metadata to all pages
- ✅ Ensure proper canonical URLs
- ✅ Add Open Graph and Twitter Card metadata
- ✅ Implement breadcrumb navigation schema
- ✅ Add product schema with offers and availability
- ✅ Add organization and local business schemas

---

## 📊 Current State

### ✅ What Exists
- Basic metadata in root layout (`title`, `description`)
- Some page-level metadata (sectors, recipes, brands listing)
- SEO content sections (HTML content for keywords)

### ❌ What's Missing
- **JSON-LD structured data** - None implemented
- **Dynamic page metadata** - Product, brand, sector detail pages lack `generateMetadata`
- **Structured data types** - No Organization, Product, BreadcrumbList, LocalBusiness, FAQPage, Article schemas
- **Open Graph tags** - Not implemented
- **Twitter Cards** - Not implemented
- **Canonical URLs** - Not explicitly set
- **robots.txt** - Not configured (should block indexing for prototype)

---

## 🏗️ Implementation Strategy

### Phase 1: Core Infrastructure
1. Create reusable schema components
2. Set up base metadata utilities
3. Implement Organization schema (site-wide)

### Phase 2: Page-Level Metadata
1. Add `generateMetadata` to all dynamic pages
2. Implement breadcrumb schemas
3. Add Open Graph and Twitter Cards

### Phase 3: Content-Specific Schemas
1. Product schema (with offers, reviews, availability)
2. Brand schema
3. Sector schema
4. Branch/LocalBusiness schema
5. FAQPage schema
6. Article schema (help articles)

### Phase 4: Advanced Features
1. WebSite schema with search action
2. ItemList schema for category pages
3. Review/Rating aggregation
4. Video schema (if applicable)

---

## 📦 Schema Types to Implement

### 1. Organization Schema
**Where:** Root layout (homepage)
**Purpose:** Identify the business entity
**Key Properties:**
- `@type`: "Organization"
- `name`: "Booker Wholesale"
- `url`: Site URL
- `logo`: Logo URL
- `sameAs`: Social media profiles
- `contactPoint`: Customer service info
- `address`: Business address

### 2. Product Schema
**Where:** `/products/[sku]` pages
**Purpose:** Product information for rich snippets
**Key Properties:**
- `@type`: "Product"
- `name`: Product name
- `description`: Product description
- `image`: Product images
- `brand`: Brand information
- `sku`: Product SKU
- `offers`: Pricing and availability
- `aggregateRating`: Reviews/ratings
- `nutrition`: Nutrition information (if applicable)
- `gtin`: Barcode/GTIN (if available)

### 3. BreadcrumbList Schema
**Where:** All pages (except homepage)
**Purpose:** Navigation breadcrumbs in search results
**Key Properties:**
- `@type`: "BreadcrumbList"
- `itemListElement`: Array of breadcrumb items
  - `position`: Number
  - `name`: Breadcrumb label
  - `item`: URL

### 4. LocalBusiness Schema
**Where:** `/branches/[code]` pages
**Purpose:** Branch location information
**Key Properties:**
- `@type`: "LocalBusiness" or "Store"
- `name`: Branch name
- `address`: Full address
- `geo`: Latitude/longitude
- `openingHours`: Opening hours
- `telephone`: Phone number
- `priceRange`: Price range indicator

### 5. FAQPage Schema
**Where:** `/help/faq` and FAQ sections
**Purpose:** FAQ rich snippets
**Key Properties:**
- `@type`: "FAQPage"
- `mainEntity`: Array of Question/Answer pairs
  - `@type`: "Question"
  - `name`: Question text
  - `acceptedAnswer`: Answer object

### 6. Article Schema
**Where:** `/help/articles/[slug]` pages
**Purpose:** Help article rich snippets
**Key Properties:**
- `@type`: "Article"
- `headline`: Article title
- `description`: Article description
- `author`: Author information
- `datePublished`: Publication date
- `dateModified`: Last modified date
- `image`: Featured image

### 7. WebSite Schema
**Where:** Root layout
**Purpose:** Site-wide search functionality
**Key Properties:**
- `@type`: "WebSite"
- `name`: Site name
- `url`: Site URL
- `potentialAction`: Search action
  - `@type`: "SearchAction"
  - `target`: Search URL template
  - `query-input`: Search parameter

### 8. ItemList Schema
**Where:** Category/shop listing pages
**Purpose:** Product listing pages
**Key Properties:**
- `@type`: "ItemList"
- `itemListElement`: Array of products
- `numberOfItems`: Total count
- `name`: Category name

### 9. Brand Schema
**Where:** `/brands/[slug]` pages
**Purpose:** Brand information
**Key Properties:**
- `@type`: "Brand"
- `name`: Brand name
- `description`: Brand description
- `logo`: Brand logo
- `url`: Brand page URL

### 10. Service Schema
**Where:** `/services/*` pages
**Purpose:** Service offerings
**Key Properties:**
- `@type`: "Service"
- `name`: Service name
- `description`: Service description
- `provider`: Organization
- `areaServed`: Geographic coverage

---

## 📁 File Structure

```
booker-prototype/
├── src/
│   ├── components/
│   │   └── seo/
│   │       ├── OrganizationSchema.tsx
│   │       ├── ProductSchema.tsx
│   │       ├── BreadcrumbSchema.tsx
│   │       ├── LocalBusinessSchema.tsx
│   │       ├── FAQSchema.tsx
│   │       ├── ArticleSchema.tsx
│   │       ├── WebSiteSchema.tsx
│   │       ├── ItemListSchema.tsx
│   │       └── BrandSchema.tsx
│   ├── lib/
│   │   └── seo/
│   │       ├── metadata.ts          # Metadata generation utilities
│   │       ├── schemas.ts           # Schema generation functions
│   │       ├── breadcrumbs.ts       # Breadcrumb generation
│   │       └── constants.ts          # SEO constants (site URL, etc.)
│   └── app/
│       ├── layout.tsx                # Add Organization + WebSite schemas
│       ├── page.tsx                 # Homepage metadata
│       ├── products/
│       │   └── [sku]/
│       │       └── page.tsx         # Add generateMetadata + ProductSchema
│       ├── brands/
│       │   └── [slug]/
│       │       └── page.tsx         # Add generateMetadata + BrandSchema
│       ├── sectors/
│       │   └── [slug]/
│       │       └── page.tsx         # Add generateMetadata
│       ├── branches/
│       │   └── [code]/
│       │       └── page.tsx         # Add generateMetadata + LocalBusinessSchema
│       └── help/
│           ├── faq/
│           │   └── page.tsx         # Add FAQSchema
│           └── articles/
│               └── [slug]/
│                   └── page.tsx     # Add generateMetadata + ArticleSchema
├── public/
│   └── robots.txt                   # Block indexing for prototype
└── SEO-SCHEMA-IMPLEMENTATION.md     # This file
```

---

## 💻 Code Implementation

### 1. SEO Constants (`src/lib/seo/constants.ts`)

```typescript
export const SEO_CONFIG = {
  siteName: "Booker Wholesale",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://booker-prototype.netlify.app",
  defaultTitle: "Booker Wholesale - UK's Leading Wholesale Food Supplier",
  defaultDescription: "Booker is the UK's leading wholesale food supplier, providing fresh produce, meat, fish, and beverages to restaurants, pubs, hotels, and catering businesses.",
  organization: {
    name: "Booker Wholesale",
    legalName: "Booker Group Limited",
    url: "https://www.booker.co.uk",
    logo: "https://booker-prototype.netlify.app/logo.png",
    sameAs: [
      "https://www.facebook.com/booker",
      "https://twitter.com/booker",
      "https://www.linkedin.com/company/booker",
    ],
    contactPoint: {
      telephone: "+44-800-123-4567",
      contactType: "Customer Service",
      areaServed: "GB",
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@booker",
    creator: "@booker",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Booker Wholesale",
  },
};
```

### 2. Metadata Utilities (`src/lib/seo/metadata.ts`)

```typescript
import { Metadata } from "next";
import { SEO_CONFIG } from "./constants";

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  image,
  canonical,
  noindex = false,
  nofollow = false,
}: PageMetadata): Metadata {
  const fullTitle = title.includes(SEO_CONFIG.siteName)
    ? title
    : `${title} | ${SEO_CONFIG.siteName}`;

  const canonicalUrl = canonical || SEO_CONFIG.siteUrl;
  const ogImage = image || `${SEO_CONFIG.siteUrl}/og-image.jpg`;

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(", "),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SEO_CONFIG.openGraph.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: SEO_CONFIG.openGraph.locale,
      type: SEO_CONFIG.openGraph.type,
    },
    twitter: {
      card: SEO_CONFIG.twitter.card,
      site: SEO_CONFIG.twitter.site,
      creator: SEO_CONFIG.twitter.creator,
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
```

### 3. Schema Components (`src/components/seo/OrganizationSchema.tsx`)

```typescript
import { SEO_CONFIG } from "@/lib/seo/constants";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.organization.name,
    legalName: SEO_CONFIG.organization.legalName,
    url: SEO_CONFIG.organization.url,
    logo: SEO_CONFIG.organization.logo,
    sameAs: SEO_CONFIG.organization.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SEO_CONFIG.organization.contactPoint.telephone,
      contactType: SEO_CONFIG.organization.contactPoint.contactType,
      areaServed: SEO_CONFIG.organization.contactPoint.areaServed,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 4. Product Schema (`src/components/seo/ProductSchema.tsx`)

```typescript
import type { Product } from "@/lib/data/products";

interface ProductSchemaProps {
  product: Product;
  availability: {
    in_stock: boolean;
    stock_level: string;
  };
  reviews?: {
    average_rating: number;
    total_count: number;
  };
  baseUrl: string;
}

export function ProductSchema({
  product,
  availability,
  reviews,
  baseUrl,
}: ProductSchemaProps) {
  const offers = {
    "@type": "Offer",
    url: `${baseUrl}/products/${product.sku}`,
    priceCurrency: "GBP",
    price: product.base_price,
    priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    availability: availability.in_stock
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: "Booker Wholesale",
    },
  };

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.descriptions.long || product.descriptions.short,
    image: product.images,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers,
    category: product.category,
  };

  if (reviews && reviews.total_count > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviews.average_rating,
      reviewCount: reviews.total_count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (product.nutrition) {
    schema.nutrition = {
      "@type": "NutritionInformation",
      ...product.nutrition,
    };
  }

  if (product.allergens && product.allergens.length > 0) {
    schema.allergenFeature = product.allergens.map((allergen) => ({
      "@type": "AllergenFeature",
      name: allergen,
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 5. Breadcrumb Schema (`src/components/seo/BreadcrumbSchema.tsx`)

```typescript
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 6. Product Page Implementation (`src/app/products/[sku]/page.tsx`)

```typescript
import { ProductDetailClient } from "./ProductDetailClient";
import { ProductSchema } from "@/components/seo/ProductSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getProductBySku } from "@/lib/data/products";
import { SEO_CONFIG } from "@/lib/seo/constants";
import productsData from '@/data/products.json';

export async function generateStaticParams() {
  return productsData.map((product) => ({
    sku: product.sku,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params;
  const product = getProductBySku(sku);

  if (!product) {
    return generatePageMetadata({
      title: "Product Not Found",
      description: "The requested product could not be found.",
      noindex: true,
    });
  }

  return generatePageMetadata({
    title: `${product.name} - ${product.brand}`,
    description: product.descriptions.long || product.descriptions.short,
    keywords: [product.name, product.brand, product.category, product.subcategory],
    image: product.images[0],
    canonical: `${SEO_CONFIG.siteUrl}/products/${sku}`,
  });
}

export default async function ProductDetail({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params;
  const product = getProductBySku(sku);

  if (!product) {
    return <div>Product not found</div>;
  }

  const availability = {
    in_stock: Object.values(product.inventory).some((inv) => inv.in_stock),
    stock_level: "high",
  };

  const reviews = {
    average_rating: 4.5, // Mock - replace with actual data
    total_count: 12, // Mock - replace with actual data
  };

  const breadcrumbs = [
    { name: "Home", url: SEO_CONFIG.siteUrl },
    { name: product.category, url: `${SEO_CONFIG.siteUrl}/${product.category.toLowerCase().replace(/\s+/g, "-")}` },
    { name: product.name, url: `${SEO_CONFIG.siteUrl}/products/${sku}` },
  ];

  return (
    <>
      <ProductSchema
        product={product}
        availability={availability}
        reviews={reviews}
        baseUrl={SEO_CONFIG.siteUrl}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <ProductDetailClient sku={sku} />
    </>
  );
}
```

### 7. Root Layout Update (`src/app/layout.tsx`)

```typescript
import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { WebSiteSchema } from "@/components/seo/WebSiteSchema";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Booker Wholesale - UK's Leading Wholesale Food Supplier",
  description: "Booker is the UK's leading wholesale food supplier, providing fresh produce, meat, fish, and beverages to restaurants, pubs, hotels, and catering businesses.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className="antialiased">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
```

### 8. robots.txt (`public/robots.txt`)

```
# Block all crawlers for prototype
User-agent: *
Disallow: /

# Allow specific bots for testing (optional)
# User-agent: Googlebot
# Allow: /

# Sitemap (if you create one later)
# Sitemap: https://booker-prototype.netlify.app/sitemap.xml
```

---

## ✅ Testing & Validation

### Tools for Testing
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
4. **Twitter Card Validator**: https://cards-dev.twitter.com/validator

### Checklist
- [ ] All pages have proper metadata
- [ ] JSON-LD schemas validate without errors
- [ ] Breadcrumbs appear correctly in search results
- [ ] Product rich snippets display correctly
- [ ] Open Graph images display on social shares
- [ ] Canonical URLs are set correctly
- [ ] robots.txt blocks indexing (for prototype)
- [ ] No duplicate content issues
- [ ] Mobile-friendly metadata
- [ ] Performance impact is minimal

### Testing Commands
```bash
# Validate JSON-LD schemas
npm run build
# Check for schema errors in build output

# Test specific pages
curl https://booker-prototype.netlify.app/products/[sku] | grep "application/ld+json"
```

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] Update `SEO_CONFIG.siteUrl` with production URL
- [ ] Verify all schema components are imported correctly
- [ ] Test all dynamic routes have `generateMetadata`
- [ ] Ensure robots.txt is configured appropriately
- [ ] Validate all JSON-LD schemas
- [ ] Test Open Graph images
- [ ] Verify canonical URLs

### Post-Deployment
- [ ] Submit sitemap to Google Search Console (if indexing enabled)
- [ ] Test rich results in Google Search Console
- [ ] Monitor for schema errors in Search Console
- [ ] Test social sharing (Facebook, Twitter, LinkedIn)
- [ ] Verify breadcrumbs in search results
- [ ] Check mobile search result appearance

### Monitoring
- Monitor Google Search Console for:
  - Schema markup errors
  - Rich result performance
  - Indexing issues
  - Mobile usability

---

## 📝 Notes

### Prototype Considerations
- **robots.txt**: Currently set to block all indexing. Update when ready for production.
- **Site URL**: Update `SEO_CONFIG.siteUrl` to match actual deployment URL.
- **Mock Data**: Some schemas use mock data (reviews, ratings). Replace with real data when available.

### Performance
- JSON-LD schemas are minimal and shouldn't impact performance
- Consider lazy-loading schemas for very long pages if needed
- Monitor bundle size after implementation

### Future Enhancements
- Add video schema for product videos
- Implement review schema with actual user reviews
- Add FAQ schema to product pages
- Implement HowTo schema for recipes
- Add Event schema for promotions/events

---

## 🔗 Resources

- [Schema.org Documentation](https://schema.org/)
- [Google Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)

---

**Implementation Priority:**
1. ✅ Organization + WebSite schemas (site-wide)
2. ✅ Product schema (highest value for e-commerce)
3. ✅ Breadcrumb schema (all pages)
4. ✅ Page-level metadata (all dynamic pages)
5. ✅ LocalBusiness schema (branch pages)
6. ✅ FAQPage schema
7. ✅ Article schema
8. ✅ ItemList schema (category pages)

---

*This document should be updated as implementation progresses.*



