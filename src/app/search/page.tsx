"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/data/products";
import { getUser } from "@/lib/mock-auth";
import { ProductGrid } from "@/components/product/ProductGrid";

function SearchContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    if (!q) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const user = getUser();
    const branchCode = user?.primary_branch_code;
    
    const results = searchProducts(q, branchCode);
    setProducts(results);
    setLoading(false);
  }, [searchParams]);

  const q = searchParams.get("q") ?? "";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search results</h1>
          <p className="text-gray-600">
            {q ? `"${q}" — ${products.length} results` : "Enter a search term above"}
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Searching...</div>
          </div>
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : q ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-lg text-gray-600 mb-4">No products found for "{q}"</p>
            <p className="text-sm text-gray-500">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-lg text-gray-600">Enter a search term in the search bar above</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading search...</div>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
