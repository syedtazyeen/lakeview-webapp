import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface Props {
  placeholder?: string;
}

export default function TabLoader({
  placeholder = "Loading your info..",
}: Props) {
  return (
    <div className="w-full flex flex-col gap-2 items-center py-16 justify-center text-accent">
      <span className="p-1 rounded-lg bg-accent">
        <BiLoaderAlt className="animate-spin duration-300 text-3xl text-background" />
      </span>
      <span className="text-sm font-medium">{placeholder}</span>
    </div>
  );
}
