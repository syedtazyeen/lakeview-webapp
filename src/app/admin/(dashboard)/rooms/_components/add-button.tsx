"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BiPlus } from "react-icons/bi";
import { TABS } from "@/lib/constants";

export default function AddButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.endsWith("/rooms"))
    return (
      <Button
        onClick={() => router.push(`${pathname}?tab=${TABS.ROOMS.ADD_ROOMS}`)}
        size="sm"
        className="flex items-center gap-1"
      >
        <BiPlus className="text-xl" /> New rooms
      </Button>
    );

  if (pathname.endsWith("/rooms/categories"))
    return (
      <Button
        onClick={() =>
          router.push(`${pathname}?tab=${TABS.ROOMS.ADD_CATEGORY}`)
        }
        size="sm"
        className="flex items-center gap-1"
      >
        <BiPlus className="text-xl" /> New Category
      </Button>
    );

  return <></>;
}
