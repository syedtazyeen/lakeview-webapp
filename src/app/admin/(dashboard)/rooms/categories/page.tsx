"use client";

import { getRoomClasses } from "@/api/room-classes";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useTransition } from "react";
import { BiLoaderAlt, BiPlus, BiSolidBookContent } from "react-icons/bi";

export default function Categories() {
  const [categories, setCategories] = useState<RoomClass[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function fetchCategories() {
    try {
      setLoading(true);
      const res = await getRoomClasses();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    startTransition(() => {
      fetchCategories();
    });
  }, []);

  if (loading)
    return (
      <div className="w-full flex gap-2 items-center py-16 justify-center text-accent">
        <BiLoaderAlt className="animate-spin text-2xl" />
        <span className="text-sm font-medium translate-y-[1px]">Loading</span>
      </div>
    );

  if (categories.length === 0)
    return (
      <div className="bg-background-base max-w-[40rem] aspect-[7/2] my-6 mx-auto p-4 rounded-xl space-y-1 overflow-x-hidden">
        {isPending ? (
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
    <div className="flex flex-wrap gap-4 p-6">
      {categories.map((category, index) => (
        <div
          key={index}
          className="bg-card shadow-md border rounded-xl aspect-video h-32"
        >
          {category.title}
        </div>
      ))}
    </div>
  );
}
