"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { BiBed, BiPlus } from "react-icons/bi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ViewCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "";

  function handleChange(val: boolean) {
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set("view", view);
    } else {
      params.delete("view");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  }
  return (
    <Drawer open={view !== ""} onOpenChange={handleChange}>
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
