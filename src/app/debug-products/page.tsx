"use client";

import { getProducts } from "@/lib/data/products";
import productsData from "@/data/products.json";

export default function DebugProductsPage() {
  // Test various scenarios
  const allProductsResult = getProducts({});
  const withBranchResult = getProducts({ branchCode: "MAN001" });
  const inStockResult = getProducts({ branchCode: "MAN001", inStockOnly: true });

  // Count by category
  const activeProducts = productsData.filter((p: any) => p.active);
  const categoryCounts: Record<string, number> = {};
  activeProducts.forEach((p: any) => {
    const cat = p.category || "NONE";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Product Count Debug</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">📊 Raw Data Counts</h2>
          <div className="space-y-2">
            <p className="text-lg">
              <strong>Total in products.json:</strong> {productsData.length}
            </p>
            <p className="text-lg">
              <strong>Active products:</strong> {activeProducts.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">🔍 getProducts() Tests</h2>
          <div className="space-y-2">
            <p className="text-lg">
              <strong>No filters:</strong> {allProductsResult.total} products
            </p>
            <p className="text-lg">
              <strong>With MAN001 branch:</strong> {withBranchResult.total}{" "}
              products
            </p>
            <p className="text-lg">
              <strong>In stock at MAN001:</strong> {inStockResult.total}{" "}
              products
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">📂 Products by Category</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(categoryCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, count]) => (
                <div key={cat} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{cat}:</span>
                  <span className="text-gray-600">{count}</span>
                </div>
              ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between font-bold">
              <span>TOTAL:</span>
              <span>
                {Object.values(categoryCounts).reduce((a, b) => a + b, 0)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-yellow-800">
            💡 Diagnosis
          </h2>
          {allProductsResult.total === 444 ? (
            <p className="text-green-700">
              ✅ <strong>Everything looks good!</strong> All 444 products are
              being returned by getProducts(). If you're seeing 304 on the PLP,
              please:
              <ol className="list-decimal ml-6 mt-2 space-y-1">
                <li>Check the URL bar for any query parameters</li>
                <li>Clear your browser cache (Ctrl+Shift+R)</li>
                <li>Check if you're on a category page vs. main PLP</li>
              </ol>
            </p>
          ) : (
            <p className="text-red-700">
              ⚠️ <strong>Issue found:</strong> getProducts() is returning{" "}
              {allProductsResult.total} instead of 444. This needs
              investigation.
            </p>
          )}
        </div>

        <div className="mt-6 text-center">
          <a
            href="/butchery/shop"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Go to Shop Page
          </a>
        </div>
      </div>
    </div>
  );
}

