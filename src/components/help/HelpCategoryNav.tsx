import Link from "next/link";
import { categories } from "@/data/helpArticles";
import { getArticlesByCategory } from "@/data/helpArticles";

export function HelpCategoryNav() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const articles = getArticlesByCategory(category.id);
        return (
          <Link
            key={category.id}
            href={`/help?category=${category.id}`}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-primary group"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {category.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {articles.length} {articles.length === 1 ? "article" : "articles"}
              </span>
              <span className="text-primary text-sm font-medium group-hover:underline">
                View all →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}


