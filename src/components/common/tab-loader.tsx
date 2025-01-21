import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface Props {
  placeholder?: string;
}

export default function TabLoader({ placeholder = "Loading" }: Props) {
  return (
    <div className="w-full flex gap-2 items-center py-16 justify-center text-accent">
      <BiLoaderAlt className="animate-spin text-2xl" />
      <span className="text-sm font-medium">
        {placeholder}
      </span>
    </div>
  );
}
