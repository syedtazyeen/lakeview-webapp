"use client";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import React from "react";
import { BiPlus } from "react-icons/bi";
import NewRoom from "./NewRoom";
import NewCategory from "./NewCategory";

export default function AddButton() {
  const pathname = usePathname();

  if (pathname.endsWith("/rooms")) return <NewRoom />;

  if (pathname.endsWith("/rooms/categories")) return <NewCategory />;

  if (pathname.endsWith("/rooms/floors"))
    return (
      <Button size="sm" className="flex items-center gap-1">
        <BiPlus className="text-xl" /> New floor
      </Button>
    );

  return <></>;
}
