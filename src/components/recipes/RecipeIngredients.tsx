"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ShoppingCart, Package, Scale } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RecipeIngredient } from "@/data/category-recipes";
import { getProductBySku } from "@/lib/data/products";
import { getUser } from "@/lib/mock-auth";

interface RecipeIngredientsProps {
  ingredients: RecipeIngredient[];
  serves: number;
  onAddAllToBasket?: () => void;
  onCustomizePortions?: () => void;
}

interface IngredientWithProduct extends RecipeIngredient {
  product?: any;
  calculatedPrice?: number;
  packsNeeded?: number;
}

export function RecipeIngredients({ 
  ingredients, 
  serves, 
  onAddAllToBasket,
  onCustomizePortions 
}: RecipeIngredientsProps) {
  const [ingredientsWithProducts, setIngredientsWithProducts] = useState<IngredientWithProduct[]>([]);

  // Helper function to parse pack_size
  const parsePackSize = (packSize: string | null | undefined): number | null => {
    if (!packSize) return 1;
    const lower = packSize.toLowerCase().trim();
    
    // Check for "Per Kg" or variable weight - these are sold by weight, not by pack
    if (lower.includes('per kg') || lower === 'variable' || lower === '-') {
      return null; // Indicates weight-based pricing
    }
    
    // Try to extract kg (handles "2.5kg", "Av 6kg", etc.)
    const kgMatch = lower.match(/([\d.]+)\s*kg/);
    if (kgMatch) {
      return parseFloat(kgMatch[1]);
    }
    
    // Try to extract grams
    const gMatch = lower.match(/([\d.]+)\s*g/);
    if (gMatch) {
      return parseFloat(gMatch[1]) / 1000;
    }
    
    // Check for pieces/units (no weight) - treat as 1 unit per pack
    if (lower.includes('piece') || lower.includes('unit') || lower.includes('each')) {
      return 1;
    }
    
    return 1; // Default to 1kg if unparseable
  };

  // Convert recipe quantity to packs and calculate price
  const convertQuantityToPacks = (ingredient: RecipeIngredient, product: any): { packs: number; price: number } => {
    const recipeQuantity = ingredient.quantity || 1;
    const recipeUnit = ingredient.unit?.toLowerCase() || '';
    
    // Handle non-weight units (pieces, units, etc.)
    if (!recipeUnit.includes('kg') && !recipeUnit.includes('g') && !recipeUnit.includes('gram')) {
      const packs = Math.ceil(recipeQuantity);
      const bulkPricing = product.bulk_pricing;
      let pricePerPack = product.base_price || 0;
      if (bulkPricing && Array.isArray(bulkPricing)) {
        const applicableTier = bulkPricing
          .sort((a: any, b: any) => b.min_quantity - a.min_quantity)
          .find((tier: any) => packs >= tier.min_quantity);
        if (applicableTier) pricePerPack = applicableTier.price_per_unit;
      }
      return { packs, price: pricePerPack * packs };
    }
    
    // Parse pack size
    const packSizeKg = parsePackSize(product.pack_size);
    
    // If pack_size is null (Per Kg or variable), product is sold by weight
    // For "Per Kg" products: recipe quantity is in kg, price is per kg
    if (packSizeKg === null) {
      // For "Per Kg" products, quantity represents kg needed
      // Price calculation: quantity (kg) × price per kg
      const quantityKg = recipeQuantity; // Already in kg
      const bulkPricing = product.bulk_pricing;
      let pricePerKg = product.base_price || 0;
      
      // For "Per Kg" products, bulk pricing tiers are based on kg quantity
      if (bulkPricing && Array.isArray(bulkPricing)) {
        const applicableTier = bulkPricing
          .sort((a: any, b: any) => b.min_quantity - a.min_quantity)
          .find((tier: any) => quantityKg >= tier.min_quantity);
        if (applicableTier) pricePerKg = applicableTier.price_per_unit;
      }
      
      // Return packs as quantity (for "Per Kg", 1 pack = 1 kg ordered)
      // Price is quantity × price per kg
      return { packs: Math.ceil(quantityKg), price: pricePerKg * quantityKg };
    }
    
    // Convert recipe quantity to kg if needed
    let recipeQuantityKg = recipeQuantity;
    if (recipeUnit.includes('g') || recipeUnit.includes('gram')) {
      recipeQuantityKg = recipeQuantity / 1000;
    }
    
    // Calculate packs needed (always round up to ensure enough product)
    const packs = Math.ceil(recipeQuantityKg / packSizeKg);
    
    // Calculate price with bulk pricing if applicable
    const bulkPricing = product.bulk_pricing;
    let pricePerPack = product.base_price || 0;
    if (bulkPricing && Array.isArray(bulkPricing) && packs > 0) {
      const applicableTier = bulkPricing
        .sort((a: any, b: any) => b.min_quantity - a.min_quantity)
        .find((tier: any) => packs >= tier.min_quantity);
      if (applicableTier) {
        pricePerPack = applicableTier.price_per_unit;
      }
    }
    
    return { packs, price: pricePerPack * packs };
  };

  // Load product data for ingredients with SKUs
  useEffect(() => {
    if (!ingredients || ingredients.length === 0) {
      setIngredientsWithProducts([]);
      return;
    }

    const user = getUser();
    const branchCode = user?.primary_branch_code;
    
    const enriched = ingredients.map(ingredient => {
      if (!ingredient.sku) return ingredient;
      
      const product = getProductBySku(ingredient.sku, branchCode);
      if (!product) {
        console.warn(`Product not found for SKU: ${ingredient.sku} (${ingredient.name})`);
        // Return ingredient without calculatedPrice so it falls back to recipe price
        return ingredient;
      }
      
      try {
        const { packs, price } = convertQuantityToPacks(ingredient, product);
        
        // Ensure price is a valid number
        if (isNaN(price) || price < 0 || !isFinite(price)) {
          console.error(`Invalid price calculated for ${ingredient.name} (${ingredient.sku}): ${price}`, {
            packs,
            product: { pack_size: product.pack_size, base_price: product.base_price }
          });
          return ingredient;
        }
        
        // Debug logging
        if (process.env.NODE_ENV === 'development') {
          console.log(`Recipe ingredient: ${ingredient.name}`, {
            sku: ingredient.sku,
            recipeQuantity: ingredient.quantity,
            recipeUnit: ingredient.unit,
            packSize: product.pack_size,
            packSizeParsed: parsePackSize(product.pack_size),
            packsNeeded: packs,
            calculatedPrice: price,
            basePrice: product.base_price,
            recipePrice: ingredient.price
          });
        }
        
        return {
          ...ingredient,
          product,
          calculatedPrice: price, // Always use calculated price, never fall back to recipe price
          packsNeeded: packs
        };
      } catch (error) {
        console.error(`Error calculating price for ${ingredient.name} (${ingredient.sku}):`, error);
        // Return ingredient without calculatedPrice so it falls back to recipe price
        return ingredient;
      }
    });
    
    setIngredientsWithProducts(enriched);
  }, [ingredients]);

  // Calculate total cost using actual product prices (prioritize calculatedPrice)
  const totalCost = ingredientsWithProducts.reduce((sum, ing) => {
    // For ingredients with SKU, always use calculatedPrice (which includes pack conversion and bulk pricing)
    // For ingredients without SKU, use the recipe price if available
    if (ing.sku && ing.calculatedPrice !== undefined) {
      return sum + ing.calculatedPrice;
    }
    return sum + (ing.price || 0);
  }, 0);
  const hasAllPrices = ingredientsWithProducts.every(ing => {
    // For SKU ingredients, require calculatedPrice; for others, price is optional
    if (ing.sku) {
      return ing.calculatedPrice !== undefined;
    }
    return ing.price !== undefined || ing.calculatedPrice !== undefined;
  });

  // Group ingredients by type (with SKU vs without SKU)
  const productIngredients = ingredientsWithProducts.filter(ing => ing.sku);
  const otherIngredients = ingredientsWithProducts.filter(ing => !ing.sku);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Ingredients</h2>
          <p className="text-xs sm:text-sm text-gray-600">For {serves} portions (commercial scale)</p>
        </div>
        {onCustomizePortions && (
          <button
            onClick={onCustomizePortions}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors self-start sm:self-auto"
          >
            <Scale className="w-4 h-4" />
            <span className="hidden xs:inline">Customize Portions</span>
            <span className="xs:hidden">Customize</span>
          </button>
        )}
      </div>

      {/* Product Ingredients (with SKU) */}
      {productIngredients.length > 0 && (
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            Booker Products
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {productIngredients.map((ingredient, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 rounded-lg p-3 sm:p-4 hover:border-primary transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base text-gray-900 break-words">
                          {ingredient.product?.name || ingredient.name}
                        </h4>
                        {(ingredient.product?.brand || ingredient.brand) && (
                          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                            {ingredient.product?.brand || ingredient.brand}
                          </p>
                        )}
                        {ingredient.sku && (
                          <p className="text-xs text-gray-500 mt-1">SKU: {ingredient.sku}</p>
                        )}
                        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="text-gray-700">
                            <span className="font-medium">Quantity:</span> {ingredient.quantity} {ingredient.unit}
                            {ingredient.packsNeeded && ingredient.packsNeeded > 1 && (
                              <span className="text-gray-500 ml-1">
                                ({ingredient.packsNeeded} {ingredient.product?.unit || 'packs'})
                              </span>
                            )}
                          </span>
                          {ingredient.sku ? (
                            // For ingredients with SKU, always try to show calculated price
                            ingredient.calculatedPrice !== undefined && !isNaN(ingredient.calculatedPrice) ? (
                              <span className="text-primary font-semibold">
                                £{ingredient.calculatedPrice.toFixed(2)}
                                {ingredient.packsNeeded && ingredient.packsNeeded > 1 && (
                                  <span className="text-xs text-gray-500 ml-1">
                                    ({ingredient.packsNeeded} packs)
                                  </span>
                                )}
                              </span>
                            ) : ingredient.price ? (
                              // Fallback to recipe price if calculation failed
                              <span className="text-primary font-semibold">
                                £{ingredient.price.toFixed(2)}
                                <span className="text-xs text-gray-400 ml-1">(estimated)</span>
                              </span>
                            ) : null
                          ) : ingredient.price ? (
                            // Ingredients without SKU use recipe price
                            <span className="text-primary font-semibold">
                              £{ingredient.price.toFixed(2)}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  {ingredient.sku && (
                    <Link
                      href={`/products/${ingredient.sku}`}
                      className="text-xs sm:text-sm text-primary hover:text-primary/80 font-medium whitespace-nowrap self-start sm:self-auto"
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
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Additional Ingredients</h3>
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <ul className="space-y-2">
              {otherIngredients.map((ingredient, idx) => (
                <li key={idx} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
                  <span className="text-primary mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                  <span className="break-words">
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
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Cost</h3>
            <p className="text-xs sm:text-sm text-gray-600">For {serves} portions</p>
          </div>
          {hasAllPrices ? (
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                £{totalCost.toFixed(2)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                £{(totalCost / serves).toFixed(2)} per portion
              </div>
            </div>
          ) : (
            <div className="text-left sm:text-right">
              <div className="text-xl sm:text-2xl font-bold text-gray-600">
                Contact for pricing
              </div>
            </div>
          )}
        </div>

        {onAddAllToBasket && productIngredients.length > 0 && (
          <div className="space-y-2 sm:space-y-3">
            <Button
              variant="primary"
              size="lg"
              block
              icon={<ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />}
              onClick={onAddAllToBasket}
            >
              <span className="text-sm sm:text-base">Add All Ingredients to Basket</span>
            </Button>
            <p className="text-xs text-center text-gray-600">
              All {productIngredients.length} Booker products will be added to your basket
            </p>
          </div>
        )}
      </div>

      {/* Helpful Notes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
        <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">💡 Chef's Tips</h4>
        <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
          <li>• All quantities calculated for commercial kitchen scale ({serves} portions)</li>
          <li>• Bulk pricing automatically applied where available</li>
          <li>• Fresh products delivered next-day from your branch</li>
        </ul>
      </div>
    </div>
  );
}

