"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type BranchContextValue = {
  branchName: string;
  setBranchName: (name: string) => void;
};

const BranchContext = createContext<BranchContextValue | undefined>(undefined);

export function BranchProvider({ children }: { children: React.ReactNode }) {
  const [branchName, setBranchName] = useState("Manchester Central");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("branchName") : null;
    if (saved) setBranchName(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("branchName", branchName);
  }, [branchName]);

  return (
    <BranchContext.Provider value={{ branchName, setBranchName }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranchContext() {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranchContext must be used within BranchProvider");
  return ctx;
}


