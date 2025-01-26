"use client";

import Overview from "@/components/common/overview";
import StatusBadge from "./_components/status-badge";
import TabEmpty from "@/components/common/tab-empty";
import TabError from "@/components/common/tab-error";
import TabLoader from "@/components/common/tab-loader";
import { BiFilter, BiPlus, BiSolidBookContent } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { matchesAny } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import { useBookingsLoader } from "@/loaders/bookings";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { QUERIES, TABS } from "@/lib/constants";

export default function Rooms() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const { bookings, isLoading, error } = useBookingsLoader();

  const filteredRooms = bookings.filter((booking) =>
    searchTerm.length > 0
      ? matchesAny(searchTerm, [booking.id, booking.user.fullName])
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

  if (bookings.length === 0)
    return (
      <TabEmpty
        title="Add bookings and begin with hosting guests"
        subtitle=" Proactively support customers wherever they are with targeted and
          personalized outbound messages. Send them in your product or across
          email, SMS, WhatsApp, and more."
        button1={{ label: "Learn" }}
        button1Icon={BiSolidBookContent}
        button2={{
          label: "Add bookings",
          onClick: () =>
            router.push(
              `${pathname}?${QUERIES.TAB}=${TABS.BOOKINGS.ADD_BOOKING}`
            ),
        }}
        button2Icon={BiPlus}
      />
    );

  return (
    <>
      <div className="flex-1 overflow-auto space-y-10 relative">
        <div className="px-6 space-y-4 mt-8">
          <p className="font-medium">Overview</p>
          <div className="flex items-center gap-6">
            <Overview
              label={"Checked in"}
              value={
                bookings.filter((i) => i.bookingStatus === "CHECKED_IN").length
              }
              total={bookings.length}
            />
            <Overview
              label={"Pending"}
              value={
                bookings.filter((i) => i.bookingStatus === "CONFIRMED").length
              }
              total={bookings.length}
            />
            <Overview
              label={"Completed"}
              value={
                bookings.filter((i) => i.bookingStatus === "CHECKED_OUT").length
              }
              total={bookings.length}
            />
            <Overview
              label={"Cancelled"}
              value={
                bookings.filter((i) => i.bookingStatus !== "CANCELLED").length
              }
              total={bookings.length}
            />
          </div>
        </div>

        <table className="w-full min-w-[1080px] table-auto text-sm">
          <thead className="bg-background border-b sticky top-0 py-1">
            <tr>
              <th className="w-36 pl-6 py-2 text-left font-medium">ID</th>
              <th className="w-24 py-2 text-left font-medium">Guest name</th>
              <th className="w-64 py-2 text-left font-medium">Amount</th>
              <th className="w-40 py-2 text-left font-medium">Status</th>
              <th className="w-44 py-2 text-left font-medium">Check-in date</th>
              <th className="w-44 py-2 text-left font-medium">
                Check-out date
              </th>
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
              displayedRooms.map((booking, index) => (
                <tr key={index} className="border-b text-sm">
                  <td className="w-36 pl-6 py-2">{booking.id}</td>
                  <td className="w-24 py-2">{booking.user.fullName}</td>
                  <td className="w-56 py-2">{booking.bookingAmount}</td>
                  <td className="w-40 py-2">
                    <StatusBadge status={booking.bookingStatus} />
                  </td>
                  <td className="w-40 py-2">
                    {format(booking.checkInDate, "dd/MM/yyyy")}
                  </td>
                  <td className="w-40 py-2">
                    {format(booking.checkOutDate, "dd/MM/yyyy")}
                  </td>
                  <td className="w-44 py-2">
                    {format(booking.updatedAt, "dd/MM/yyyy, HH:mm")}
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
