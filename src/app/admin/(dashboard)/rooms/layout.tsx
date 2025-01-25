import React from "react";
import ViewFloors from "./_components/query-tabs/view-floors";
import AddFloor from "./_components/query-tabs/add-floor";
import NewRoom from "./_components/query-tabs/add-room";
import NewCategory from "./_components/query-tabs/add-category";
import Header, { ActionProps, TabProps } from "@/components/common/header";
import { BiBed, BiPlus } from "react-icons/bi";

const actions: ActionProps[] = [
  {
    label: "Add rooms",
    icon: <BiPlus />,
    query: "tab=new-rooms",
    withPath: "/admin/rooms",
  },
  {
    label: "Add category",
    icon: <BiPlus />,
    query: "tab=new-category",
    withPath: "/admin/rooms/categories",
  },
];

const tabs: TabProps[] = [
  { name: "All rooms", path: "/admin/rooms" },
  { name: "Categories", path: "/admin/rooms/categories" },
  { name: "Floors", query: "?tab=floors" },
];

export default function RoomsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col">
      <ViewFloors />
      <AddFloor />
      <NewRoom />
      <NewCategory />
      <Header
        icon={<BiBed />}
        name={"Rooms"}
        actions={actions}
        tabs={tabs}
        includeSearch
      />
      {children}
    </div>
  );
}
