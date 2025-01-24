"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { BiCheckCircle, BiErrorCircle, BiInfoCircle } from "react-icons/bi";

export function Toaster() {
  const { toasts } = useToast();

  const icon = {
    success: BiCheckCircle,
    destructive: BiErrorCircle,
    default: BiInfoCircle,
  };

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        const Icon = variant ? icon[variant] : null;
        return (
          <Toast key={id} variant={variant} {...props}>
            {Icon && <Icon className="size-5" />}
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
