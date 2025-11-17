import { ProductDetailClient } from "./ProductDetailClient";
import productsData from '@/data/products.json';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return productsData.map((product) => ({
    sku: product.sku,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ sku: string }> }): Promise<Metadata> {
  const { sku } = await params;
  const product = productsData.find(p => p.sku === sku);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const description = product.descriptions?.long || product.descriptions?.short || `Premium ${product.name} from ${product.brand}. ${product.origin ? `Sourced from ${product.origin}.` : ''} ${product.quality_tier || ''} quality butchery products.`;

  return {
    title: `${product.name} | ${product.brand} | Premium Butchery`,
    description: description.substring(0, 160),
    keywords: [
      product.name,
      product.brand,
      product.category,
      product.subcategory,
      product.origin,
      product.quality_tier,
      'butchery',
      'wholesale meat',
      'chef quality',
      'restaurant supplier',
      'foodservice',
    ].filter(Boolean).join(', '),
    openGraph: {
      title: `${product.name} | ${product.brand}`,
      description: description.substring(0, 160),
      images: product.images?.map((img: string) => ({
        url: img,
        width: 800,
        height: 800,
        alt: product.name,
      })) || [],
      type: 'website',
      siteName: 'Booker Wholesale',
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${product.brand}`,
      description: description.substring(0, 160),
      images: product.images || [],
    },
    alternates: {
      canonical: `/products/${product.sku}`,
    },
  };
}

// Generate product schema for SEO
function generateProductSchema(product: any) {
  const availability = product.availability?.in_stock
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.descriptions?.long || product.descriptions?.short || `Premium ${product.name} from ${product.brand}`,
    sku: product.sku,
    mpn: product.sku,
    gtin: product.ean || undefined,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'GBP',
      availability: availability,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Booker Wholesale',
        url: 'https://booker.co.uk',
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'GB',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          businessDays: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          },
          cutoffTime: '15:00',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 1,
            unitCode: 'DAY',
          },
        },
      },
    },
    category: product.category,
    image: product.images || [],
    // Additional butchery-specific properties
    additionalProperty: [
      product.origin && {
        '@type': 'PropertyValue',
        name: 'Origin',
        value: product.origin,
      },
      product.quality_tier && {
        '@type': 'PropertyValue',
        name: 'Quality Tier',
        value: product.quality_tier,
      },
      product.halal && {
        '@type': 'PropertyValue',
        name: 'Halal Certified',
        value: 'Yes',
      },
      product.aging_method && {
        '@type': 'PropertyValue',
        name: 'Aging Method',
        value: product.aging_method,
      },
      product.aging_days && {
        '@type': 'PropertyValue',
        name: 'Aging Days',
        value: product.aging_days,
      },
      product.storage_info && {
        '@type': 'PropertyValue',
        name: 'Storage',
        value: product.storage_info,
      },
      product.subcategory && {
        '@type': 'PropertyValue',
        name: 'Cut Type',
        value: product.subcategory,
      },
      product.weight_display && {
        '@type': 'PropertyValue',
        name: 'Weight',
        value: product.weight_display,
      },
    ].filter(Boolean),
  };

  // Add aggregate rating if product has reviews
  if (product.rating && product.review_count) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.review_count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Add nutritional information if available
  if (product.nutritional_info) {
    schema.nutrition = {
      '@type': 'NutritionInformation',
      calories: product.nutritional_info.calories ? `${product.nutritional_info.calories} calories` : undefined,
      proteinContent: product.nutritional_info.protein ? `${product.nutritional_info.protein}g` : undefined,
      fatContent: product.nutritional_info.fat ? `${product.nutritional_info.fat}g` : undefined,
      saturatedFatContent: product.nutritional_info.saturated_fat ? `${product.nutritional_info.saturated_fat}g` : undefined,
      carbohydrateContent: product.nutritional_info.carbohydrates ? `${product.nutritional_info.carbohydrates}g` : undefined,
      sodiumContent: product.nutritional_info.sodium ? `${product.nutritional_info.sodium}mg` : undefined,
    };
  }

  return schema;
}

// Generate FAQ schema for common product questions
function generateFAQSchema(product: any) {
  const faqs = [];

  // Add common questions based on product attributes
  if (product.origin) {
    faqs.push({
      '@type': 'Question',
      name: `Where does this ${product.name} come from?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `This ${product.name} is sourced from ${product.origin}, ensuring premium quality and full traceability.`,
      },
    });
  }

  if (product.storage_info) {
    faqs.push({
      '@type': 'Question',
      name: `How should I store ${product.name}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: product.storage_info,
      },
    });
  }

  if (product.category === 'BEEF' || product.category === 'LAMB') {
    faqs.push({
      '@type': 'Question',
      name: 'What is the recommended cooking method?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `For best results, ${product.subcategory?.toLowerCase().includes('steak') ? 'cook to your preferred doneness using high heat (grilling or pan-searing)' : product.subcategory?.toLowerCase().includes('roast') ? 'roast in the oven at the appropriate temperature' : 'follow the cooking instructions on the packaging'}. Always ensure proper food safety temperatures.`,
      },
    });
  }

  if (product.halal) {
    faqs.push({
      '@type': 'Question',
      name: 'Is this product Halal certified?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this product is Halal certified, meeting the dietary requirements for Muslim customers.',
      },
    });
  }

  if (faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs,
  };
}

// Generate breadcrumb schema
function generateBreadcrumbSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://booker.co.uk',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Butchery',
        item: 'https://booker.co.uk/butchery',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.category,
        item: `https://booker.co.uk/butchery/shop?category=${product.category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `https://booker.co.uk/products/${product.sku}`,
      },
    ],
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params;
  const product = productsData.find(p => p.sku === sku);

  // Generate structured data for SEO
  const productSchema = product ? generateProductSchema(product) : null;
  const faqSchema = product ? generateFAQSchema(product) : null;
  const breadcrumbSchema = product ? generateBreadcrumbSchema(product) : null;

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ProductDetailClient sku={sku} />
    </>
  );
}
