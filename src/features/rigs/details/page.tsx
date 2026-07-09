import { Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";

import { rigs } from "@/mocks/data";
import { ROUTES } from "@/app/router/paths";

import RigHero from "./components/rig-hero";
import RigOverview from "./components/rig-overview";
import RigInventory from "./components/rig-inventory";
import RigAlerts from "./components/rig-alerts";
import RigLocation from "./components/rig-location";
import RigLogistics from "./components/rig-logistics";

function LogisticsSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-6">
        <div className="h-6 w-24 rounded-lg bg-muted" />
        <div className="mt-2 h-4 w-64 rounded-lg bg-muted" />
      </div>
      <div className="grid gap-8 p-6 lg:grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className="space-y-3">
            <div className="h-5 w-40 rounded-lg bg-muted" />
            <div className="h-24 rounded-2xl bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RigDetailsPage() {
  const { rigId } = useParams();

  const rig = rigs.find((r) => r.id === rigId);

  if (!rig) {
    return <Navigate to={ROUTES.rigs} replace />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <RigHero rig={rig} />

      <RigOverview rig={rig} />

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <RigInventory rig={rig} />

        <RigAlerts rig={rig} />
      </div>

      <Suspense fallback={<LogisticsSkeleton />}>
        <RigLogistics rig={rig} />
      </Suspense>

      <RigLocation rig={rig} />
    </div>
  );
}
