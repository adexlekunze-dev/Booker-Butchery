import Link from "next/link";
import { ChevronRight } from "lucide-react";

type ProductBreadcrumbProps = {
  category: string;
  subcategory: string;
  productName: string;
};

export function ProductBreadcrumb({ category, subcategory, productName }: ProductBreadcrumbProps) {
  // Map category to route
  const categoryRoute: Record<string, string> = {
    "Meat, Fish & Poultry": "/meat-fish-poultry",
    "Beer, Cider and Alcoholic RTDs": "/beer",
    "Greengrocery": "/greengrocery",
  };

  const categoryPath = categoryRoute[category] || "/";
  const shopPath = `${categoryPath}/shop`;

  return (
    <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
        </li>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <li>
          <Link href={categoryPath} className="hover:text-primary transition-colors">
            {category}
          </Link>
        </li>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <li>
          <Link href={`${shopPath}?subcategory=${encodeURIComponent(subcategory)}`} className="hover:text-primary transition-colors">
            {subcategory}
          </Link>
        </li>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <li className="text-gray-900 font-medium truncate max-w-xs md:max-w-md">
          {productName}
        </li>
      </ol>
    </nav>
  );
}

