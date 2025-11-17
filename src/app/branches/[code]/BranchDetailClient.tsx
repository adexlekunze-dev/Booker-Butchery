"use client";

import type { Branch } from "@/lib/data/branches";

export function BranchDetailClient({ branch }: { branch: Branch }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{branch.name}</h1>
          <div className="text-sm text-gray-600 mt-1">Branch Code: {branch.branch_code}</div>
        </div>

        {branch.address && (
          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Address</h2>
            <div className="text-gray-700">
              {branch.address.line1 && <div>{branch.address.line1}</div>}
              {branch.address.line2 && <div>{branch.address.line2}</div>}
              {branch.address.city && <div>{branch.address.city}</div>}
              {branch.address.county && <div>{branch.address.county}</div>}
              {branch.address.postcode && <div className="font-medium">{branch.address.postcode}</div>}
            </div>
          </section>
        )}

        {branch.contact && (
          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-2 text-gray-700">
              {branch.contact.phone && (
                <div>
                  <span className="font-medium">Phone:</span> {branch.contact.phone}
                </div>
              )}
              {branch.contact.email && (
                <div>
                  <span className="font-medium">Email:</span> {branch.contact.email}
                </div>
              )}
              {branch.contact.manager && (
                <div>
                  <span className="font-medium">Manager:</span> {branch.contact.manager.name}
                  {branch.contact.manager.phone && ` (${branch.contact.manager.phone})`}
                </div>
              )}
            </div>
          </section>
        )}

        {branch.services && (
          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
            <div className="space-y-4">
              {branch.services.cash_carry && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Cash & Carry</h3>
                  {branch.services.cash_carry.available ? (
                    <div className="text-sm text-gray-600">
                      Available
                      {branch.services.cash_carry.hours && (
                        <div className="mt-1 ml-4">
                          <div>Weekdays: {branch.services.cash_carry.hours.weekday?.open} - {branch.services.cash_carry.hours.weekday?.close}</div>
                          <div>Saturday: {branch.services.cash_carry.hours.saturday?.open} - {branch.services.cash_carry.hours.saturday?.close}</div>
                          <div>Sunday: {branch.services.cash_carry.hours.sunday?.open} - {branch.services.cash_carry.hours.sunday?.close}</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Not available</div>
                  )}
                </div>
              )}

              {branch.services.delivery && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Delivery</h3>
                  {branch.services.delivery.available ? (
                    <div className="text-sm text-gray-600">
                      Available
                      {branch.services.delivery.delivery_days && (
                        <div className="mt-1">Days: {branch.services.delivery.delivery_days.join(", ")}</div>
                      )}
                      {branch.services.delivery.cutoff_time && (
                        <div className="mt-1">Cutoff time: {branch.services.delivery.cutoff_time}</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Not available</div>
                  )}
                </div>
              )}

              {branch.services.click_collect && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Click & Collect</h3>
                  {branch.services.click_collect.available ? (
                    <div className="text-sm text-gray-600">
                      Available
                      {branch.services.click_collect.ready_time_hours && (
                        <span className="ml-2">(Ready in {branch.services.click_collect.ready_time_hours} hours)</span>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Not available</div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

