"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBasket, getBasketTotal } from "@/lib/basket-localstorage";
import { getSession } from "@/lib/mock-auth";
import { getProductBySku } from "@/lib/data/products";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BasketItem } from "@/components/basket/BasketItem";
import { OrderSummary } from "@/components/basket/OrderSummary";
import { ShoppingCart, Package } from "lucide-react";

type BasketItemType = {
  id: string;
  product_id: string;
  sku: string;
  name: string;
  brand: string;
  quantity: number;
  unit_price: number;
  pack_size?: string;
  images: string[];
  fulfillment: {
    method: "delivery" | "click_collect";
    branch_code?: string;
  };
};

function groupByFulfillment(items: BasketItemType[]) {
  const groups: Record<string, BasketItemType[]> = {};
  for (const it of items) {
    const key = `${it.fulfillment.method}-${it.fulfillment.branch_code ?? "primary"}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(it);
  }
  return groups;
}

export default function BasketPage() {
  const router = useRouter();
  const [items, setItems] = useState<BasketItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBasket = () => {
    const basket = getBasket();
    setItems(basket);
  };

  useEffect(() => {
    const session = getSession();

    // If not logged in, redirect to login
    if (!session?.user) {
      router.push("/login");
      return;
    }

    // Load basket from localStorage
    loadBasket();
    setLoading(false);

    // Listen for storage changes
    const handleStorageChange = () => {
      loadBasket();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading basket...</div>
        </div>
      </div>
    );
  }

  // Calculate actual subtotal with bulk discounts
  let actualSubtotal = 0;
  items.forEach(item => {
    const product = getProductBySku(item.sku);
    const bulkPricing = product?.bulk_pricing;

    let pricePerUnit = item.unit_price;

    if (bulkPricing && Array.isArray(bulkPricing)) {
      const applicableTier = bulkPricing
        .sort((a, b) => b.min_quantity - a.min_quantity)
        .find(tier => item.quantity >= tier.min_quantity);

      if (applicableTier) {
        pricePerUnit = applicableTier.price_per_unit;
      }
    }

    actualSubtotal += pricePerUnit * item.quantity;
  });

  const groups = groupByFulfillment(items);
  const keys = Object.keys(groups);

  // Empty State
  if (keys.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Your basket is empty</h1>
              <p className="text-gray-600 mb-8">
                Start adding premium meats to your basket and unlock bulk discounts
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/butchery/shop">
                  <Button variant="primary" size="lg">
                    Browse All Products
                  </Button>
                </Link>
                <Link href="/best-sellers">
                  <Button variant="secondary" size="lg">
                    View Best Sellers
                  </Button>
                </Link>
              </div>

              {/* Popular Categories */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Popular Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { name: "Beef", href: "/categories/beef" },
                    { name: "Chicken", href: "/categories/chicken" },
                    { name: "Pork", href: "/categories/pork" },
                    { name: "Lamb", href: "/categories/lamb" },
                    { name: "Burgers", href: "/categories/burgers" },
                    { name: "Sausages", href: "/categories/sausages" },
                  ].map(category => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Basket</h1>
          <p className="text-gray-600">
            {items.reduce((sum, item) => sum + item.quantity, 0)} items in your basket
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Basket Items */}
          <div className="lg:col-span-2 space-y-6 mb-8 lg:mb-0">
            {keys.map((key) => {
              const [method] = key.split("-");
              const title = method === "delivery"
                ? "🚚 Delivery from Primary Branch"
                : "🏪 Click & Collect";

              return (
                <section
                  key={key}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <div className="px-4 md:px-6 py-4 font-semibold border-b bg-gray-50 flex items-center gap-2">
                    <Package className="w-5 h-5 text-gray-600" />
                    <span>{title}</span>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {groups[key].map((item) => (
                      <BasketItem
                        key={item.id}
                        item={item}
                        onUpdate={loadBasket}
                      />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Continue Shopping - Mobile */}
            <div className="lg:hidden">
              <Link href="/butchery/shop">
                <Button variant="secondary" size="md" block>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary - Sticky on desktop */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-4">
              <OrderSummary items={items} subtotal={actualSubtotal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
