"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatDistanceToNow } from "date-fns";
import { BiFilter, BiPlus, BiSolidBookContent } from "react-icons/bi";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TabLoader from "@/components/common/tab-loader";
import TabError from "@/components/common/tab-error";
import { useRoomsLoader } from "@/loaders/room";
import TabEmpty from "@/components/common/tab-empty";

export default function Rooms() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const { rooms, isLoading, error } = useRoomsLoader();

  const filteredRooms = rooms.filter((room) =>
    searchTerm.length > 0
      ? room.roomClass.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust the number of items per page

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  // Get the rooms to display based on currentPage
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
        button2={{ label: "Add rooms" }}
        button2Icon={BiPlus}
      />
    );

  return (
    <>
      <div className="flex-1 overflow-auto px-6 relative">
        <div className="py-6 flex items-center gap-4">
          <Badge className="py-2 bg-accent/10 text-accent" variant="secondary">
            Total rooms: {rooms.length}
          </Badge>
          <Badge
            className="py-2 bg-green-500/10 text-green-700"
            variant="secondary"
          >
            Vacant rooms: {rooms.length}
          </Badge>
        </div>
        <table className="w-full min-w-[1080px] table-auto text-sm">
          {/* Table Header */}
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

          {/* Table Body */}
          <tbody>
            {displayedRooms.length > 0 ? (
              displayedRooms.map((room, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-muted-foreground/5 text-sm"
                >
                  <td className="w-24 py-4">{room.floor.name}</td>
                  <td className="w-24 py-4">{room.roomNumber}</td>
                  <td className="w-56 py-4 line-clamp-1">{room.roomClass.title}</td>
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

        {/* Pagination */}
        <div className="py-4 flex justify-end gap-4 items-center mt-4 absolute bottom-0 left-0 w-full bg-card shadow-md">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePreviousPage();
                  }}
                />
              </PaginationItem>

              {[...Array(totalPages).keys()].map((page) => (
                <PaginationItem key={page + 1}>
                  <PaginationLink
                    href="#"
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
                  href="#"
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
