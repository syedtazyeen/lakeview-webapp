import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { DATA_BED_TYPES, DATA_ROOM_FEATURES } from "@/data";
import { capitalizeFirstLetter, formatEnumString } from "@/lib/utils";
import { BiCheck, BiLoaderAlt } from "react-icons/bi";
import { Badge } from "@/components/ui/badge";
import { IData } from ".";

const Step2Schema = z.object({
  maxGuestCount: z.coerce.number().min(1, "Capacity must be at least 1"),
  basePrice: z.coerce.number({ message: "Base price is required" }),
  bedTypes: z.string().min(1, "Bed type is required"),
  features: z.array(z.string()),
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
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isLoading, isValidating, defaultValues },
  } = useForm<Step2FormValues>({
    resolver: zodResolver(Step2Schema),
    defaultValues: data,
  });
  const initialAmenities: string[] = (
    defaultValues && defaultValues.features
      ? defaultValues.features.filter((amenity) => amenity !== undefined)
      : []
  ) as string[];
  const [selectedAmenities, setSelectedAmenities] = useState(initialAmenities);

  function onSubmit(stepData: Step2FormValues) {
    saveData(stepData);
    setStep(step + 1);
  }

  const toggleAmenity = (feature: string) => {
    const updatedAmenities = selectedAmenities.includes(feature)
      ? selectedAmenities.filter((amenity) => amenity !== feature)
      : [...selectedAmenities, feature];
    setValue("features", updatedAmenities);
    setSelectedAmenities(updatedAmenities);
  };

  return (
    <form
      className="h-full flex flex-col space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-1">
        <Label htmlFor="maxGuestCount">Capacity</Label>
        <Input
          id="maxGuestCount"
          type="number"
          {...register("maxGuestCount", { valueAsNumber: true })}
          className={`col-span-3 ${
            errors.maxGuestCount && "focus-visible:ring-red-600 border-red-600"
          }`}
        />
        <ErrorText {...errors.maxGuestCount} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="maxGuestCount">Base price</Label>
        <Input
          id="basePrice"
          type="number"
          {...register("basePrice", { valueAsNumber: true })}
          className={`col-span-3 ${
            errors.basePrice && "focus-visible:ring-red-600 border-red-600"
          }`}
        />
        <ErrorText {...errors.basePrice} />
      </div>

      <div className="space-y-1">
        <Label>Bed type</Label>
        <Controller
          name="bedTypes"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(value)}
              value={field.value}
            >
              <SelectTrigger
                className={`${
                  errors.bedTypes && "focus-visible:ring-red-600 border-red-600"
                }`}
              >
                <SelectValue placeholder="Select a bed type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {DATA_BED_TYPES.map((bedTypes) => (
                    <SelectItem key={bedTypes} value={bedTypes}>
                      {capitalizeFirstLetter(bedTypes)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <ErrorText {...errors.bedTypes} />
      </div>

      <div className="space-y-1">
        <Label>Amenities</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {DATA_ROOM_FEATURES.map((feature) => {
            const isAmenitySelected = selectedAmenities.includes(feature);
            return (
              <Badge
                aria-label={`Toggle amenity: ${feature}`}
                variant={isAmenitySelected ? "default" : "outline"}
                key={feature}
                className={`py-1 text-sm font-normal cursor-pointer ${
                  isAmenitySelected
                    ? "bg-accent text-background hover:bg-accent/90"
                    : "hover:bg-accent/10"
                }`}
                onClick={() => toggleAmenity(feature)}
              >
                {formatEnumString(feature)}
                {isAmenitySelected && (
                  <BiCheck className="ml-1 bg-background rounded-full text-accent" />
                )}
              </Badge>
            );
          })}
        </div>
        <ErrorText {...errors.features} />
      </div>

      <div className="flex-1 flex items-end justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(step - 1)}
        >
          Previous
        </Button>
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
