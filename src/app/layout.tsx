import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "B2B Food Wholesale Platform Optimization Demo",
  description: "B2B wholesale platform demo: personalization, intelligent navigation, bulk pricing optimization, recipe to cart. 36 production-ready features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
