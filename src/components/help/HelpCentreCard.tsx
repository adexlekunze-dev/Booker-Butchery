import Link from "next/link";
import { HelpArticle } from "@/data/helpArticles";
import { getCategoryById } from "@/data/helpArticles";

interface HelpCentreCardProps {
  article: HelpArticle;
}

export function HelpCentreCard({ article }: HelpCentreCardProps) {
  const category = getCategoryById(article.category);

  return (
    <Link
      href={`/help/articles/${article.slug}`}
      className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 hover:border-primary"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {category?.name || article.category}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {article.title}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-2">
        {article.excerpt}
      </p>
      <div className="mt-4 text-primary text-sm font-medium">
        Read more →
      </div>
    </Link>
  );
}


