"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/data/products";
import productsData from "@/data/products.json";
import { getUser } from "@/lib/mock-auth";

export default function DebugProductsPage() {
  const [results, setResults] = useState<any>(null);
  
  useEffect(() => {
    const user = getUser();
    const branchCode = user?.primary_branch_code;
    
    // Test various scenarios
    const allProductsResult = getProducts({});
    const withBranchResult = getProducts({ branchCode: "MAN001" });
    const withUserBranch = getProducts({ branchCode });
    const inStockResult = getProducts({ branchCode: "MAN001", inStockOnly: true });
    
    // Count by category
    const activeProducts = productsData.filter((p: any) => p.active);
    const categoryCounts: Record<string, number> = {};
    activeProducts.forEach((p: any) => {
      const cat = p.category || "NONE";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    
    setResults({
      allProducts: allProductsResult,
      withBranch: withBranchResult,
      withUserBranch,
      inStockOnly: inStockResult,
      userBranchCode: branchCode,
      rawDataCount: productsData.length,
      activeCount: activeProducts.length,
      categoryCounts,
    });
  }, []);
  
  if (!results) {
    return <div className="min-h-screen bg-gray-50 p-8">Loading debug data...</div>;
  }
  
  const { allProducts, withBranch, withUserBranch, inStockOnly, userBranchCode, rawDataCount, activeCount, categoryCounts } = results;
  const missingCount = activeCount - allProducts.total;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Product Count Debug</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">📊 Raw Data Counts</h2>
          <div className="space-y-2">
            <p className="text-lg">
              <strong>Total in products.json:</strong> {rawDataCount}
            </p>
            <p className="text-lg">
              <strong>Active products:</strong> {activeCount}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">🔍 getProducts() Tests</h2>
          <div className="space-y-2">
            <p className="text-lg">
              <strong>No filters:</strong> {allProducts.total} products
            </p>
            <p className="text-lg">
              <strong>With MAN001 branch:</strong> {withBranch.total} products
            </p>
            <p className="text-lg">
              <strong>With user branch ({userBranchCode || 'none'}):</strong> {withUserBranch.total} products
            </p>
            <p className="text-lg">
              <strong>In stock at MAN001:</strong> {inStockOnly.total} products
            </p>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-yellow-800">🔍 Detailed Analysis</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Raw JSON count:</strong> {rawDataCount}</p>
            <p><strong>Active products:</strong> {activeCount}</p>
            <p><strong>getProducts() with no params:</strong> {allProducts.total}</p>
            <p className={missingCount > 0 ? "text-red-700 font-bold" : "text-green-700 font-bold"}>
              <strong>Missing products:</strong> {missingCount}
            </p>
            {missingCount > 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-800 font-bold">⚠️ ISSUE DETECTED!</p>
                <p className="text-red-700">
                  {missingCount} products are being filtered out by getProducts() with no parameters.
                  This indicates a bug in the filtering logic.
                </p>
              </div>
            )}
            {missingCount === 0 && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                <p className="text-green-800 font-bold">✅ NO ISSUE FOUND!</p>
                <p className="text-green-700">
                  All {activeCount} active products are being returned correctly.
                  If you're seeing 304 on the PLP, check for URL parameters or browser cache.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">📂 Products by Category</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(categoryCounts)
              .sort((a, b) => (b[1] as number) - (a[1] as number))
              .map(([cat, count]) => (
                <div key={cat} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{cat}:</span>
                  <span className="text-gray-600">{count as number}</span>
                </div>
              ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between font-bold">
              <span>TOTAL:</span>
              <span>
                {(Object.values(categoryCounts) as number[]).reduce((a, b) => a + b, 0)}
              </span>
            </div>
          </div>
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
