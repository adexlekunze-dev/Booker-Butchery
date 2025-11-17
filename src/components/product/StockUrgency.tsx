"use client";

import { TrendingUp, Package, Clock } from "lucide-react";

type StockUrgencyProps = {
  product: any; // Accept any product type to work with ProductCard and ProductInfo
  variant?: "inline" | "banner";
};

export function StockUrgency({ product, variant = "inline" }: StockUrgencyProps) {
  // Generate mock urgency data based on product ID for consistency
  const generateUrgencyData = (productId: string) => {
    // Use product ID to generate consistent pseudo-random values
    const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Stock remaining (1-50 units)
    const stockRemaining = (hash % 50) + 1;

    // Weekly orders (10-150 orders)
    const weeklyOrders = ((hash * 7) % 140) + 10;

    // Restock days (2-14 days)
    const restockDays = ((hash * 3) % 12) + 2;

    return {
      stockRemaining,
      weeklyOrders,
      restockDays,
    };
  };

  const { stockRemaining, weeklyOrders, restockDays } = generateUrgencyData(product.id);

  // Don't show if out of stock
  if (product.availability?.in_stock === false || product.availability?.stock_level === "out") {
    return null;
  }

  // Determine urgency level based on stock
  const stockLevel = product.availability?.stock_level || "high";
  const showLowStockWarning = stockLevel === "low" || stockRemaining <= 15;
  const showPopularityIndicator = weeklyOrders >= 40;
  const showRestockDate = stockLevel === "medium" && stockRemaining <= 25;

  // If no urgency indicators, don't show anything
  if (!showLowStockWarning && !showPopularityIndicator && !showRestockDate) {
    return null;
  }

  // Banner variant (for PDP)
  if (variant === "banner") {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {showLowStockWarning && (
            <div className="flex items-center gap-2 text-orange-800">
              <Package className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-semibold">
                Only <span className="text-orange-600 font-bold">{stockRemaining}</span> units left at this price
              </span>
            </div>
          )}

          {showPopularityIndicator && (
            <div className="flex items-center gap-2 text-orange-800">
              <TrendingUp className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-semibold">
                <span className="text-orange-600 font-bold">{weeklyOrders}</span> chefs ordered this week
              </span>
            </div>
          )}

          {showRestockDate && (
            <div className="flex items-center gap-2 text-orange-800">
              <Clock className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-semibold">
                Restock in <span className="text-orange-600 font-bold">{restockDays}</span> days
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Inline variant (for product cards)
  return (
    <div className="space-y-1">
      {showLowStockWarning && (
        <div className="flex items-center gap-1 text-orange-600">
          <Package className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-xs font-medium">Only {stockRemaining} left</span>
        </div>
      )}

      {showPopularityIndicator && !showLowStockWarning && (
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-xs font-medium">{weeklyOrders} ordered this week</span>
        </div>
      )}
    </div>
  );
}
