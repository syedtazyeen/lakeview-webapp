import Logo from "@/components/common/logo";
import { COOKIES } from "@/lib/constants";
import { deleteAppCookie } from "@/lib/cookies";
import { sidebarMenu } from "@/lib/menu";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { ThemeToggle } from "./theme-toggle";

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

  function handleLogout() {
    deleteAppCookie(COOKIES.AUTH_TOKEN);
    router.push("/admin");
  }

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`${
        expanded ? "w-48" : "w-16"
      } fixed z-0 h-[calc(100%-1rem)] px-2.5 py-4 mt-2 gap-2 overflow-hidden flex flex-col items-center transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col items-start w-full px-2 mb-10">
        <Logo />
      </div>

      <div className="flex-1 w-full space-y-1">
        {sidebarMenu.map(({ icon: Icon, label, href }, index) => {
          const isActive =
            index === 0
              ? pathname === "/admin"
              : pathname.startsWith(`/admin${href}`);

          return (
            <div
              key={index}
              onClick={() => handleNavigation(href)}
              className={`relative px-[0.78rem] h-11 flex gap-2 items-center text-sm cursor-pointer w-full
                 rounded-full overflow-hidden border
                ${
                  isActive
                    ? "bg-background dark:bg-accent text-accent dark:text-foreground shadow-sm border-border"
                    : "hover:bg-foreground/5 border-transparent"
                } group transition-all duration-300 ease-in-out`}
            >
              <div className="w-fit flex items-center gap-2">
                <Icon className="size-4 z-20 translate-y-[0.5px]" />
                <span className={expanded ? "translate-y-[1px]" : "hidden"}>
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full space-y-1">
        <ThemeToggle expanded={expanded} />
        <div
          className={`relative px-[0.78rem] h-11 flex gap-2 items-center cursor-pointer w-full
            rounded-lg overflow-hidden border group transition-all duration-300 ease-in-out text-sm text-red-600 hover:bg-red-600/10`}
          onClick={handleLogout}
        >
          <div className="w-fit flex items-center gap-2">
            <BiLogOut className="text-lg z-20 " />
            <span className={expanded ? "translate-y-[1px]" : "hidden"}>
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
