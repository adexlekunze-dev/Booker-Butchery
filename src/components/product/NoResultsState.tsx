"use client";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

type NoResultsStateProps = {
  activeFilters: { key: string; value: string; label?: string }[];
  categoryName?: string;
  branchName?: string;
  isAuthenticated?: boolean;
};

export function NoResultsState({
  activeFilters,
  categoryName = "Meat, Fish & Poultry",
  branchName,
  isAuthenticated = false,
}: NoResultsStateProps) {
  // Hide branch suggestions for all users (both authenticated and unauthenticated)
  const showBranchSuggestions = false;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    // Keep category and branch if they exist
    if (searchParams.get("category")) {
      params.set("category", searchParams.get("category")!);
    }
    if (searchParams.get("branch_code")) {
      params.set("branch_code", searchParams.get("branch_code")!);
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const locationText = branchName 
    ? `at ${branchName}` 
    : "matching your filters";
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
      <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No products found {locationText}
      </h3>
      <p className="text-gray-600 mb-6">
        We couldn&apos;t find any products matching your current filters.
      </p>

      {activeFilters.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Active filters:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {activeFilters.map((filter, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm"
              >
                <span>
                  {filter.label || filter.key}: {filter.value}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="text-left max-w-md mx-auto">
          <p className="text-sm font-medium text-gray-700 mb-2">Suggestions:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Try removing some filters</li>
            {showBranchSuggestions && (
              <li>• Check other nearby branches</li>
            )}
            {!showBranchSuggestions && (
              <li>• Check alternative products in the same category</li>
            )}
            <li>• Browse all {categoryName.toLowerCase()}</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" onClick={clearAllFilters}>
            Clear All Filters
          </Button>
          {showBranchSuggestions && (
            <Link href="/branches">
              <Button variant="tertiary">Check Other Branches</Button>
            </Link>
          )}
        </div>

        {/* Only show nearby branches for unauthenticated users */}
        {showBranchSuggestions && (
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Available at nearby branches:</p>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• Manchester North (5.8 mi) - 15 products match</div>
              <div>• Stockport (8.1 mi) - 8 products match</div>
            </div>
            <Button variant="tertiary" className="mt-4">
              View Products at These Branches
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

