import type { FC } from "react";
import { cn } from "@/lib/cn";
import type { Status } from "@/types/status";

type Props = {
  status: Status;
  className?: string;
};

const STATUS_STYLES: Record<
  Status,
  {
    badge: string;
    dot: string;
    pulse?: boolean;
  }
> = {
  Operational: {
    badge:
      "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    pulse: true,
  },

  Maintenance: {
    badge:
      "border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },

  Offline: {
    badge:
      "border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
    dot: "bg-red-500",
  },

  Preparing: {
    badge:
      "border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    dot: "bg-cyan-500",
    pulse: true,
  },

  Loading: {
    badge:
      "border border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500",
    pulse: true,
  },

  "In Transit": {
    badge:
      "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
    pulse: true,
  },

  Delayed: {
    badge:
      "border border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400",
    dot: "bg-orange-500",
  },

  Delivered: {
    badge:
      "border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
  },
};

const StatusBadge: FC<Props> = ({ status, className }) => {
  const config = STATUS_STYLES[status];

  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-full px-3",
        "text-xs font-semibold tracking-wide",
        "transition-all duration-200",
        "select-none",
        config.badge,
        className,
      )}
    >
      <span className="relative flex h-2.5 w-2.5 items-center justify-center">
        {config.pulse && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping",
              config.dot,
            )}
          />
        )}

        <span
          className={cn(
            "relative inline-flex h-2.5 w-2.5 rounded-full shadow-sm",
            config.dot,
          )}
        />
      </span>

      {status}
    </span>
  );
};

export default StatusBadge;
