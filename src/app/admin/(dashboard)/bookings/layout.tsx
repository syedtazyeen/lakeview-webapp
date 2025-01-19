import React from "react";
import { BiCalendarAlt, BiPlus } from "react-icons/bi";
import Search from "./_components/Search";
import { Button } from "@/components/ui/button";

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card w-full h-full flex flex-col rounded-xl shadow-md overflow-auto">
      <div className="px-6 py-4 bg-card border-b">
        <div className="flex justify-between items-center h-8">
          <p className="font-medium text-xl flex items-center gap-2.5 w-40">
            <BiCalendarAlt className="text-base" /> Bookings
          </p>
          <Search />
          <div className="flex justify-end gap-4 w-40">
            <Button size="sm" className="flex items-center gap-1">
              <BiPlus className="text-xl" /> New booking
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
