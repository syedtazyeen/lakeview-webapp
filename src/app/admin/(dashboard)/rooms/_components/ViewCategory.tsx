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
          {/* <div className="h-80 p-4 pb-0 flex flex-col">
            <Label>Step {stage} of 3</Label>
            <div className="relative mt-2 mb-8 w-full h-2 rounded-xl bg-muted-foreground/10 overflow-hidden">
              <div
                style={{ width: `${(stage / 4) * 100 - 5}%` }}
                className={`absolute h-2 bg-accent rounded-xl transition-all duration-200`}
              />
            </div>
            <div className="flex-1">{renderContent()}</div>
          </div>
          <DrawerFooter className="flex-row justify-end py-4">
            {renderFooter()}
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
