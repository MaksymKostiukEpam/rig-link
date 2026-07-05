import MetricCard from "@/components/ui/metric-card";
import { HardHat, Wrench, CircleOff, Users } from "lucide-react";
import type { Rig } from "@/types";

type Props = {
  rigs: Rig[];
};

export default function RigOverview({ rigs }: Props) {
  const operational = rigs.filter((rig) => rig.status === "Operational").length;

  const maintenance = rigs.filter((rig) => rig.status === "Maintenance").length;

  const offline = rigs.filter((rig) => rig.status === "Offline").length;

  const crew = rigs.reduce((sum, rig) => sum + rig.crew.current, 0);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Operational"
        value={operational}
        subtitle="Currently producing"
        accent="green"
        icon={<HardHat className="h-7 w-7" />}
      />

      <MetricCard
        title="Maintenance"
        value={maintenance}
        subtitle="Scheduled servicing"
        accent="orange"
        icon={<Wrench className="h-7 w-7" />}
      />

      <MetricCard
        title="Offline"
        value={offline}
        subtitle="Unavailable"
        accent="red"
        icon={<CircleOff className="h-7 w-7" />}
      />

      <MetricCard
        title="Crew"
        value={crew}
        subtitle="Personnel on all rigs"
        accent="blue"
        icon={<Users className="h-7 w-7" />}
      />
    </div>
  );
}
