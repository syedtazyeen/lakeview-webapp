"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { BiBed, BiFilter, BiPlus, BiSolidBookContent } from "react-icons/bi";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import TabLoader from "@/components/common/tab-loader";
import TabError from "@/components/common/tab-error";
import TabEmpty from "@/components/common/tab-empty";
import { useFloorsLoader, useRoomsLoader } from "@/loaders/room";
import { GrServices } from "react-icons/gr";
import { LucideDoorOpen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ViewFloors from "./_components/query-tabs/ViewFloors";
import AddFloor from "./_components/query-tabs/AddFloor";

export default function Rooms() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const searchTab = searchParams.get("tab") || "";
  const { rooms, isLoading, error } = useRoomsLoader();

  const filteredRooms = rooms.filter((room) =>
    searchTerm.length > 0
      ? room.roomClass.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  const displayedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  function handleFloorTab(val: boolean) {
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set("tab", "floor");
    } else {
      params.delete("tab");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  }

  function handleNewFloorTab(val: boolean) {
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set("tab", "new-floor");
    } else {
      params.delete("tab");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  }

  if (isLoading) return <TabLoader />;

  if (error) return <TabError message={error} />;

  if (rooms.length === 0)
    return (
      <TabEmpty
        title="Add new rooms and begin with guest bookings in loop"
        subtitle=" Proactively support customers wherever they are with targeted and
          personalized outbound messages. Send them in your product or across
          email, SMS, WhatsApp, and more."
        button1={{ label: "Learn" }}
        button1Icon={BiSolidBookContent}
        button2={{
          label: "Add rooms",
          onClick: () => router.push(`${pathname}?tab=new`),
        }}
        button2Icon={BiPlus}
      />
    );

  return (
    <>
      <div className="flex-1 overflow-auto px-6 space-y-10 relative">
        <div className="flex items-center gap-4 mt-10">
          <div className="relative flex flex-col p-3 h-28 space-y-1 aspect-video border shadow-sm rounded-lg">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <p className="text-sm text-muted-foreground">Total rooms</p>
            <p className="flex flex-1 items-end text-2xl font-medium">
              {rooms.length}
            </p>
            <BiBed className="absolute right-4 bottom-4 text-2xl" />
          </div>
          <div className="relative flex flex-col p-3 h-28 space-y-1 aspect-video border shadow-sm rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-600" />
            <p className="text-sm text-muted-foreground">Vacant rooms</p>
            <p className="flex flex-1 items-end text-2xl font-medium">
              {rooms.filter((i) => i.roomStatus === "AVAILABLE").length}
            </p>
            <LucideDoorOpen className="absolute right-4 bottom-4 text-2xl" />
          </div>
          <div className="relative flex flex-col p-3 h-28 space-y-1 aspect-video border shadow-sm rounded-lg">
            <div className="w-2 h-2 rounded-full bg-amber-600" />
            <p className="text-sm text-muted-foreground">Out of service</p>
            <p className="flex flex-1 items-end text-2xl font-medium">
              {rooms.filter((i) => i.roomStatus !== "AVAILABLE").length}
            </p>
            <GrServices className="absolute right-4 bottom-4 text-2xl" />
          </div>
        </div>

        <ViewFloors rooms={rooms} />

        <AddFloor/>

        <table className="w-full min-w-[1080px] table-auto text-sm">
          <thead className="bg-background border-b sticky top-0 py-1">
            <tr>
              <th className="w-24 py-2 text-left font-medium text-muted-foreground">
                Floor
              </th>
              <th className="w-24 py-2 text-left font-medium text-muted-foreground">
                Room No.
              </th>
              <th className="w-64 py-2 text-left font-medium text-muted-foreground">
                Category
              </th>
              <th className="w-40 py-2 text-left font-medium text-muted-foreground">
                Status
              </th>
              <th className="w-40 py-2 text-left font-medium text-muted-foreground">
                Last updated
              </th>
              <th className="flex-1 py-2 text-left font-medium text-muted-foreground">
                Action
              </th>
              <th className="flex justify-end">
                <Button size="sm" variant="outline" className="mx-4 my-1">
                  <BiFilter />
                  Filters
                </Button>
              </th>
            </tr>
          </thead>

          <tbody>
            {displayedRooms.length > 0 ? (
              displayedRooms.map((room, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-muted-foreground/5 text-sm"
                >
                  <td className="w-24 py-4">{room.floor.name}</td>
                  <td className="w-24 py-4">{room.roomNumber}</td>
                  <td className="w-56 py-4 line-clamp-1">
                    {room.roomClass.title}
                  </td>
                  <td className="w-40 py-4">{room.roomStatus}</td>
                  <td className="w-40 py-4">
                    {formatDistanceToNow(room.updatedAt, { addSuffix: true })}
                  </td>
                  <td colSpan={2} className="flex-1 py-4">
                    view
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-10 py-4 text-center font-medium text-muted-foreground"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={1 === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePreviousPage();
                  }}
                />
              </PaginationItem>

              {[...Array(totalPages).keys()].map((page) => (
                <PaginationItem key={page + 1}>
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page + 1);
                    }}
                    className={currentPage === page + 1 ? "bg-accent/20" : ""}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  disabled={totalPages === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNextPage();
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}
