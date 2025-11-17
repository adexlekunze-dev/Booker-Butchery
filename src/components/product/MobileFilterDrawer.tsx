"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";
import { Button } from "@/components/ui/Button";

type MobileFilterDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileFilterDrawer({ isOpen, onClose }: MobileFilterDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed bottom-0 left-0 right-0 top-0 bg-white z-50 lg:hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close filters"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <FilterSidebar />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <Button variant="primary" block size="lg" onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
}

