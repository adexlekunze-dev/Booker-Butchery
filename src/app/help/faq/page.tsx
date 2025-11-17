"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { FAQAccordion } from "@/components/help/FAQAccordion";
import { allFAQs, getFAQsByCategory } from "@/data/helpArticles";
import { useSearchParams } from "next/navigation";

function FAQContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [faqs, setFaqs] = useState(allFAQs);

  useEffect(() => {
    const category = searchParams.get('category') as
      | "general"
      | "delivery"
      | "stock-branches"
      | "quality-returns"
      | null;
    
    setSelectedCategory(category || undefined);
    setFaqs(category ? getFAQsByCategory(category) : allFAQs);
  }, [searchParams]);

  const categories = [
    { id: "general", name: "General", count: getFAQsByCategory("general").length },
    { id: "delivery", name: "Delivery", count: getFAQsByCategory("delivery").length },
    {
      id: "stock-branches",
      name: "Stock & Branches",
      count: getFAQsByCategory("stock-branches").length,
    },
    {
      id: "quality-returns",
      name: "Quality & Returns",
      count: getFAQsByCategory("quality-returns").length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Find quick answers to common questions about Booker Wholesale
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/help/faq"
            className={`px-4 py-2 rounded-lg border transition-colors ${
              !selectedCategory
                ? "bg-primary text-white border-primary"
                : "bg-white border-gray-200 hover:border-primary"
            }`}
          >
            All ({allFAQs.length})
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/help/faq?category=${category.id}`}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedCategory === category.id
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-gray-200 hover:border-primary"
              }`}
            >
              {category.name} ({category.count})
            </Link>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <FAQAccordion faqs={faqs} />
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-lg text-gray-600">Loading FAQs...</div>
          </div>
        </div>
      </div>
    }>
      <FAQContent />
    </Suspense>
  );
}
