"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getArticleBySlug, getAllArticles, getCategoryById } from "@/data/helpArticles";
import { ArticleContent } from "@/components/help/ArticleContent";
import { HelpCentreCard } from "@/components/help/HelpCentreCard";
import { notFound } from "next/navigation";

export function ArticleDetailClient({ slug }: { slug: string }) {
  const [article, setArticle] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [categoryArticles, setCategoryArticles] = useState<any[]>([]);

  useEffect(() => {
    const foundArticle = getArticleBySlug(slug);
    
    if (!foundArticle) {
      return;
    }

    setArticle(foundArticle);
    
    const foundCategory = getCategoryById(foundArticle.category);
    setCategory(foundCategory);

    const allArticles = getAllArticles();
    
    // Get related articles
    const related = foundArticle.relatedSlugs
      ? foundArticle.relatedSlugs
          .map((relatedSlug: string) => allArticles.find((a) => a.slug === relatedSlug))
          .filter((a): a is NonNullable<typeof a> => a !== undefined)
      : [];
    setRelatedArticles(related);

    // Get other articles from the same category
    const fromCategory = allArticles
      .filter(
        (a) =>
          a.category === foundArticle.category && a.slug !== foundArticle.slug
      )
      .slice(0, 3);
    setCategoryArticles(fromCategory);
  }, [slug]);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link href="/help" className="hover:text-primary">
                Help Centre
              </Link>
            </li>
            <li>/</li>
            {category && (
              <>
                <li>
                  <Link
                    href={`/help?category=${category.id}`}
                    className="hover:text-primary"
                  >
                    {category.name}
                  </Link>
                </li>
                <li>/</li>
              </>
            )}
            <li className="text-gray-900">{article.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-gray-600">{article.description}</p>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <ArticleContent article={article} />
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedArticles.map((relatedArticle) => (
                <HelpCentreCard
                  key={relatedArticle.slug}
                  article={relatedArticle}
                />
              ))}
            </div>
          </div>
        )}

        {/* More from Category */}
        {categoryArticles.length > 0 && category && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              More from {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryArticles.map((categoryArticle) => (
                <HelpCentreCard
                  key={categoryArticle.slug}
                  article={categoryArticle}
                />
              ))}
            </div>
          </div>
        )}

        {/* Back to Help Centre */}
        <div className="mt-8 text-center">
          <Link
            href="/help"
            className="text-primary hover:underline"
          >
            ← Back to Help Centre
          </Link>
        </div>
      </div>
    </div>
  );
}

