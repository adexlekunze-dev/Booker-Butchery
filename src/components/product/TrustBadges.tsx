import { Award, Shield, Truck, RefreshCw, Users, Leaf, Fish, CheckCircle2 } from "lucide-react";

type Product = {
  attributes?: string[];
  certifications?: string[];
  category?: string;
  subcategory?: string;
};

type TrustBadgesProps = {
  product?: Product;
};

export function TrustBadges({ product }: TrustBadgesProps) {
  const attributes = product?.attributes || [];
  const certifications = product?.certifications || [];
  const category = product?.category || "";
  const subcategory = product?.subcategory || "";

  // Check for specific attributes/certifications
  const hasBritish = attributes.some(attr => attr.toLowerCase() === "british");
  const hasOrganic = attributes.some(attr => attr.toLowerCase() === "organic") ||
                     certifications.some(cert => cert.toLowerCase().includes("organic"));
  const hasRedTractor = attributes.some(attr => attr.toLowerCase().includes("red-tractor") || attr.toLowerCase().includes("redtractor")) ||
                        certifications.some(cert => cert.toLowerCase().includes("red tractor") || cert.toLowerCase().includes("red-tractor"));
  const hasMSC = certifications.some(cert => cert.toLowerCase().includes("msc"));
  const hasPremium = attributes.some(attr => attr.toLowerCase() === "premium" || attr.toLowerCase() === "select");
  const isFreshCategory = category === "Meat, Fish & Poultry" || 
                         category === "Greengrocery" || 
                         subcategory?.toLowerCase().includes("fresh");

  // Define all possible badges
  const allBadges = [
    {
      id: "freshness",
      title: "Freshness Guaranteed",
      description: "Full refund if not fresh",
      icon: RefreshCw,
      show: isFreshCategory,
    },
    {
      id: "british",
      title: "British Sourced",
      description: "Supporting UK farmers",
      icon: Award,
      show: hasBritish,
    },
    {
      id: "organic",
      title: "Organic Certified",
      description: "Certified organic produce",
      icon: Leaf,
      show: hasOrganic,
    },
    {
      id: "red-tractor",
      title: "Red Tractor Certified",
      description: "British quality standards",
      icon: Shield,
      show: hasRedTractor,
    },
    {
      id: "msc",
      title: "MSC Certified",
      description: "Sustainable seafood",
      icon: Fish,
      show: hasMSC,
    },
    {
      id: "quality",
      title: "Quality Assured",
      description: "Rigorous quality standards",
      icon: CheckCircle2,
      show: hasPremium || (!hasBritish && !hasOrganic && !hasRedTractor && !hasMSC && !isFreshCategory),
    },
    {
      id: "next-day",
      title: "Next-Day Delivery",
      description: "Order by 3pm",
      icon: Truck,
      show: true, // Always show
    },
    {
      id: "expert",
      title: "Expert Support",
      description: "Call our specialists",
      icon: Users,
      show: true, // Always show
    },
  ];

  // Filter badges to show
  const badges = allBadges.filter(badge => badge.show);

  // Ensure we have at least 3 badges, max 5
  const displayBadges = badges.slice(0, 5);

  if (displayBadges.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 md:p-8">
      <div className={`grid grid-cols-2 gap-6 ${displayBadges.length <= 3 ? 'md:grid-cols-3' : displayBadges.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-5'}`}>
        {displayBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div key={badge.id} className="text-center">
              <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-semibold text-sm text-gray-900 mb-1">
                {badge.title}
              </div>
              <div className="text-xs text-gray-600">{badge.description}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

