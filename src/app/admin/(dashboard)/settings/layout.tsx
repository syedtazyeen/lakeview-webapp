import React from "react";
import { BiCog } from "react-icons/bi";

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
            <BiCog className="mb-0.5 text-muted-foreground" /> Settings
          </p>
        </div>
      </div>
      <div className="px-6 mt-2 border-b sticky top-0 z-10 bg-background"></div>
      {children}
    </div>
  );
}
