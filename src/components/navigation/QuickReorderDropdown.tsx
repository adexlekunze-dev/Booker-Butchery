"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, List, RotateCcw, Clock, Repeat, ScanLine, Zap } from "lucide-react";
import { getSession } from "@/lib/mock-auth";

export function QuickReorderDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Only show for authenticated users
  if (!session?.user) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center gap-1 text-white hover:opacity-80 transition-colors font-medium"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Zap className="w-4 h-4" />
        Quick Reorder
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown content */}
          <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-[280px] overflow-hidden">
            <div className="py-2">
              {/* Header */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide">
                  <Zap className="w-4 h-4" />
                  QUICK REORDER
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {/* Shopping Lists */}
                <Link
                  href="/quick-order?tab=lists"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-primary hover:text-white transition-colors text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <List className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Shopping Lists</span>
                </Link>

                {/* Copy Previous Order */}
                <Link
                  href="/quick-order?tab=previous"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-primary hover:text-white transition-colors text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <RotateCcw className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Copy Previous Order</span>
                </Link>

                {/* Recent Purchases */}
                <Link
                  href="/quick-order?tab=recent"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-primary hover:text-white transition-colors text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <Clock className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Recent Purchases</span>
                </Link>

                {/* Frequently Ordered */}
                <Link
                  href="/quick-order?tab=frequent"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-primary hover:text-white transition-colors text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <Repeat className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Frequently Ordered</span>
                </Link>

                {/* Scan Products */}
                <Link
                  href="/quick-order?tab=scanner"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-primary hover:text-white transition-colors text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <ScanLine className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Scan Products</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


