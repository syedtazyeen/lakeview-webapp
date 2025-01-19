import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Admin login",
    description: "",
  };

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex items-center bg-card justify-center">
      {children}
    </div>
  );
}
