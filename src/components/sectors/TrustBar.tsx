"use client";

import { LucideIcon } from "lucide-react";

type Stat = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

type TrustBarProps = {
  stats: Stat[];
};

export function TrustBar({ stats }: TrustBarProps) {
  return (
    <section className="bg-white border-y border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center">
                {Icon && <Icon className="w-6 h-6 text-primary mx-auto mb-2" />}
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

