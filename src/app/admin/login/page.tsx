"use client";

import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/api/auth";
import useAuthStore from "@/store/auth";
import { setAppCookie } from "@/lib/cookies";
import { COOKIES } from "@/lib/constants";
import { AxiosError } from "axios";
import { Badge } from "@/components/ui/badge";
import { BiKey, BiLoaderAlt } from "react-icons/bi";
import { Form, FormField, FormItem } from "@/components/ui/form";
import InputWithIcon from "@/components/common/input-with-icon";
import { MdEmail } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { setUser, setToken } = useAuthStore();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    startTransition(async () => {
      try {
        const res = await login(data);
        setAppCookie(COOKIES.AUTH_TOKEN, res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        window.location.reload();
        toast({
          title: "Logged in successfully",
          variant: "success",
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          const errMsg =
            error.status === 404 ? "User not found" : "Failed to login";
          toast({
            title: errMsg,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Failed to login",
            variant: "destructive",
          });
        }
      }
    });
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 p-6">
        <Logo />
      </div>
      <div className="w-full max-w-md p-8 rounded-xl flex flex-col items-center gap-4">
        <div className="text-center mb-8">
          <h1 className="font-bold text-4xl">Welcome</h1>
          <p className="text-muted-foreground font-medium">Let's get started</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <Label className="text-muted-foreground">Work email</Label>
                  <InputWithIcon
                    icon={MdEmail}
                    type="email"
                    placeholder="email@example.com"
                    disabled={isPending}
                    {...field}
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <Label className="text-muted-foreground">Password</Label>
                  <InputWithIcon
                    icon={BiKey}
                    type="password"
                    placeholder="your password"
                    disabled={isPending}
                    {...field}
                  />
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <Button
              className={cn(
                isPending ? "w-1/2" : "w-full",
                "mt-4 text-base font-semibold transition-all duration-300 disabled:opacity-80"
              )}
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <span className="scale-150">
                  <BiLoaderAlt className="animate-spin" />
                </span>
              ) : (
                "Log in"
              )}
            </Button>
            <Button
              type="button"
              variant="link"
              className="text-foreground"
              disabled={isPending}
            >
              Forgot password?
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
