import ErrorText from "@/components/common/error-text";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
import { getRoomClassesAvailability } from "@/api/room-classes";
import { IData } from "./";
import { Label } from "@/components/ui/label";
import { MdBrowserNotSupported } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TabLoader from "@/components/common/tab-loader";

const Step2Schema = z.object({
  roomClassid: z.string().min(1, "Room selection is required"),
});

type Step2FormValues = z.infer<typeof Step2Schema>;

interface Props {
  step: number;
  setStep: (val: number) => void;
  data: IData;
  saveData: (data: Step2FormValues) => void;
}

export default function Step2({ step, setStep, data, saveData }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step2FormValues>({
    resolver: zodResolver(Step2Schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [roomClasses, setRoomClasses] = useState<RoomClass[]>([]);

  async function fetchRoomsByAvalability() {
    if (!data.checkInDate || !data.checkOutDate) return;
    try {
      setIsLoading(true);
      const res = await getRoomClassesAvailability({
        checkInDate: format(data.checkInDate, "yyyy-MM-dd"),
        checkOutDate: format(data.checkOutDate, "yyyy-MM-dd"),
       // guestCount: data.guestCount,
      });
      setRoomClasses(res.data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(stepData: Step2FormValues) {
    saveData(stepData);
    setStep(step + 1);
  }

  useEffect(() => {
    fetchRoomsByAvalability();
  }, []);

  if (isLoading) return <TabLoader />;

  return (
    <form
      className="h-full flex flex-col space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {roomClasses.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center h-36 bg-amber-600/10 text-muted-foreground rounded-lg">
          <MdBrowserNotSupported className="size-6"/>
          <p className="text-sm">Rooms unavailable</p>
        </div>
      ) : (
        <div className="space-y-1">
          <Label>Room floor</Label>
          <p className="mb-4 text-sm text-muted-foreground">
            Select floor of the roomClasses from the available options where you
            would like to add.
          </p>
          <Controller
            name="roomClassid"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {roomClasses.map((room, index) => (
                      <SelectItem key={index} value={room.id}>
                        {room.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <ErrorText {...errors.roomClassid} />
        </div>
      )}

      <div className="flex-1 flex items-end justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(step - 1)}
        >
          Previous
        </Button>
        <Button type="submit" disabled={!isValid}>
          Next
        </Button>
      </div>
    </form>
  );
}
