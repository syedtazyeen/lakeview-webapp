import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ErrorText from "@/components/common/error-text";
import { BiLoaderAlt } from "react-icons/bi";
import { IData } from ".";
import { DrawerClose } from "@/components/ui/drawer";

const Step1Schema = z.object({
  title: z.string().min(1, "Category title is required"),
  description: z.string().optional(),
});

type Step1FormValues = z.infer<typeof Step1Schema>;

interface Props {
  step: number;
  setStep: (val: number) => void;
  data: IData;
  saveData: (data: Step1FormValues) => void;
}

export default function Step1({ step, setStep, data, saveData }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isValidating },
  } = useForm<Step1FormValues>({
    resolver: zodResolver(Step1Schema),
    defaultValues: data,
  });

  function onSubmit(data: Step1FormValues) {
    saveData(data);
    setStep(step + 1);
  }

  return (
    <form
      className="h-full flex flex-col space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-1">
        <Label htmlFor="title">Category name</Label>
        <Input
          id="title"
          {...register("title")}
          className={`col-span-3 ${
            errors.title && " focus-visible:ring-red-600 border-red-600"
          }`}
        />
        <ErrorText {...errors.title} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          className="col-span-3 resize-none"
        />
        <ErrorText {...errors.description} />
      </div>

      <div className="flex-1 flex items-end justify-end gap-4">
        <DrawerClose asChild>
          <Button variant="outline">Discard</Button>
        </DrawerClose>
        <Button type="submit" disabled={isLoading || isValidating}>
          {isLoading || isValidating ? (
            <BiLoaderAlt className="animate-spin ease-linear" />
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </form>
  );
}
