"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const sections = [
  { id: "general", title: "General" },
  { id: "bookings", title: "Bookings" },
  { id: "rooms", title: "Rooms" },
  { id: "settings", title: "Settings" },
];

export default function AdminDocsPage() {
  const [activeSection, setActiveSection] = useState("general");

  return (
    <div className="flex h-screen">
      <aside className="w-52 bg-background-base border-r">
        <div className="p-4 font-semibold border-b">Help Center</div>
        <ScrollArea className="h-full">
          <nav className="space-y-2 p-4">
            {sections.map((section, index) => (
              <button
                key={index}
                className={cn(
                  "w-full px-1 py-2 flex justify-start items-center gap-2 text-sm font-medium rounded-md transition-colors duration-200",
                  activeSection === section.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:bg-accent-/50"
                )}
                onClick={() => setActiveSection(section.id)}
              >
                <span
                  className={cn(
                    "size-2 rounded-full",
                    activeSection === section.id
                      ? "bg-foreground"
                      : "bg-transparent"
                  )}
                />{" "}
                {section.title}
              </button>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto"></div>
      </main>
    </div>
  );
}
