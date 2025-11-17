"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getSession, getUser } from "@/lib/mock-auth";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, AlertCircle, CreditCard, CheckCircle2, Gift } from "lucide-react";
import { getBasketItemCount, getBasketTotal } from "@/lib/basket-localstorage";
import { getNextDeliveryDayName } from "@/lib/utils/dates";
import { getOrderPatterns } from "@/lib/data/mock-order-patterns";
import { getActiveVouchers } from "@/lib/data/mock-vouchers";
import { getSpendSaveProgress, calculatePotentialCashback } from "@/lib/data/mock-spend-save";
import { getProducts } from "@/lib/data/products";

// Category definitions with images (using actual category names from products.json)
const categoryDefinitions = [
  {
    name: "BEEF",
    href: "/butchery/shop?category=BEEF",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1600&q=80",
    alt: "Beef Products"
  },
  {
    name: "PORK",
    href: "/butchery/shop?category=PORK",
    image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=1600&q=80",
    alt: "Pork Products"
  },
  {
    name: "CHICKEN",
    href: "/butchery/shop?category=CHICKEN",
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=1600&q=80",
    alt: "Chicken Products"
  }
];

export function OrderCompletion() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [basketCount, setBasketCount] = useState(0);
  const [basketTotal, setBasketTotal] = useState(0);
  const [nextDeliveryDay, setNextDeliveryDay] = useState<string>("");
  const [typicalOrderItems, setTypicalOrderItems] = useState<number>(19);
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [spendSave, setSpendSave] = useState<any>(null);
  // Calculate item counts and values for each category from products
  const [categories, setCategories] = useState<Array<{
    name: string;
    href: string;
    image: string;
    alt: string;
    count: number;
    value: number;
  }>>([]);

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);
    setUser(currentUser);

    if (typeof window !== 'undefined') {
      setBasketCount(getBasketItemCount());
      setBasketTotal(getBasketTotal());
    }

    // Get next delivery day (respects 3pm cutoff)
    const nextDay = getNextDeliveryDayName();
    setNextDeliveryDay(nextDay);

    // Get order patterns, vouchers, and spend/save data
    if (currentSession?.user) {
      const userId = currentSession.user.id || 'user-test-001';
      const patterns = getOrderPatterns(userId);
      setTypicalOrderItems(patterns.typical_tuesday_order?.items || 19);
      
      const activeVouchers = getActiveVouchers(userId);
      setVouchers(activeVouchers);
      
      const progress = getSpendSaveProgress(userId);
      setSpendSave(progress);
    }
  }, []);

  useEffect(() => {
    // Calculate category stats from products
    const categoryStats = categoryDefinitions.map(cat => {
      const result = getProducts({ category: cat.name });
      const categoryProducts = result?.products || [];
      const count = categoryProducts.length;
      const value = categoryProducts.reduce((sum: number, p: any) => sum + (p.base_price || 0), 0);
      
      // Use mock data for display (typical items from user's order pattern)
      // In a real app, this would come from order history analysis
      const mockCount = cat.name === "BEEF" ? 3 : 
                       cat.name === "PORK" ? 2 : 4;
      const mockValue = cat.name === "BEEF" ? 89.50 : 
                       cat.name === "PORK" ? 42.30 : 56.20;
      
      return {
        ...cat,
        count: mockCount,
        value: mockValue
      };
    });
    
    setCategories(categoryStats);
  }, []);

  if (!session?.user) {
    return null;
  }

  const missingItemsCount = 5; // Mock data - usually ordered items not in basket

  return (
    <section className="bg-gray-50 border-b border-gray-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            🛒 Complete Your Order and Save
          </h2>
          <p className="text-gray-600">Add your usual items and unlock savings</p>
        </div>

        {/* Current Basket Summary */}
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Current Basket
                </h3>
                <p className="text-sm text-gray-600">
                  {basketCount} items • £{basketTotal.toFixed(2)}
                </p>
              </div>
            </div>
            {basketCount > 0 && (
              <Button variant="primary" size="sm">
                View Basket
              </Button>
            )}
          </div>

          {missingItemsCount > 0 && (
            <div className="flex items-start gap-2 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Missing {missingItemsCount} usual items
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Based on your recent orders
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Category Quick Add */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.length > 0 && categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="text-center mb-4">
                <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">
                  {category.count} items • £{category.value.toFixed(2)}
                </p>
              </div>
              <Button variant="primary" size="sm" className="w-full">
                + Add All {category.count}
              </Button>
            </div>
          ))}
        </div>

        {/* Available Offers */}
        <div className="mt-8 bg-white rounded-lg border-2 border-primary p-6">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-gray-900">💳 AVAILABLE OFFERS</h3>
          </div>

          <div className="space-y-4 mb-6">
            {/* Spend £150, get £10 off */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">Spend £150, get £10 off</h4>
                  {basketTotal < 150 ? (
                    <p className="text-sm text-gray-600 mt-1">
                      Add £{(150 - basketTotal).toFixed(2)} to qualify
                    </p>
                  ) : (
                    <p className="text-sm text-green-600 font-medium mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Qualified! Activate at checkout
                    </p>
                  )}
                </div>
                <Button variant="primary" size="sm" disabled={basketTotal < 150}>
                  {basketTotal >= 150 ? 'Activate' : 'View'}
                </Button>
              </div>
              {basketTotal < 150 && (
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${Math.min((basketTotal / 150) * 100, 100)}%` }}
                  />
                </div>
              )}
            </div>

            {/* 10% off Fresh Meat orders over £50 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">10% off Fresh Meat orders over £50</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Fresh Meat subtotal: £84.20{' '}
                    <span className="text-green-600 font-medium">✓</span>
                  </p>
                </div>
                <Button variant="primary" size="sm">
                  Activate
                </Button>
              </div>
            </div>

            {/* Free delivery over £100 */}
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Free delivery over £100</h4>
                  <p className="text-sm text-green-600 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Already qualified! 🎉
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Potential Savings */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-4">Potential savings on this order:</h4>
            {(() => {
              // Calculate potential savings (show what COULD be saved if all offers activated)
              // Voucher: £10 if basket reaches £150 (show potential even if not qualified)
              const voucherDiscount = 10.00; // Potential discount if they add more
              const cashbackRate = spendSave?.cashback_rate || 0.02;
              const cashbackAmount = calculatePotentialCashback(basketTotal, spendSave?.current_tier || 'silver');
              const bundleSavings = 4.20;
              const totalSavings = voucherDiscount + cashbackAmount + bundleSavings;

              return (
                <>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">• Voucher discount:</span>
                      <span className="font-semibold text-gray-900">£{voucherDiscount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        • Spend & Save cashback ({(cashbackRate * 100).toFixed(0)}%):
                      </span>
                      <span className="font-semibold text-gray-900">£{cashbackAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">• Bundle savings:</span>
                      <span className="font-semibold text-gray-900">£{bundleSavings.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-bold text-lg text-gray-900">Total Potential Savings:</span>
                        <span className="font-bold text-xl text-green-600">£{totalSavings.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="primary" size="lg" className="w-full" icon={<Gift className="w-5 h-5" />}>
                    Apply All Offers at Checkout
                  </Button>
                </>
              );
            })()}
          </div>
        </div>

        {/* Smart Reminder */}
        {nextDeliveryDay && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-900">
              💡 <span className="font-semibold">Smart Tip:</span> You typically order {typicalOrderItems} items on {nextDeliveryDay}s. 
              <button className="ml-2 text-primary hover:underline font-medium">
                Add complete {nextDeliveryDay} order
              </button>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

