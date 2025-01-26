import { ReceiptText } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2 text-muted-foreground">
      <ReceiptText className="size-10 stroke-[0.25px]" />
      <span className="text-sm opacity-70">No recipts</span>
    </div>
  );
}
