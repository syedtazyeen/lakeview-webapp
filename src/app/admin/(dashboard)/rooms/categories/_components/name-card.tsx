import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Wrench } from "lucide-react";
import React from "react";

interface Props {
  selected: boolean;
  handleSelect: (id?: string) => void;
  category?: RoomClass;
}

export default function NameCard({ category, selected, handleSelect }: Props) {
  return (
    <div
      onClick={() => handleSelect(category?.id)}
      className={cn(
        "aspect-[21/9] h-28 rounded-lg p-4 border flex flex-col cursor-pointer transition-colors duration-200",
        selected ? "border-accent" : "hover:border-muted-foreground/50"
      )}
    >
      <div className="flex-1 flex justify-between w-full">
        <p className="text-muted-foreground text-sm">
          {category && "Category"}
        </p>
        {category && selected && (
          <Button variant="outline" size="icon">
            <Wrench />
          </Button>
        )}
      </div>
      <p className="text-lg font-medium line-clamp-2">
        {category ? category.title : "All categories"}
      </p>
    </div>
  );
}
