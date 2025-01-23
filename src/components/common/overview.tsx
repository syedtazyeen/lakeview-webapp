import * as math from "mathjs";
import { cn } from "@/lib/utils";

interface IOverview {
  label: string;
  value: number;
  total: number;
}

export default function Overview({ label, value, total }: IOverview) {
  const percentage = math.round((value / total) * 100, 1);

  const color =
    percentage > 66
      ? "bg-green-500"
      : percentage > 33
      ? "bg-amber-500"
      : percentage > 0
      ? "bg-orange-500"
      : "bg-muted";

  const filledIndex = percentage > 66 ? 2 : percentage > 33 ? 1 : 0;

  return (
    <div className="space-y-2 min-w-48 w-fit overflow-hidden">
      <p className="text-muted-foreground text-sm">{label}</p>
      <div className="flex items-center gap-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-5 w-1.5 rounded-xl",
              index <= filledIndex ? color : "bg-muted"
            )}
          />
        ))}
        <p className="ml-1 font-medium text-lg">{percentage}%</p>
        <p className="ml-2 text-sm text-muted-foreground">
          {value}/{total}
        </p>
      </div>
    </div>
  );
}
