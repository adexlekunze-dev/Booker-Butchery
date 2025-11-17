/**
 * Date utility functions for dynamic date handling
 */

export function getCurrentMonth(): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[new Date().getMonth()];
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getPreviousMonth(): { name: string; year: number } {
  const now = new Date();
  const previousMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return {
    name: months[previousMonthDate.getMonth()],
    year: previousMonthDate.getFullYear(),
  };
}

export function getMonthBeforePrevious(): { name: string; year: number } {
  const now = new Date();
  const monthBeforePreviousDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return {
    name: months[monthBeforePreviousDate.getMonth()],
    year: monthBeforePreviousDate.getFullYear(),
  };
}

export function getNextYear(): number {
  return new Date().getFullYear() + 1;
}

export function isDecember(): boolean {
  return getCurrentMonth() === 'December';
}

export function isNovemberOrDecember(): boolean {
  const month = getCurrentMonth();
  return month === 'November' || month === 'December';
}

export function isFestiveSeason(): boolean {
  const month = getCurrentMonth();
  return month === 'November' || month === 'December' || month === 'January';
}

export function getDaysUntilDate(targetDate: Date): number {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getChristmasDeadline(): { date: string; daysRemaining: number } {
  const now = new Date();
  const currentYear = now.getFullYear();
  const dec18 = new Date(currentYear, 11, 18); // December 18 (month is 0-indexed)
  
  // If Dec 18 has passed this year, use next year
  const targetDate = now > dec18 ? new Date(currentYear + 1, 11, 18) : dec18;
  
  return {
    date: `December ${targetDate.getDate()}, ${targetDate.getFullYear()}`,
    daysRemaining: getDaysUntilDate(targetDate),
  };
}

export function getNewYearsEveDate(): Date {
  const now = new Date();
  const currentYear = now.getFullYear();
  const dec31 = new Date(currentYear, 11, 31); // December 31
  
  // If Dec 31 has passed this year, use next year
  return now > dec31 ? new Date(currentYear + 1, 11, 31) : dec31;
}

export function formatShortMonth(monthName: string): string {
  const shortMonths: Record<string, string> = {
    'January': 'Jan',
    'February': 'Feb',
    'March': 'Mar',
    'April': 'Apr',
    'May': 'May',
    'June': 'Jun',
    'July': 'Jul',
    'August': 'Aug',
    'September': 'Sep',
    'October': 'Oct',
    'November': 'Nov',
    'December': 'Dec',
  };
  return shortMonths[monthName] || monthName.substring(0, 3);
}

export function getRelativeDateDescription(date: Date): string {
  const now = new Date();
  const diffDays = getDaysUntilDate(date);
  
  if (diffDays < 0) {
    return 'Past';
  } else if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Tomorrow';
  } else if (diffDays <= 7) {
    return `In ${diffDays} days`;
  } else {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }
}

/**
 * Get the next delivery day name respecting the 3pm cutoff
 * Returns the day name (e.g., "Thursday") for the next delivery
 * - Before 3pm: next day delivery
 * - After 3pm: day after tomorrow delivery
 */
export function getNextDeliveryDayName(): string {
  const now = new Date();
  const hour = now.getHours();
  
  let deliveryDate: Date;
  if (hour < 15) {
    // Before 3pm - can get next day delivery
    deliveryDate = new Date(now);
    deliveryDate.setDate(now.getDate() + 1);
  } else {
    // After 3pm - delivery is day after tomorrow
    deliveryDate = new Date(now);
    deliveryDate.setDate(now.getDate() + 2);
  }
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[deliveryDate.getDay()];
}


