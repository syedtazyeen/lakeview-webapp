"use client";
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface TabProps {
  label: string;
  path: string;
  active?: boolean;
}

const list: TabProps[] = [
  { label: "All rooms", path: "" },
  { label: "Categories", path: "categories" },
  { label: "Floors", path: "floors" },
];

export default function Tabs() {
  const pathname = usePathname();
  return (
    <div className="flex gap-6">
      {list.map((item, index) => (
        <TabItem
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

function TabItem({ active, label, path }: TabProps) {
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
