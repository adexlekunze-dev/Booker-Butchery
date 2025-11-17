"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { getRecentlyViewed } from "@/lib/recently-viewed";
import { getProductBySku } from "@/lib/data/products";
import { getSession, getUser } from "@/lib/mock-auth";

type CustomersAlsoViewedClientProps = {
  currentProductId: string;
};

export function CustomersAlsoViewedClient({ currentProductId }: CustomersAlsoViewedClientProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get recently viewed from localStorage
    const recentlyViewed = getRecentlyViewed();
    
    // Filter out current product
    const otherProducts = recentlyViewed
      .filter((p) => p.id !== currentProductId)
      .slice(0, 6);

    if (otherProducts.length === 0) {
      setLoading(false);
      return;
    }

    // Get user's branch code for product filtering
    const user = getUser();
    const branchCode = user?.primary_branch_code;

    // Fetch product details from local data
    const fetchedProducts = otherProducts
      .map((p) => {
        const product = getProductBySku(p.sku, branchCode);
        if (product) {
          return {
            ...product,
            availability: product.availability,
          };
        }
        return null;
      })
      .filter((p) => p !== null);

    setProducts(fetchedProducts);
    setLoading(false);
  }, [currentProductId]);

  if (loading) {
    return (
      <section className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customers Also Viewed
        </h2>
        <div className="text-center py-8 text-gray-600">Loading...</div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Customers Also Viewed
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
