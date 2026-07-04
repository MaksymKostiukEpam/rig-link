import type { FC } from "react";
import { cn } from "@/lib/cn";
import type { Status } from "@/types/status";

type Props = {
  status: Status;
  className?: string;
};

const STATUS_STYLES: Record<Status, string> = {
  Operational: "bg-[var(--chart-2)] text-white",
  Maintenance: "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
  Offline: "bg-[var(--destructive)] text-white",
  Preparing: "bg-[var(--chart-5)] text-white",
  Loading: "bg-[var(--primary)] text-[var(--primary-foreground)]",
  "In Transit": "bg-[var(--chart-3)] text-white",
  Delayed: "bg-[var(--destructive)] text-white",
  Delivered: "bg-[var(--accent)] text-[var(--accent-foreground)]",
};

export const StatusBadge: FC<Props> = ({ status, className = "" }) => {
  const style = STATUS_STYLES[status] ?? "bg-muted text-foreground";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full pl-2 pr-3 py-1 text-sm font-medium",
        style,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("inline-block h-2.5 w-2.5 rounded-full bg-current")}
      />
      <span>{status}</span>
    </span>
  );
};

export default StatusBadge;
