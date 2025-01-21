import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { BiBed, BiPlus } from "react-icons/bi";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { useFloorsLoader, useRoomClassesLoader } from "@/loaders/room";
import TabLoader from "@/components/common/tab-loader";
import { useToast } from "@/hooks/use-toast";
import useRoomStore from "@/store/rooms";
import { createRoom } from "@/api/rooms";

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

  const tab = searchParams.get("tab") || "";

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
      router.push(pathname);
    } catch (error) {
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
      params.set("tab", "new");
    } else {
      params.delete("tab");
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
    <Drawer open={tab === "new"} onOpenChange={handleChange}>
      <DrawerTrigger asChild>
        <Button size="sm" className="flex items-center gap-1">
          <BiPlus className="text-xl" /> New rooms
        </Button>
      </DrawerTrigger>
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
                  <Label className="mt-2">Step {step} of 3</Label>
                  <div className="relative mt-2 mb-4 w-full h-2 rounded-xl bg-muted-foreground/10 overflow-hidden">
                    <div
                      style={{ width: `${(step / 4) * 100}%` }}
                      className={`absolute h-2 bg-accent rounded-xl transition-all duration-200`}
                    />
                  </div>
                </>
              )}
            </DrawerHeader>
            {floorsLoading || categoriesLoading ? (
              <TabLoader />
            ) : (
              <div className="px-4 pb-4">{renderContent()}</div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
