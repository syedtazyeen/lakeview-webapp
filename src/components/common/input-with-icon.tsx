"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, InputHTMLAttributes } from "react";
import { BiPlusCircle } from "react-icons/bi";

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<any>;
  clearable?: boolean;
  variant?: "sm" | "md" | "lg";
}

export default function ({
  icon: Icon,
  clearable = false,
  className = "",
  value: controlledValue,
  onChange,
  variant = "lg",
  ...props
}: InputWithIconProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(controlledValue || "");

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const handleClear = () => {
    setValue("");
    onChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const sizeClasses = {
    sm: "h-8 text-xs",
    md: "h-10 text-sm",
    lg: "h-12 text-base",
  };

  const iconSizeClasses = {
    sm: "size-3",
    md: "size-4",
    lg: "size-5",
  };

  return (
    <div
      className={cn(
        "flex items-center border rounded-lg overflow-hidden w-full",
        sizeClasses[variant],
        className
      )}
    >
      {Icon && (
        <span
          className="h-full bg-muted-foreground/10 text-muted-foreground flex items-center px-2.5"
          aria-label="Icon"
        >
          <Icon className={`${iconSizeClasses[variant]}`} />
        </span>
      )}
      <input
        ref={inputRef}
        className="flex-1 px-2 bg-transparent outline-none h-full"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e);
        }}
        {...props}
      />
      {clearable && value && (
        <BiPlusCircle
          onClick={handleClear}
          className="text-lg rotate-45 mr-2 text-muted-foreground/50 hover:text-muted-foreground cursor-pointer"
        />
      )}
    </div>
  );
}
