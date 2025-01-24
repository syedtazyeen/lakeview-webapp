import React from "react";
import { BiBed } from "react-icons/bi";
import AddButton from "./_components/add-button";
import LayoutTabs from "./_components/layout-tabs";
import ViewFloors from "./_components/query-tabs/view-floors";
import AddFloor from "./_components/query-tabs/add-floor";
import Search from "@/components/common/search";
import NewRoom from "./_components/query-tabs/add-room";
import NewCategory from "./_components/query-tabs/add-category";

export default function RoomsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-full h-full flex flex-col">
      <ViewFloors />
      <AddFloor />
      <NewRoom />
      <NewCategory />

      <div className="px-6 pt-4 bg-background">
        <div className="flex justify-between items-center h-8">
          <p className="font-medium flex items-center gap-2">
            <BiBed className="mb-0.5 text-muted-foreground" /> Rooms
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
        <LayoutTabs />
      </div>
      {children}
    </div>
  );
}
