import React from "react";
import { GlobalError } from "react-hook-form";

export default function ErrorText(error?: GlobalError) {
  if (error)
    return (
      <p className="text-red-500 text-xs font-medium">{error.message}</p>
    );

  return null;
}
