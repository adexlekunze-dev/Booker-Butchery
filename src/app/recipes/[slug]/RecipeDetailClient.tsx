"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock, Users, ChefHat, TrendingUp, ShoppingCart,
  CheckCircle2, Lightbulb, Utensils, Star, Plus
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSession } from "@/lib/mock-auth";

type Recipe = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  cuisine: string;
  difficulty: string;
  prep_time: string;
  cook_time: string;
  total_time: string;
  serves: number;
  chef_notes: string;
  video_url: string | null;
  ingredients: Array<{
    name: string;
    quantity: string;
    sku: string | null;
    price: number;
    notes: string | null;
  }>;
  instructions: string[];
  tips: string[];
  nutrition_per_serving: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  tags: string[];
};

export function RecipeDetailClient({ recipe }: { recipe: Recipe }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [addedIngredients, setAddedIngredients] = useState<Set<string>>(new Set());
  const [servings, setServings] = useState(recipe.serves);

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

  // Calculate ingredient quantities based on servings
  const multiplier = servings / recipe.serves;
  const adjustedIngredients = recipe.ingredients.map(ing => ({
    ...ing,
    adjustedPrice: ing.price * multiplier
  }));

  const totalCost = adjustedIngredients.reduce((sum, ing) => sum + ing.adjustedPrice, 0);
  const costPerServing = totalCost / servings;

  const handleAddIngredient = async (sku: string | null, name: string) => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    if (!sku) {
      alert(`${name} is not available for online ordering. Please add manually.`);
      return;
    }

    try {
      const { addToBasket } = await import("@/lib/basket-localstorage");
      const { getUser } = await import("@/lib/mock-auth");

      const user = getUser();
      const branchCode = user?.primary_branch_code;

      const result = addToBasket(sku, 1, { method: "delivery", branch_code: branchCode });

      if (result.success) {
        setAddedIngredients(prev => new Set(prev).add(sku));
        window.dispatchEvent(new Event('storage'));

        setTimeout(() => {
          setAddedIngredients(prev => {
            const updated = new Set(prev);
            updated.delete(sku);
            return updated;
          });
        }, 2000);
      } else {
        alert(result.error || "Failed to add to basket");
      }
    } catch (error) {
      console.error("Error adding to basket:", error);
      alert("Failed to add to basket. Please try again.");
    }
  };

  const handleAddAllIngredients = async () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
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
        alert(`Added ${successCount} ingredients to basket!`);
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

  // Generate Recipe Schema for SEO
  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "description": recipe.description,
    "image": recipe.image,
    "author": {
      "@type": "Organization",
      "name": "Booker Wholesale"
    },
    "prepTime": `PT${recipe.prep_time.replace(/\s/g, '').toUpperCase()}`,
    "cookTime": `PT${recipe.cook_time.replace(/\s/g, '').toUpperCase()}`,
    "totalTime": `PT${recipe.total_time.replace(/\s/g, '').toUpperCase()}`,
    "recipeYield": `${recipe.serves} servings`,
    "recipeCategory": recipe.category,
    "recipeCuisine": recipe.cuisine,
    "recipeIngredient": recipe.ingredients.map(ing => `${ing.quantity} ${ing.name}`),
    "recipeInstructions": recipe.instructions.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "text": step
    })),
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${recipe.nutrition_per_serving.calories} calories`,
      "proteinContent": recipe.nutrition_per_serving.protein,
      "carbohydrateContent": recipe.nutrition_per_serving.carbs,
      "fatContent": recipe.nutrition_per_serving.fat
    },
    "keywords": recipe.tags.join(", ")
  };

  return (
    <>
      {/* Recipe Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />

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

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[recipe.difficulty as keyof typeof difficultyColors]}`}>
                  {recipe.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white backdrop-blur">
                  {recipe.cuisine}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white backdrop-blur">
                  {recipe.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {recipe.title}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl">
                {recipe.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Recipe Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <div>
                      <div className="text-sm text-gray-600">Prep Time</div>
                      <div className="font-semibold text-gray-900">{recipe.prep_time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Utensils className="w-6 h-6 text-primary" />
                    <div>
                      <div className="text-sm text-gray-600">Cook Time</div>
                      <div className="font-semibold text-gray-900">{recipe.cook_time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-primary" />
                    <div>
                      <div className="text-sm text-gray-600">Serves</div>
                      <div className="font-semibold text-gray-900">{recipe.serves}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <div>
                      <div className="text-sm text-gray-600">Difficulty</div>
                      <div className="font-semibold text-gray-900">{recipe.difficulty}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chef's Notes */}
              {recipe.chef_notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <ChefHat className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-blue-900 mb-2">Chef's Notes</h3>
                      <p className="text-blue-800">{recipe.chef_notes}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
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

              {/* Tips */}
              {recipe.tips.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Lightbulb className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-2xl font-bold text-gray-900">Pro Tips</h2>
                  </div>
                  <ul className="space-y-3">
                    {recipe.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nutrition */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Nutrition per Serving</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{recipe.nutrition_per_serving.calories}</div>
                    <div className="text-sm text-gray-600">Calories</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{recipe.nutrition_per_serving.protein}</div>
                    <div className="text-sm text-gray-600">Protein</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{recipe.nutrition_per_serving.carbs}</div>
                    <div className="text-sm text-gray-600">Carbs</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{recipe.nutrition_per_serving.fat}</div>
                    <div className="text-sm text-gray-600">Fat</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Ingredients & Shopping */}
            <div className="lg:col-span-1 space-y-6">
              {/* Servings Adjuster */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                <h3 className="font-bold text-gray-900 mb-4">Adjust Servings</h3>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{servings}</div>
                    <div className="text-sm text-gray-600">servings</div>
                  </div>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Cost Calculator */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">Total Cost:</span>
                    <span className="text-2xl font-bold text-blue-600">£{totalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Cost per Serving:</span>
                    <span className="font-semibold text-gray-900">£{costPerServing.toFixed(2)}</span>
                  </div>
                </div>

                {/* Add All Button */}
                {isAuthenticated ? (
                  <Button
                    variant="primary"
                    block
                    icon={<ShoppingCart className="w-5 h-5" />}
                    onClick={handleAddAllIngredients}
                    className="mb-4"
                  >
                    Add Full Recipe to Basket
                  </Button>
                ) : (
                  <Link href="/register">
                    <Button variant="primary" block className="mb-4">
                      Become a Member to Order
                    </Button>
                  </Link>
                )}

                {/* Ingredients List */}
                <h3 className="font-bold text-gray-900 mb-4">Ingredients</h3>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {adjustedIngredients.map((ingredient, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-3 pb-3 border-b border-gray-200 last:border-0"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{ingredient.name}</div>
                        <div className="text-sm text-gray-600">{ingredient.quantity}</div>
                        {ingredient.notes && (
                          <div className="text-xs text-gray-500 italic">{ingredient.notes}</div>
                        )}
                        {ingredient.sku && (
                          <Link
                            href={`/products/${ingredient.sku}`}
                            className="text-xs text-primary hover:underline"
                          >
                            View product →
                          </Link>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="text-sm font-semibold text-gray-900">
                          £{ingredient.adjustedPrice.toFixed(2)}
                        </div>
                        {ingredient.sku && isAuthenticated && (
                          <button
                            onClick={() => handleAddIngredient(ingredient.sku, ingredient.name)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              addedIngredients.has(ingredient.sku)
                                ? "bg-green-500 text-white"
                                : "bg-primary hover:bg-primary-dark text-white"
                            }`}
                            title={addedIngredients.has(ingredient.sku) ? "Added!" : "Add to basket"}
                          >
                            {addedIngredients.has(ingredient.sku) ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
