import type { FC } from "react";
import { cn } from "@/lib/cn";

type Props = {
  name: string;
  current: number;
  total: number;
  unit?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showNumbers?: boolean;
};

const SIZE_TO_HEIGHT: Record<NonNullable<Props["size"]>, string> = {
  sm: "h-2",
  md: "h-3",
  lg: "h-4",
};

export const InventoryProgress: FC<Props> = ({
  name,
  current,
  total,
  unit = "",
  className = "",
  size = "md",
  showNumbers = true,
}) => {
  const pct =
    total > 0
      ? Math.max(0, Math.min(100, Math.round((current / total) * 100)))
      : 0;

  const barColor =
    pct < 40
      ? "bg-[var(--destructive)]"
      : pct < 70
        ? "bg-[var(--secondary)]"
        : "bg-[var(--chart-2)]";

  const heightClass = SIZE_TO_HEIGHT[size];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <div className="text-sm font-medium text-foreground">{name}</div>
        <div className="text-xs text-muted-foreground">
          {showNumbers
            ? `${current.toLocaleString()} / ${total.toLocaleString()} ${unit}`
            : `${pct}%`}
        </div>
      </div>

      <div
        className={cn(
          "w-full rounded-full bg-muted overflow-hidden",
          heightClass,
        )}
      >
        <div
          className={cn(barColor, "h-full transition-all duration-300")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default InventoryProgress;
