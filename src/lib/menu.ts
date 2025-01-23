import {
  BiSolidBed,
  BiSolidBuildings,
  BiSolidCalendar,
  BiSolidCog,
  BiSolidGroup,
  BiSolidLayout,
  BiSolidReceipt,
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
    label: "Invoices",
    icon: BiSolidReceipt,
    href: "/invoices",
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
