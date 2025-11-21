import { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecipeDetailClient } from "./RecipeDetailClient";
import { categoryRecipes } from "@/data/category-recipes";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return categoryRecipes.map((recipe) => ({
    slug: recipe.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const recipe = categoryRecipes.find((r) => r.id === resolvedParams.slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found",
    };
  }

  const useCaseText = recipe.useCase 
    ? recipe.useCase === 'pub-casual' ? 'pub and casual dining' 
      : recipe.useCase === 'fine-dining' ? 'fine dining' 
      : recipe.useCase === 'quick-lunch' ? 'quick lunch service' 
      : 'large events and catering'
    : 'commercial kitchens';
  
  const seasonText = recipe.season || 'year-round';
  const difficultyText = recipe.difficulty || 'moderate';
  const categoryName = recipe.category.toLowerCase();

  return {
    title: `${recipe.title} Recipe | ${categoryName} | Professional Butchery Recipes | Booker Wholesale`,
    description: `${recipe.description} Professional ${categoryName} recipe for ${useCaseText}. ${difficultyText} difficulty. Perfect for ${seasonText} menus. Complete ingredients, instructions, and product links. Scale for 40+ portions.`,
    keywords: [
      recipe.title.toLowerCase(),
      `${recipe.title} recipe`,
      categoryName,
      `${categoryName} recipe`,
      useCaseText,
      difficultyText,
      seasonText,
      "butchery recipe",
      "professional recipe",
      "commercial kitchen recipe",
      "restaurant recipe",
      "chef recipe",
      "Booker recipe",
    ].join(", "),
    openGraph: {
      title: `${recipe.title} Recipe | Booker Wholesale`,
      description: recipe.description,
      images: [recipe.image],
      type: "article",
    },
  };
}

export default async function RecipePage({ params }: Props) {
  const resolvedParams = await params;
  const recipe = categoryRecipes.find((r) => r.id === resolvedParams.slug);

  if (!recipe) {
    notFound();
  }

  return <RecipeDetailClient recipe={recipe} />;
}
