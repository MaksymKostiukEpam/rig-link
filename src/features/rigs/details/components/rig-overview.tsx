import type { FC } from "react";
import { Users, Package, Truck, TriangleAlert } from "lucide-react";

import type { Rig } from "@/types";

type Props = {
  rig: Rig;
};

const progressColor = (percent: number) => {
  if (percent >= 90) return "bg-red-500";
  if (percent >= 70) return "bg-amber-500";
  return "bg-emerald-500";
};

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  progress,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  progress?: number;
}) => (
  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    <div className="mb-4 flex items-center justify-between">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        {title}
      </span>
    </div>

    <div className="text-3xl font-bold">{value}</div>

    <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>

    {progress !== undefined && (
      <div className="mt-4">
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all duration-700 ${progressColor(progress)}`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    )}
  </div>
);

const RigOverview: FC<Props> = ({ rig }) => {
  const crewPercent = (rig.crew.current / rig.crew.max) * 100;

  const storagePercent =
    (rig.storageCapacity.used / rig.storageCapacity.total) * 100;

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={<Users className="h-5 w-5" />}
        title="Crew"
        value={`${rig.crew.current}/${rig.crew.max}`}
        subtitle="Personnel onboard"
        progress={crewPercent}
      />

      <StatCard
        icon={<Package className="h-5 w-5" />}
        title="Storage"
        value={`${Math.round(storagePercent)}%`}
        subtitle={`${rig.storageCapacity.used} / ${rig.storageCapacity.total}`}
        progress={storagePercent}
      />

      <StatCard
        icon={<Truck className="h-5 w-5" />}
        title="Shipments"
        value={rig.incomingShipmentIds.length + rig.outgoingShipmentIds.length}
        subtitle={`${rig.incomingShipmentIds.length} incoming • ${rig.outgoingShipmentIds.length} outgoing`}
      />

      <StatCard
        icon={<TriangleAlert className="h-5 w-5" />}
        title="Alerts"
        value={rig.alerts.length}
        subtitle={rig.alerts.length ? "Requires attention" : "No active alerts"}
      />
    </section>
  );
};

export default RigOverview;
