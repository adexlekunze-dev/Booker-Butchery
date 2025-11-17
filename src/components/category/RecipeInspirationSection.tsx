"use client";

import Link from "next/link";
import Image from "next/image";
import { ChefHat, ChevronRight } from "lucide-react";
import { getRecipesForCategory } from "@/data/category-recipes";

type RecipeInspirationSectionProps = {
  category: string;
};

export function RecipeInspirationSection({ category }: RecipeInspirationSectionProps) {
  const recipes = getRecipesForCategory(category);

  if (recipes.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <ChefHat className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Recipe Inspiration
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Delicious recipes. Premium ingredients. Menu inspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Recipe Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                    {recipe.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {recipe.description}
                </p>

                <div className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-colors">
                  <span className="text-sm">View Recipe</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Optional: Link to all recipes */}
        <div className="text-center mt-12">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 text-lg font-semibold text-gray-700 hover:text-orange-600 transition-colors"
          >
            Browse All Recipes
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

