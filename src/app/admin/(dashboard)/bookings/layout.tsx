import React from "react";
import { BiCalendar, BiPlus } from "react-icons/bi";
import Header, { ActionProps, TabProps } from "@/components/common/header";
import { QUERIES, TABS } from "@/lib/constants";
import AddBooking from "./_components/query-tabs/add-booking";

const actions: ActionProps[] = [
  {
    label: "Add bookings",
    icon: <BiPlus />,
    query: `${QUERIES.TAB}=${TABS.BOOKINGS.ADD_BOOKING}`,
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
      <AddBooking />
      <Header
        icon={<BiCalendar />}
        name={"Bookings"}
        actions={actions}
        //tabs={tabs}
        includeSearch
      />
      {children}
    </div>
  );
}
