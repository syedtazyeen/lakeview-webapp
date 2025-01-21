"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { BiPlus, BiSolidBookContent } from "react-icons/bi";
import TabEmpty from "@/components/common/tab-empty";
import TabError from "@/components/common/tab-error";
import TabLoader from "@/components/common/tab-loader";
import ViewCategory from "../_components/ViewCategory";
import { useFloorsLoader } from "@/loaders/room";

export default function Categories() {
  const router = useRouter();
  const { floors, isLoading, error } = useFloorsLoader();

  if (isLoading) return <TabLoader />;

  if (error) return <TabError message={error} />;

  if (floors.length === 0)
    return (
      <TabEmpty
        title="Add a floor to begin with creating guest rooms"
        subtitle="Start by constructing an additional floor to provide dedicated space for
        hosting guests. This ensures comfort and flexibility for visitors while
        enhancing the overall functionality of the space."
        button1={{ label: "Learn" }}
        button1Icon={BiSolidBookContent}
        button2={{ label: "Add floor" }}
        button2Icon={BiPlus}
      />
    );

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 p-4 max-w-[2560px]">
      <ViewCategory />
      {floors.map((floor, index) => (
        <div
          key={index}
          onClick={() => router.push("/admin/rooms/floors?view=" + floor.id)}
          className="p-2 flex flex-col rounded-xl cursor-pointer bg-card shadow-md border border-transparent hover:border-border group transition-colors duration-300"
        >
          {floor.name}
        </div>
      ))}
    </div>
  );
}
