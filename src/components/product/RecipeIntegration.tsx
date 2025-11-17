"use client";

import Link from "next/link";
import Image from "next/image";
import { ChefHat } from "lucide-react";

type Recipe = {
  id: string;
  title: string;
  image: string;
  link?: string;
};

type RecipeIntegrationProps = {
  recipes: Recipe[];
};

export function RecipeIntegration({ recipes }: RecipeIntegrationProps) {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  // Show up to 3 recipes
  const displayRecipes = recipes.slice(0, 3);

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <ChefHat className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900">
          Recipes Using This Product
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
        {displayRecipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={recipe.link || "#"}
            className="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="relative aspect-video bg-gray-200 overflow-hidden">
              {recipe.image ? (
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <ChefHat className="w-12 h-12" strokeWidth={1.5} />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {recipe.title}
              </h3>
              <span className="text-sm text-primary font-medium">
                View Recipe →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
