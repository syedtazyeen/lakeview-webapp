import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import ErrorText from "@/components/common/error-text";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRoomStore from "@/store/rooms";
import { zodResolver } from "@hookform/resolvers/zod";
import { IData } from "./";
import TabEmpty from "@/components/common/tab-empty";
import { BiPlus, BiSolidBookContent } from "react-icons/bi";
import { useRouter } from "next/navigation";

const Step2Schema = z.object({
  floorId: z.string().min(1, "Floor is required"),
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
    defaultValues: data,
  });

  const router = useRouter();
  const { floors } = useRoomStore();

  function onSubmit(stepData: Step2FormValues) {
    saveData(stepData);
    setStep(step + 1);
  }

  return (
    <form
      className="h-full flex flex-col space-y-4 min-h-52"
      onSubmit={handleSubmit(onSubmit)}
    >
      {floors.length === 0 ? (
        <TabEmpty
          title="Adding a room requires a floor"
          subtitle="Start by constructing an additional floor to provide dedicated space for
              hosting guests. This ensures comfort and flexibility for visitors while
              enhancing the overall functionality of the space."
          page={false}
          button1={{ label: "Learn" }}
          button1Icon={BiSolidBookContent}
          button2={{
            label: "Add floor",
            onClick: () => router.push(`/admin/rooms/floors?tab=new`),
          }}
          button2Icon={BiPlus}
        />
      ) : (
        <div className="space-y-1">
          <Label>Room floor</Label>
          <p className="mb-4 text-sm text-muted-foreground">
            Select floor of the rooms from the available options where you would
            like to add.
          </p>
          <Controller
            name="floorId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {floors.map((floor, index) => (
                      <SelectItem key={index} value={floor.id}>
                        {floor.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <ErrorText {...errors.floorId} />
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
