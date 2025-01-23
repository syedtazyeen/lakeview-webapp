"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface LayoutTabProps {
  label: string;
  path: string;
  active?: boolean;
}

const list: LayoutTabProps[] = [
  { label: "All rooms", path: "" },
  { label: "Categories", path: "categories" },
  { label: "Floors", path: "?tab=floors" },
];

export default function LayoutTabs() {
  const pathname = usePathname();
  return (
    <div className="flex gap-6">
      {list.map((item, index) => (
        <LayoutTabItem
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

function LayoutTabItem({ active, label, path }: LayoutTabProps) {
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
