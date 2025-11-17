import { ArticleDetailClient } from "./ArticleDetailClient";
import { articles } from "@/data/helpArticles";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticleDetailClient slug={slug} />;
}
