"use client";

import React, { useEffect, useState } from "react";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import { BiBed } from "react-icons/bi";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
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
  roomClassId?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  guestCount?: number;
  addOns?: string[];
  bookingStatus?: BookingStatus;
  paymentStatus?: PaymentStatus;
}
const initialData: IData = {
  guestCount: 1,
};

export default function AddBooking() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
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
                checkInDate: val.checkInDate,
                checkOutDate: val.checkOutDate,
                guestCount: val.guestCount,
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
                roomClassId: val.roomClassid,
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

  async function createBooking() {
    setSaving(true);
    try {
    } catch (_) {
      toast({
        title: "Error creating booking",
        description: "An error occurred while creating the booking.",
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
      params.set(QUERIES.TAB, TABS.BOOKINGS.ADD_BOOKING);
    } else {
      params.delete(QUERIES.TAB);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  }

  useEffect(() => {
    if (step === 4) {
      createBooking();
    }
  }, [step]);

  return (
    <Drawer
      open={tab === TABS.BOOKINGS.ADD_BOOKING}
      onOpenChange={handleChange}
    >
      <DrawerContent className="h-full">
        <div className="h-full overflow-auto">
          <div className="mx-auto w-full max-w-xl">
            <DrawerHeader className="sticky top-0 bg-background z-50">
              <DrawerTitle>
                <BiBed className="text-3xl mb-1" /> Add new boooking
              </DrawerTitle>
              <DrawerDescription>
                Book a room for your guests and host them in your property.
              </DrawerDescription>
              {step < 4 && (
                <>
                  <Label className="mt-4 mb-0.5">Step {step} of 3</Label>
                  <Progress value={(step / 4) * 100} className="h-2" />
                </>
              )}
            </DrawerHeader>
            <div className="px-4 py-4">{renderContent()}</div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
