"use client";

import { useState, useEffect } from "react";
import { X, Users, Scale, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RecipeIngredient } from "@/data/category-recipes";

interface RecipePortionCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  baseServes: number;
  ingredients: RecipeIngredient[];
  recipeName: string;
  onAddToBasket?: (adjustedIngredients: RecipeIngredient[]) => void;
}

export function RecipePortionCalculator({
  isOpen,
  onClose,
  baseServes,
  ingredients,
  recipeName,
  onAddToBasket
}: RecipePortionCalculatorProps) {
  const [targetPortions, setTargetPortions] = useState(baseServes);

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

  // Calculate multiplier
  const multiplier = targetPortions / baseServes;

  // Adjust ingredient quantities
  const adjustedIngredients = ingredients.map(ing => ({
    ...ing,
    quantity: Math.round(ing.quantity * multiplier * 100) / 100, // Round to 2 decimal places
    price: ing.price ? Math.round(ing.price * multiplier * 100) / 100 : undefined,
  }));

  // Calculate total cost
  const totalCost = adjustedIngredients.reduce((sum, ing) => sum + (ing.price || 0), 0);
  const costPerPortion = totalCost / targetPortions;

  const handleAddToBasket = () => {
    if (onAddToBasket) {
      onAddToBasket(adjustedIngredients);
      onClose();
    }
  };

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
          className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Scale Recipe Portions</h2>
              <p className="text-sm text-gray-600 mt-1">{recipeName}</p>
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
          <div className="p-6 space-y-6">
            {/* Portion Selector */}
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
                <Users className="w-5 h-5 text-primary" />
                Number of Portions
              </label>

              {/* Slider and Input */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setTargetPortions(Math.max(1, targetPortions - 10))}
                    className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors text-xl"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <input
                      type="number"
                      value={targetPortions}
                      onChange={(e) => setTargetPortions(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-32 text-center text-4xl font-bold text-primary border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                      min="1"
                    />
                    <p className="text-sm text-gray-600 mt-1">portions</p>
                  </div>
                  <button
                    onClick={() => setTargetPortions(targetPortions + 10)}
                    className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors text-xl"
                  >
                    +
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2">
                  {[10, 20, 40, 50, 100, 150, 200].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setTargetPortions(preset)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        targetPortions === preset
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scaling Info */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Scaling:</span> {baseServes} portions → {targetPortions} portions 
                  <span className="ml-2">({(multiplier * 100).toFixed(0)}% of original)</span>
                </p>
              </div>
            </div>

            {/* Adjusted Ingredients */}
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
                <Scale className="w-5 h-5 text-primary" />
                Adjusted Ingredients
              </label>

              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {adjustedIngredients.map((ingredient, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 p-3 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{ingredient.name}</div>
                        {ingredient.brand && (
                          <div className="text-xs text-gray-600">{ingredient.brand}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            {ingredient.quantity} {ingredient.unit}
                          </div>
                          {ingredient.sku && (
                            <div className="text-xs text-gray-500">SKU: {ingredient.sku}</div>
                          )}
                        </div>
                        {ingredient.price && (
                          <div className="text-right min-w-[80px]">
                            <div className="text-lg font-bold text-primary">
                              £{ingredient.price.toFixed(2)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cost Summary */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Total Cost</h3>
                  <p className="text-sm text-gray-600">For {targetPortions} portions</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    £{totalCost.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">
                    £{costPerPortion.toFixed(2)} per portion
                  </div>
                </div>
              </div>

              {/* Savings indicator */}
              {multiplier > 2 && (
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <p className="text-sm text-green-700 font-medium">
                    💰 Bulk pricing may apply - check individual products for volume discounts
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="secondary"
                size="lg"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              {onAddToBasket && (
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ShoppingCart className="w-5 h-5" />}
                  onClick={handleAddToBasket}
                  className="flex-1"
                >
                  Add {targetPortions} Portions to Basket
                </Button>
              )}
            </div>

            {/* Helper Text */}
            <div className="text-xs text-center text-gray-600">
              <p>Ingredient quantities are automatically adjusted based on your portion selection</p>
              <p className="mt-1">All prices shown are estimates - final pricing confirmed at checkout</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

