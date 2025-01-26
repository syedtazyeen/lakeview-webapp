"use client";

import React, { useState } from "react";
import TabEmpty from "@/components/common/tab-empty";
import TabError from "@/components/common/tab-error";
import TabLoader from "@/components/common/tab-loader";
import ViewCategory from "../_components/view-category";
import { BiPlus, BiSolidBookContent } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import Overview from "@/components/common/overview";
import { useRoomClassesLoader, useRoomsLoader } from "@/loaders/room";
import { formatEnumString } from "@/lib/utils";
import NameCard from "./_components/name-card";
import { Badge } from "@/components/ui/badge";

export default function Categories() {
  const pathname = usePathname();
  const router = useRouter();
  const { categories, isLoading, error } = useRoomClassesLoader();
  const { rooms } = useRoomsLoader();
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);
  const [selectedCategory, setSelectedCategory] = useState<RoomClass>();

  function handleSelectCategory(id?: string) {
    if (id) {
      setSelectedCategory(categories.find((cat) => cat.id === id));
      setFilteredRooms(rooms.filter((rm) => rm.roomClass.id === id));
    } else {
      setSelectedCategory(undefined);
      setFilteredRooms(rooms);
    }
  }

  if (isLoading) return <TabLoader />;

  if (error) return <TabError />;

  if (categories.length === 0)
    return (
      <TabEmpty
        title="Add a room category to begin with creating guest spaces"
        subtitle="Introduce a new room category or class specifically designed to accommodate guests. This creates a dedicated space tailored to their needs, enhancing comfort and providing a seamless experience."
        button1={{ label: "Learn" }}
        button1Icon={BiSolidBookContent}
        button2={{
          label: "Add room category",
          onClick: () => router.push(`${pathname}?tab=new`),
        }}
        button2Icon={BiPlus}
      />
    );

  return (
    <div className="flex-1 overflow-auto space-y-10 relative">
      <div className="px-6 my-8 flex gap-6 overflow-x-auto select-none hide-scrollbar">
        <NameCard
          selected={!selectedCategory}
          handleSelect={handleSelectCategory}
        />
        {categories.map((category, index) => (
          <NameCard
            key={index}
            category={category}
            selected={selectedCategory?.id === category.id}
            handleSelect={handleSelectCategory}
          />
        ))}
      </div>

      <div className="px-6 max-w-[2200px] grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="w-full space-y-8">
          <div className="space-y-4">
            <p className="font-medium">Overview</p>
            <div className="flex items-center gap-6">
              <Overview
                label={"Vacant"}
                value={
                  filteredRooms.filter((i) => i.roomStatus === "AVAILABLE")
                    .length
                }
                total={filteredRooms.length}
              />
              <Overview
                label={"Occupied"}
                value={
                  filteredRooms.filter((i) => i.roomStatus === "AVAILABLE")
                    .length
                }
                total={filteredRooms.length}
              />
              <Overview
                label={"Out of service"}
                value={
                  filteredRooms.filter((i) => i.roomStatus !== "AVAILABLE")
                    .length
                }
                total={filteredRooms.length}
              />
            </div>
          </div>

          {selectedCategory && (
            <>
              <div className="space-y-2">
                <p className="font-medium">Description</p>
                <p className="max-w-xl text-sm">
                  {selectedCategory.description}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Amenities</p>
                <div className="flex flex-wrap gap-4">
                  {selectedCategory.features.map((ft, index) => (
                    <Badge
                      variant={"outline"}
                      key={index}
                      className={`py-1 text-sm font-normal cursor-pointer`}
                    >
                      {formatEnumString(ft)}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="w-full">
          {selectedCategory && (
            <div className="border rounded-xl w-full max-w-3xl mx-auto aspect-video flex overflow-hidden">
              <div className="w-2/3 h-full">
                <img
                  className="h-full w-full object-cover"
                  src="/images/picture-placeholder.png"
                />
              </div>
              <div className="w-1/3 h-full flex flex-col">
                <img
                  className="w-full object-cover flex-1"
                  src="/images/picture-placeholder.png"
                />
                <img
                  className="w-full object-cover flex-1"
                  src="/images/picture-placeholder.png"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* {categories.map((category, index) => (
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
      ))} */}
      <ViewCategory />
    </div>
  );
}
