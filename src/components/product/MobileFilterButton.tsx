"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileFilterDrawer } from "./MobileFilterDrawer";

export function MobileFilterButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <Button
          variant="primary"
          size="lg"
          className="shadow-lg rounded-full w-14 h-14 p-0"
          onClick={() => setIsOpen(true)}
        >
          <Filter className="w-6 h-6" />
        </Button>
      </div>
      <MobileFilterDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

