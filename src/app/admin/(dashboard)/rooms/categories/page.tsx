"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { BiBed, BiGroup, BiPlus, BiSolidBookContent } from "react-icons/bi";
import TabEmpty from "@/components/common/tab-empty";
import TabError from "@/components/common/tab-error";
import TabLoader from "@/components/common/tab-loader";
import { Badge } from "@/components/ui/badge";
import { formatEnumString } from "@/lib/utils";
import { useRoomClassesLoader } from "@/loaders/room";
import ViewCategory from "../_components/ViewCategory";

export default function Categories() {
  const router = useRouter();
  const { categories, isLoading, error } = useRoomClassesLoader();

  if (isLoading) return <TabLoader />;

  if (error) return <TabError />;

  if (categories.length === 0)
    return (
      <TabEmpty
        title="Add a room category to begin with creating guest spaces"
        subtitle="Introduce a new room category or class specifically designed to accommodate guests. This creates a dedicated space tailored to their needs, enhancing comfort and providing a seamless experience."
        button1={{ label: "Learn" }}
        button1Icon={BiSolidBookContent}
        button2={{ label: "Add room category" }}
        button2Icon={BiPlus}
      />
    );

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 p-4 max-w-[2560px]">
      <ViewCategory />
      {categories.map((category, index) => (
        <div
          key={index}
          onClick={() =>
            router.push("/admin/rooms/categories?view=" + category.id)
          }
          className="p-2 flex flex-col rounded-xl cursor-pointer border border-transparent hover:border-border group transition-colors duration-300"
        >
          <div className="w-full aspect-square rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              src="https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"
            />
          </div>
          <div className="">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1 py-1">
                <BiGroup className="text-base" />
                <span className="mt-0.5">{category.maxGuestCount}</span>
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 py-1">
                <BiBed className="text-base" />
                <span className="mt-0.5">
                  {category.bedTypes.map((bedType, index) =>
                    index > 0 ? ", " : "" + formatEnumString(bedType)
                  )}
                </span>
              </Badge>
            </div>
            <p className="font-medium">{category.title}</p>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {category.description}
            </p>
            <p className="font-medium">
              ₹{" "}
              {new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 2,
              }).format(category.basePrice)}{" "}
              <span className="font-normal text-sm">night</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
