"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { HelpCategoryNav } from "@/components/help/HelpCategoryNav";
import { HelpCentreCard } from "@/components/help/HelpCentreCard";
import { getAllArticles, getArticlesByCategory, type HelpCategory } from "@/data/helpArticles";
import { useSearchParams } from "next/navigation";

function HelpContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [articles, setArticles] = useState(getAllArticles());

  const isValidHelpCategory = (category: string): category is HelpCategory => {
    const validCategories: HelpCategory[] = [
      "getting-started",
      "ordering",
      "delivery-collection",
      "products-stock",
      "account-management",
      "payment-invoicing",
      "quality-sourcing"
    ];
    return validCategories.includes(category as HelpCategory);
  };

  useEffect(() => {
    const category = searchParams.get('category');
    setSelectedCategory(category || undefined);
    setArticles(category && isValidHelpCategory(category) ? getArticlesByCategory(category) : getAllArticles());
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Centre</h1>
          <p className="text-lg text-gray-600">
            Find answers to your questions and learn how to get the most out of Booker Wholesale
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-12 flex gap-4 flex-wrap">
          <Link
            href="/help/faq"
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
          >
            FAQs
          </Link>
          <Link
            href="/help/faq?category=delivery"
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
          >
            Delivery Help
          </Link>
          <Link
            href="/help/faq?category=stock-branches"
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
          >
            Stock & Branches
          </Link>
        </div>

        {/* Category Navigation */}
        <HelpCategoryNav />

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {articles.map((article) => (
            <HelpCentreCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HelpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-lg text-gray-600">Loading help centre...</div>
          </div>
        </div>
      </div>
    }>
      <HelpContent />
    </Suspense>
  );
}
