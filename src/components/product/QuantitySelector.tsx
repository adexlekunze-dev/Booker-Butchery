"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

type QuantitySelectorProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (quantity: number) => void;
  packSize?: string | null;
  unit?: string;
};

export function QuantitySelector({
  min = 1,
  max = 999,
  defaultValue = 1,
  onChange,
  packSize,
  unit,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(defaultValue);

  const handleDecrement = () => {
    const newQuantity = Math.max(min, quantity - 1);
    setQuantity(newQuantity);
    onChange?.(newQuantity);
  };

  const handleIncrement = () => {
    const newQuantity = Math.min(max, quantity + 1);
    setQuantity(newQuantity);
    onChange?.(newQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, value));
    setQuantity(clampedValue);
    onChange?.(clampedValue);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Quantity</label>
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= min}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            min={min}
            max={max}
            className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
          />
          <button
            type="button"
            onClick={handleIncrement}
            disabled={quantity >= max}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-sm text-gray-600">
          {packSize ? `${quantity} ${packSize} ${unit ? `(${unit})` : ""}` : `${quantity} ${unit || "pack"}`}
        </span>
      </div>
    </div>
  );
}

