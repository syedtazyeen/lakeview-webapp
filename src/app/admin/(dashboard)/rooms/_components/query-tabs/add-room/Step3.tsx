import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BiPlus } from "react-icons/bi";
import { Label } from "@/components/ui/label";
import { IData } from ".";
import useRoomStore from "@/store/rooms";
import { Input } from "@/components/ui/input";

interface Props {
  step: number;
  setStep: (val: number) => void;
  data: IData;
  saveData: (data: string[]) => void;
}

export default function Step3({ step, setStep, data, saveData }: Props) {
  const { categories, floors } = useRoomStore();
  const [roomNumbers, setRoomNumbers] = useState<string[]>(data.roomNumbers || []);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState<string>();
  const thisCategory = categories.find((i) => i.id === data.categoryId);
  const thisFloor = floors.find((i) => i.id === data.floorId);

  function handleAddRoom() {
    if (!selectedRoomNumber) return;
    setRoomNumbers((prev) => [...prev, selectedRoomNumber]);
    setSelectedRoomNumber("");
  }

  function onSubmit() {
    saveData(roomNumbers);
    setStep(step + 1);
  }

  return (
    <div className="p-1">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium">
        <p className="bg-amber-100 text-amber-700 px-2 py-1 rounded-xl">
          Category: {thisCategory?.title}
        </p>
        <p className="bg-teal-100 text-teal-700 px-2 py-1 rounded-xl">
          Floor: {thisFloor?.name}
        </p>
        {roomNumbers && roomNumbers.length > 0 && (
          <p className="bg-green-100 text-green-700 px-2 py-1 rounded-xl">
            {roomNumbers.length} new room
            {roomNumbers.length > 1 && "s"}
          </p>
        )}
      </div>
      {roomNumbers && roomNumbers.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 h-fit max-h-24 overflow-auto">
          {roomNumbers.map((room, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border bg-muted-foreground/10 px-3 py-2 rounded-xl"
            >
              Room {room}
              <BiPlus
                onClick={() =>
                  setRoomNumbers(roomNumbers.filter((i) => i !== room))
                }
                className="rotate-45 opacity-50 hover:opacity-100 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
      <Label>Room number</Label>
      <div className="grid grid-cols-4 items-center gap-4">
        <Input
          className="col-span-2"
          placeholder="Add room number"
          value={selectedRoomNumber || ""}
          onChange={(e) => setSelectedRoomNumber(e.target.value)}
        />
        <Button
          onClick={handleAddRoom}
          disabled={!selectedRoomNumber}
          className="w-fit"
        >
          <BiPlus />
        </Button>
      </div>

      <div className="flex-1 flex items-end justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(step - 1)}
        >
          Previous
        </Button>
        <Button onClick={onSubmit} disabled={roomNumbers.length < 1}>
          Next
        </Button>
      </div>
    </div>
  );
}
