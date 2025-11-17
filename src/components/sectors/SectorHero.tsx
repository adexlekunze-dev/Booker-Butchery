"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

type ValuePoint = {
  text: string;
  icon?: React.ReactNode;
};

type SectorHeroProps = {
  image: string;
  headline: string;
  subheadline: string;
  valuePoints: ValuePoint[];
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  showBranchContext?: boolean;
};

export function SectorHero({
  image,
  headline,
  subheadline,
  valuePoints,
  primaryCTA,
  secondaryCTA,
  showBranchContext = false,
}: SectorHeroProps) {
  return (
    <section className="relative text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={headline}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
            {headline}
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md" style={{ color: '#FFFFFF' }}>
            {subheadline}
          </p>
          
          {/* Value Points */}
          {valuePoints.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-8">
              {valuePoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  {point.icon || <Check className="w-5 h-5" />}
                  <span className="text-sm font-medium">{point.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href={primaryCTA.href}>
              <Button variant="primary" size="lg">
                {primaryCTA.text}
              </Button>
            </Link>
            {secondaryCTA && (
              <Link href={secondaryCTA.href}>
                <Button variant="secondary" size="lg">
                  {secondaryCTA.text}
                </Button>
              </Link>
            )}
          </div>

          {/* Branch Context */}
          {showBranchContext && (
            <div className="mt-6 text-sm opacity-90">
              <Link href="/branches" className="underline hover:no-underline">
                Find your nearest branch →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

