"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Package, Scale } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RecipeIngredient } from "@/data/category-recipes";

interface RecipeIngredientsProps {
  ingredients: RecipeIngredient[];
  serves: number;
  onAddAllToBasket?: () => void;
  onCustomizePortions?: () => void;
}

export function RecipeIngredients({ 
  ingredients, 
  serves, 
  onAddAllToBasket,
  onCustomizePortions 
}: RecipeIngredientsProps) {
  // Calculate total cost
  const totalCost = ingredients.reduce((sum, ing) => sum + (ing.price || 0), 0);
  const hasAllPrices = ingredients.every(ing => ing.price !== undefined);

  // Group ingredients by type (with SKU vs without SKU)
  const productIngredients = ingredients.filter(ing => ing.sku);
  const otherIngredients = ingredients.filter(ing => !ing.sku);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ingredients</h2>
          <p className="text-gray-600">For {serves} portions (commercial scale)</p>
        </div>
        {onCustomizePortions && (
          <button
            onClick={onCustomizePortions}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            <Scale className="w-4 h-4" />
            Customize Portions
          </button>
        )}
      </div>

      {/* Product Ingredients (with SKU) */}
      {productIngredients.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Booker Products
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {productIngredients.map((ingredient, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{ingredient.name}</h4>
                        {ingredient.brand && (
                          <p className="text-sm text-gray-600">{ingredient.brand}</p>
                        )}
                        {ingredient.sku && (
                          <p className="text-xs text-gray-500 mt-1">SKU: {ingredient.sku}</p>
                        )}
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span className="text-gray-700">
                            <span className="font-medium">Quantity:</span> {ingredient.quantity} {ingredient.unit}
                          </span>
                          {ingredient.price && (
                            <span className="text-primary font-semibold">
                              £{ingredient.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {ingredient.sku && (
                    <Link
                      href={`/products/${ingredient.sku}`}
                      className="text-sm text-primary hover:text-primary/80 font-medium whitespace-nowrap"
                    >
                      View Product →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Ingredients (without SKU) */}
      {otherIngredients.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Additional Ingredients</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-2">
              {otherIngredients.map((ingredient, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                    {ingredient.price && (
                      <span className="text-gray-600 ml-2">
                        (£{ingredient.price.toFixed(2)})
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Total Cost and CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Total Cost</h3>
            <p className="text-sm text-gray-600">For {serves} portions</p>
          </div>
          {hasAllPrices ? (
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                £{totalCost.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">
                £{(totalCost / serves).toFixed(2)} per portion
              </div>
            </div>
          ) : (
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-600">
                Contact for pricing
              </div>
            </div>
          )}
        </div>

        {onAddAllToBasket && productIngredients.length > 0 && (
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              block
              icon={<ShoppingCart className="w-5 h-5" />}
              onClick={onAddAllToBasket}
            >
              Add All Ingredients to Basket
            </Button>
            <p className="text-xs text-center text-gray-600">
              All {productIngredients.length} Booker products will be added to your basket
            </p>
          </div>
        )}
      </div>

      {/* Helpful Notes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">💡 Chef's Tips</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• All quantities calculated for commercial kitchen scale ({serves} portions)</li>
          <li>• Bulk pricing automatically applied where available</li>
          <li>• Fresh products delivered next-day from your branch</li>
        </ul>
      </div>
    </div>
  );
}

