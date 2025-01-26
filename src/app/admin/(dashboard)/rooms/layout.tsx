import React from "react";
import ViewFloors from "./_components/query-tabs/view-floors";
import AddFloor from "./_components/query-tabs/add-floor";
import NewRoom from "./_components/query-tabs/add-room";
import NewCategory from "./_components/query-tabs/add-category";
import Header, { ActionProps, TabProps } from "@/components/common/header";
import { BiBed, BiPlus } from "react-icons/bi";
import { QUERIES, TABS } from "@/lib/constants";

const actions: ActionProps[] = [
  {
    label: "Add rooms",
    icon: <BiPlus />,
    query: `${QUERIES.TAB}=${TABS.ROOMS.ADD_ROOMS}`,
    withPath: "/admin/rooms",
  },
  {
    label: "Add category",
    icon: <BiPlus />,
    query: `${QUERIES.TAB}=${TABS.ROOMS.ADD_CATEGORY}`,
    withPath: "/admin/rooms/categories",
  },
];

const tabs: TabProps[] = [
  { name: "All rooms", path: "/admin/rooms" },
  { name: "Categories", path: "/admin/rooms/categories" },
  { name: "Floors", query: `${QUERIES.TAB}=${TABS.ROOMS.ADD_FLOOR}` },
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
