"use client";

import { useEffect, useState } from "react";
import { BranchMap } from "@/components/branch/BranchMap";
import { BranchSearchForm } from "@/components/branch/BranchSearchForm";
import { getAllBranches } from "@/lib/data/branches";

export default function BranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);

  useEffect(() => {
    const allBranches = getAllBranches();
    setBranches(allBranches);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Find a branch</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <BranchSearchForm />
          </div>

          <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
            <div className="h-full">
              <BranchMap branches={branches} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
