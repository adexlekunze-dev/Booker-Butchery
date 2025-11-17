"use client";

import { BranchSearchForm } from "@/components/branch/BranchSearchForm";
import { MapPin } from "lucide-react";

type BranchFinderSectionProps = {
  currentBranch?: {
    name: string;
    distance?: number;
  };
  title?: string;
};

export function BranchFinderSection({ currentBranch, title }: BranchFinderSectionProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        )}
        <p className="text-gray-600 mb-8">
          Find your nearest Booker branch for delivery, click & collect, or in-store shopping.
        </p>

        {currentBranch ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />
              <div>
                <div className="font-semibold text-gray-900">{currentBranch.name}</div>
                {currentBranch.distance !== undefined && (
                  <div className="text-sm text-gray-600">{currentBranch.distance.toFixed(1)} miles away</div>
                )}
              </div>
            </div>
          </div>
        ) : null}

        <BranchSearchForm />
      </div>
    </section>
  );
}

