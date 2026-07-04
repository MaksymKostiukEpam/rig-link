import type { FC, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

type Props = {
  title: string;
  value: ReactNode;
  icon?: ReactNode;
  trend?: {
    direction: "up" | "down" | "neutral";
    change: string;
  };
  description?: string;
  className?: string;

  /**
   * Optional accent color for the icon background and trend badge.
   * Examples:
   * blue | green | purple | orange | red
   */
  accent?: "blue" | "green" | "purple" | "orange" | "red";
};

const accentStyles = {
  blue: {
    icon: "bg-blue-500/15 text-blue-400",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  },
  green: {
    icon: "bg-emerald-500/15 text-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  },
  purple: {
    icon: "bg-violet-500/15 text-violet-400",
    badge: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  },
  orange: {
    icon: "bg-orange-500/15 text-orange-400",
    badge: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  },
  red: {
    icon: "bg-red-500/15 text-red-400",
    badge: "bg-red-500/15 text-red-400 border-red-500/20",
  },
} as const;

const MetricCard: FC<Props> = ({
  title,
  value,
  icon,
  trend,
  description,
  className,
  accent = "blue",
}) => {
  const colors = accentStyles[accent];

  return (
    <div
      className={cn(
        "group rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm",
        "p-6 transition-all duration-200",
        "hover:-translate-y-1 hover:border-border hover:shadow-xl hover:shadow-black/10",
        className,
      )}
    >
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-full",
              "ring-1 ring-white/5",
              colors.icon,
            )}
          >
            {icon}
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <div className="mt-2 text-5xl font-bold tracking-tight text-foreground">
              {value}
            </div>
          </div>
        </div>

        {trend && (
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-xl border px-3 py-1.5",
              "text-sm font-semibold",
              colors.badge,
            )}
          >
            {trend.direction === "up" && <ArrowUpRight className="h-4 w-4" />}

            {trend.direction === "down" && (
              <ArrowDownRight className="h-4 w-4" />
            )}

            {trend.direction === "neutral" && <Minus className="h-4 w-4" />}

            {trend.change}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-border/60" />

      {/* Bottom */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{description}</p>

        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
          Live
        </span>
      </div>
    </div>
  );
};
export default MetricCard;
