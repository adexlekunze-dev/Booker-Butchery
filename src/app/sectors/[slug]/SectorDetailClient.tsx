"use client";

import { getSectorBySlug } from "@/data/sectors";
import { SectorHero } from "@/components/sectors/SectorHero";
import { SectorTrustBadgeRow } from "@/components/sectors/SectorTrustBadgeRow";
import { QuickCategoryNavigation } from "@/components/sectors/QuickCategoryNavigation";
import { SectorPopularProducts } from "@/components/sectors/SectorPopularProducts";
import { BusinessSolutionsSection } from "@/components/sectors/BusinessSolutionsSection";
import { ResourcesSection } from "@/components/sectors/ResourcesSection";
import { SectorFAQ } from "@/components/sectors/SectorFAQ";
import { SectorCTA } from "@/components/sectors/SectorCTA";
import { SEOContentSection } from "@/components/sectors/SEOContentSection";
import { getUser } from "@/lib/mock-auth";

export function SectorDetailClient({ slug }: { slug: string }) {
  const sector = getSectorBySlug(slug);

  if (!sector) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Sector not found</p>
      </div>
    );
  }

  const user = getUser();
  const branchCode = user?.primary_branch_code;

  // Transform resources for ResourcesSection (already limited to 3 inside component)
  const resourcesWithImages = sector.resources.map((resource) => ({
    image: `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80`,
    title: resource.title,
    description: resource.description,
    link: resource.link,
  }));

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <SectorHero
        image={sector.hero.imageUrl || "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200"}
        headline={sector.hero.headline}
        subheadline={sector.hero.subheadline}
        valuePoints={sector.valuePoints.map((vp) => ({ text: vp }))}
        primaryCTA={sector.cta.primaryButton}
        secondaryCTA={sector.cta.secondaryButton}
        showBranchContext={true}
      />

      {/* 2. Trust Badge Row (Sector-Specific) */}
      <SectorTrustBadgeRow trustBadges={sector.trustBadges} />

      {/* 3. Quick Category Navigation - 6 sub categories relevant to the sector */}
      {sector.categories && sector.categories.length > 0 && (
        <QuickCategoryNavigation
          categories={sector.categories}
          sectorSlug={slug}
        />
      )}

      {/* 4. "Sector-Specific Business Like Yours Buy" (Popular Products) */}
      <SectorPopularProducts
        sectorName={sector.name}
        sectorSlug={slug}
        socialProof={sector.socialProof}
      />

      {/* 5. Business Solutions Section + ONE Success Story / Testimonial */}
      <BusinessSolutionsSection
        sectorName={sector.name}
        businessSolutions={sector.businessSolutions}
        primaryTestimonial={sector.primaryTestimonial}
      />

      {/* 6. Buying Guides / Resources - 3 relevant guides only */}
      {resourcesWithImages.length > 0 && (
        <ResourcesSection
          resources={resourcesWithImages}
          title="Buying Guides & Resources"
        />
      )}

      {/* 7. FAQ (Business-Specific) - 5-6 FAQs relevant to THIS sector */}
      <SectorFAQ sectorName={sector.name} faqs={sector.faqs} />

      {/* 8. Final CTA */}
      <SectorCTA
        headline={sector.cta.headline}
        description={sector.cta.description}
        primaryCTA={sector.cta.primaryButton}
        secondaryCTA={sector.cta.secondaryButton}
        trustIndicators={sector.valuePoints.map((vp) => ({ text: vp }))}
      />

      {/* 9. SEO Section */}
      {sector.seoContent && <SEOContentSection content={sector.seoContent} />}
    </div>
  );
}
