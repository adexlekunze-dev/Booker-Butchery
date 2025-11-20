"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingCart, Lock, CheckCircle2, Lightbulb, ChevronDown, ChevronUp, Calculator } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "./QuantitySelector";
import { StockUrgency } from "./StockUrgency";
import { PortionCalculatorModal } from "./PortionCalculatorModal";
import { getSession } from "@/lib/mock-auth";

type ProductInfoProps = {
  product: {
    id: string;
    sku: string;
    name: string;
    brand: string;
    pack_size?: string | null;
    unit: string;
    base_price: number;
    bulk_pricing?: any;
    attributes?: any;
    on_offer?: boolean;
    category: string;
    subcategory: string;
    descriptions?: {
      short?: string;
      long?: string;
      features?: string[];
    };
  };
  reviewsSummary?: {
    average_rating: number;
    total_count: number;
  };
  availabilityPanel?: ReactNode | null;
};

export function ProductInfo({ product, reviewsSummary, availabilityPanel }: ProductInfoProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAvailabilityExpanded, setIsAvailabilityExpanded] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);

  useEffect(() => {
    const session = getSession();
    setIsAuthenticated(!!session?.user);

    // Listen for storage changes
    const handleStorageChange = () => {
      const newSession = getSession();
      setIsAuthenticated(!!newSession?.user);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const rating = reviewsSummary?.average_rating || 0;
  const reviewCount = reviewsSummary?.total_count || 0;
  const attributes = Array.isArray(product.attributes) ? product.attributes : [];
  const features = Array.isArray(product.descriptions?.features) ? product.descriptions.features : [];

  // Calculate price
  const unitPrice = product.base_price;
  const wasPrice = (product as any).was_price;
  const totalPrice = unitPrice * quantity;

  // Calculate offer savings (was_price vs base_price)
  let offerSavings = 0;
  let offerSavingsPercent = 0;
  if (product.on_offer && wasPrice && wasPrice > unitPrice) {
    offerSavings = wasPrice - unitPrice;
    offerSavingsPercent = Math.round((offerSavings / wasPrice) * 100);
  }

  // Bulk pricing (if applicable)
  const bulkPricing = product.bulk_pricing as any;
  let applicablePrice = unitPrice;
  let bulkDiscount = null;
  let bulkDiscountPercent = null;
  
  if (bulkPricing && Array.isArray(bulkPricing) && bulkPricing.length > 0) {
    const applicableTier = bulkPricing
      .sort((a: any, b: any) => b.min_quantity - a.min_quantity)
      .find((tier: any) => quantity >= tier.min_quantity);
    
    if (applicableTier) {
      applicablePrice = applicableTier.price_per_unit || unitPrice;
      bulkDiscount = applicableTier.discount_percent || null;
      bulkDiscountPercent = bulkDiscount;
    }
  }

  const finalPrice = applicablePrice * quantity;
  const bulkSavings = totalPrice - finalPrice;

  const handleAddToBasket = (customQuantity?: number) => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = "/login";
      return;
    }

    const quantityToAdd = customQuantity !== undefined ? customQuantity : quantity;
    const isFromCalculator = customQuantity !== undefined;

    try {
      // Import and use localStorage basket
      import("@/lib/basket-localstorage").then(({ addToBasket }) => {
        import("@/lib/mock-auth").then(({ getUser }) => {
          const user = getUser();
          const branchCode = user?.primary_branch_code;

          const result = addToBasket(
            product.sku,
            quantityToAdd,
            { method: "delivery", branch_code: branchCode }
          );

          if (result.success) {
            // Show success message
            alert(`✓ Added ${quantityToAdd} ${product.pack_size || "item(s)"} to basket`);

            // Reset quantity selector if added from calculator
            if (isFromCalculator) {
              setQuantity(1);
            }

            // Trigger storage event for other components to update
            window.dispatchEvent(new Event('storage'));
          } else {
            alert(result.error || "Failed to add to basket. Please try again.");
          }
        });
      });
    } catch (error) {
      console.error("Error adding to basket:", error);
      alert("Failed to add to basket. Please try again.");
    }
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist API call
  };

  return (
    <div className="space-y-6">
      {/* Brand */}
      <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
        {product.brand}
      </div>

      {/* Product Name */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        {product.name}
      </h1>

      {/* Pack Size and Price - Side by Side */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        {/* Pack Size */}
        {product.pack_size && (
          <div className="text-gray-600">
            Pack Size: <span className="font-medium">{product.pack_size}</span>
            {product.unit && <span> ({product.unit})</span>}
          </div>
        )}

        {/* Price - Early Placement */}
        <div className="space-y-1">
          {product.on_offer && wasPrice && (
            <div className="text-lg text-gray-500 line-through">
              Was £{wasPrice.toFixed(2)}
            </div>
          )}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              £{applicablePrice.toFixed(2)}
            </span>
            {product.unit && (
              <span className="text-base text-gray-600">per {product.unit}</span>
            )}
          </div>
          {product.on_offer && offerSavings > 0 && (
            <div className="text-sm text-green-600 font-medium">
              Save £{offerSavings.toFixed(2)} ({offerSavingsPercent}%)
            </div>
          )}
        </div>
      </div>

      {/* SKU */}
      <div className="text-sm text-gray-500">
        SKU: {product.sku}
      </div>

      {/* Rating */}
      {reviewCount > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating)
                    ? "text-primary fill-primary"
                    : i < rating
                    ? "text-primary fill-primary opacity-50"
                    : "text-gray-300 fill-none"
                }`}
                strokeWidth={2}
              />
            ))}
          </div>
          <span className="text-lg font-semibold text-gray-900">{rating.toFixed(1)}</span>
          <span className="text-gray-600">({reviewCount} reviews)</span>
        </div>
      )}

      {/* Attributes - Before Key Features */}
      {attributes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attributes.map((attr: string, idx: number) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
            >
              {attr === "british" && "🇬🇧 British"}
              {attr === "premium" && "⭐ Premium"}
              {attr === "organic" && "🌱 Organic"}
              {attr === "free-range" && "🐔 Free-range"}
              {attr === "halal" && "✓ Halal"}
              {!["british", "premium", "organic", "free-range", "halal"].includes(attr) && attr}
            </span>
          ))}
        </div>
      )}

      {/* Stock Urgency Banner */}
      <StockUrgency product={product} variant="banner" />

      {/* Key Features Section - After Reviews */}
      {features.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.slice(0, 6).map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Availability Panel - Collapsible on Mobile, Hidden on Desktop */}
      {availabilityPanel && (
        <div className="lg:hidden mt-6 border-t border-gray-200 pt-6">
          <button
            onClick={() => setIsAvailabilityExpanded(!isAvailabilityExpanded)}
            className="w-full flex items-center justify-between text-left px-8 py-4 bg-primary text-white border border-primary hover:opacity-90 active:opacity-80 rounded-md transition-all duration-150 font-medium text-lg min-h-[52px]"
          >
            <span className="font-semibold text-white text-base">
              Availability & Fulfilment
            </span>
            {isAvailabilityExpanded ? (
              <ChevronUp className="w-5 h-5 text-white" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white" />
            )}
          </button>
          
          {isAvailabilityExpanded && (
            <div className="mt-4">
              {availabilityPanel}
            </div>
          )}
        </div>
      )}

      {/* Bulk Savings Display */}
      {bulkSavings > 0 && (
        <div className="text-sm text-gray-600">
          You save: <span className="font-medium text-green-600">£{bulkSavings.toFixed(2)}</span>
        </div>
      )}

      {/* Bulk Discount Tiers Table - ALWAYS VISIBLE, PROMINENT */}
      {bulkPricing && Array.isArray(bulkPricing) && bulkPricing.length > 0 && (
        <div className="mt-6 pt-6 border-t-2 border-primary">
          {/* Prominent Header with Icon */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <span className="text-2xl">💰</span>
              BULK DISCOUNT TIERS - SAVE MORE!
            </h3>
            <p className="text-sm text-gray-600">Order more packs to unlock bigger savings</p>
          </div>

          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Quantity</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Price/pack</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">You save</th>
                </tr>
              </thead>
              <tbody>
                {/* Base price tier (1 pack) */}
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-900 font-medium">1 pack</td>
                  <td className="py-3 px-4 text-gray-900">£{unitPrice.toFixed(2)}</td>
                  <td className="py-3 px-4 text-gray-500">—</td>
                </tr>
                {/* Bulk pricing tiers */}
                {bulkPricing
                  .sort((a: any, b: any) => a.min_quantity - b.min_quantity)
                  .map((tier: any, idx: number) => {
                    const nextTier = bulkPricing.find((t: any) => t.min_quantity > tier.min_quantity);
                    const maxQuantity = nextTier ? nextTier.min_quantity - 1 : null;
                    const quantityRange = maxQuantity
                      ? `${tier.min_quantity}-${maxQuantity}`
                      : `${tier.min_quantity}+`;
                    const pricePerPack = tier.price_per_unit;
                    const savingsPerPack = unitPrice - pricePerPack;
                    const savingsPercent = tier.discount_percent || Math.round((savingsPerPack / unitPrice) * 100);

                    return (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-green-50 transition-colors">
                        <td className="py-3 px-4 text-gray-900 font-medium">{quantityRange}</td>
                        <td className="py-3 px-4 text-gray-900 font-semibold">£{pricePerPack.toFixed(2)}</td>
                        <td className="py-3 px-4 text-green-600 font-bold">
                          {savingsPercent}% (£{savingsPerPack.toFixed(2)})
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bulk Savings CTA Banner */}
      {bulkPricing && Array.isArray(bulkPricing) && bulkPricing.length > 0 && (() => {
        const sortedTiers = bulkPricing.sort((a: any, b: any) => a.min_quantity - b.min_quantity);
        const nextTier = sortedTiers.find((tier: any) => quantity < tier.min_quantity);
        
        if (nextTier) {
          const discountPercent = nextTier.discount_percent || 
            Math.round(((unitPrice - nextTier.price_per_unit) / unitPrice) * 100);
          
          return (
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  ORDER {nextTier.min_quantity}+ PACKS TO UNLOCK {discountPercent}% SAVINGS
                </p>
              </div>
            </div>
          );
        }
        return null;
      })()}

      {/* Become a Member CTA for non-authenticated users */}
      {!isAuthenticated && (
        <div className="mt-4">
          <Link href="/register">
            <Button variant="primary" block>
              Become a Member to Order
            </Button>
          </Link>
        </div>
      )}

      {/* Quantity Selector & Add to Basket */}
      {isAuthenticated && (
        <>
          <QuantitySelector
            defaultValue={1}
            min={1}
            max={999}
            packSize={product.pack_size || undefined}
            unit={product.unit}
            onChange={setQuantity}
          />

          {/* Portion Calculator Button - Available on all devices */}
          <button
            onClick={() => setIsCalculatorModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md hover:bg-blue-100 active:bg-blue-200 transition-colors text-sm md:text-base font-medium"
          >
            <Calculator className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Need help calculating portions?</span>
            <span className="sm:hidden">Calculate Portions</span>
          </button>

          {/* Free Delivery Indicator - Above Add to Cart */}
          {finalPrice < 100 && (
            <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-md p-3">
              🚚 Free delivery over £100. Add £{(100 - finalPrice).toFixed(2)} more for free delivery.
            </div>
          )}
          {finalPrice >= 100 && (
            <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">
              ✓ You qualify for free delivery
            </div>
          )}

          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              block
              icon={<ShoppingCart className="w-5 h-5" strokeWidth={2} />}
              onClick={() => handleAddToBasket()}
            >
              Add to Basket - £{finalPrice.toFixed(2)}
            </Button>

            <Button
              variant="tertiary"
              size="lg"
              block
              icon={
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-primary text-primary" : ""}`}
                  strokeWidth={2}
                />
              }
              onClick={handleWishlist}
            >
              {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        </>
      )}

      {/* Portion Calculator Modal */}
      <PortionCalculatorModal
        isOpen={isCalculatorModalOpen}
        onClose={() => setIsCalculatorModalOpen(false)}
        product={product}
        bulkPricing={bulkPricing}
        onAddToBasket={handleAddToBasket}
      />
    </div>
  );
}

