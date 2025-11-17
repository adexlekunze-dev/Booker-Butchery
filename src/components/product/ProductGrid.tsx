import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid({ products }: { products: any[] }) {
  if (!products?.length) return <div className="text-gray-600">No products found.</div>;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}


