import type { FC } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

const SectionHeader: FC<Props> = ({
  title,
  subtitle,
  actionLabel = "View all →",
  onAction,
  className = "",
}) => {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <span>{actionLabel}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
};

export default SectionHeader;
