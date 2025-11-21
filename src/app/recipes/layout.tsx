import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Butchery Recipes | Chef Inspiration | Booker Wholesale",
  description: "Professional recipes for beef, pork, lamb, chicken, and sausages. From classic roasts to gourmet creations. Perfect for your menu. Browse 80+ recipes with ingredients, instructions, and product links.",
  keywords: "butchery recipes, beef recipes, pork recipes, lamb recipes, chicken recipes, chef recipes, professional cooking, restaurant recipes, commercial kitchen recipes, pub recipes, fine dining recipes, catering recipes",
  openGraph: {
    title: "Professional Butchery Recipes | Booker Wholesale",
    description: "Professional recipes for beef, pork, lamb, chicken, and sausages. From classic roasts to gourmet creations.",
    type: "website",
  },
};

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

