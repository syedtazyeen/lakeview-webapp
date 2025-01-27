"use client";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import InputWithIcon from "./input-with-icon";

export default function Search() {
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

  return (
    <InputWithIcon
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      aria-label="Search"
      placeholder="Search"
      className="w-80 h-11  rounded-full"
      variant="lg"
      icon={BiSearch}
      clearable
    />
  );
}
