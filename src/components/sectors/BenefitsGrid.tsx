"use client";

import { LucideIcon } from "lucide-react";

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type BenefitsGridProps = {
  benefits: Benefit[];
  title?: string;
};

export function BenefitsGrid({ benefits, title }: BenefitsGridProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

