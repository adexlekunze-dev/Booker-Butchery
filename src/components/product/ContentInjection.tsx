import Link from "next/link";
import Image from "next/image";
import { BookOpen, Tag, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

type ContentInjectionProps = {
  type: "educational" | "promotional" | "cross-category";
  index?: number;
};

export function ContentInjection({ type, index = 0 }: ContentInjectionProps) {
  const injections = {
    educational: [
      {
        title: "Understanding Beef Cuts",
        description: "Learn which cuts are best for grilling, roasting, or slow cooking",
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80",
        cta: "Read Guide",
        link: "/meat-fish-poultry#buying-guides",
        icon: BookOpen,
      },
    ],
    promotional: [
      {
        title: "💰 BULK BUY OFFER",
        description: "Buy 5kg+ fresh meat and save 10% extra. Automatically applied at checkout.",
        cta: "Shop Bulk Packs",
        link: "/meat-fish-poultry/shop?pack_size=bulk",
        icon: Tag,
      },
    ],
    "cross-category": [
      {
        title: "Complete Your Order",
        description: "Don't forget marinades and sauces to complement your fresh meat",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
        cta: "Shop Sauces",
        link: "/search?q=sauces",
        icon: ShoppingCart,
      },
    ],
  };

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

