import type { FC, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

type Props = {
  title: string;
  value: ReactNode;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;

  trend?: {
    direction: "up" | "down" | "neutral";
    change: string;
  };

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
  subtitle,
  icon,
  trend,
  className,
  accent = "blue",
}) => {
  const colors = accentStyles[accent];

  return (
    <div
      className={cn(
        "group rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm",
        "p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-black/10",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              "ring-1 ring-white/5 transition-all duration-300",
              "group-hover:scale-105",
              colors.icon,
            )}
          >
            {icon}
          </div>

          <span className="truncate text-sm font-semibold text-muted-foreground">
            {title}
          </span>
        </div>

        {trend && (
          <div
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1",
              "text-xs font-semibold",
              colors.badge,
            )}
          >
            {trend.direction === "up" && (
              <ArrowUpRight className="h-3.5 w-3.5" />
            )}

            {trend.direction === "down" && (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}

            {trend.direction === "neutral" && <Minus className="h-3.5 w-3.5" />}

            {trend.change}
          </div>
        )}
      </div>

      {/* KPI */}
      <div className="mt-7">
        <div className="text-5xl font-bold tracking-tight leading-none">
          {value}
        </div>
      </div>

      {/* Footer */}
      {subtitle && (
        <>
          <div className="my-5 h-px bg-border/60" />

          <p className="text-sm text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </>
      )}
    </div>
  );
};

export default MetricCard;
