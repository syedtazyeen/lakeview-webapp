import Logo from "@/components/common/logo";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  BiArrowToLeft,
  BiMenu,
  BiSolidBed,
  BiSolidBuildings,
  BiSolidCalendar,
  BiSolidCog,
  BiSolidGroup,
  BiSolidLayout,
} from "react-icons/bi";

const menuItems = [
  {
    label: "Dashboard",
    icon: BiSolidLayout,
    href: "/",
  },
  {
    label: "Bookings",
    icon: BiSolidCalendar,
    href: "/bookings",
  },
  {
    label: "Rooms",
    icon: BiSolidBed,
    href: "/rooms",
  },
  {
    label: "Guests",
    icon: BiSolidGroup,
    href: "/guests",
  },
  {
    label: "Settings",
    icon: BiSolidCog,
    href: "/settings",
  },
  {
    label: "Hotel",
    icon: BiSolidBuildings,
    href: "/org",
  },
];

export default function Sidebar({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(`/admin${href}`);
  };

  return (
    <div
      className={`${
        expanded ? "w-52" : "w-14"
      } fixed z-0 h-[calc(100%-1rem)] px-1.5 py-4 mt-2 gap-2 mx-2 overflow-hidden bg-background flex flex-col items-center rounded-2xl shadow-md transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col items-start w-full px-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className={`h-6 w-full flex items-center ${
            expanded ? "justify-end" : "justify-center"
          } rounded-full hover:text-accent mt-1 mb-10`}
        >
          {expanded ? (
            <BiArrowToLeft className="text-xl" />
          ) : (
            <BiMenu className="text-2xl" />
          )}
        </button>
      </div>

      {menuItems.map(({ icon: Icon, label, href }, index) => {
        const isActive =
          index === 0
            ? pathname === "/admin"
            : pathname.startsWith(`/admin${href}`);

        return (
          <div
            key={index}
            onClick={() => handleNavigation(href)}
            className={`relative px-3 h-10 flex gap-2 justify-start items-center text-sm font-medium cursor-pointer w-full
                 rounded-lg overflow-hidden
                ${
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : ""
                } group transition-all duration-300 ease-in-out`}
          >
            <div className="w-fit flex items-center gap-2">
              <Icon className="text-xl z-20 " />
              <span className={expanded ? "translate-y-[1px]" : "hidden"}>{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
