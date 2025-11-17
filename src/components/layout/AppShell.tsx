"use client";
import { BranchProvider } from "@/lib/branch-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <BranchProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white border px-3 py-1 rounded">
        Skip to content
      </a>
      <div className="bg-yellow-400 text-black text-center py-2 px-4 font-semibold text-sm">
        This is a prototype version - for demonstration purposes only. Not for production use.
      </div>
      <Header />
      <main id="main" className="min-h-screen">{children}</main>
      <Footer />
      <BackToTop />
    </BranchProvider>
  );
}

