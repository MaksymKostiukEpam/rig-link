import type { FC, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
};

export const SideSheet: FC<Props> = ({ open, onClose, children, title }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-stretch",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "relative ml-auto flex h-full w-full max-w-md flex-col gap-4 bg-background p-6 shadow-2xl transition-transform",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-sm text-muted-foreground" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="overflow-auto">{children}</div>
      </aside>
    </div>
  );
};

export default SideSheet;
