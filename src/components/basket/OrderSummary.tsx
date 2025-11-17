"use client";

import Link from "next/link";
import { TruckIcon, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getProductBySku } from "@/lib/data/products";

type OrderSummaryProps = {
  items: Array<{
    sku: string;
    quantity: number;
    unit_price: number;
  }>;
  subtotal: number;
};

export function OrderSummary({ items, subtotal }: OrderSummaryProps) {
  // Calculate bulk discount savings
  let totalSavings = 0;

  items.forEach(item => {
    const product = getProductBySku(item.sku);
    const bulkPricing = product?.bulk_pricing;

    if (bulkPricing && Array.isArray(bulkPricing)) {
      const applicableTier = bulkPricing
        .sort((a, b) => b.min_quantity - a.min_quantity)
        .find(tier => item.quantity >= tier.min_quantity);

      if (applicableTier) {
        const actualPrice = applicableTier.price_per_unit;
        const savings = (item.unit_price - actualPrice) * item.quantity;
        totalSavings += savings;
      }
    }
  });

  const deliveryThreshold = 100;
  const freeDeliveryProgress = Math.min((subtotal / deliveryThreshold) * 100, 100);
  const amountToFreeDelivery = Math.max(0, deliveryThreshold - subtotal);

  return (
    <div className="space-y-6">
      {/* Free Delivery Tracker */}
      {subtotal < deliveryThreshold && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <TruckIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900 mb-2">
                Add £{amountToFreeDelivery.toFixed(2)} more for FREE delivery
              </p>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
              <p className="text-xs text-blue-700 mt-1">
                {freeDeliveryProgress.toFixed(0)}% towards free delivery
              </p>
            </div>
          </div>
        </div>
      )}

      {subtotal >= deliveryThreshold && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <TruckIcon className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-green-900">
              ✓ You qualify for FREE delivery!
            </p>
          </div>
        </div>
      )}

      {/* Savings Summary */}
      {totalSavings > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Tag className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-900">
                💰 You're saving £{totalSavings.toFixed(2)} with bulk discounts!
              </p>
              <p className="text-xs text-green-700 mt-1">
                Smart ordering earns you better prices
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

        <div className="space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
            <span className="font-medium">
              {totalSavings > 0 && (
                <span className="text-gray-400 line-through mr-2">
                  £{(subtotal + totalSavings).toFixed(2)}
                </span>
              )}
              £{subtotal.toFixed(2)}
            </span>
          </div>

          {totalSavings > 0 && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>Bulk Discount Savings</span>
              <span>-£{totalSavings.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-700">
            <span>Delivery</span>
            <span className="font-medium">
              {subtotal >= deliveryThreshold ? (
                <span className="text-green-600">FREE</span>
              ) : (
                "£4.99"
              )}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-primary">
                £{(subtotal + (subtotal >= deliveryThreshold ? 0 : 4.99)).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <Link href="/checkout/delivery" className="block mt-6">
          <Button variant="primary" size="lg" block>
            Proceed to Checkout
          </Button>
        </Link>

        <Link href="/butchery/shop" className="block mt-3">
          <Button variant="secondary" size="md" block>
            Continue Shopping
          </Button>
        </Link>

        {/* Trust Badges */}
        <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>✓</span>
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>✓</span>
            <span>30-day satisfaction guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>✓</span>
            <span>Expert customer support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
