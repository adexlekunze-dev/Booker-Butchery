"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { SearchBar } from "./SearchBar";

export function MobileSearchButton() {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <div className="fixed inset-0 bg-white z-50 lg:hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Search</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close search"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Search Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <SearchBar />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
      aria-label="Open search"
    >
      <Search className="w-5 h-5" />
    </button>
  );
}


