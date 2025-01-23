"use client";

import ErrorText from "@/components/common/error-text";
import React, { useState } from "react";
import useRoomStore from "@/store/rooms";
import { Button } from "@/components/ui/button";
import { createFloor } from "@/api/floors";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AddFloorSchema = z.object({
  name: z.string().min(1, "Floor name is required"),
});

type AddFloorFormValues = z.infer<typeof AddFloorSchema>;

export default function AddFloor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTab = searchParams.get("tab") || "";

  const { toast } = useToast();
  const { addFloor } = useRoomStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddFloorFormValues>({
    resolver: zodResolver(AddFloorSchema),
  });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(data: AddFloorFormValues) {
    try {
      setSubmitting(true);
      const res = await createFloor(data);
      addFloor(res.data);
      toast({
        title: "Floor added to your property",
        variant: "success",
      });
      handleTab("floors");
    } catch (error) {
      toast({
        title: "Failed to save floor",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function handleTab(val: string) {
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set("tab", val);
    } else {
      params.delete("tab");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  }

  if (searchTab !== "add-floor") return;

  return (
    <Dialog open onOpenChange={(val) => handleTab(val ? "add-floor" : "")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add floor</DialogTitle>
          <DialogDescription>
            A new floor helps create more rooms in your property, expanding
            capacity and providing a seamless guest experience.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1 mb-4">
          <Input
            id="name"
            placeholder="Floor name"
            {...register("name")}
            className={`col-span-3 ${
              errors.name && " focus-visible:ring-red-600 border-red-600"
            }`}
          />
          <ErrorText {...errors.name} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Discard</Button>
          </DialogClose>
          <Button onClick={handleSubmit(onSubmit)} disabled={submitting}>
            {submitting ? "Saving..." : "Save floor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
