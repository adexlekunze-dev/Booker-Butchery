import { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecipeDetailClient } from "./RecipeDetailClient";
import recipes from "@/data/recipes.json";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const recipe = recipes.find((r) => r.slug === resolvedParams.slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found",
    };
  }

  return {
    title: `${recipe.title} | Butchery Recipes | Booker Wholesale`,
    description: recipe.description,
    keywords: [
      recipe.title,
      recipe.category.toLowerCase(),
      recipe.cuisine,
      recipe.difficulty.toLowerCase(),
      "butchery recipe",
      "professional recipe",
      ...recipe.tags,
    ].join(", "),
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [recipe.image],
      type: "article",
    },
  };
}

export default async function RecipePage({ params }: Props) {
  const resolvedParams = await params;
  const recipe = recipes.find((r) => r.slug === resolvedParams.slug);

  if (!recipe) {
    notFound();
  }

  return <RecipeDetailClient recipe={recipe} />;
}
