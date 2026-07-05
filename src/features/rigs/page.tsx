import { useMemo, useState } from "react";

import { rigs } from "@/mocks/data";
import type { RigStatus } from "@/types/rig";

import RigOverview from "./components/rig-overview";
import RigFilters from "./components/rig-filters";
import RigGrid from "./components/rig-grid";

export default function RigsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<RigStatus | "All">("All");

  const filteredRigs = useMemo(() => {
    return rigs.filter((rig) => {
      const matchesSearch =
        rig.name.toLowerCase().includes(search.toLowerCase()) ||
        rig.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "All" || rig.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div className="space-y-8">
      <RigOverview rigs={rigs} />

      <RigFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <RigGrid rigs={filteredRigs} />
    </div>
  );
}
