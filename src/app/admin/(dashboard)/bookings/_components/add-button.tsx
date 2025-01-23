"use client";

import { usePathname } from "next/navigation";
import React from "react";
import NewRoom from "./query-tabs/add-room";
import NewCategory from "./query-tabs/add-category";

export default function AddButton() {
  const pathname = usePathname();

  if (pathname.endsWith("/rooms")) return <NewRoom />;

  if (pathname.endsWith("/rooms/categories")) return <NewCategory />;

  return <></>;
}
