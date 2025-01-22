import React from "react";
import Lottie from "lottie-react";
import LOTTIE_DONE_CHECK from "@/assets/lotties/done-check.json";
import LOTTIE_UPLOAD from "@/assets/lotties/cloud-upload.json";
interface Props {
  loading: boolean;
}

export default function Step4({ loading }: Props) {
  return (
    <div className="w-fit m-auto py-8 flex flex-col items-center">
      <div className="w-28 h-28 overflow-hidden">
        {loading ? (
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
        {loading ? "Adding category" : "Finished"}
      </p>
    </div>
  );
}
