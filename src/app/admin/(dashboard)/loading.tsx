import TabLoader from "@/components/common/tab-loader";
import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <TabLoader />
    </div>
  );
}
