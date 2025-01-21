import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import ErrorText from "@/components/common/error-text";
import { IData } from ".";
import { DrawerClose } from "@/components/ui/drawer";
import useRoomStore from "@/store/rooms";

const Step2Schema = z.object({
  categoryId: z.string().min(1, "Category is required"),
});

type Step1FormValues = z.infer<typeof Step2Schema>;

interface Props {
  step: number;
  setStep: (val: number) => void;
  data: IData;
  saveData: (data: Step1FormValues) => void;
}

export default function Step1({ step, setStep, data, saveData }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step1FormValues>({
    resolver: zodResolver(Step2Schema),
    defaultValues: data,
  });

  const { categories } = useRoomStore();

  function onSubmit(stepData: Step1FormValues) {
    saveData(stepData);
    setStep(step + 1);
  }

  return (
    <form
      className="h-full flex flex-col space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-1">
        <Label>Room category</Label>
        <p className="mb-4 text-sm text-muted-foreground">
          Select the class of rooms from the available options where you would
          like to add.
        </p>
        <Controller
          name="categoryId"
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
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <ErrorText {...errors.categoryId} />
      </div>

      <div className="pt-4 flex items-end justify-end gap-4">
        <DrawerClose asChild>
          <Button variant="outline">Discard</Button>
        </DrawerClose>
        <Button type="submit" disabled={!isValid}>
          Next
        </Button>
      </div>
    </form>
  );
}
