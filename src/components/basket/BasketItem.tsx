"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { updateBasketItem, removeFromBasket } from "@/lib/basket-localstorage";
import { getProductBySku } from "@/lib/data/products";

type BasketItemProps = {
  item: {
    id: string;
    sku: string;
    name: string;
    brand: string;
    quantity: number;
    unit_price: number;
    pack_size?: string;
    images: string[];
  };
  onUpdate: () => void;
};

export function BasketItem({ item, onUpdate }: BasketItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // Get full product data for bulk pricing
  const product = getProductBySku(item.sku);
  const bulkPricing = product?.bulk_pricing;

  // Calculate applicable bulk discount
  const getApplicableTier = (quantity: number) => {
    if (!bulkPricing || !Array.isArray(bulkPricing)) return null;
    return bulkPricing
      .sort((a, b) => b.min_quantity - a.min_quantity)
      .find(tier => quantity >= tier.min_quantity);
  };

  const applicableTier = getApplicableTier(item.quantity);
  const actualPrice = applicableTier?.price_per_unit || item.unit_price;
  const savings = applicableTier ? (item.unit_price - actualPrice) * item.quantity : 0;
  const discountPercent = applicableTier?.discount_percent ||
    (applicableTier ? Math.round(((item.unit_price - actualPrice) / item.unit_price) * 100) : 0);

  // Find next tier
  const nextTier = bulkPricing && Array.isArray(bulkPricing)
    ? bulkPricing
        .sort((a, b) => a.min_quantity - b.min_quantity)
        .find(tier => item.quantity < tier.min_quantity)
    : null;

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);

    const result = updateBasketItem(item.id, newQuantity);
    if (result.success) {
      onUpdate();
    }
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    const result = removeFromBasket(item.id);
    if (result.success) {
      onUpdate();
    }
  };

  const itemTotal = actualPrice * item.quantity;

  return (
    <div className={`flex gap-4 p-4 ${isRemoving ? 'opacity-50' : ''}`}>
      {/* Product Image */}
      <Link href={`/products/${item.sku}`} className="flex-shrink-0">
        <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
          {item.images && item.images.length > 0 ? (
            <Image
              src={item.images[0]}
              alt={item.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No image
            </div>
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.sku}`} className="hover:text-primary">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2">
            {item.name}
          </h3>
        </Link>
        <p className="text-xs md:text-sm text-gray-600 mt-1">{item.brand}</p>
        {item.pack_size && (
          <p className="text-xs text-gray-500 mt-1">{item.pack_size}</p>
        )}

        {/* Bulk Discount Badge */}
        {applicableTier && (
          <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded text-xs font-medium text-green-700">
            <span>💰</span>
            <span>{discountPercent}% bulk discount applied!</span>
          </div>
        )}

        {/* Next Tier Suggestion */}
        {nextTier && (
          <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
            <span>💡</span>
            <span>
              Add {nextTier.min_quantity - item.quantity} more to unlock {nextTier.discount_percent || Math.round(((item.unit_price - nextTier.price_per_unit) / item.unit_price) * 100)}% off
            </span>
          </div>
        )}

        {/* Mobile: Quantity & Price */}
        <div className="md:hidden mt-3 flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4 text-gray-700" />
            </button>
            <span className="w-12 text-center font-semibold text-gray-900">
              {item.quantity}
            </span>
            <button
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              disabled={isUpdating}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            {applicableTier && (
              <div className="text-xs text-gray-500 line-through">
                £{(item.unit_price * item.quantity).toFixed(2)}
              </div>
            )}
            <div className="font-bold text-gray-900">
              £{itemTotal.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Quantity Controls */}
      <div className="hidden md:flex items-start gap-2">
        <button
          onClick={() => handleUpdateQuantity(item.quantity - 1)}
          disabled={isUpdating || item.quantity <= 1}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4 text-gray-700" />
        </button>
        <span className="w-12 text-center font-semibold text-gray-900 leading-8">
          {item.quantity}
        </span>
        <button
          onClick={() => handleUpdateQuantity(item.quantity + 1)}
          disabled={isUpdating}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Desktop: Price */}
      <div className="hidden md:block text-right min-w-[100px]">
        <div className="text-sm text-gray-600">
          £{actualPrice.toFixed(2)} each
        </div>
        {applicableTier && (
          <div className="text-xs text-gray-500 line-through">
            £{(item.unit_price * item.quantity).toFixed(2)}
          </div>
        )}
        <div className="font-bold text-gray-900 mt-1">
          £{itemTotal.toFixed(2)}
        </div>
        {savings > 0 && (
          <div className="text-xs text-green-600 font-medium mt-1">
            Save £{savings.toFixed(2)}
          </div>
        )}
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        disabled={isRemoving}
        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
        aria-label="Remove item"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
