"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface LayoutTabProps {
  label: string;
  path?: string;
  query?: string;
  active?: boolean;
}

export default function LayoutTabs() {
  const pathname = usePathname();
  return (
    <div className="flex gap-6">
      <LayoutTabItem
        active={pathname === "/admin/rooms"}
        label={"All rooms"}
        path={"/admin/rooms"}
      />
      <LayoutTabItem
        active={pathname.endsWith("/rooms/categories")}
        label={"Categories"}
        path={"/admin/rooms/categories"}
      />
      <LayoutTabItem
        active={pathname.endsWith("?tab=floors")}
        label={"Floors"}
        query={`?tab=floors`}
      />
    </div>
  );
}

function LayoutTabItem({ active, label, path, query = "?" }: LayoutTabProps) {
  const pathname = usePathname();
  const router = useRouter();

  const twClass = active
    ? "py-1.5 text-sm font-medium border-b-2 border-accent w-fit"
    : "py-1.5 text-sm font-medium text-muted-foreground border-b-2 border-transparent w-fit";

  return (
    <button
      onClick={() =>
        query !== "?"
          ? router.push(`${pathname}${query}`)
          : router.push(path || "")
      }
      className={twClass}
    >
      {label}
    </button>
  );
}
