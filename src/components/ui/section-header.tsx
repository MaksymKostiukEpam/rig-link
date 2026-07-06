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
  actionLabel = "View all",
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
          className="
            group inline-flex items-center
            rounded-full
            border border-border/70
            bg-card/60
            px-4 py-2
            text-sm font-medium
            text-muted-foreground
            backdrop-blur
            cursor-pointer
            transition-all duration-300
            ease-[cubic-bezier(0.22,1,0.36,1)]
            hover:border-primary/30
            hover:bg-primary/5
            hover:text-primary
            hover:shadow-lg
            hover:shadow-primary/10
            active:scale-[0.98]
          "
        >
          <span>{actionLabel}</span>

          <ChevronRight
            className="
        ml-2 h-4 w-4
        transition-all duration-300
        group-hover:translate-x-1
      "
          />
        </button>
      ) : null}
    </div>
  );
};

export default SectionHeader;
