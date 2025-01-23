import Search from "@/components/common/search";
import React from "react";
import { BiGroup } from "react-icons/bi";

export default function RoomsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-full h-full flex flex-col">
      <div className="px-6 pt-4 pb-2 bg-background">
        <div className="flex justify-between items-center h-8">
          <p className="font-medium flex items-center gap-2">
            <BiGroup className="mb-0.5 text-muted-foreground" /> Guests
          </p>
          <div className="flex justify-end items-center gap-2">
            <Search />
          </div>
        </div>
      </div>
      <div className="px-6 mt-2 border-b sticky top-0 z-10 bg-background"></div>
      {children}
    </div>
  );
}
