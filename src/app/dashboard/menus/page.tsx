import { Metadata } from "next";
import { MenuBuilderDashboard } from "@/components/menus/MenuBuilderDashboard";

export const metadata: Metadata = {
  title: "Menu Builder | Booker Wholesale",
  description: "Save complete menus and reorder with one click. Manage menu templates for different occasions.",
};

export default function MenusPage() {
  return <MenuBuilderDashboard />;
}
