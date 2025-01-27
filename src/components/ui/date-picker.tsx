"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

type DatePickerProps = CalendarProps & {
  name: string;
  date?: Date;
  setDate: (val?: Date) => void;
  placeholder?: string;
  dateFormat?: string;
  disabled?: boolean;
};

export function DatePicker({
  date,
  setDate,
  name,
  placeholder = "Pick a date",
  dateFormat = "PPP",
  disabled,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative w-auto">
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger disabled={disabled} asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal rounded-md",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, dateFormat) : <span>{placeholder}</span>}
          </Button>
        </DialogTrigger>
        <DialogPortal forceMount>
          <DialogContent className="w-auto p-5">
            <DialogTitle>{name}</DialogTitle>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(val) => {
                setDate(val);
                setOpen(false);
              }}
              initialFocus
              fromDate={props.fromDate}
              toDate={props.toDate}
            />
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
