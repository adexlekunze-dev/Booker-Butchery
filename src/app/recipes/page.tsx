"use client";

import { useState } from "react";
import { categoryRecipes } from "@/data/category-recipes";
import Image from "next/image";
import Link from "next/link";
import { ChefHat, ChevronRight } from "lucide-react";
import { RecipeFilterTabs } from "@/components/recipes/RecipeFilterTabs";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { getRecipesLandingPageSEO } from "@/data/recipes-seo-content";

export default function RecipesPage() {
  const [filteredRecipes, setFilteredRecipes] = useState(categoryRecipes);
  const [activeFilter, setActiveFilter] = useState("All Recipes");

  const handleFilterChange = (recipes: typeof categoryRecipes) => {
    setFilteredRecipes(recipes);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ChefHat className="w-10 h-10 text-orange-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Butchery Recipe Collection
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional recipes showcasing premium beef, pork, lamb, chicken, and sausages. From classic roasts to gourmet creations for your menu.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecipeFilterTabs recipes={categoryRecipes} onFilterChange={handleFilterChange} />
        </div>
      </section>

      {/* Results Count */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700">
            Showing <span className="font-semibold">{filteredRecipes.length}</span> recipe{filteredRecipes.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={recipe.link}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-orange-500 transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Recipe Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg line-clamp-2" style={{ color: '#FFFFFF' }}>
                      {recipe.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge and Difficulty */}
                  <div className="mb-3 flex items-center gap-2 flex-wrap">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-50 rounded-full">
                      {recipe.category}
                    </span>
                    {recipe.difficulty && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
                        {recipe.difficulty}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  {/* Cooking Info */}
                  {(recipe.cookTime || recipe.servings) && (
                    <div className="mb-4 flex gap-4 text-xs text-gray-500">
                      {recipe.cookTime && (
                        <div>
                          <span className="font-semibold">Time:</span> {recipe.cookTime}
                        </div>
                      )}
                      {recipe.servings && (
                        <div>
                          <span className="font-semibold">Serves:</span> {recipe.servings}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-colors">
                    <span className="text-sm">View Recipe</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          ) : (
            <div className="text-center py-16">
              <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No recipes found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more recipes.</p>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContentSection content={getRecipesLandingPageSEO()} />
    </main>
  );
}


