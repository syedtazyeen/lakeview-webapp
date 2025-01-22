import Link from "next/link";
import React from "react";

interface Props {
  href?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ href = "/", size = "md" }: Props) {
  return (
    <Link href={href}>
      <div className="h-7 w-7 text-foreground">
        <img className="w-full h-full" src="/logo.svg" />
      </div>
    </Link>
  );
}
