import React from "react";
import { BiBed } from "react-icons/bi";
import AddButton from "./_components/AddButton";
import Search from "./_components/Search";
import RoomLayoutTabs from "./_components/RoomLayoutTabs";

export default function RoomsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-full h-full flex flex-col">
      <div className="px-6 pt-4 bg-background">
        <div className="flex justify-between items-center h-8">
          <p className="font-medium text-xl flex items-center gap-2.5">
            <BiBed className="mb-0.5" /> Rooms
          </p>
          <div className="flex justify-end items-center gap-2">
            <Search />
            <div className="w-44 flex justify-end">
              <AddButton />
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 mt-2 border-b sticky top-0 z-10 bg-background">
        <RoomLayoutTabs />
      </div>
      {children}
    </div>
  );
}
