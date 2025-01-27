"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import React, { useState } from "react";
import Sidebar from "./_components/sidebar";

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
          className={`py-2 pr-2 ${
            expanded ? "ml-48" : "ml-16"
          } h-full transition-all duration-300 ease-in-out`}
        >
          <div className="w-full h-full bg-background rounded-xl shadow-md overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
