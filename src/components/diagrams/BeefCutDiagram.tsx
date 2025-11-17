"use client";

import { useState } from "react";
import Link from "next/link";

type CutInfo = {
  id: string;
  name: string;
  description: string;
  uses: string[];
  priceRange: string;
  searchLink: string;
};

const beefCuts: Record<string, CutInfo> = {
  chuck: {
    id: "chuck",
    name: "Chuck & Blade",
    description: "Shoulder area with rich flavor. Contains connective tissue that breaks down during slow cooking.",
    uses: ["Braising", "Stewing", "Ground beef", "Pot roast"],
    priceRange: "£",
    searchLink: "/products?search=chuck"
  },
  rib: {
    id: "rib",
    name: "Fore Rib (Ribeye)",
    description: "Premium cut from ribs 6-12. Highly marbled with excellent flavor. The king of steaks.",
    uses: ["Steaks", "Roasting", "Premium grilling"],
    priceRange: "£££",
    searchLink: "/products?search=ribeye"
  },
  shortloin: {
    id: "shortloin",
    name: "Striploin (Sirloin)",
    description: "Tender cut from the back. Leaner than ribeye but still tender with good flavor.",
    uses: ["Steaks", "Roasting", "Grilling"],
    priceRange: "£££",
    searchLink: "/products?search=sirloin"
  },
  tenderloin: {
    id: "tenderloin",
    name: "Fillet (Tenderloin)",
    description: "Most tender cut from the loin. Minimal marbling, delicate flavor. Premium pricing.",
    uses: ["Premium steaks", "Beef Wellington", "Tournedos"],
    priceRange: "££££",
    searchLink: "/products?search=fillet"
  },
  rump: {
    id: "rump",
    name: "Rump",
    description: "Lean, flavorful cut from the hindquarter. Good value with excellent beefy flavor.",
    uses: ["Steaks", "Roasting", "Dicing"],
    priceRange: "££",
    searchLink: "/products?search=rump"
  },
  topside: {
    id: "topside",
    name: "Topside",
    description: "Lean roasting joint from the hindquarter. Even grain, minimal fat. Great for roasting.",
    uses: ["Roasting", "Slow cooking", "Beef slices"],
    priceRange: "££",
    searchLink: "/products?search=topside"
  },
  silverside: {
    id: "silverside",
    name: "Silverside",
    description: "From the hindquarter. Traditional for salt beef and corned beef. Lean cut requiring slow cooking.",
    uses: ["Salt beef", "Corned beef", "Braising"],
    priceRange: "££",
    searchLink: "/products?search=silverside"
  },
  brisket: {
    id: "brisket",
    name: "Brisket",
    description: "Breast/lower chest area. High connective tissue. Perfect for low and slow cooking or smoking.",
    uses: ["Smoking", "Braising", "Salt beef", "Pastrami"],
    priceRange: "££",
    searchLink: "/products?search=brisket"
  },
  flank: {
    id: "flank",
    name: "Flank",
    description: "Abdominal muscles. Lean and flavorful. Best when marinated and grilled across the grain.",
    uses: ["Grilling", "Stir-fry", "Fajitas", "Ground beef"],
    priceRange: "££",
    searchLink: "/products?search=flank"
  },
  shank: {
    id: "shank",
    name: "Shin (Shank)",
    description: "Lower leg meat. Extremely flavorful with lots of connective tissue. Excellent for stocks and stews.",
    uses: ["Stewing", "Osso buco", "Stock", "Slow braising"],
    priceRange: "£",
    searchLink: "/products?search=shin"
  }
};

