import React from "react";
import { BiBed } from "react-icons/bi";
import AddButton from "./_components/AddButton";
import Tabs from "./_components/Tabs";
import Search from "./_components/Search";

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card w-full h-full flex flex-col rounded-xl shadow-md overflow-auto">
      <div className="px-6 pt-4 bg-card">
        <div className="flex justify-between items-center h-8">
          <p className="font-medium text-xl flex items-center gap-2.5 w-40">
            <BiBed className="text-base" /> Rooms
          </p>
          <div className="flex justify-end items-center gap-2 w-40">
            <Search />
            <AddButton />
          </div>
        </div>
      </div>
      <div className="px-6 mt-2 border-b sticky top-0 z-10 bg-card">
        <Tabs />
      </div>
      {children}
    </div>
  );
}
