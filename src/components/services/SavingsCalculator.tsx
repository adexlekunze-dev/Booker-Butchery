"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Calculator } from "lucide-react";

type SavingsItem = {
  label: string;
  value: number;
};

type SavingsCalculatorProps = {
  title?: string;
  description?: string;
  items: Array<{
    label: string;
    calculate: (inputs: Record<string, number>) => number;
  }>;
  inputs: Array<{
    id: string;
    label: string;
    placeholder?: string;
    type?: "number" | "select";
    options?: Array<{ label: string; value: number }>;
  }>;
  ctaText?: string;
  ctaHref?: string;
};

export function SavingsCalculator({
  title = "Calculate Your Potential Savings",
  description = "See how much you could save with Booker services",
  items,
  inputs,
  ctaText = "Become a Member to Start Saving",
  ctaHref = "/register",
}: SavingsCalculatorProps) {
  const [formValues, setFormValues] = useState<Record<string, number>>({});
  const [calculated, setCalculated] = useState(false);
  const [savings, setSavings] = useState<SavingsItem[]>([]);
  const [total, setTotal] = useState(0);

  const handleInputChange = (id: string, value: number) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
    setCalculated(false);
  };

  const calculate = () => {
    const newSavings: SavingsItem[] = items.map((item) => ({
      label: item.label,
      value: item.calculate(formValues),
    }));
    
    const newTotal = newSavings.reduce((sum, item) => sum + item.value, 0);
    
    setSavings(newSavings);
    setTotal(newTotal);
    setCalculated(true);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>

          <div className="space-y-6 mb-8">
            {inputs.map((input) => (
              <div key={input.id}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {input.label}
                </label>
                {input.type === "select" && input.options ? (
                  <select
                    value={formValues[input.id] || ""}
                    onChange={(e) => handleInputChange(input.id, Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select...</option>
                    {input.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    value={formValues[input.id] || ""}
                    onChange={(e) => handleInputChange(input.id, Number(e.target.value))}
                    placeholder={input.placeholder || "0"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mb-8">
            <Button
              onClick={calculate}
              variant="primary"
              size="lg"
              block
              disabled={!Object.values(formValues).some((v) => v > 0)}
            >
              Calculate My Savings
            </Button>
          </div>

          {calculated && savings.length > 0 && (
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your Potential Annual Savings:
              </h3>
              <div className="space-y-3 mb-6">
                {savings.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-gray-700">{item.label}:</span>
                    <span className="font-semibold text-gray-900">
                      £{item.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-primary/10 rounded-lg p-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total Annual Savings:</span>
                <span className="text-2xl font-bold text-primary">
                  £{total.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {calculated && (
            <div className="mt-8">
              <a href={ctaHref}>
                <Button
                  variant="primary"
                  size="lg"
                  block
                >
                  {ctaText}
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

