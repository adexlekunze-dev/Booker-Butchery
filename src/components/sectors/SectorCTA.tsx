"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

type TrustIndicator = {
  text: string;
};

type SectorCTAProps = {
  headline: string;
  description?: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  trustIndicators?: TrustIndicator[];
};

export function SectorCTA({
  headline,
  description,
  primaryCTA,
  secondaryCTA,
  trustIndicators = [],
}: SectorCTAProps) {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" style={{ color: '#FFFFFF' }}>{headline}</h2>
        {description && (
          <p className="text-xl mb-8 text-white opacity-90" style={{ color: '#FFFFFF' }}>{description}</p>
        )}
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Link href={primaryCTA.href}>
            <Button variant="secondary" size="lg">
              {primaryCTA.text}
            </Button>
          </Link>
          {secondaryCTA && (
            <Link href={secondaryCTA.href}>
              <Button variant="tertiary" size="lg">
                {secondaryCTA.text}
              </Button>
            </Link>
          )}
        </div>

        {trustIndicators.length > 0 && (
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            {trustIndicators.map((indicator, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span className="opacity-90">{indicator.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