export function BeefCutDiagram() {
  const [hoveredCut, setHoveredCut] = useState<string | null>(null);
  const [selectedCut, setSelectedCut] = useState<string | null>(null);

  const cutInfo = hoveredCut ? beefCuts[hoveredCut] : selectedCut ? beefCuts[selectedCut] : null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SVG Diagram */}
        <div className="lg:col-span-2">
          <svg
            viewBox="0 0 800 400"
            className="w-full h-auto"
            style={{ maxHeight: "500px" }}
          >
            {/* Cow silhouette outline */}
            <path
              d="M 50 200 Q 50 150, 80 130 L 120 140 Q 140 130, 160 140 L 200 150 Q 220 140, 240 150 L 280 160 L 320 170 L 360 180 L 400 190 L 440 200 L 480 210 L 520 215 L 560 220 Q 580 210, 600 220 L 640 230 Q 660 220, 680 235 Q 700 245, 710 260 Q 715 280, 710 300 Q 700 320, 680 325 L 660 330 L 640 335 L 600 340 L 560 345 L 520 348 L 480 350 L 440 350 L 400 348 L 360 345 L 320 340 L 280 335 L 240 330 L 200 320 L 160 305 L 120 285 Q 100 270, 90 250 Q 80 230, 80 210 L 70 200 Z"
              fill="#f3f4f6"
              stroke="#d1d5db"
              strokeWidth="2"
            />

            {/* Chuck & Blade */}
            <path
              d="M 80 140 L 120 145 L 140 155 L 150 180 L 140 210 L 120 230 L 100 240 L 80 210 Z"
              fill={hoveredCut === "chuck" ? "#ef4444" : "#fca5a5"}
              stroke="#dc2626"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredCut("chuck")}
              onMouseLeave={() => setHoveredCut(null)}
              onClick={() => setSelectedCut("chuck")}
            />

            {/* Fore Rib (Ribeye) */}
            <path
              d="M 150 150 L 200 155 L 240 165 L 250 185 L 240 215 L 200 225 L 150 210 L 150 180 Z"
              fill={hoveredCut === "rib" ? "#f59e0b" : "#fcd34d"}
              stroke="#d97706"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredCut("rib")}
              onMouseLeave={() => setHoveredCut(null)}
              onClick={() => setSelectedCut("rib")}
            />

            {/* Striploin (Sirloin) */}
            <path
              d="M 250 165 L 340 180 L 380 190 L 385 215 L 370 240 L 330 245 L 280 235 L 250 215 Z"
              fill={hoveredCut === "shortloin" ? "#10b981" : "#6ee7b7"}
              stroke="#059669"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredCut("shortloin")}
              onMouseLeave={() => setHoveredCut(null)}
              onClick={() => setSelectedCut("shortloin")}
            />

            {/* Fillet (Tenderloin) */}
            <path
              d="M 270 220 L 360 230 L 380 235 L 375 250 L 340 255 L 280 245 Z"
              fill={hoveredCut === "tenderloin" ? "#8b5cf6" : "#c4b5fd"}
              stroke="#7c3aed"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredCut("tenderloin")}
              onMouseLeave={() => setHoveredCut(null)}
              onClick={() => setSelectedCut("tenderloin")}
            />

            {/* Rump */}
            <path
              d="M 385 190 L 470 205 L 510 215 L 515 240 L 500 260 L 460 265 L 400 250 L 385 230 Z"
              fill={hoveredCut === "rump" ? "#06b6d4" : "#67e8f9"}
              stroke="#0891b2"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredCut("rump")}
              onMouseLeave={() => setHoveredCut(null)}
              onClick={() => setSelectedCut("rump")}
            />

            {/* Topside */}
            <path
              d="M 515 215 L 590 225 L 630 235 L 635 260 L 620 280 L 580 285 L 530 275 L 515 255 Z"
              fill={hoveredCut === "topside" ? "#ec4899" : "#f9a8d4"}
              stroke="#db2777"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredCut("topside")}
              onMouseLeave={() => setHoveredCut(null)}
              onClick={() => setSelectedCut("topside")}
            />

            {/* Silverside */}
            <path
              d="M 635 235 L 685 245 L 710 265 L 705 290 L 680 305 L 640 305 L 610 295 L 620 270 Z"
              fill={hoveredCut === "silverside" ? "#3b82f6" : "#93c5fd"}
              stroke="#2563eb"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredCut("silverside")}
              onMouseLeave={() => setHoveredCut(null)}
              onClick={() => setSelectedCut("silverside")}
            />

            {/* Brisket */}
            <path
              d="M 150 210 L 200 225 L 240 235 L 250 260 L 230 285 L 180 290 L 130 280 L 120 250 Z"
              fill={hoveredCut === "brisket" ? "#f97316" : "#fdba74"}
              stroke="#ea580c"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredCut("brisket")}
              onMouseLeave={() => setHoveredCut(null)}
              onClick={() => setSelectedCut("brisket")}
            />

            {/* Flank */}
            <path
              d="M 280 240 L 370 250 L 420 260 L 430 285 L 410 305 L 350 310 L 290 300 L 260 285 Z"
              fill={hoveredCut === "flank" ? "#14b8a6" : "#5eead4"}
              stroke="#0d9488"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredCut("flank")}
              onMouseLeave={() => setHoveredCut(null)}
              onClick={() => setSelectedCut("flank")}
            />

            {/* Shank */}
            <path
              d="M 430 265 L 500 275 L 540 285 L 550 310 L 530 330 L 480 340 L 430 335 L 410 310 Z"
              fill={hoveredCut === "shank" ? "#a855f7" : "#d8b4fe"}
              stroke="#9333ea"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredCut("shank")}
              onMouseLeave={() => setHoveredCut(null)}
              onClick={() => setSelectedCut("shank")}
            />

            {/* Labels */}
            <text x="110" y="190" fontSize="11" fontWeight="bold" fill="#374151" textAnchor="middle">Chuck</text>
            <text x="200" y="185" fontSize="11" fontWeight="bold" fill="#374151" textAnchor="middle">Rib</text>
            <text x="315" y="200" fontSize="11" fontWeight="bold" fill="#374151" textAnchor="middle">Sirloin</text>
            <text x="325" y="242" fontSize="10" fontWeight="bold" fill="#374151" textAnchor="middle">Fillet</text>
            <text x="445" y="225" fontSize="11" fontWeight="bold" fill="#374151" textAnchor="middle">Rump</text>
            <text x="575" y="245" fontSize="11" fontWeight="bold" fill="#374151" textAnchor="middle">Topside</text>
            <text x="665" y="270" fontSize="10" fontWeight="bold" fill="#374151" textAnchor="middle">Silverside</text>
            <text x="190" y="255" fontSize="11" fontWeight="bold" fill="#374151" textAnchor="middle">Brisket</text>
            <text x="355" y="285" fontSize="11" fontWeight="bold" fill="#374151" textAnchor="middle">Flank</text>
            <text x="480" y="305" fontSize="11" fontWeight="bold" fill="#374151" textAnchor="middle">Shin</text>
          </svg>

          <p className="text-xs text-gray-500 text-center mt-4">
            Hover over cuts to see details. Click to lock selection.
          </p>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-1">
          {cutInfo ? (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{cutInfo.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-gray-600">Price Range:</span>
                <span className="text-lg font-bold text-primary">{cutInfo.priceRange}</span>
              </div>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">{cutInfo.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-900 mb-2">Best For:</h4>
                <div className="flex flex-wrap gap-2">
                  {cutInfo.uses.map((use, i) => (
                    <span key={i} className="px-2 py-1 bg-white text-xs font-medium text-gray-700 rounded border border-gray-300">
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={cutInfo.searchLink}
                className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                View {cutInfo.name} Products →
              </Link>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p className="text-lg font-semibold mb-2">Explore Beef Cuts</p>
                <p className="text-sm">Hover over or click a cut to learn more</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-bold text-gray-900 mb-3">Price Range Guide:</h4>
        <div className="flex flex-wrap gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">£</span>
            <span>Budget-friendly (Chuck, Shin)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">££</span>
            <span>Mid-range (Rump, Topside, Brisket)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">£££</span>
            <span>Premium (Ribeye, Sirloin)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">££££</span>
            <span>Ultra-premium (Fillet)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
