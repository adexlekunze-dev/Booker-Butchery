"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock, Users, ChefHat, TrendingUp, ArrowLeft,
  CheckCircle2, Lightbulb, Download
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSession } from "@/lib/mock-auth";
import { CategoryRecipe, RecipeIngredient } from "@/data/category-recipes";
import { RecipeIngredients } from "@/components/recipes/RecipeIngredients";
import { RecipePortionCalculator } from "@/components/recipes/RecipePortionCalculator";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { getRecipeDetailPageSEO } from "@/data/recipes-seo-content";

export function RecipeDetailClient({ recipe }: { recipe: CategoryRecipe }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPortionModalOpen, setIsPortionModalOpen] = useState(false);

  useEffect(() => {
    const session = getSession();
    setIsAuthenticated(!!session?.user);

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

  // Helper function to parse pack_size and convert weight to packs
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

  // Convert recipe quantity to basket quantity (packs)
  const convertQuantityToPacks = (ingredient: any, product: any): number => {
    const recipeQuantity = ingredient.quantity || 1;
    const recipeUnit = ingredient.unit?.toLowerCase() || '';
    
    // If unit is not weight-based (pieces, units, etc.), use quantity directly
    if (!recipeUnit.includes('kg') && !recipeUnit.includes('g') && !recipeUnit.includes('gram')) {
      return Math.ceil(recipeQuantity);
    }
    
    // Parse product pack_size
    const packSizeKg = parsePackSize(product.pack_size);
    
    // If pack_size is null (Per Kg or variable), use quantity directly (it's already in packs)
    if (packSizeKg === null) {
      return Math.ceil(recipeQuantity);
    }
    
    // Convert recipe quantity to kg if needed
    let recipeQuantityKg = recipeQuantity;
    if (recipeUnit.includes('g') || recipeUnit.includes('gram')) {
      recipeQuantityKg = recipeQuantity / 1000;
    }
    
    // Calculate packs needed
    const packsNeeded = Math.ceil(recipeQuantityKg / packSizeKg);
    return packsNeeded;
  };

  const handleAddAllToBasket = async () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    if (!recipe.ingredients || recipe.ingredients.length === 0) {
      alert("No ingredients available for this recipe.");
      return;
    }

    const ingredientsWithSku = recipe.ingredients.filter(ing => ing.sku);

    if (ingredientsWithSku.length === 0) {
      alert("No ingredients available for online ordering.");
      return;
    }

    try {
      const { addToBasket } = await import("@/lib/basket-localstorage");
      const { getProductBySku } = await import("@/lib/data/products");
      const { getUser } = await import("@/lib/mock-auth");

      const user = getUser();
      const branchCode = user?.primary_branch_code;

      let successCount = 0;
      const failedIngredients: Array<{ name: string; sku: string; reason: string }> = [];
      const successfulProducts: Array<{ name: string; price: number; quantity: number; packs: number }> = [];

      for (const ingredient of ingredientsWithSku) {
        if (!ingredient.sku) {
          continue;
        }

        // First, validate the product exists
        const product = getProductBySku(ingredient.sku, branchCode);
        if (!product) {
          failedIngredients.push({
            name: ingredient.name,
            sku: ingredient.sku,
            reason: 'Product not found in catalog'
          });
          continue;
        }

        // Check if product is available
        if (branchCode && product.availability && !product.availability.in_stock) {
          failedIngredients.push({
            name: ingredient.name,
            sku: ingredient.sku,
            reason: 'Out of stock at your branch'
          });
          continue;
        }

        // Convert recipe quantity to packs
        const packsNeeded = convertQuantityToPacks(ingredient, product);

        // Calculate price using actual product price and bulk pricing if applicable
        const bulkPricing = product.bulk_pricing;
        let pricePerPack = product.base_price;
        
        if (bulkPricing && Array.isArray(bulkPricing)) {
          const applicableTier = bulkPricing
            .sort((a: any, b: any) => b.min_quantity - a.min_quantity)
            .find((tier: any) => packsNeeded >= tier.min_quantity);
          
          if (applicableTier) {
            pricePerPack = applicableTier.price_per_unit;
          }
        }
        
        const totalPrice = pricePerPack * packsNeeded;

        // Try to add to basket with correct quantity (packs)
        const result = addToBasket(ingredient.sku, packsNeeded, { method: "delivery", branch_code: branchCode });
        if (result.success) {
          successCount++;
          // Track successful products with actual product price
          successfulProducts.push({
            name: product.name, // Use actual product name from catalog
            price: totalPrice,
            quantity: ingredient.quantity, // Keep original recipe quantity for display
            packs: packsNeeded
          });
        } else {
          failedIngredients.push({
            name: ingredient.name,
            sku: ingredient.sku,
            reason: result.error || 'Failed to add to basket'
          });
        }
      }

      // Show detailed feedback
      if (successCount > 0) {
        window.dispatchEvent(new Event('storage'));
        
        let message = `✓ Added ${successCount} ingredient${successCount > 1 ? 's' : ''} to basket!`;
        
        if (failedIngredients.length > 0) {
          message += `\n\n⚠️ Could not add ${failedIngredients.length} ingredient${failedIngredients.length > 1 ? 's' : ''}:`;
          failedIngredients.slice(0, 3).forEach(failed => {
            message += `\n  • ${failed.name} (${failed.reason})`;
          });
          if (failedIngredients.length > 3) {
            message += `\n  ... and ${failedIngredients.length - 3} more`;
          }
        }
        
        // Calculate total using actual product prices from cart
        const totalPrice = successfulProducts.reduce((sum, item) => sum + item.price, 0);
        
        if (totalPrice > 0) {
          message += `\n\nTotal: £${totalPrice.toFixed(2)}`;
        }
        
        alert(message);
      } else {
        // All failed
        let errorMessage = `Could not add any ingredients to basket.\n\nIssues found:`;
        failedIngredients.forEach(failed => {
          errorMessage += `\n  • ${failed.name}: ${failed.reason}`;
        });
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error adding ingredients:", error);
      alert(`Failed to add ingredients. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleDownloadPDF = () => {
    alert("PDF download feature coming soon!");
    // TODO: Implement PDF generation
  };

  const handleAddScaledIngredientsToBasket = async (adjustedIngredients: RecipeIngredient[]) => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    const ingredientsWithSku = adjustedIngredients.filter(ing => ing.sku);

    if (ingredientsWithSku.length === 0) {
      alert("No ingredients available for online ordering.");
      return;
    }

    try {
      const { addToBasket } = await import("@/lib/basket-localstorage");
      const { getProductBySku } = await import("@/lib/data/products");
      const { getUser } = await import("@/lib/mock-auth");

      const user = getUser();
      const branchCode = user?.primary_branch_code;

      let successCount = 0;
      const failedIngredients: Array<{ name: string; sku: string; reason: string }> = [];
      const successfulProducts: Array<{ name: string; price: number; quantity: number; packs: number }> = [];

      for (const ingredient of ingredientsWithSku) {
        if (!ingredient.sku) {
          continue;
        }

        // First, validate the product exists
        const product = getProductBySku(ingredient.sku, branchCode);
        if (!product) {
          failedIngredients.push({
            name: ingredient.name,
            sku: ingredient.sku,
            reason: 'Product not found in catalog'
          });
          continue;
        }

        // Check if product is available
        if (branchCode && product.availability && !product.availability.in_stock) {
          failedIngredients.push({
            name: ingredient.name,
            sku: ingredient.sku,
            reason: 'Out of stock at your branch'
          });
          continue;
        }

        // Convert adjusted recipe quantity to packs
        const packsNeeded = convertQuantityToPacks(ingredient, product);

        // Calculate price using actual product price and bulk pricing if applicable
        const bulkPricing = product.bulk_pricing;
        let pricePerPack = product.base_price;
        
        if (bulkPricing && Array.isArray(bulkPricing)) {
          const applicableTier = bulkPricing
            .sort((a: any, b: any) => b.min_quantity - a.min_quantity)
            .find((tier: any) => packsNeeded >= tier.min_quantity);
          
          if (applicableTier) {
            pricePerPack = applicableTier.price_per_unit;
          }
        }
        
        const totalPrice = pricePerPack * packsNeeded;

        // Try to add to basket with correct quantity (packs)
        const result = addToBasket(ingredient.sku, packsNeeded, { method: "delivery", branch_code: branchCode });
        if (result.success) {
          successCount++;
          // Track successful products with actual product price
          successfulProducts.push({
            name: product.name, // Use actual product name from catalog
            price: totalPrice,
            quantity: ingredient.quantity, // Keep original recipe quantity for display
            packs: packsNeeded
          });
        } else {
          failedIngredients.push({
            name: ingredient.name,
            sku: ingredient.sku,
            reason: result.error || 'Failed to add to basket'
          });
        }
      }

      // Show detailed feedback
      if (successCount > 0) {
        window.dispatchEvent(new Event('storage'));
        
        let message = `✓ Added ${successCount} scaled ingredient${successCount > 1 ? 's' : ''} to basket!`;
        
        if (failedIngredients.length > 0) {
          message += `\n\n⚠️ Could not add ${failedIngredients.length} ingredient${failedIngredients.length > 1 ? 's' : ''}:`;
          failedIngredients.slice(0, 3).forEach(failed => {
            message += `\n  • ${failed.name} (${failed.reason})`;
          });
          if (failedIngredients.length > 3) {
            message += `\n  ... and ${failedIngredients.length - 3} more`;
          }
        }
        
        // Calculate total using actual product prices from cart
        const totalPrice = successfulProducts.reduce((sum, item) => sum + item.price, 0);
        
        if (totalPrice > 0) {
          message += `\n\nTotal: £${totalPrice.toFixed(2)}`;
        }
        
        alert(message);
      } else {
        // All failed
        let errorMessage = `Could not add any ingredients to basket.\n\nIssues found:`;
        failedIngredients.forEach(failed => {
          errorMessage += `\n  • ${failed.name}: ${failed.reason}`;
        });
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error adding ingredients:", error);
      alert(`Failed to add ingredients. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const difficultyColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800"
  };

  const useCaseLabels = {
    'pub-casual': '🏪 Pub & Casual Dining',
    'fine-dining': '🍽️ Fine Dining',
    'quick-lunch': '⚡ Quick Lunch',
    'large-events': '🎉 Large Events'
  };

  const seasonLabels = {
    'spring': '🌸 Spring',
    'summer': '☀️ Summer',
    'autumn': '🍂 Autumn',
    'winter': '❄️ Winter'
  };

  const hasFullDetails = recipe.ingredients && recipe.ingredients.length > 0 && recipe.instructions && recipe.instructions.length > 0;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:left-12 z-10">
          <Link
            href="/recipes"
            className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-white/90 hover:bg-white rounded-lg shadow-lg transition-colors text-gray-900 font-medium text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Recipes</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              {recipe.difficulty && (
                <span className={`px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold ${difficultyColors[recipe.difficulty as keyof typeof difficultyColors]}`}>
                  {recipe.difficulty}
                </span>
              )}
              {recipe.useCase && (
                <span className="px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold bg-white/20 text-white backdrop-blur">
                  {useCaseLabels[recipe.useCase]}
                </span>
              )}
              {recipe.season && (
                <span className="px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold bg-white/20 text-white backdrop-blur">
                  {seasonLabels[recipe.season]}
                </span>
              )}
              <span className="px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold bg-white/20 text-white backdrop-blur">
                {recipe.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg leading-tight" style={{ color: '#ffffff' }}>
              {recipe.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl drop-shadow-md" style={{ color: '#ffffff' }}>
              {recipe.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {hasFullDetails ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column - Recipe Details */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {recipe.cookTime && (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-gray-600">Cook Time</div>
                        <div className="font-semibold text-sm sm:text-base text-gray-900 truncate">{recipe.cookTime}</div>
                      </div>
                    </div>
                  )}
                  {recipe.serves && (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-gray-600">Serves</div>
                        <div className="font-semibold text-sm sm:text-base text-gray-900">{recipe.serves} portions</div>
                      </div>
                    </div>
                  )}
                  {recipe.difficulty && (
                    <div className="flex items-center gap-2 sm:gap-3 col-span-2 md:col-span-1">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-gray-600">Difficulty</div>
                        <div className="font-semibold text-sm sm:text-base text-gray-900">{recipe.difficulty}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Instructions */}
              {recipe.instructions && recipe.instructions.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Instructions</h2>
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors self-start sm:self-auto"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden xs:inline">Download PDF</span>
                      <span className="xs:hidden">PDF</span>
                    </button>
                  </div>
                  <ol className="space-y-4 sm:space-y-6">
                    {recipe.instructions.map((step, idx) => (
                      <li key={idx} className="flex gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                          {idx + 1}
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed pt-0.5 sm:pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Chef's Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-1" />
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-blue-900 mb-2">Chef's Tips</h3>
                    <ul className="text-sm sm:text-base text-blue-800 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 sm:mt-1" />
                        <span>All ingredients available for next-day delivery from your branch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 sm:mt-1" />
                        <span>Bulk pricing automatically applied on large orders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 sm:mt-1" />
                        <span>Scale portions up or down based on your service requirements</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Ingredients */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-4">
                {recipe.ingredients && (
                  <RecipeIngredients
                    ingredients={recipe.ingredients}
                    serves={recipe.serves || 40}
                    onAddAllToBasket={handleAddAllToBasket}
                    onCustomizePortions={() => setIsPortionModalOpen(true)}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          // Placeholder content for recipes without full details
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto">
              <ChefHat className="w-12 h-12 sm:w-16 sm:h-16 text-orange-600 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Full Recipe Coming Soon
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8">
                We're working on adding detailed ingredients, instructions, and shopping integration for this recipe. 
                Check back soon or browse our other featured recipes with full details.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/recipes">
                  <Button variant="primary">
                    Browse All Recipes
                  </Button>
                </Link>
                <Link href="/recipes?filter=featured">
                  <Button variant="secondary">
                    View Featured Recipes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <SEOContentSection content={getRecipeDetailPageSEO(recipe)} />

      {/* Portion Calculator Modal */}
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <RecipePortionCalculator
          isOpen={isPortionModalOpen}
          onClose={() => setIsPortionModalOpen(false)}
          baseServes={recipe.serves || 40}
          ingredients={recipe.ingredients}
          recipeName={recipe.title}
          onAddToBasket={handleAddScaledIngredientsToBasket}
        />
      )}
    </main>
  );
}
