"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
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
import { BiBed, BiPlus } from "react-icons/bi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ErrorText from "@/components/common/error-text";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/hooks/use-api";
import { createRoom } from "@/api/rooms";
import { createFloor } from "@/api/floors";
import useRoomStore from "@/store/rooms";
import { useToast } from "@/hooks/use-toast";

const AddFloorSchema = z.object({
  name: z.string().min(1, "Floor name is required"),
});

type AddFloorFormValues = z.infer<typeof AddFloorSchema>;

export default function NewFloor() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddFloorFormValues>({
    resolver: zodResolver(AddFloorSchema),
  });
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { addFloor } = useRoomStore();
  const [submitting, setSubmitting] = React.useState(false);

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "";

  async function onSubmit(data: AddFloorFormValues) {
    try {
      setSubmitting(true);
      const res = await createFloor(data);
      addFloor(res.data);
      toast({
        title: "Floor saved",
        variant: "success",
      });
      router.push(pathname);
    } catch (error) {
      toast({
        title: "Failed to save floor",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(val: boolean) {
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set("tab", "new");
    } else {
      resetValues();
      params.delete("tab");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }

  function resetValues() {
    reset();
  }

  return (
    <Drawer open={tab === "new"} onOpenChange={handleChange}>
      <DrawerTrigger asChild>
        <Button size="sm" className="flex items-center gap-1">
          <BiPlus className="text-xl" />
          New floor
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-4/5">
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>
              <BiBed className="text-3xl mb-1" /> Add new floor
            </DrawerTitle>
            <DrawerDescription>
            A new floor helps create more rooms in your property, expanding capacity and providing a seamless guest experience.
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-80 p-4 pb-0 flex flex-col">
              <div className="space-y-1">
                <Label htmlFor="title">Floor name</Label>
                <Input
                  id="title"
                  {...register("name")}
                  className={`col-span-3 ${
                    errors.name && " focus-visible:ring-red-600 border-red-600"
                  }`}
                />
                <ErrorText {...errors.name} />
              </div>
            </div>
            <DrawerFooter className="flex-row justify-end py-4">
              <DrawerClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save floor"}
              </Button>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
