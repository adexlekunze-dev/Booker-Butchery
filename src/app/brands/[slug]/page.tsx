import { BrandDetailClient } from "./BrandDetailClient";
import { getAllBrands } from "@/data/brands";

export async function generateStaticParams() {
  const brands = getAllBrands();
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BrandDetailClient slug={slug} />;
}
