"use client";

import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/api/auth";
import useAuthStore from "@/store/auth";
import { setAppCookie } from "@/lib/cookies";
import { COOKIES } from "@/lib/constants";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    startTransition(async () => {
      try {
        const res = await login(data);
        setToken(res.data.token);
        setUser(res.data.user);
        setAppCookie(COOKIES.AUTH_TOKEN, res.data.token);
        router.push("/admin");
        toast({
          title: "Login successfull",
          variant: "success",
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.message);
          const errMsg =
            error.status === 404 ? "User not found" : "Failed to login";
          toast({
            title: errMsg,
            variant: "destructive",
          });
        } else
          toast({
            title: "Login failed",
            variant: "destructive",
          });
      }
    });
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 p-6">
        <Logo />
      </div>
      <div className="w-full max-w-96 p-8 rounded-xl flex flex-col items-center gap-4">
        <div className="relative mb-8 flex items-center">
          <p className="font-semibold text-3xl">Welcome</p>
          <p className="absolute -top-2 -right-12 text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-lg">
            Admin
          </p>
        </div>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-1 w-full">
            <label className="text-sm">Work email</label>
            <Input
              placeholder="name@company.com"
              {...register("email")}
              disabled={isPending}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1 w-full">
            <label className="text-sm">Password</label>
            <Input
              type="password"
              placeholder="password"
              {...register("password")}
              disabled={isPending}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="w-full flex items-center gap-2 text-sm">
            <input type="checkbox" disabled={isPending} />
            <p>Keep me logged in</p>
          </div>
          <Button className="w-full mt-4" type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Log in"}
          </Button>
        </form>
        <Button variant="link" disabled={isPending}>
          Forgot password?
        </Button>
      </div>
    </>
  );
}
