import { Metadata } from "next";
import { LoyaltyDashboard } from "@/components/loyalty/LoyaltyDashboard";

export const metadata: Metadata = {
  title: "Loyalty Rewards | Booker Wholesale",
  description: "Earn points, unlock rewards, and access exclusive benefits with our loyalty program.",
};

export default function LoyaltyPage() {
  return <LoyaltyDashboard />;
}
