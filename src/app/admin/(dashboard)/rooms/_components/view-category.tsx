"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { BiBed } from "react-icons/bi";
import { useRouter, useSearchParams } from "next/navigation";
import { QUERIES, TABS } from "@/lib/constants";

export default function ViewCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get(QUERIES.TAB) || "";

  function handleChange(val: boolean) {
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set(QUERIES.TAB, view);
    } else {
      params.delete(QUERIES.TAB);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  }
  return (
    <Drawer open={view === TABS.ROOMS.ADD_CATEGORY} onOpenChange={handleChange}>
      <DrawerContent className="h-full">
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>
              <BiBed className="text-3xl mb-1" /> Room category
            </DrawerTitle>
            <DrawerDescription>{view}</DrawerDescription>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
