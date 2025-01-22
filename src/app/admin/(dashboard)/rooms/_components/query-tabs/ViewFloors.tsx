import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BiPlus } from "react-icons/bi";
import { formatDistanceToNow } from "date-fns";
import { useFloorsLoader } from "@/loaders/room";
import TabLoader from "@/components/common/tab-loader";

export default function ViewFloors({ rooms }: { rooms: Room[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTab = searchParams.get("tab") || "";
  const { floors, isLoading } = useFloorsLoader(searchTab === "floors");

  function handleTab(val: string) {
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set("tab", val);
    } else {
      params.delete("tab");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  }

  if (searchTab !== "floors") return;

  return (
    <Dialog open onOpenChange={(val) => handleTab(val ? "floors" : "")}>
      <DialogContent className="min-h-96 flex flex-col">
        <DialogHeader className="">
          <DialogTitle>Room floors</DialogTitle>
          <DialogDescription>
            Manage and view all floor details
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <TabLoader />
          ) : (
            <table className="w-full table-auto text-sm">
              <thead className="bg-background border-b sticky top-0">
                <tr>
                  <th className="py-2 text-left font-medium text-muted-foreground">
                    Floor Name
                  </th>
                  <th className="py-2 text-left font-medium text-muted-foreground">
                    Total Rooms
                  </th>
                  <th className="py-2 text-left font-medium text-muted-foreground">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {floors.map((floor, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-muted-foreground/5"
                  >
                    <td className="py-3">{floor.name}</td>
                    <td className="py-3">
                      {
                        rooms.filter((room) => room.floor.id === floor.id)
                          .length
                      }
                    </td>
                    <td className="py-3">
                      {formatDistanceToNow(floor.updatedAt, {
                        addSuffix: true,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={() => handleTab("add-floor")}
            size="sm"
            className="flex items-center gap-1"
          >
            <BiPlus className="text-xl" /> New floor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
