"use client";

import { useState } from "react";
import { MapPin, CheckCircle, AlertCircle, XCircle, Truck, Store, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

type AvailabilityPanelProps = {
  branchCode: string;
  branchName: string;
  distance?: number;
  stockLevel?: "high" | "medium" | "low" | "out";
  exactCount?: number;
  inStock: boolean;
  availableForDelivery: boolean;
  availableForClickCollect: boolean;
  nextDeliveryDate?: string | null;
  onCheckOtherBranches?: () => void;
  showOtherBranches?: boolean;
};

export function AvailabilityPanel({
  branchCode,
  branchName,
  distance,
  stockLevel = "out",
  exactCount,
  inStock,
  availableForDelivery,
  availableForClickCollect,
  nextDeliveryDate,
  onCheckOtherBranches,
  showOtherBranches = false,
}: AvailabilityPanelProps) {
  const [showOtherBranchesSection, setShowOtherBranchesSection] = useState(showOtherBranches);

  const getStockIndicator = () => {
    if (!inStock) return { icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", text: "OUT OF STOCK", dots: "○○○○○" };
    
    switch (stockLevel) {
      case "high":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", border: "border-green-200", text: "IN STOCK - HIGH", dots: "●●●●○" };
      case "medium":
        return { icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", text: "IN STOCK - MEDIUM", dots: "●●●○○" };
      case "low":
        return { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", text: "LIMITED STOCK", dots: "●●○○○" };
      default:
        return { icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", text: "OUT OF STOCK", dots: "○○○○○" };
    }
  };

  const stockInfo = getStockIndicator();
  const StockIcon = stockInfo.icon;

  const getStockText = () => {
    if (!inStock) return "Currently out of stock";
    if (exactCount !== undefined && exactCount !== null) {
      return `${exactCount}+ units available`;
    }
    switch (stockLevel) {
      case "high":
        return "50+ units available";
      case "medium":
        return "10-49 units available";
      case "low":
        return "1-9 units available - order soon";
      default:
        return "Check availability";
    }
  };

  // Calculate next delivery date
  const getNextDeliverySlot = () => {
    if (nextDeliveryDate) {
      const date = new Date(nextDeliveryDate);
      return date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
    }
    // Default: tomorrow if ordered by 3pm
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6 lg:sticky lg:top-20">
      {/* Branch Location */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-gray-700" />
          <span className="font-semibold text-gray-900 text-base">📍 At Your Branch</span>
        </div>
        <div className="text-gray-900 font-medium ml-7 mb-1">
          {branchName}
        </div>
        {distance !== undefined && distance !== null && (
          <div className="text-sm text-gray-600 ml-7">
            ({distance.toFixed(1)} miles)
          </div>
        )}
      </div>

      {/* Stock Status */}
      <div className={`${stockInfo.bg} ${stockInfo.border} border-2 rounded-lg p-5`}>
        <div className="flex items-start gap-3">
          <StockIcon className={`w-6 h-6 ${stockInfo.color} flex-shrink-0 mt-0.5`} />
          <div className="flex-1">
            <div className={`font-bold text-base ${stockInfo.color} mb-2`}>
              {stockInfo.text}
            </div>
            <div className="text-base font-medium text-gray-800 mb-1">
              {stockInfo.dots} <span className="text-sm">{getStockText()}</span>
            </div>
            {!inStock && nextDeliveryDate && (
              <div className="text-sm text-gray-600 mt-2">
                Expected: {getNextDeliverySlot()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fulfillment Options */}
      <div className="space-y-4">
        <div className="font-semibold text-gray-900 text-base mb-2">Fulfillment Options:</div>

        {/* Next-Day Delivery */}
        {availableForDelivery ? (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Next-Day Delivery
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Order by 3pm today for delivery {getNextDeliverySlot()}
                </div>
                <div className="text-sm text-gray-700">
                  Delivery to: <span className="font-medium">M1 4HT</span>
                </div>
                <button className="text-sm text-primary hover:text-primary font-medium mt-2">
                  Change address
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 opacity-60">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-600 mb-1 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Next-Day Delivery
                </div>
                <div className="text-sm text-gray-500">
                  Not available for this product
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Click & Collect */}
        {availableForClickCollect ? (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Click & Collect
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Ready in 2 hours
                </div>
                <div className="text-sm text-gray-700 mb-1">
                  {branchName}
                </div>
                <div className="text-sm text-gray-600">
                  Mon-Fri: 6am-8pm
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 opacity-60">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-600 mb-1 flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Click & Collect
                </div>
                <div className="text-sm text-gray-500">
                  Not available at this branch
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Check Other Branches */}
      {onCheckOtherBranches && (
        <button
          onClick={() => {
            setShowOtherBranchesSection(!showOtherBranchesSection);
            onCheckOtherBranches();
          }}
          className="w-full flex items-center justify-between text-sm text-primary hover:text-primary font-medium p-2 hover:bg-gray-50 rounded-md transition-colors"
        >
          <span>Check Other Branches</span>
          {showOtherBranchesSection ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
}

