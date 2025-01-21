"use client";

import { usePathname } from "next/navigation";
import React from "react";;
import NewRoom from "./NewRoom";
import NewCategory from "./NewCategory";
import NewFloor from "./NewFloor";

export default function AddButton() {
  const pathname = usePathname();

  if (pathname.endsWith("/rooms")) return <NewRoom />;

  if (pathname.endsWith("/rooms/categories")) return <NewCategory />;

  if (pathname.endsWith("/rooms/floors")) return <NewFloor />;

  return <></>;
}
