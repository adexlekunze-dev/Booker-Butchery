import { Metadata } from "next";
import { StandingOrdersDashboard } from "@/components/standing-orders/StandingOrdersDashboard";

export const metadata: Metadata = {
  title: "Standing Orders | Booker Wholesale",
  description: "Manage recurring deliveries and automatic orders for your business.",
};

export default function StandingOrdersPage() {
  return <StandingOrdersDashboard />;
}
