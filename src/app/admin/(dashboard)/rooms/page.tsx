"use client";
import { BiFilter, BiPlus, BiSolidBookContent } from "react-icons/bi";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const rooms = [
  {
    room: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    room: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    room: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    room: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    room: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    room: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    room: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    room: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    room: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    room: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    room: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    room: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    room: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    room: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    room: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function TableDemo() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const filteredRooms = rooms.filter((room) =>
    searchTerm.length > 0
      ? room.room.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle the next page
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Function to handle the previous page
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Slice the filtered rooms based on the current page
  const startIndex = (currentPage - 1) * 15;
  const currentInvoices = filteredRooms.slice(startIndex, startIndex + 15);

  // Calculate total pages
  const totalPages = Math.ceil(filteredRooms.length / 15);

  if (rooms.length === 0)
    return (
      <div className="bg-background max-w-[40rem] aspect-[7/2] my-6 mx-auto p-4 rounded-xl space-y-1 overflow-x-hidden">
        <p className="font-medium text-lg">
          Add rooms and begin with guest bookings in loop
        </p>
        <p className="text-sm text-muted-foreground pb-8">
          Proactively support customers wherever they are with targeted and
          personalized outbound messages. Send them in your product or across
          email, SMS, WhatsApp, and more.
        </p>
        <div className="flex items-center gap-4">
          <Button variant="ghost">
            <BiSolidBookContent />
            Learn
          </Button>
          <Button>
            <BiPlus />
            Add room
          </Button>
        </div>
      </div>
    );

  return (
    <>
      <div className="flex-1 overflow-auto px-6">
        <div className="py-4 flex items-center gap-4">
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
        <table className="w-full min-w-[1080px] mt-4 table-auto text-sm">
          {/* Table Header */}
          <thead className="bg-card border-b sticky top-0 py-1">
            <tr>
              <th className="w-44 py-2 text-left font-medium text-muted-foreground">
                Room No.
              </th>
              <th className="w-64 py-2 text-left font-medium text-muted-foreground">
                Category
              </th>
              <th className="w-40 py-2 text-left font-medium text-muted-foreground">
                Floor
              </th>
              <th className="w-40 py-2 text-left font-medium text-muted-foreground">
                Status
              </th>
              <th className="w-40 py-2 text-left font-medium text-muted-foreground">
                Issues
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
            {currentInvoices.length > 0 ? (
              currentInvoices.map((room, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-muted-foreground/5 text-sm"
                >
                  <td className="w-44 py-4">{room.room}</td>
                  <td className="w-64 py-4">Guest {room.room.slice(-3)}</td>
                  <td className="w-40 py-4">{room.paymentStatus}</td>
                  <td className="w-40 py-4">{room.paymentMethod}</td>
                  <td className="w-56 py-4">2</td>
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
        <div className="py-4 flex justify-end gap-4 items-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground w-32 text-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
