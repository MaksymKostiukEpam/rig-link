import { Link } from "react-router-dom";
import {
  HardHat,
  Users,
  Warehouse,
  Wind,
  Thermometer,
  TriangleAlert,
  ChevronRight,
} from "lucide-react";

import { ROUTES } from "@/app/router/paths";
import Progress from "@/components/ui/progress";
import StatusBadge from "@/components/ui/status-badge";
import { cn } from "@/lib/cn";
import type { Rig } from "@/types";

type Props = {
  rig: Rig;
  className?: string;
};

export default function RigCard({ rig, className }: Props) {
  const crewPercent = (rig.crew.current / rig.crew.max) * 100;

  const storagePercent =
    (rig.storageCapacity.used / rig.storageCapacity.total) * 100;

  return (
    <Link
      to={ROUTES.rigDetails(rig.id)}
      className={cn(
        "group block rounded-2xl border border-border bg-card",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:border-primary/30",
        "hover:shadow-xl",
        className,
      )}
    >
      <div className="p-6">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <HardHat className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-lg font-semibold">{rig.name}</h3>

              <p className="text-sm text-muted-foreground">
                Offshore drilling platform
              </p>
            </div>
          </div>

          <StatusBadge status={rig.status} />
        </div>

        <div className="my-6 h-px bg-border" />

        {/* Crew */}

        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                Crew
              </div>

              <span className="font-medium">
                {rig.crew.current} / {rig.crew.max}
              </span>
            </div>

            <Progress value={crewPercent} />
          </div>

          {/* Storage */}

          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Warehouse className="h-4 w-4 text-muted-foreground" />
                Storage
              </div>

              <span className="font-medium">
                {rig.storageCapacity.used} / {rig.storageCapacity.total} t
              </span>
            </div>

            <Progress value={storagePercent} />
          </div>
        </div>

        <div className="my-6 h-px bg-border" />

        {/* Footer */}

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Thermometer className="h-4 w-4" />
              {rig.weather.temperature}°C
            </div>

            <div className="flex items-center gap-1">
              <Wind className="h-4 w-4" />
              {rig.weather.windSpeed} km/h
            </div>

            <div>{rig.weather.condition}</div>

            {rig.alerts.length > 0 && (
              <div className="flex items-center gap-1 text-orange-500">
                <TriangleAlert className="h-4 w-4" />
                {rig.alerts.length}
              </div>
            )}
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </div>
    </Link>
  );
}
