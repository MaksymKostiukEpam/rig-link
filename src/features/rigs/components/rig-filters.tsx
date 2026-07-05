import { Search } from "lucide-react";

import Button from "@/components/ui/button";
import type { RigStatus } from "@/types/rig";

type Props = {
  search: string;
  status: RigStatus | "All";

  onSearchChange: (value: string) => void;
  onStatusChange: (status: RigStatus | "All") => void;
};

const filters: (RigStatus | "All")[] = [
  "All",
  "Operational",
  "Maintenance",
  "Offline",
];

export default function RigFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search rigs..."
          className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            size="sm"
            variant={status === filter ? "primary" : "ghost"}
            onClick={() => onStatusChange(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
}
