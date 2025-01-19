import { usePathname, useRouter } from "next/navigation";
import React from "react";
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
        expanded ? "w-48" : "w-10"
      } fixed z-0 h-full py-6 gap-2 mx-3 overflow-hidden `}
    >
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

      {menuItems.map(({ icon: Icon, label, href }, index) => {
        const isActive =
          index === 0
            ? pathname === "/admin"
            : pathname.startsWith(`/admin${href}`);

        return (
          <div
            key={index}
            onClick={() => handleNavigation(href)}
            className={`relative px-2.5 my-2 h-9 flex gap-4 items-center text-sm font-medium cursor-pointer
                ${
                  expanded
                    ? "w-full justify-start rounded-lg"
                    : "aspect-square rounded-lg justify-center"
                }
                ${
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground"
                } group`}
          >
            <Icon className="text-base z-20" />
            {expanded && label}
          </div>
        );
      })}
    </div>
  );
}
