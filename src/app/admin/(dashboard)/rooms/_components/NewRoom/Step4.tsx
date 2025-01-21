import React, { useState, useEffect } from "react";
import { IData } from ".";
import Lottie from "lottie-react";
import LOTTIE_DONE_CHECK from "@/assets/lotties/done-check.json";
import LOTTIE_UPLOAD from "@/assets/lotties/cloud-upload.json";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import useRoomStore from "@/store/rooms";
import { createRoom } from "@/api/rooms";

interface Props {
  step: number;
  setStep: (val: number) => void;
  data: IData;
}

export default function Step4({ step, setStep, data }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { addRoom } = useRoomStore();
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  async function createRooms() {
    setSubmitting(true);
    setProgress(0);

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

      setProgress(100);
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
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (step === 4 && !submitting) {
      createRooms();
    }
  }, []);

  return (
    <div className="w-fit m-auto py-8 flex flex-col items-center">
      <div className="w-28 h-28 overflow-hidden">
        {submitting || progress === 0 ? (
          <Lottie animationData={LOTTIE_UPLOAD} loop={true} autoplay={true} />
        ) : (
          <Lottie
            animationData={LOTTIE_DONE_CHECK}
            loop={true}
            autoplay={true}
          />
        )}
      </div>
      <p className="text-xl font-medium text-muted-foreground text-center">
        {submitting || progress === 0 ? "Uploading category" : "Finished"}
      </p>
    </div>
  );
}
