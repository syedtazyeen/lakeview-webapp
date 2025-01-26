"use client";

import React, { useEffect, useState } from "react";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import useRoomStore from "@/store/rooms";
import { BiBed } from "react-icons/bi";
import { createRoomClass } from "@/api/room-classes";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { QUERIES, TABS } from "@/lib/constants";

export interface IData {
  title: string;
  description?: string;
  basePrice?: number;
  maxGuestCount?: number;
  bedTypes: string;
  features: string[];
  images: File[];
}
const initialData: IData = {
  title: "",
  bedTypes: "",
  features: [],
  images: [],
};

export default function NewCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { toast } = useToast();
  const { addCategory } = useRoomStore();
  const [saving, setSaving] = useState(false);
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState<IData>(initialData);

  const tab = searchParams.get(QUERIES.TAB) || "";

  function renderContent() {
    switch (step) {
      case 1:
        return (
          <Step1
            step={step}
            setStep={(val) => setStep(val)}
            data={data}
            saveData={(val) =>
              setData((prevData) => ({
                ...prevData,
                title: val.title,
                description: val.description,
              }))
            }
          />
        );

      case 2:
        return (
          <Step2
            step={step}
            setStep={(val) => setStep(val)}
            data={data}
            saveData={(val) =>
              setData((prevData) => ({
                ...prevData,
                basePrice: val.basePrice,
                maxGuestCount: val.maxGuestCount,
                bedTypes: val.bedTypes,
                features: val.features,
              }))
            }
          />
        );

      case 3:
        return (
          <Step3
            step={step}
            setStep={(val) => setStep(val)}
            data={data}
            saveData={(val) =>
              setData((prevData) => ({
                ...prevData,
                images: val.images,
              }))
            }
          />
        );

      case 4:
        return <Step4 loading={saving} />;

      default:
        return;
    }
  }

  function handleChange(val: boolean) {
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set(QUERIES.TAB, TABS.ROOMS.ADD_CATEGORY);
    } else {
      params.delete(QUERIES.TAB);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  }

  async function createRoomCategory() {
    try {
      setSaving(true);
      const res = await createRoomClass({
        title: data.title,
        description: data.description || "",
        basePrice: data.basePrice || 0,
        maxGuestCount: data.maxGuestCount || 0,
        features: data.features,
        bedTypes: [data.bedTypes],
      });
      addCategory(res.data);
      toast({
        title: "Room category saved",
        variant: "success",
      });
      router.push(pathname);
    } catch (_) {
      setStep(step - 1);
      toast({
        title: "Failed to save category",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    if (step === 4) {
      createRoomCategory();
    }
  }, [step]);

  return (
    <Drawer open={tab === TABS.ROOMS.ADD_CATEGORY} onOpenChange={handleChange}>
      <DrawerContent className="h-full">
        <div className="h-full overflow-auto">
          <div className="mx-auto w-full max-w-xl">
            <DrawerHeader className="sticky top-0 bg-background z-50">
              <DrawerTitle>
                <BiBed className="text-3xl mb-1" /> Add new room category
              </DrawerTitle>
              <DrawerDescription>
                Room category in your property expand guest choices and enable
                smooth bookings for an enhanced experience.
              </DrawerDescription>
              {step < 4 && (
                <>
                  <Label className="mt-4">Step {step} of 3</Label>
                  <div className="relative mt-2 mb-4 w-full h-2 rounded-xl bg-muted-foreground/10 overflow-hidden">
                    <div
                      style={{ width: `${(step / 4) * 100}%` }}
                      className={`absolute h-2 bg-accent rounded-xl transition-all duration-200`}
                    />
                  </div>
                </>
              )}
            </DrawerHeader>
            <div className="px-4 pb-4">{renderContent()}</div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
