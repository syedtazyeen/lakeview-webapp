import React from "react";
import { BiCalendar, BiPlus } from "react-icons/bi";
import Header, { ActionProps, TabProps } from "@/components/common/header";

const actions: ActionProps[] = [
  {
    label: "Add bookings",
    icon: <BiPlus />,
    query: "tab=new-bookings",
    withPath: "/admin/bookings",
  },
  {
    label: "Add category",
    icon: <BiPlus />,
    query: "tab=new-category",
    withPath: "/admin/bookings/categories",
  },
];

const tabs: TabProps[] = [
  { name: "All bookings", path: "/admin/bookings" },
  { name: "Open", path: "/admin/bookings/open" },
  { name: "Completed", path: "/admin/bookings/completed" },
];

export default function RoomsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-full h-full flex flex-col">
      <Header
        icon={<BiCalendar />}
        name={"Bookings"}
        actions={actions}
        tabs={tabs}
        includeSearch
      />
      {children}
    </div>
  );
}
