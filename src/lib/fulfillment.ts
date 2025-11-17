/**
 * Fulfillment Management Utilities
 * Functions for delivery charges, basket grouping, and fulfillment estimation
 */

export type FulfillmentMethod = "delivery" | "click_collect" | "transfer";

export interface FulfillmentGroup {
  group_id: string;
  type: FulfillmentMethod;
  branch_id: string;
  branch_name: string;
  branch_code: string;
  items: Array<{
    product_id: string;
    product_name: string;
    product_sku: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  delivery_charge?: number;
  estimated_date?: string;
  estimated_ready_time?: string;
}

export interface BasketItem {
  product_id: string;
  product_name?: string;
  product_sku?: string;
  quantity: number;
  price: number;
  fulfillment: {
    method: FulfillmentMethod;
    branch_id: string;
    branch_name?: string;
    branch_code?: string;
  };
}

export interface Branch {
  id: string;
  branch_code: string;
  name: string;
  services: {
    delivery?: {
      available: boolean;
      delivery_days: string[];
      cutoff_time: string;
      delivery_charge_threshold: number;
      minimum_order?: number;
    };
    click_collect?: {
      available: boolean;
      ready_time_hours: number;
    };
  };
}

/**
 * Calculate delivery charge based on subtotal and branch rules
 * @param subtotal Order subtotal
 * @param branch Branch with delivery service rules
 * @returns Delivery charge amount
 */
export function calculateDeliveryCharge(subtotal: number, branch: Branch): number {
  const deliveryService = branch.services.delivery;

  if (!deliveryService || !deliveryService.available) {
    return 0;
  }

  // Free delivery if above threshold
  if (subtotal >= deliveryService.delivery_charge_threshold) {
    return 0;
  }

  // Check minimum order
  if (deliveryService.minimum_order && subtotal < deliveryService.minimum_order) {
    // Cannot deliver - return high charge to indicate error
    return -1;
  }

  // Standard delivery charge (typically £5-10 for UK wholesale)
  return 7.95;
}

/**
 * Group basket items by fulfillment method and branch
 * @param items Basket items with fulfillment info
 * @returns Array of fulfillment groups
 */
export function groupItemsByFulfillment(items: BasketItem[]): FulfillmentGroup[] {
  const groups = new Map<string, FulfillmentGroup>();

  for (const item of items) {
    const groupKey = `${item.fulfillment.method}_${item.fulfillment.branch_id}`;

    if (!groups.has(groupKey)) {
      const groupId = `${item.fulfillment.method.toUpperCase()}-${Math.random()
        .toString(36)
        .substring(2, 8)}`;

      groups.set(groupKey, {
        group_id: groupId,
        type: item.fulfillment.method,
        branch_id: item.fulfillment.branch_id,
        branch_name: item.fulfillment.branch_name || "",
        branch_code: item.fulfillment.branch_code || "",
        items: [],
        subtotal: 0,
      });
    }

    const group = groups.get(groupKey)!;
    group.items.push({
      product_id: item.product_id,
      product_name: item.product_name || "",
      product_sku: item.product_sku || "",
      quantity: item.quantity,
      price: item.price,
    });
    group.subtotal += item.price * item.quantity;
  }

  return Array.from(groups.values());
}

/**
 * Estimate ready/delivery time for an order
 * @param branch Branch details
 * @param fulfillmentType Type of fulfillment
 * @returns Estimated date/time
 */
export function estimateReadyTime(
  branch: Branch,
  fulfillmentType: FulfillmentMethod
): Date {
  const now = new Date();

  if (fulfillmentType === "click_collect") {
    const readyHours = branch.services.click_collect?.ready_time_hours || 2;
    const readyTime = new Date(now.getTime() + readyHours * 60 * 60 * 1000);
    return readyTime;
  }

  if (fulfillmentType === "delivery") {
    const cutoffTime = branch.services.delivery?.cutoff_time || "15:00";
    const [cutoffHour, cutoffMinute] = cutoffTime.split(":").map(Number);

    const cutoff = new Date(now);
    cutoff.setHours(cutoffHour, cutoffMinute, 0, 0);

    // If ordered before cutoff, next day delivery
    if (now < cutoff) {
      const nextDay = new Date(now);
      nextDay.setDate(nextDay.getDate() + 1);
      nextDay.setHours(8, 0, 0, 0); // Delivery starts at 8am
      return nextDay;
    } else {
      // If ordered after cutoff, delivery day after tomorrow
      const dayAfterTomorrow = new Date(now);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
      dayAfterTomorrow.setHours(8, 0, 0, 0);
      return dayAfterTomorrow;
    }
  }

  if (fulfillmentType === "transfer") {
    // Inter-branch transfer takes 2-3 business days
    const transferTime = new Date(now);
    transferTime.setDate(transferTime.getDate() + 3);
    return transferTime;
  }

  return now;
}

/**
 * Format estimated time for display
 * @param date Estimated date
 * @param fulfillmentType Type of fulfillment
 * @returns Formatted string
 */
export function formatEstimatedTime(
  date: Date,
  fulfillmentType: FulfillmentMethod
): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const dateStr = date.toLocaleDateString("en-GB", options);

