"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { BiPlus } from "react-icons/bi";

export default function AddButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.endsWith("/rooms"))
    return (
      <Button
        onClick={() => router.push(`${pathname}?tab=new-rooms`)}
        size="sm"
        className="flex items-center gap-1"
      >
        <BiPlus className="text-xl" /> New rooms
      </Button>
    );

  if (pathname.endsWith("/rooms/categories"))
    return (
      <Button
        onClick={() => router.push(`${pathname}?tab=new-category`)}
        size="sm"
        className="flex items-center gap-1"
      >
        <BiPlus className="text-xl" /> New Category
      </Button>
    );

  return <></>;
}
