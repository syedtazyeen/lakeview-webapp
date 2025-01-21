"use client";

import { getRoomClasses } from "@/api/room-classes";
import TabError from "@/components/common/tab-error";
import TabLoader from "@/components/common/tab-loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/use-api";
import { formatEnumString } from "@/lib/utils";
import useRoomStore from "@/store/rooms";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";
import {
  BiBed,
  BiGroup,
  BiLoaderAlt,
  BiPlus,
  BiSolidBookContent,
} from "react-icons/bi";
import ViewCategory from "../_components/ViewCategory";

export default function Categories() {
  const router = useRouter();
  const { categories, setCategories } = useRoomStore();
  const { data, isLoading, error } = useApi(getRoomClasses);

  useLayoutEffect(() => {
    if (data) {
      setCategories(data.data);
    }
  }, [data]);

  if (isLoading) return <TabLoader />;

  if (error) return <TabError />;

  if (categories.length === 0)
    return (
      <div className="bg-background-base max-w-[40rem] aspect-[7/2] my-6 mx-auto p-4 rounded-xl space-y-1 overflow-x-hidden">
        {isLoading ? (
          <p className="font-medium text-lg">Loading categories...</p>
        ) : (
          <>
            <p className="font-medium text-lg">
              Add category to begin with creating room for guests
            </p>
            <p className="text-sm text-muted-foreground pb-8">
              Proactively support customers wherever they are with targeted and
              personalized outbound messages. Send them in your product or
              across email, SMS, WhatsApp, and more.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost">
                <BiSolidBookContent />
                Learn
              </Button>
              <Button>
                <BiPlus />
                Add category
              </Button>
            </div>
          </>
        )}
      </div>
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
