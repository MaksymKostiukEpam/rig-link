import type { FC, ReactNode } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/cn";

type Trend = {
  direction: "up" | "down" | "neutral";
  change?: string | number;
};

type Props = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: Trend;
  description?: string;
  className?: string;
};

const KpiCard: FC<Props> = ({
  title,
  value,
  icon,
  trend,
  description,
  className = "",
}) => {
  const trendColor =
    trend?.direction === "up"
      ? "text-green-600"
      : trend?.direction === "down"
        ? "text-destructive"
        : "text-muted-foreground";

  const TrendIcon =
    trend?.direction === "up"
      ? ArrowUp
      : trend?.direction === "down"
        ? ArrowDown
        : null;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
            {icon}
          </div>
        )}

        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        {trend ? (
          <div
            className={cn(
              "flex items-center gap-2 text-sm font-medium",
              trendColor,
            )}
          >
            {TrendIcon && <TrendIcon className="h-4 w-4" />}
            <span>{trend.change}</span>
          </div>
        ) : null}

        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

export default KpiCard;
