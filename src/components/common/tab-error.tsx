import React from "react";
import { BiErrorCircle } from "react-icons/bi";

interface Props {
  message?: string;
  status?: number;
}

export default function TabError({
  message = "Something went wrong, please try again later.",
}: Props) {
  return (
    <div className="w-full flex gap-2 items-center py-16 justify-center text-red-600">
      <BiErrorCircle className="animate-in text-2xl" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
