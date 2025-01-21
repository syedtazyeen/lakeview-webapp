import React from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { useFloorsLoader, useRoomClassesLoader } from "@/loaders/room";
import TabLoader from "@/components/common/tab-loader";

export interface IData {
  categoryId?: string;
  floorId?: string;
  roomNumbers?: string[];
}
const initialData: IData = {};

export default function NewRoom() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "";
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState<IData>(initialData);
  const { isLoading: floorsLoading } = useFloorsLoader();
  const { isLoading: categoriesLoading } = useRoomClassesLoader();

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
        return (
          <Step4 step={step} setStep={(val) => setStep(val)} data={data} />
        );

      default:
        return;
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

  return (
    <Drawer open={tab === "new"} onOpenChange={handleChange}>
      <DrawerTrigger asChild>
        <Button size="sm" className="flex items-center gap-1">
          <BiPlus className="text-xl" /> New category
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
                  <Label className="mt-4">Step {step} of 3</Label>
                  <div className="relative mt-2 mb-8 w-full h-2 rounded-xl bg-muted-foreground/10 overflow-hidden">
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
