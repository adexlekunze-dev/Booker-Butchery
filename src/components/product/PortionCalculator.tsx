"use client";

import { useState } from "react";
import { Calculator, Users, Scale, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";

type PortionCalculatorProps = {
  product: {
    id: string;
    sku: string;
    name: string;
    base_price: number;
    unit: string;
    pack_size?: string | null;
    category: string;
  };
  bulkPricing?: Array<{
    min_quantity: number;
    price_per_unit: number;
    discount_percent?: number;
  }>;
  onAddToBasket?: (quantity: number) => void;
  modalMode?: boolean; // When true, always show expanded without header
};

// Standard portion sizes by category (in grams)
const PORTION_SIZES: Record<string, { name: string; grams: number }[]> = {
  BEEF: [
    { name: "Small (125g)", grams: 125 },
    { name: "Standard (175g)", grams: 175 },
    { name: "Large (225g)", grams: 225 },
    { name: "Extra Large (300g)", grams: 300 },
  ],
  PORK: [
    { name: "Small (125g)", grams: 125 },
    { name: "Standard (150g)", grams: 150 },
    { name: "Large (200g)", grams: 200 },
    { name: "Extra Large (250g)", grams: 250 },
  ],
  LAMB: [
    { name: "Small (125g)", grams: 125 },
    { name: "Standard (150g)", grams: 150 },
    { name: "Large (200g)", grams: 200 },
    { name: "Extra Large (250g)", grams: 250 },
  ],
  CHICKEN: [
    { name: "Small (125g)", grams: 125 },
    { name: "Standard (150g)", grams: 150 },
    { name: "Large (200g)", grams: 200 },
    { name: "Extra Large (250g)", grams: 250 },
  ],
  SAUSAGES: [
    { name: "2 sausages", grams: 100 },
    { name: "3 sausages", grams: 150 },
    { name: "4 sausages", grams: 200 },
  ],
  BURGERS: [
    { name: "Small (113g / 4oz)", grams: 113 },
    { name: "Standard (170g / 6oz)", grams: 170 },
    { name: "Large (227g / 8oz)", grams: 227 },
  ],
};

export function PortionCalculator({ product, bulkPricing, onAddToBasket, modalMode = false }: PortionCalculatorProps) {
  const [covers, setCovers] = useState<number>(10);
  const [portionSize, setPortionSize] = useState<number>(
    PORTION_SIZES[product.category]?.[1]?.grams || 150
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const portionOptions = PORTION_SIZES[product.category] || PORTION_SIZES.BEEF;

  // Calculate total weight needed
  const totalWeightGrams = covers * portionSize;
  const totalWeightKg = totalWeightGrams / 1000;

  // Parse pack size to extract weight (e.g., "5kg" -> 5, "2.5kg" -> 2.5)
  const parsePackSize = (packSize: string | null | undefined): number => {
    if (!packSize) return 1;

    const match = packSize.toLowerCase().match(/([\d.]+)\s*kg/);
    if (match) {
      return parseFloat(match[1]);
    }

    // If no kg found, try grams
    const gramsMatch = packSize.toLowerCase().match(/([\d.]+)\s*g/);
    if (gramsMatch) {
      return parseFloat(gramsMatch[1]) / 1000;
    }

    return 1; // Default to 1kg
  };

  const packSizeKg = parsePackSize(product.pack_size);
  const packsNeeded = Math.ceil(totalWeightKg / packSizeKg);

  // Calculate bulk discount pricing
  const getApplicableTier = (quantity: number) => {
    if (!bulkPricing || !Array.isArray(bulkPricing)) return null;
    return bulkPricing
      .sort((a, b) => b.min_quantity - a.min_quantity)
      .find(tier => quantity >= tier.min_quantity);
  };

  const applicableTier = getApplicableTier(packsNeeded);
  const pricePerPack = applicableTier?.price_per_unit || product.base_price;
  const discountPercent = applicableTier?.discount_percent ||
    (applicableTier ? Math.round(((product.base_price - applicableTier.price_per_unit) / product.base_price) * 100) : 0);

  const totalCost = packsNeeded * pricePerPack;
  const baseTotalCost = packsNeeded * product.base_price;
  const totalSavings = baseTotalCost - totalCost;
  const costPerCover = totalCost / covers;

  // Find next tier for suggestion
  const nextTier = bulkPricing && Array.isArray(bulkPricing)
    ? bulkPricing
        .sort((a, b) => a.min_quantity - b.min_quantity)
        .find(tier => packsNeeded < tier.min_quantity)
    : null;

  // Calculate waste/excess
  const totalWeightOrdered = packsNeeded * packSizeKg;
  const excessKg = totalWeightOrdered - totalWeightKg;
  const wastePercent = (excessKg / totalWeightOrdered) * 100;

  // In modal mode, always show expanded content without wrapper
  if (modalMode) {
    return (
      <div className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Number of Covers */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Users className="w-4 h-4 text-gray-500" />
              Number of Covers
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCovers(Math.max(1, covers - 1))}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                value={covers}
                onChange={(e) => setCovers(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
              <button
                onClick={() => setCovers(covers + 1)}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors"
              >
                +
              </button>
            </div>
            <div className="mt-2 flex gap-2 flex-wrap">
              {[10, 25, 50, 100].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setCovers(preset)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    covers === preset
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Portion Size */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Scale className="w-4 h-4 text-gray-500" />
              Portion Size per Cover
            </label>
            <div className="grid grid-cols-2 gap-2">
              {portionOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => setPortionSize(option.grams)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    portionSize === option.grams
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
            {/* Custom portion input */}
            <div className="mt-3">
              <input
                type="number"
                value={portionSize}
                onChange={(e) => setPortionSize(Math.max(1, parseInt(e.target.value) || 1))}
                placeholder="Custom (grams)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
            Recommended Order
          </h4>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 space-y-4">
            {/* Main Recommendation */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Weight Needed</div>
                <div className="text-2xl font-bold text-gray-900">
                  {totalWeightKg.toFixed(2)} kg
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  ({covers} covers × {portionSize}g)
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Order Quantity</div>
                <div className="text-3xl font-bold text-blue-600">
                  {packsNeeded}
                </div>
                <div className="text-sm text-gray-700 mt-1">
                  {product.unit}{packsNeeded > 1 ? 's' : ''} ({packSizeKg}kg each)
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="border-t border-blue-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Base Price:</span>
                <span className={applicableTier ? "text-gray-500 line-through" : "font-semibold text-gray-900"}>
                  £{product.base_price.toFixed(2)} per {product.unit}
                </span>
              </div>

              {applicableTier && (
                <>
                  <div className="flex justify-between text-sm bg-green-50 -mx-2 px-2 py-1 rounded">
                    <span className="text-green-700 font-medium">💰 Bulk Discount ({discountPercent}%):</span>
                    <span className="font-semibold text-green-700">
                      £{pricePerPack.toFixed(2)} per {product.unit}
                    </span>
                  </div>
                </>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Cost per Cover:</span>
                <span className="font-semibold text-gray-900">£{costPerCover.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-lg border-t border-blue-200 pt-2">
                <span className="font-bold text-gray-900">Total Cost:</span>
                <span className="font-bold text-blue-600">£{totalCost.toFixed(2)}</span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-sm bg-green-50 -mx-2 px-2 py-1 rounded">
                  <span className="text-green-700 font-medium">You Save:</span>
                  <span className="font-bold text-green-700">£{totalSavings.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Waste Warning */}
            {wastePercent > 5 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className="text-orange-600 text-xs">⚠️</div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-orange-900 mb-1">
                      Note: {wastePercent.toFixed(0)}% excess
                    </div>
                    <div className="text-xs text-orange-700">
                      You'll have {excessKg.toFixed(2)}kg extra. Consider adjusting covers or portion size to minimize waste.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Next Tier Suggestion */}
            {nextTier && (
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className="text-yellow-600 text-sm">💡</div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-yellow-900 mb-1">
                      Order {nextTier.min_quantity - packsNeeded} more {product.unit}{(nextTier.min_quantity - packsNeeded) > 1 ? 's' : ''} to unlock {nextTier.discount_percent || Math.round(((product.base_price - nextTier.price_per_unit) / product.base_price) * 100)}% savings!
                    </div>
                    <div className="text-xs text-yellow-700">
                      Next tier: {nextTier.min_quantity}+ {product.unit}s at £{nextTier.price_per_unit.toFixed(2)} each
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add to Basket Button */}
            {onAddToBasket && (
              <Button
                variant="primary"
                block
                icon={<ShoppingCart className="w-4 h-4" />}
                onClick={() => onAddToBasket(packsNeeded)}
                className="mt-4"
              >
                Add {packsNeeded} {product.unit}{packsNeeded > 1 ? 's' : ''} to Basket (£{totalCost.toFixed(2)})
              </Button>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="text-sm font-semibold text-gray-900 mb-2">💡 Professional Tips</h5>
          <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
            <li>Industry standard portions: {product.category === 'BEEF' ? '175g for main course' : '150g for main course'}</li>
            <li>Order 10-15% extra for waste, trimming, and seconds</li>
            <li>Bone-in cuts: Add 30-40% to account for bone weight</li>
            <li>Consider prep method: Ground/minced has less waste than whole cuts</li>
          </ul>
        </div>
      </div>
    );
  }

  // Default mode with collapsible header
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-4 flex items-center justify-between hover:from-blue-100 hover:to-indigo-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <Calculator className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">Portion Calculator</h3>
            <p className="text-sm text-gray-600">Calculate exact quantities for your menu</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Quick Result:</div>
          <div className="text-xl font-bold text-blue-600">
            {packsNeeded} {product.unit}{packsNeeded > 1 ? 's' : ''}
          </div>
          <div className="text-xs text-gray-500">£{totalCost.toFixed(2)} total</div>
        </div>
      </button>

      {/* Expanded Calculator */}
      {isExpanded && (
        <div className="p-6 bg-white space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Number of Covers */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Users className="w-4 h-4 text-gray-500" />
                Number of Covers
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCovers(Math.max(1, covers - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={covers}
                  onChange={(e) => setCovers(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
                <button
                  onClick={() => setCovers(covers + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors"
                >
                  +
                </button>
              </div>
              <div className="mt-2 flex gap-2 flex-wrap">
                {[10, 25, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setCovers(preset)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      covers === preset
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Portion Size */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Scale className="w-4 h-4 text-gray-500" />
                Portion Size per Cover
              </label>
              <div className="grid grid-cols-2 gap-2">
                {portionOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => setPortionSize(option.grams)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      portionSize === option.grams
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
              {/* Custom portion input */}
              <div className="mt-3">
                <input
                  type="number"
                  value={portionSize}
                  onChange={(e) => setPortionSize(Math.max(1, parseInt(e.target.value) || 1))}
                  placeholder="Custom (grams)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Recommended Order
            </h4>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 space-y-4">
              {/* Main Recommendation */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total Weight Needed</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {totalWeightKg.toFixed(2)} kg
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ({covers} covers × {portionSize}g)
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Order Quantity</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {packsNeeded}
                  </div>
                  <div className="text-sm text-gray-700 mt-1">
                    {product.unit}{packsNeeded > 1 ? 's' : ''} ({packSizeKg}kg each)
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="border-t border-blue-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Base Price:</span>
                  <span className={applicableTier ? "text-gray-500 line-through" : "font-semibold text-gray-900"}>
                    £{product.base_price.toFixed(2)} per {product.unit}
                  </span>
                </div>

                {applicableTier && (
                  <>
                    <div className="flex justify-between text-sm bg-green-50 -mx-2 px-2 py-1 rounded">
                      <span className="text-green-700 font-medium">💰 Bulk Discount ({discountPercent}%):</span>
                      <span className="font-semibold text-green-700">
                        £{pricePerPack.toFixed(2)} per {product.unit}
                      </span>
                    </div>
                  </>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Cost per Cover:</span>
                  <span className="font-semibold text-gray-900">£{costPerCover.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-lg border-t border-blue-200 pt-2">
                  <span className="font-bold text-gray-900">Total Cost:</span>
                  <span className="font-bold text-blue-600">£{totalCost.toFixed(2)}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-sm bg-green-50 -mx-2 px-2 py-1 rounded">
                    <span className="text-green-700 font-medium">You Save:</span>
                    <span className="font-bold text-green-700">£{totalSavings.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Waste Warning */}
              {wastePercent > 5 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <div className="text-orange-600 text-xs">⚠️</div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-orange-900 mb-1">
                        Note: {wastePercent.toFixed(0)}% excess
                      </div>
                      <div className="text-xs text-orange-700">
                        You'll have {excessKg.toFixed(2)}kg extra. Consider adjusting covers or portion size to minimize waste.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Tier Suggestion */}
              {nextTier && (
                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <div className="text-yellow-600 text-sm">💡</div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-yellow-900 mb-1">
                        Order {nextTier.min_quantity - packsNeeded} more {product.unit}{(nextTier.min_quantity - packsNeeded) > 1 ? 's' : ''} to unlock {nextTier.discount_percent || Math.round(((product.base_price - nextTier.price_per_unit) / product.base_price) * 100)}% savings!
                      </div>
                      <div className="text-xs text-yellow-700">
                        Next tier: {nextTier.min_quantity}+ {product.unit}s at £{nextTier.price_per_unit.toFixed(2)} each
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Add to Basket Button */}
              {onAddToBasket && (
                <Button
                  variant="primary"
                  block
                  icon={<ShoppingCart className="w-4 h-4" />}
                  onClick={() => onAddToBasket(packsNeeded)}
                  className="mt-4"
                >
                  Add {packsNeeded} {product.unit}{packsNeeded > 1 ? 's' : ''} to Basket (£{totalCost.toFixed(2)})
                </Button>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="text-sm font-semibold text-gray-900 mb-2">💡 Professional Tips</h5>
            <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
              <li>Industry standard portions: {product.category === 'BEEF' ? '175g for main course' : '150g for main course'}</li>
              <li>Order 10-15% extra for waste, trimming, and seconds</li>
              <li>Bone-in cuts: Add 30-40% to account for bone weight</li>
              <li>Consider prep method: Ground/minced has less waste than whole cuts</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
