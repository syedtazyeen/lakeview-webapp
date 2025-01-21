"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import React, { useState } from "react";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TooltipProvider>
      <div className="h-screen w-full">
        <Sidebar expanded={expanded} setExpanded={(val) => setExpanded(val)} />
        <div
          className={`p-2 ${
            expanded ? "ml-56" : "ml-16"
          } h-full transition-all duration-300 ease-in-out`}
        >
          {children}
        </div>
      </div>
    </TooltipProvider>
  );
}
