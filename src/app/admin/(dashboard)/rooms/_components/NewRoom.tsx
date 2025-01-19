"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BiBed, BiPlus } from "react-icons/bi";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function NewRoom() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "";
  const [stage, setStage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState<string>();
  const [selectedFloor, setSelectedFloor] = React.useState<string>();
  const [selectedRoomNumber, setSelectedRoomNumber] = React.useState<string>();
  const [newRoomNumbers, setNewRoomNumbers] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSelectedRoomNumber(undefined);
  }, [newRoomNumbers]);

  function renderContent() {
    switch (stage) {
      case 1:
        return (
          <div>
            <Label>Room Category</Label>
            <p className="mb-4 text-sm text-muted-foreground">
              Select a room category from the available options where you would
              like to add.
            </p>
            <Select
              value={selectedCategory}
              onValueChange={(val) => setSelectedCategory(val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a room category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Room category</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );

      case 2:
        return (
          <div>
            <Label>Room floor</Label>
            <p className="mb-4 text-sm text-muted-foreground">
              Select floor of the rooms from the available options where you
              would like to add.
            </p>
            <Select
              value={selectedFloor}
              onValueChange={(val) => setSelectedFloor(val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Floor</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );

      case 3:
        return (
          <div className="p-1">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium">
              <p className="bg-amber-100 text-amber-700 px-2 py-1 rounded-xl">
                {selectedCategory}
              </p>
              <p className="bg-teal-100 text-teal-700 px-2 py-1 rounded-xl">
                Floor {selectedFloor}
              </p>
              {newRoomNumbers.length > 0 && (
                <p className="bg-green-100 text-green-700 px-2 py-1 rounded-xl">
                  {newRoomNumbers.length} new room
                  {newRoomNumbers.length > 1 && "s"}
                </p>
              )}
            </div>

            {newRoomNumbers.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 h-fit max-h-24 overflow-auto">
                {newRoomNumbers.map((room, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 border bg-muted-foreground/10 px-3 py-2 rounded-xl"
                  >
                    Room {room}
                    <BiPlus
                      onClick={() =>
                        setNewRoomNumbers((prev) =>
                          prev.filter((i) => i !== room)
                        )
                      }
                      className="rotate-45 opacity-50 hover:opacity-100 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}

            <Label>Room number</Label>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!selectedRoomNumber || selectedRoomNumber === "") return;
                setNewRoomNumbers((prev) => [...prev, selectedRoomNumber]);
              }}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Input
                className="col-span-2"
                placeholder="Add room number"
                value={selectedRoomNumber || ""}
                onChange={(e) => setSelectedRoomNumber(e.target.value)}
              />
              <Button
                disabled={!selectedRoomNumber}
                type="submit"
                className="w-fit"
              >
                <BiPlus/>
              </Button>
            </form>
          </div>
        );

      default:
        return;
    }
  }

  function renderFooter() {
    switch (stage) {
      case 1:
        return (
          <>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button onClick={() => setStage(2)} disabled={!selectedCategory}>
              Next
            </Button>
          </>
        );

      case 2:
        return (
          <>
            <Button variant="outline" onClick={() => setStage(1)}>
              Previous
            </Button>
            <Button onClick={() => setStage(3)} disabled={!selectedFloor}>
              Next
            </Button>
          </>
        );

      case 3:
        return (
          <>
            <Button variant="outline" onClick={() => setStage(2)}>
              Previous
            </Button>
            <Button
              onClick={() => setStage(3)}
              disabled={newRoomNumbers.length === 0}
            >
              Save rooms
            </Button>
          </>
        );

      default:
        return;
    }
  }

  function resetValues() {
    setStage(1);
    setNewRoomNumbers([]);
    setSelectedCategory(undefined);
    setSelectedRoomNumber(undefined);
    setSelectedFloor(undefined);
  }

  function handleChange(val: boolean) {
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set("tab", "new");
    } else {
      resetValues();
      params.delete("tab");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }

  return (
    <Drawer open={tab === "new"} onOpenChange={handleChange}>
      <DrawerTrigger asChild>
        <Button size="sm" className="flex items-center gap-1">
          <BiPlus className="text-xl" />
          New rooms
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-4/5">
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>
              <BiBed className="text-3xl mb-1" /> Add new rooms
            </DrawerTitle>
            <DrawerDescription>
              Rooms in your property expand capacity and enable smooth guest
              bookings for an enhanced experience.
            </DrawerDescription>
          </DrawerHeader>
          <div className="h-80 p-4 pb-0 flex flex-col">
            <Label>Step {stage} of 3</Label>
            <div className="relative mt-2 mb-8 w-full h-2 rounded-xl bg-muted-foreground/10 overflow-hidden">
              <div
                style={{ width: `${(stage / 4) * 100 - 5}%` }}
                className={`absolute h-2 bg-accent rounded-xl transition-all duration-200`}
              />
            </div>
            <div className="flex-1">{renderContent()}</div>
          </div>
          <DrawerFooter className="flex-row justify-end py-4">
            {renderFooter()}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
