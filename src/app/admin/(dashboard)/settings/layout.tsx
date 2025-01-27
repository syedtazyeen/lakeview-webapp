import Header, { TabProps } from "@/components/common/header";
import React from "react";
import { BiCog } from "react-icons/bi";

const tabs: TabProps[] = [
  { name: "Preferences", path: "/admin/settings" },
  { name: "Account", path: "/admin/settings/account" },
  { name: "Payments", path: "/admin/settings/payments" },
];

export default function RoomsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-full h-full flex flex-col">
      <Header icon={<BiCog />} name={"Settings"} tabs={tabs} />
      {children}
    </div>
  );
}
