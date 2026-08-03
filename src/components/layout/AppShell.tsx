"use client";
import Link from "next/link";
import { BranchProvider } from "@/lib/branch-context";
import { Header } from "@/components/layout/Header";
// import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <BranchProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white border px-3 py-1 rounded">
        Skip to content
      </a>
      <div className="bg-yellow-400 text-black text-center py-2 px-4 font-semibold text-sm flex items-center justify-center gap-4 flex-wrap">
        <span>This is a prototype version - for demonstration purposes only. Not for production use.</span>
        <Link href="/methodology" className="bg-black text-white px-3 py-1.5 rounded hover:bg-gray-800 transition-colors font-medium">
          Discovery Methodology
        </Link>
      </div>
      <Header />
      <main id="main" className="min-h-screen">{children}</main>
      
      {/* Product Manager Section - Full Width Black Background */}
      <section className="w-full bg-black text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Adekunle Okubena</h2>
            <p className="text-lg sm:text-xl font-semibold text-white">Senior Ecommerce Specialist</p>
          </div>
        </div>
      </section>
      
      {/* <Footer /> */}
      <BackToTop />
    </BranchProvider>
  );
}

