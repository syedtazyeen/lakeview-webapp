"use client";

import TabEmpty from "@/components/common/tab-empty";
import TabError from "@/components/common/tab-error";
import TabLoader from "@/components/common/tab-loader";
import {  BiFilter, BiPlus, BiSolidBookContent } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { MoreVertical } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRoomsLoader } from "@/loaders/room";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import StatusBadge from "./_components/status-badge";
import BookingsOverview from "./_components/bookings-overview";

export default function Rooms() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
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
      <div className="flex-1 overflow-auto space-y-10 relative">
        
        <BookingsOverview
          total={rooms.length}
          available={rooms.filter((i) => i.roomStatus === "AVAILABLE").length}
          out={rooms.filter((i) => i.roomStatus !== "AVAILABLE").length}
        />

        <table className="w-full min-w-[1080px] table-auto text-sm">
          <thead className="bg-background border-b sticky top-0 py-1">
            <tr>
              <th className="w-36 pl-6 py-2 text-left font-medium">Floor</th>
              <th className="w-24 py-2 text-left font-medium">Room</th>
              <th className="w-64 py-2 text-left font-medium">Category</th>
              <th className="w-40 py-2 text-left font-medium">Status</th>
              <th className="w-44 py-2 text-left font-medium">Updated at</th>
              <th className="flex-1 py-2 text-left font-medium">Action</th>
              <th className="flex pr-6 justify-end">
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
                <tr key={index} className="border-b text-sm">
                  <td className="w-36 pl-6 py-2">{room.floor.name}</td>
                  <td className="w-24 py-2">{room.roomNumber}</td>
                  <td className="w-56 py-2">{room.roomClass.title}</td>
                  <td className="w-40 py-2">
                    <StatusBadge status={room.roomStatus} />
                  </td>
                  <td className="w-44 py-2">
                    {format(room.updatedAt,"dd/MM/yyyy, HH:mm")}
                  </td>
                  <td colSpan={2} className="flex-1 pr-6 py-2">
                    <Button variant="outline" size="sm">
                      <MoreVertical />
                    </Button>
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
