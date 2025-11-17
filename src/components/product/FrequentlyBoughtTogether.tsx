"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSession } from "@/lib/mock-auth";
import Link from "next/link";

type FrequentlyBoughtTogetherProps = {
  products: any[];
  currentProduct?: {
    id: string;
    name: string;
    base_price: number;
    sku?: string;
    images?: string[];
    brand?: string;
    unit?: string;
  };
};

export function FrequentlyBoughtTogether({
  products,
  currentProduct,
}: FrequentlyBoughtTogetherProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = getSession();
    setIsAuthenticated(!!session?.user);

    // Listen for storage changes
    const handleStorageChange = () => {
      const newSession = getSession();
      setIsAuthenticated(!!newSession?.user);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  if (!products || products.length === 0) {
    return null;
  }

  // Calculate total including current product
  const currentProductPrice = currentProduct?.base_price || 0;
  const relatedProductsPrice = products.slice(0, 3).reduce((sum, p) => sum + p.base_price, 0);
  const totalPrice = currentProductPrice + relatedProductsPrice;
  const bundlePrice = totalPrice * 0.95; // 5% bundle discount
  const savings = totalPrice - bundlePrice;

  const handleAddAll = async () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    // TODO: Implement add all to basket
    console.log("Add all to basket:", [currentProduct?.id, ...products.map((p) => p.id)]);
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Frequently Bought Together
      </h2>
      <p className="text-gray-600 mb-6">
        Customers who bought this also bought:
      </p>

      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
        {/* Products */}
        <div className="flex-1 flex flex-wrap items-center gap-4">
          {/* Current Product + Related Products */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {currentProduct && (
              <div className="flex-shrink-0">
                <ProductCard product={{
                  ...currentProduct,
                  brand: currentProduct.brand || '',
                  unit: currentProduct.unit || 'unit',
                  images: currentProduct.images || [],
                }} />
              </div>
            )}
            {products.slice(0, currentProduct ? 3 : 4).map((product) => (
              <div key={product.id} className="flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Bundle Pricing - Show to everyone */}
        <div className="lg:w-64 flex-shrink-0 border border-gray-200 rounded-lg p-6 bg-gray-50">
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Individual Price:</span>
              <span className="font-medium text-gray-900">£{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <span className="text-gray-900">Bundle Price:</span>
              <span className="text-primary">£{bundlePrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-green-600">
              <span>You Save:</span>
              <span className="font-medium">£{savings.toFixed(2)}</span>
            </div>
          </div>
          {isAuthenticated ? (
            <Button
              variant="primary"
              block
              icon={<ShoppingCart className="w-4 h-4" />}
              onClick={handleAddAll}
            >
              Add All to Basket
            </Button>
          ) : (
            <Link href="/register">
              <Button variant="primary" block>
                Become a Member to Order
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

