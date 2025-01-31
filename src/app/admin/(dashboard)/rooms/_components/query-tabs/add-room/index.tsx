"use client";

import React, { useEffect, useState } from "react";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import TabLoader from "@/components/common/tab-loader";
import useRoomStore from "@/store/rooms";
import { BiBed } from "react-icons/bi";
import { createRoom } from "@/api/rooms";
import { Label } from "@/components/ui/label";
import { useFloorsLoader, useRoomClassesLoader } from "@/loaders/room";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { QUERIES, TABS } from "@/lib/constants";

export interface IData {
  categoryId?: string;
  floorId?: string;
  roomNumbers?: string[];
}
const initialData: IData = {};

export default function NewRoom() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { toast } = useToast();
  const { addRoom } = useRoomStore();
  const [saving, setSaving] = useState(false);
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState<IData>(initialData);

  const { isLoading: floorsLoading } = useFloorsLoader();
  const { isLoading: categoriesLoading } = useRoomClassesLoader();

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
                categoryId: val.categoryId,
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
                floorId: val.floorId,
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
                roomNumbers: val,
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

  async function createManyRooms() {
    setSaving(true);
    try {
      if (!data.categoryId || !data.floorId || !data.roomNumbers) return;
      const roomClassId = data.categoryId;
      const floorId = data.floorId;
      const roomPromises = Object.keys(data.roomNumbers).map((roomNumber) =>
        createRoom({
          roomClassId,
          floorId,
          roomNumber,
          roomStatus: "AVAILABLE",
        })
      );

      const res = await Promise.all(roomPromises);
      res.map((i) => addRoom(i.data));

      toast({
        title: "Rooms created successfully",
        description: "All rooms have been created.",
        variant: "success",
      });
      setStep(1);
      setData(initialData);
      router.push(pathname);
    } catch (_) {
      toast({
        title: "Error creating rooms",
        description: "An error occurred while creating the rooms.",
        variant: "destructive",
      });
      setStep(step - 1);
    } finally {
      setSaving(false);
    }
  }

  function handleChange(val: boolean) {
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set(QUERIES.TAB, TABS.ROOMS.ADD_ROOMS);
    } else {
      params.delete(QUERIES.TAB);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  }

  useEffect(() => {
    if (step === 4) {
      createManyRooms();
    }
  }, [step]);

  return (
    <Drawer open={tab === TABS.ROOMS.ADD_ROOMS} onOpenChange={handleChange}>
      <DrawerContent className="h-full">
        <div className="h-full overflow-auto">
          <div className="mx-auto w-full max-w-xl">
            <DrawerHeader className="sticky top-0 bg-background z-50">
              <DrawerTitle>
                <BiBed className="text-3xl mb-1" /> Add new rooms
              </DrawerTitle>
              <DrawerDescription>
                Rooms in your property expand capacity and enable smooth guest
                bookings for an enhanced experience.
              </DrawerDescription>
              {!floorsLoading && !categoriesLoading && step < 4 && (
                <>
                  <Label className="mt-2 mb-0.5">Step {step} of 3</Label>
                  <Progress value={(step / 4) * 100} className="h-2" />
                </>
              )}
            </DrawerHeader>
            {floorsLoading || categoriesLoading ? (
              <TabLoader />
            ) : (
              <div className="px-4 pb-4 min-h-56">{renderContent()}</div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
