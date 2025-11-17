"use client";

import { useState } from "react";
import { MapPin, CheckCircle, AlertCircle, Store } from "lucide-react";
import { Button } from "@/components/ui/Button";

type BranchAvailability = {
  branch_id: string;
  branch_code: string;
  branch_name: string;
  distance: number | null;
  in_stock: boolean;
  stock_level: "high" | "medium" | "low" | "out";
  exact_count?: number | null;
  available_for_delivery: boolean;
  available_for_click_collect: boolean;
};

type OtherBranchesAvailabilityProps = {
  branches: BranchAvailability[];
  onReservePickup?: (branchCode: string) => void;
};

export function OtherBranchesAvailability({
  branches,
  onReservePickup,
}: OtherBranchesAvailabilityProps) {
  const [showAll, setShowAll] = useState(false);
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set());

  const displayedBranches = showAll ? branches : branches.slice(0, 3);
  const hasMore = branches.length > 3;

  const toggleBranch = (branchId: string) => {
    const newExpanded = new Set(expandedBranches);
    if (newExpanded.has(branchId)) {
      newExpanded.delete(branchId);
    } else {
      newExpanded.add(branchId);
    }
    setExpandedBranches(newExpanded);
  };

  const getStockStatus = (branch: BranchAvailability) => {
    if (!branch.in_stock) {
      return { icon: AlertCircle, color: "text-red-600", text: "OUT OF STOCK", dots: "○○○○○" };
    }
    
    switch (branch.stock_level) {
      case "high":
        return { icon: CheckCircle, color: "text-green-600", text: "IN STOCK - HIGH", dots: "●●●●○" };
      case "medium":
        return { icon: AlertCircle, color: "text-orange-600", text: "IN STOCK - MEDIUM", dots: "●●●○○" };
      case "low":
        return { icon: AlertCircle, color: "text-yellow-600", text: "LIMITED STOCK", dots: "●●○○○" };
      default:
        return { icon: AlertCircle, color: "text-red-600", text: "OUT OF STOCK", dots: "○○○○○" };
    }
  };

  if (branches.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <button
        onClick={() => setShowAll(!showAll)}
        className="w-full flex items-center justify-between text-left mb-4"
      >
        <h3 className="text-lg font-semibold text-gray-900">
          Check Availability at Other Branches
        </h3>
        {hasMore && (
          <span className="text-sm text-primary">
            {showAll ? "Show Less" : `Show All ${branches.length} Branches`}
          </span>
        )}
      </button>

      <div className="space-y-4">
        {displayedBranches.map((branch) => {
          const stockStatus = getStockStatus(branch);
          const StockIcon = stockStatus.icon;
          const isExpanded = expandedBranches.has(branch.branch_id);

          return (
            <div
              key={branch.branch_id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="p-4 bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold text-gray-900">
                        {branch.branch_name}
                      </span>
                      {branch.distance !== null && (
                        <span className="text-sm text-gray-500">
                          ({branch.distance} miles)
                        </span>
                      )}
                    </div>

                    <div className={`flex items-center gap-2 mb-2 ${stockStatus.color}`}>
                      <StockIcon className="w-5 h-5" />
                      <span className="font-medium text-sm">{stockStatus.text}</span>
                    </div>

                    <div className="text-sm text-gray-600">
                      {stockStatus.dots}{" "}
                      {branch.exact_count !== undefined && branch.exact_count !== null
                        ? `${branch.exact_count}+ units available`
                        : branch.stock_level === "high"
                        ? "50+ units available"
                        : branch.stock_level === "medium"
                        ? "10-49 units available"
                        : branch.stock_level === "low"
                        ? "1-9 units available"
                        : "Stock information unavailable"}
                    </div>
                  </div>
                </div>

                {branch.available_for_click_collect && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                      <Store className="w-4 h-4" />
                      <span className="font-medium">Click & Collect Available</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      Ready within 2 hours
                    </div>
                    <Button
                      variant="tertiary"
                      size="sm"
                      onClick={() => {
                        onReservePickup?.(branch.branch_code);
                      }}
                    >
                      Reserve for Pickup at {branch.branch_name}
                    </Button>
                  </div>
                )}

                {!branch.available_for_click_collect && branch.in_stock && (
                  <div className="mt-3 text-sm text-gray-500">
                    Click & collect not available at this branch
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {hasMore && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 text-sm text-primary hover:text-primary font-medium"
        >
          Show All {branches.length} Branches Within 10 Miles →
        </button>
      )}
    </div>
  );
}

