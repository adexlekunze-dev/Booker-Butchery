import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";

type UpsellProductsProps = {
  products: any[];
  currentProduct?: any; // Current product to compare prices against
};

export function UpsellProducts({ products, currentProduct }: UpsellProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  // Filter products to only show those with price >= current product price
  const currentPrice = currentProduct?.base_price || 0;
  const premiumProducts = products.filter((product) => {
    const productPrice = product.base_price || 0;
    return productPrice >= currentPrice && product.id !== currentProduct?.id;
  });

  if (premiumProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Upgrade Your Choice
          </h2>
          <p className="text-gray-600">
            Consider these premium alternatives:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 items-stretch">
        {premiumProducts.slice(0, 4).map((product) => (
          <div key={product.id} className="h-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

