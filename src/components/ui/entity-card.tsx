import type { FC } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import StatusBadge from "./status-badge";
import type { Status } from "@/types/status";

type Props = {
  title: string;
  subtitle?: string;
  status?: Status;
  crew?: { current: number; max: number } | string;
  storagePercent?: number; // 0-100
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

const EntityCard: FC<Props> = ({
  title,
  subtitle,
  status,
  crew,
  storagePercent,
  actionLabel = "Open",
  onAction,
  className = "",
}) => {
  const crewText =
    typeof crew === "string"
      ? crew
      : crew
        ? `${crew.current}/${crew.max}`
        : undefined;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4",
        className,
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {status && <StatusBadge status={status} />}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
        <div className="mt-2 flex items-center gap-3 text-sm">
          {crewText && (
            <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
              Crew {crewText}
            </span>
          )}

          {typeof storagePercent === "number" && (
            <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
              Storage {Math.round(storagePercent)}%
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-3 py-1 text-sm text-foreground hover:bg-muted"
          >
            <span>{actionLabel}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EntityCard;
