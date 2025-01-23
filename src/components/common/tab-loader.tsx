import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface Props {
  placeholder?: string;
}

export default function TabLoader({
  placeholder = "Loading your info..",
}: Props) {
  return (
    <div className="w-full h-full flex flex-col gap-2 items-center py-16 justify-center">
      <span className="p-1 rounded-lg bg-foreground/15">
        <BiLoaderAlt className="animate-spin duration-300 text-3xl" />
      </span>
      <span className="text-base font-medium">{placeholder}</span>
    </div>
  );
}
