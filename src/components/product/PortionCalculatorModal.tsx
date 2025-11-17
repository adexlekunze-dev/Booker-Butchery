"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { PortionCalculator } from "./PortionCalculator";

type PortionCalculatorModalProps = {
  isOpen: boolean;
  onClose: () => void;
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
};

export function PortionCalculatorModal({
  isOpen,
  onClose,
  product,
  bulkPricing,
  onAddToBasket,
}: PortionCalculatorModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[999]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Portion Calculator</h2>
              <p className="text-sm text-gray-600 mt-1">
                Calculate exact quantities for {product.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <PortionCalculator
              product={product}
              bulkPricing={bulkPricing}
              onAddToBasket={(quantity) => {
                onAddToBasket?.(quantity);
                onClose();
              }}
              modalMode={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
