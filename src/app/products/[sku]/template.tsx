"use client";

import { useEffect } from "react";

export default function ProductDetailTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Scroll to top when navigating to product detail page
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
}


