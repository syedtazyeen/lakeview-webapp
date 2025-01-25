"use client";
import React, { useEffect, useRef, useState } from "react";
import { BiPlusCircle, BiSearch } from "react-icons/bi";

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const updateQueryParam = () => {
      const params = new URLSearchParams(window.location.search);
      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    };

    const delayDebounceFn = setTimeout(updateQueryParam, 250);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-center border rounded-lg w-80 h-10 overflow-hidden text-sm">
      <span
        className="h-full bg-muted-foreground/10 text-muted-foreground flex items-center px-2"
        aria-label="Search Icon"
      >
        <BiSearch className="text-lg" />
      </span>
      <input
        ref={inputRef}
        placeholder={`Search`}
        className="flex-1 px-2 bg-transparent outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search"
      />
      {searchTerm.length > 0 && (
        <BiPlusCircle
          onClick={() => setSearchTerm("")}
          className="text-lg rotate-45 mr-2 text-muted-foreground/50 hover:text-muted-foreground cursor-pointer"
        />
      )}
    </div>
  );
}
