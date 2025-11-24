import Link from "next/link";
import Image from "next/image";
import { BookOpen, Tag, ShoppingCart, ArrowRight, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/Button";

type ContentInjectionProps = {
  type: "promotional" | "educational" | "cross-sell" | "recipe";
  category?: string; // Current category for context
  products?: any[]; // Optional: products on current page for discount analysis
  index?: number;
};

export function ContentInjection({ type, category, products, index = 0 }: ContentInjectionProps) {
  // Analyze products to find best discount tier
  const getBestDiscountTier = () => {
    if (!products || products.length === 0) return null;
    
    let maxDiscount = 0;
    let bestTier: any = null;
    
    products.forEach((product: any) => {
      if (product.bulk_pricing && Array.isArray(product.bulk_pricing)) {
        product.bulk_pricing.forEach((tier: any) => {
          const discount = tier.discount_percent || 0;
          if (discount > maxDiscount) {
            maxDiscount = discount;
            bestTier = tier;
          }
        });
      }
    });

    return bestTier ? { discount: maxDiscount, minQuantity: bestTier.min_quantity } : null;
  };

  const bestDiscount = getBestDiscountTier();

  // Category-specific cut guide mapping
  const categoryCutGuides: Record<string, string> = {
    BEEF: "/cut-guides/beef",
    PORK: "/cut-guides/pork",
    LAMB: "/cut-guides/lamb",
    CHICKEN: "/cut-guides/chicken",
    SAUSAGES: "/cut-guides/sausages",
    BURGERS: "/cut-guides/burgers",
  };

  const injections = {
    promotional: bestDiscount ? [
      {
        title: `💰 Save ${bestDiscount.discount}% on Bulk Orders`,
        description: `Order ${bestDiscount.minQuantity}+ packs and save ${bestDiscount.discount}% automatically. Discount applied at checkout.`,
        cta: "Shop Now",
        link: category 
          ? `/butchery/shop?category=${encodeURIComponent(category)}`
          : "/butchery/shop",
        icon: Tag,
      },
    ] : [
      {
        title: "💰 Bulk Discount Available",
        description: "Order multiple packs to unlock savings. Discounts automatically applied at checkout.",
        cta: "Shop Now",
        link: category 
          ? `/butchery/shop?category=${encodeURIComponent(category)}`
          : "/butchery/shop",
        icon: Tag,
      },
    ],
    educational: [
      {
        title: category ? `${category} Cut Guide` : "Professional Cut Guides",
        description: category 
          ? `Master ${category.toLowerCase()} cuts with our comprehensive guide - cooking methods, temperatures, and professional tips`
          : "Master butchery cuts with our comprehensive guides for all meat types",
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80",
        cta: "View Cut Guide",
        link: category 
          ? (categoryCutGuides[category] || "/cut-guides")
          : "/cut-guides",
        icon: BookOpen,
      },
    ],
    "cross-sell": [
      {
        title: "Complete Your Order",
        description: "Explore complementary products to enhance your menu",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
        cta: "Browse All Products",
        link: "/butchery/shop",
        icon: ShoppingCart,
      },
    ],
    recipe: [
      {
        title: "Recipe Inspiration",
        description: "Discover chef recipes and add all ingredients to your basket in one click",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
        cta: "Browse Recipes",
        link: "/recipes",
        icon: ChefHat,
      },
    ],
  };

  // Safeguard: ensure type exists in injections object
  if (!injections[type] || !Array.isArray(injections[type]) || injections[type].length === 0) {
    console.warn(`Invalid injection type: ${type}, falling back to promotional`);
    const fallbackType: keyof typeof injections = "promotional";
    const content = injections[fallbackType][0];
    if (!content) return null;
    
    return (
      <div className="col-span-full my-8">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start gap-4">
              {content.icon && (
                <div className="flex-shrink-0">
                  <content.icon className="w-8 h-8 text-primary" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{content.title}</h3>
                <p className="text-gray-600 mb-4">{content.description}</p>
                <Link href={content.link}>
                  <Button variant="tertiary" size="sm" className="inline-flex items-center gap-2">
                    {content.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const content = injections[type][index % injections[type].length];

  return (
    <div className="col-span-full my-8">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {'image' in content && content.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={content.image as string}
              alt={content.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start gap-4">
            {content.icon && !('image' in content && content.image) && (
              <div className="flex-shrink-0">
                <content.icon className="w-8 h-8 text-primary" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{content.title}</h3>
              <p className="text-gray-600 mb-4">{content.description}</p>
              <Link href={content.link}>
                <Button variant="tertiary" size="sm" className="inline-flex items-center gap-2">
                  {content.cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

