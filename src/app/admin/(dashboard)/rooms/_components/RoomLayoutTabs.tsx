"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface RoomLayoutTabProps {
  label: string;
  path: string;
  active?: boolean;
}

const list: RoomLayoutTabProps[] = [
  { label: "All rooms", path: "" },
  { label: "Categories", path: "categories" },
  { label: "Floors", path: "?tab=floors" },
];

export default function RoomLayoutTabs() {
  const pathname = usePathname();
  return (
    <div className="flex gap-6">
      {list.map((item, index) => (
        <RoomLayoutTabItem
          key={index}
          active={
            item.path === ""
              ? pathname.endsWith(`/rooms`)
              : pathname.endsWith(`/rooms/${item.path}`)
          }
          {...item}
        />
      ))}
    </div>
  );
}

function RoomLayoutTabItem({ active, label, path }: RoomLayoutTabProps) {
  const router = useRouter();
  const twClass = active
    ? "py-1.5 text-sm font-medium border-b-2 border-accent w-fit"
    : "py-1.5 text-sm font-medium text-muted-foreground border-b-2 border-transparent w-fit";

  return (
    <button
      onClick={() => router.push("/admin/rooms/" + path)}
      className={twClass}
    >
      {label}
    </button>
  );
}
