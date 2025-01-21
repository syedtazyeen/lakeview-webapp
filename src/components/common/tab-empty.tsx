import React from "react";
import { Button, ButtonProps } from "../ui/button";

interface TabEmptyButtonProps extends ButtonProps {
  label: string;
}

interface Props {
  title: string;
  subtitle: string;
  button1?: TabEmptyButtonProps;
  button1Icon?: React.ComponentType<any>;
  button2?: TabEmptyButtonProps;
  button2Icon?: React.ComponentType<any>;
}

export default function TabEmpty({
  title,
  subtitle,
  button1,
  button1Icon: Button1Icon,
  button2,
  button2Icon: Button2Icon,
}: Props) {
  return (
    <div className="bg-background-base max-w-[40rem] aspect-[7/2] my-6 flex flex-col mx-auto p-4 rounded-xl space-y-1 overflow-hidden">
      <p className="font-medium text-lg">{title}</p>
      <p className="text-sm text-muted-foreground flex-1 line-clamp-3">{subtitle}</p>
      <div className="flex items-center gap-4">
        {button1 && (
          <Button variant="ghost" {...button1}>
            {Button1Icon && <Button1Icon />}
            {button1.label}
          </Button>
        )}
        {button2 && (
          <Button {...button2}>
            {Button2Icon && <Button2Icon />}
            {button2.label}
          </Button>
        )}
      </div>
    </div>
  );
}
