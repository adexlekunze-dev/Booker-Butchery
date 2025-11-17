"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getSmartReminders } from "@/lib/data/mock-order-patterns";
import { Button } from "@/components/ui/Button";
import { Lightbulb } from "lucide-react";
import { getNextDeliveryDayName } from "@/lib/utils/dates";

export function SmartReminderSection() {
  const [session, setSession] = useState<any>(null);
  const [reminders, setReminders] = useState<any[]>([]);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);

    if (currentSession?.user) {
      const userId = currentSession.user.id || 'user-test-001';
      const smartReminders = getSmartReminders(userId);
      setReminders(smartReminders);
    }
  }, []);

  if (!session?.user || reminders.length === 0) {
    return null;
  }

  const reminder = reminders[0]; // Show first reminder
  const nextDeliveryDay = getNextDeliveryDayName();

  return (
    <section className="bg-orange-50 border-b border-orange-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Lightbulb className="w-5 h-5 text-orange-600" />
          <div className="flex-1">
            <p className="text-sm text-gray-900">
              <span className="font-semibold">Smart Reminder:</span> You usually order {reminder.product_name} by {nextDeliveryDay}
            </p>
          </div>
          <Button variant="primary" size="sm">
            + Add {reminder.product_name}
          </Button>
        </div>
      </div>
    </section>
  );
}


