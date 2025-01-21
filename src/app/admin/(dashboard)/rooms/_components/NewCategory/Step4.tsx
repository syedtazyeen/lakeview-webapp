import React, { useState, useEffect } from "react";
import { IData } from ".";
import Lottie from "lottie-react";
import LOTTIE_DONE_CHECK from "@/assets/lotties/done-check.json";
import LOTTIE_UPLOAD from "@/assets/lotties/cloud-upload.json";
import { usePathname, useRouter } from "next/navigation";
import { createRoomClass } from "@/api/room-classes";
import { useToast } from "@/hooks/use-toast";
import useRoomStore from "@/store/rooms";

interface Props {
  step: number;
  setStep: (val: number) => void;
  data: IData;
}

export default function Step4({ step, setStep, data }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { addCategory } = useRoomStore();
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  function uploadImages() {}

  async function createRoomCategory() {
    try {
      setSubmitting(true);
      setProgress(10);
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
    } catch (error) {
      setStep(step - 1);
      toast({
        title: "Failed to save category",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (step === 4 && !submitting) {
      createRoomCategory();
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
