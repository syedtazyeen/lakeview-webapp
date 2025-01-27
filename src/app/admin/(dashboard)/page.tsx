import React from "react";

export default function Dashboard() {
  return (
    <div className="w-full max-w-3xl m-auto h-full flex flex-col">
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex gap-8 h-52">
          <div className="flex-1 bg-background border h-full rounded-xl"></div>
          <div className="flex-1 bg-background border h-full rounded-xl"></div>
        </div>
        <div className="min-h-96 w-full bg-background border rounded-xl"></div>
      </div>

    </div>
  );
}
