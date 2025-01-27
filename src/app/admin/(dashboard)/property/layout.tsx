import Header, { TabProps } from "@/components/common/header";
import React from "react";
import { BiBuildings } from "react-icons/bi";

const tabs: TabProps[] = [
  { name: "About", path: "/admin/property" },
  { name: "Images", path: "/admin/property/images" }
];

export default function PropertyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-full h-full flex flex-col">
      <Header icon={<BiBuildings />} name={"Property"} tabs={tabs} />
      {children}
    </div>
  );
}
