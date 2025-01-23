import React from "react";
import LOTTIE_DONE_CHECK from "@/assets/lotties/done-check.json";
import LOTTIE_UPLOAD from "@/assets/lotties/cloud-upload.json";
import LottieAnimation from "@/components/common/lottie-animation";

interface Props {
  loading: boolean;
}

export default function Step4({ loading }: Props) {
  return (
    <div className="w-fit m-auto py-8 flex flex-col items-center">
      <div className="w-20 h-20 overflow-hidden">
        {loading ? (
          <LottieAnimation
          animationData={LOTTIE_UPLOAD} loop={true} autoplay={true}
          className="w-full h-full"
        />
        ) : (

          <LottieAnimation
          animationData={LOTTIE_DONE_CHECK}
          loop={true}
          autoplay={true}
          className="w-full h-full"
        />
        )}
      </div>
      <p className="text-xl font-medium text-muted-foreground text-center">
        {loading ? "Adding rooms" : "Finished"}
      </p>
    </div>
  );
}
