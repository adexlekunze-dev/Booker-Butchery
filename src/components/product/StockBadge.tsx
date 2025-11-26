import { CheckCircle2, AlertTriangle, X } from "lucide-react";

type Availability = {
  at_branch?: boolean;
  in_stock?: boolean;
  stock_level?: "high" | "medium" | "low" | "out";
  branch_name?: string;
  exact_count?: number;
};

export function StockBadge({ availability }: { availability?: Availability }) {
  // If no availability data at all, don't show anything
  if (!availability) {
    return null;
  }
  
  // Check if actually out of stock (explicitly false, not null/undefined)
  // If in_stock is null or undefined, check stock_level instead
  const isOutOfStock = availability.in_stock === false || 
    (availability.in_stock === null && (!availability.stock_level || availability.stock_level === "out"));
  
  if (isOutOfStock) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide bg-gray-100 text-gray-700">
        <X className="w-3 h-3" strokeWidth={2} />
        Out of stock
      </span>
    );
  }
  const styles: Record<"high" | "medium" | "low", string> = {
    high: "bg-gray-100 text-gray-900",
    medium: "bg-gray-100 text-gray-900",
    low: "bg-gray-200 text-gray-800"
  };
  const stockLevel = (availability.stock_level === "out" ? "high" : availability.stock_level) || "high";
  const style = styles[stockLevel as "high" | "medium" | "low"];
  const Icon = availability.stock_level === "low" ? AlertTriangle : CheckCircle2;
  
  // Build label with exact count if available
  let label = "";
  let useUppercase = true;
  if (availability.exact_count !== undefined && availability.exact_count !== null) {
    label = `${availability.exact_count} in stock`;
    useUppercase = false; // Don't uppercase numbers
  } else {
    const labels: Record<"high" | "medium" | "low", string> = {
      high: "In stock - High availability",
      medium: "In stock - Medium",
      low: "Limited stock"
    };
    label = labels[stockLevel as "high" | "medium" | "low"];
  }
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${useUppercase ? 'uppercase tracking-wide' : ''} ${style}`}>
      <Icon className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
      <span className="truncate">{label}</span>
    </span>
  );
}


