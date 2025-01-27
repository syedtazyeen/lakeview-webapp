"use client";

import React from "react";
import Search from "./search";
import { Button, ButtonProps } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

export interface TabProps {
  name: string;
  path?: string;
  query?: string;
  active?: boolean;
}

export interface ActionProps extends ButtonProps {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  query?: string;
  withPath?: string;
}

export interface HeaderProps {
  icon?: React.ReactNode;
  name: string;
  tabs?: TabProps[];
  actions?: ActionProps[];
  includeSearch?: boolean;
}

export default function Header({
  icon: Icon,
  name,
  tabs,
  actions,
  includeSearch,
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <div className="px-6 pt-4 bg-background">
        <div className="flex justify-between items-center h-8">
          <p className="font-medium flex items-center gap-2 text-lg">
            {Icon && <span className="text-muted-foreground size-5">{Icon}</span>}
            {name}
          </p>
          <div className="flex justify-end items-center gap-2">
            {includeSearch && <Search />}
            {actions && (
              <div className="min-w-44 flex justify-end">
                {actions.map(
                  (
                    { label, icon: Icon, withPath, path, query, ...props },
                    index
                  ) => {
                    if (withPath) {
                      if (withPath !== pathname) return;
                    }

                    return (
                      <Button
                        key={index}
                        onClick={() =>
                          router.push(path ? path : `${pathname}?${query}`)
                        }
                        className="flex items-center gap-1"
                        {...props}
                      >
                        {Icon} {label}
                      </Button>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {tabs ? (
        <div className="px-6 mt-2 border-b sticky top-0 z-10 bg-background">
          <div className="flex gap-6">
            {tabs.map((props, index) => (
              <TabItem key={index} {...props} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-4 border-b" />
      )}
    </div>
  );
}

function TabItem({ active, name, path, query = "?" }: TabProps) {
  const pathname = usePathname();
  const router = useRouter();

  const twClass =
    active || pathname === path || pathname.includes(query)
      ? "py-1.5 text-sm font-medium border-b-2 border-accent w-fit"
      : "py-1.5 text-sm font-medium text-muted-foreground border-b-2 border-transparent w-fit";

  return (
    <button
      onClick={() =>
        query !== "?"
          ? router.push(`${pathname}?${query}`)
          : router.push(path || "")
      }
      className={twClass}
    >
      {name}
    </button>
  );
}
