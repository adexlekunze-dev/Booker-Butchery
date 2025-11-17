import { SectorDetailClient } from "./SectorDetailClient";
import { getAllSectors } from "@/data/sectors";

export async function generateStaticParams() {
  const sectors = getAllSectors();
  return sectors.map((sector) => ({
    slug: sector.slug,
  }));
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SectorDetailClient slug={slug} />;
}