  if (fulfillmentType === "click_collect") {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    const timeStr = date.toLocaleTimeString("en-GB", timeOptions);
    return `Ready for collection by ${timeStr} on ${dateStr}`;
  }

  if (fulfillmentType === "delivery") {
    return `Delivery on ${dateStr}`;
  }

  if (fulfillmentType === "transfer") {
    return `Transfer complete by ${dateStr}`;
  }

  return dateStr;
}

/**
 * Calculate delivery time slot based on current time and branch delivery days
 * @param branch Branch details
 * @returns Next available delivery slot
 */
export function getNextDeliverySlot(branch: Branch): {
  date: Date;
  slot: string;
} {
  const deliveryService = branch.services.delivery;

  if (!deliveryService || !deliveryService.available) {
    throw new Error("Delivery not available at this branch");
  }

  const now = new Date();
  const cutoffTime = deliveryService.cutoff_time || "15:00";
  const [cutoffHour, cutoffMinute] = cutoffTime.split(":").map(Number);

  const cutoff = new Date(now);
  cutoff.setHours(cutoffHour, cutoffMinute, 0, 0);

  let deliveryDate = new Date(now);

  // If after cutoff, start checking from tomorrow
  if (now >= cutoff) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  } else {
    // If before cutoff, can deliver today if it's a delivery day
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  }

  // Find next delivery day
  const deliveryDays = deliveryService.delivery_days || [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let attempts = 0;
  while (attempts < 7) {
    const dayName = dayNames[deliveryDate.getDay()];
    if (deliveryDays.includes(dayName)) {
      break;
    }
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    attempts++;
  }

  // Default slot: 8am-10am
  const slot = "8:00-10:00";

  return {
    date: deliveryDate,
    slot,
  };
}

/**
 * Validate minimum order for delivery
 * @param subtotal Order subtotal
 * @param branch Branch details
 * @returns Validation result
 */
export function validateMinimumOrder(
  subtotal: number,
  branch: Branch
): {
  isValid: boolean;
  minimumOrder?: number;
  shortfall?: number;
} {
  const deliveryService = branch.services.delivery;

  if (!deliveryService || !deliveryService.minimum_order) {
    return { isValid: true };
  }

  if (subtotal >= deliveryService.minimum_order) {
    return { isValid: true };
  }

  return {
    isValid: false,
    minimumOrder: deliveryService.minimum_order,
    shortfall: deliveryService.minimum_order - subtotal,
  };
}

/**
 * Calculate total order cost with delivery charges
 * @param groups Fulfillment groups
 * @param branches Branch details for delivery charge calculation
 * @returns Order totals
 */
export function calculateOrderTotals(
  groups: FulfillmentGroup[],
  branches: Map<string, Branch>
): {
  subtotal: number;
  delivery_charge: number;
  total: number;
  groups_with_charges: FulfillmentGroup[];
} {
  let subtotal = 0;
  let totalDeliveryCharge = 0;

  const groupsWithCharges = groups.map((group) => {
    subtotal += group.subtotal;

    let deliveryCharge = 0;
    if (group.type === "delivery") {
      const branch = branches.get(group.branch_id);
      if (branch) {
        deliveryCharge = calculateDeliveryCharge(group.subtotal, branch);
        totalDeliveryCharge += deliveryCharge;
      }
    }

    return {
      ...group,
      delivery_charge: deliveryCharge,
    };
  });

  return {
    subtotal,
    delivery_charge: totalDeliveryCharge,
    total: subtotal + totalDeliveryCharge,
    groups_with_charges: groupsWithCharges,
  };
}

