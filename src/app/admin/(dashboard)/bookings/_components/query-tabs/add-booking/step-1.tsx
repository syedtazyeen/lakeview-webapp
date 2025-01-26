import React from "react";
import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { IData } from ".";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/ui/date-picker";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

const Step2Schema = z.object({
  checkInDate: z.date({ required_error: "Check-in date required" }),
  checkOutDate: z.date({ required_error: "Check-out date required" }),
  guestCount: z.coerce
    .number({ message: "Number of guests is required" })
    .min(1, { message: "At least 1 guest is required" }),
});

type Step1FormValues = z.infer<typeof Step2Schema>;

interface Props {
  step: number;
  setStep: (val: number) => void;
  data: IData;
  saveData: (data: Step1FormValues) => void;
}

export default function Step1({ step, setStep, data, saveData }: Props) {
  const form = useForm<Step1FormValues>({
    resolver: zodResolver(Step2Schema),
    defaultValues: data,
  });

  function onSubmit(stepData: Step1FormValues) {
    saveData(stepData);
    setStep(step + 1);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="checkInDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Check in date</FormLabel>
                <DatePicker
                  name="Check in date"
                  date={field.value}
                  setDate={(val) => {
                    if (val) {
                      field.onChange(val);
                      form.resetField("checkOutDate");
                    }
                  }}
                  fromDate={new Date()}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkOutDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Check out date</FormLabel>
                <DatePicker
                  disabled={!form.watch("checkInDate")}
                  name="Check out date"
                  date={field.value}
                  setDate={(val) => {
                    if (val) {
                      field.onChange(val);
                    }
                  }}
                  fromDate={form.watch("checkInDate")}
                />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="guestCount"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Total guests</FormLabel>
              <div className="flex items-center gap-12">
                <Slider
                  defaultValue={[1]}
                  max={100}
                  step={1}
                  value={[field.value]}
                  onValueChange={(val) => field.onChange(val)}
                  className="min-w-28"
                />
                <Input
                  type="number"
                  value={field.value}
                  onChange={(e) =>
                    e.target.value ? field.onChange(e.target.valueAsNumber) : ""
                  }
                />
              </div>
            </FormItem>
          )}
        />
        <div className="pt-8 flex items-end justify-end gap-4">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
