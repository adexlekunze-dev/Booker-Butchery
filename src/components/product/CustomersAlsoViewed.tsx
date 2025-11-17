import { ProductCard } from "./ProductCard";

type CustomersAlsoViewedProps = {
  products: any[];
};

export function CustomersAlsoViewed({ products }: CustomersAlsoViewedProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Customers Also Viewed
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

