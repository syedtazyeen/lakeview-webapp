import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  total: number;
  limit: number;
  currentPage: number;
  setCurrentPage: (val: number) => void;
}

export default function PaginationBar({
  total,
  limit,
  currentPage,
  setCurrentPage,
}: Props) {
  const totalPages = Math.ceil(total / limit);

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
  return (
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
  );
}
