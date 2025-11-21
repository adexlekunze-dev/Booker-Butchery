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
      const { getUser } = await import("@/lib/mock-auth");

      const user = getUser();
      const branchCode = user?.primary_branch_code;

      let successCount = 0;

      for (const ingredient of ingredientsWithSku) {
        if (ingredient.sku) {
          const result = addToBasket(ingredient.sku, 1, { method: "delivery", branch_code: branchCode });
          if (result.success) {
            successCount++;
          }
        }
      }

      if (successCount > 0) {
        window.dispatchEvent(new Event('storage'));
        alert(`✓ Added ${successCount} ingredient${successCount > 1 ? 's' : ''} to basket! Total: £${recipe.ingredients?.reduce((sum, ing) => sum + (ing.price || 0), 0).toFixed(2)}`);
      }
    } catch (error) {
      console.error("Error adding ingredients:", error);
      alert("Failed to add ingredients. Please try again.");
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
      const { getUser } = await import("@/lib/mock-auth");

      const user = getUser();
      const branchCode = user?.primary_branch_code;

      let successCount = 0;

      for (const ingredient of ingredientsWithSku) {
        if (ingredient.sku) {
          const result = addToBasket(ingredient.sku, 1, { method: "delivery", branch_code: branchCode });
          if (result.success) {
            successCount++;
          }
        }
      }

      if (successCount > 0) {
        window.dispatchEvent(new Event('storage'));
        alert(`✓ Added ${successCount} scaled ingredient${successCount > 1 ? 's' : ''} to basket! Total: £${adjustedIngredients.reduce((sum, ing) => sum + (ing.price || 0), 0).toFixed(2)}`);
      }
    } catch (error) {
      console.error("Error adding ingredients:", error);
      alert("Failed to add ingredients. Please try again.");
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
      <div className="relative h-[400px] md:h-[500px] w-full">
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
        <div className="absolute top-6 left-4 md:left-12 z-10">
          <Link
            href="/recipes"
            className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white rounded-lg shadow-lg transition-colors text-gray-900 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Recipes</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {recipe.difficulty && (
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[recipe.difficulty as keyof typeof difficultyColors]}`}>
                  {recipe.difficulty}
                </span>
              )}
              {recipe.useCase && (
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white backdrop-blur">
                  {useCaseLabels[recipe.useCase]}
                </span>
              )}
              {recipe.season && (
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white backdrop-blur">
                  {seasonLabels[recipe.season]}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white backdrop-blur">
                {recipe.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg" style={{ color: '#ffffff' }}>
              {recipe.title}
            </h1>
            <p className="text-xl text-white max-w-3xl drop-shadow-md" style={{ color: '#ffffff' }}>
              {recipe.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {hasFullDetails ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Recipe Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {recipe.cookTime && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-6 h-6 text-primary" />
                      <div>
                        <div className="text-sm text-gray-600">Cook Time</div>
                        <div className="font-semibold text-gray-900">{recipe.cookTime}</div>
                      </div>
                    </div>
                  )}
                  {recipe.serves && (
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-primary" />
                      <div>
                        <div className="text-sm text-gray-600">Serves</div>
                        <div className="font-semibold text-gray-900">{recipe.serves} portions</div>
                      </div>
                    </div>
                  )}
                  {recipe.difficulty && (
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-primary" />
                      <div>
                        <div className="text-sm text-gray-600">Difficulty</div>
                        <div className="font-semibold text-gray-900">{recipe.difficulty}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Instructions */}
              {recipe.instructions && recipe.instructions.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Instructions</h2>
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                  <ol className="space-y-6">
                    {recipe.instructions.map((step, idx) => (
                      <li key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Chef's Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">Chef's Tips</h3>
                    <ul className="text-blue-800 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-1" />
                        <span>All ingredients available for next-day delivery from your branch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-1" />
                        <span>Bulk pricing automatically applied on large orders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-1" />
                        <span>Scale portions up or down based on your service requirements</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Ingredients */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:sticky lg:top-4">
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="text-center max-w-2xl mx-auto">
              <ChefHat className="w-16 h-16 text-orange-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Full Recipe Coming Soon
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We're working on adding detailed ingredients, instructions, and shopping integration for this recipe. 
                Check back soon or browse our other featured recipes with full details.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
