import { Badge } from "@/components/ui/badge";
import { cn, formatEnumString } from "@/lib/utils";
import React from "react";

export default function StatusBadge({
  status,
  text,
}: {
  status: BookingStatus;
  text?: string;
}) {
  const variant = {
    CONFIRMED: "bg-green-600/15 text-green-600 border-green-600/15",
    CHECKED_IN: "bg-violet-600/15 text-violet-600 border-violet-600/15",
    CHECKED_OUT: "bg-fuchsia-600/15 text-fuchsia-600 border-fuchsia-600/15",
    CANCELLED: "bg-fuchsia-600/15 text-fuchsia-600 border-fuchsia-600/15",
  };

  return (
    <Badge variant="outline" className={cn("font-medium", variant[status])}>
      {formatEnumString(text || status)}
    </Badge>
  );
}
