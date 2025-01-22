import {
  BiSolidBed,
  BiSolidBuildings,
  BiSolidCalendar,
  BiSolidCog,
  BiSolidGroup,
  BiSolidLayout,
} from "react-icons/bi";

export const sidebarMenu = [
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
    label: "Property",
    icon: BiSolidBuildings,
    href: "/property",
  },
  {
    label: "Settings",
    icon: BiSolidCog,
    href: "/settings",
  },
];
