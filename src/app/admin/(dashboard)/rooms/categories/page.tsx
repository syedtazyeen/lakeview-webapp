import { Button } from "@/components/ui/button";
import React from "react";
import { BiPlus, BiSolidBookContent } from "react-icons/bi";

export default function Categories() {
  return (
    <div className="bg-background max-w-[40rem] aspect-[7/2] my-6 mx-auto p-4 rounded-xl space-y-1 overflow-x-hidden">
      <p className="font-medium text-lg">
        Add category to begin with creating room for guests
      </p>
      <p className="text-sm text-muted-foreground pb-8">
        Proactively support customers wherever they are with targeted and
        personalized outbound messages. Send them in your product or across
        email, SMS, WhatsApp, and more.
      </p>
      <div className="flex items-center gap-4">
        <Button variant="ghost">
          <BiSolidBookContent />
          Learn
        </Button>
        <Button>
          <BiPlus />
          Add category
        </Button>
      </div>
    </div>
  );
}
