import type { FC } from "react";
import { HardHat, Users, MapPin, Database, ArrowRight } from "lucide-react";

import Button from "./button";
import StatusBadge from "./status-badge";

type Entity = {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  status?: string;
  crew?: { current: number; max: number } | number | string;
  storageCapacity?: { used: number; total: number };
};

type Props = {
  entity: Entity | null;
  className?: string;
  onOpenDetails?: () => void;
};

const InfoPanel: FC<Props> = ({ entity, className = "", onOpenDetails }) => {
  if (!entity) {
    return (
      <aside
        className={`flex h-full items-center justify-center rounded-3xl border border-border bg-card p-8 ${className}`}
      >
        <div className="text-center">
          <HardHat className="mx-auto mb-4 h-10 w-10 text-muted-foreground/40" />

          <h3 className="font-semibold">Nothing Selected</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Select a rig or warehouse on the map to inspect its details.
          </p>
        </div>
      </aside>
    );
  }

  const storagePercent = entity.storageCapacity
    ? Math.round(
        (entity.storageCapacity.used / entity.storageCapacity.total) * 100,
      )
    : 0;

  const crewCurrent =
    typeof entity.crew === "object" ? entity.crew.current : entity.crew;

  const crewMax = typeof entity.crew === "object" ? entity.crew.max : null;

  return (
    <aside
      className={`rounded-3xl border border-border bg-card shadow-sm ${className}`}
    >
      {/* Header */}

      <div className="border-b border-border p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {entity.status ? "Oil Rig" : "Warehouse"}
            </div>

            <h2 className="text-2xl font-bold">{entity.name}</h2>

            <p className="mt-1 text-sm text-muted-foreground">{entity.id}</p>
          </div>

          {entity.status && <StatusBadge status={entity.status as any} />}
        </div>
      </div>

      {/* Content */}

      <div className="space-y-6 p-6">
        {/* Coordinates */}

        <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-4">
          <MapPin className="h-5 w-5 text-primary" />

          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Coordinates
            </div>

            <div className="font-medium">
              {entity.coordinates.lat.toFixed(3)},{" "}
              {entity.coordinates.lng.toFixed(3)}
            </div>
          </div>
        </div>

        {/* KPIs */}

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border p-4">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              Crew
            </div>

            <div className="text-2xl font-bold">
              {crewCurrent ?? "—"}

              {crewMax && (
                <span className="ml-1 text-base text-muted-foreground">
                  / {crewMax}
                </span>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border p-4">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <Database className="h-4 w-4" />
              Storage
            </div>

            <div className="text-2xl font-bold">
              {entity.storageCapacity ? `${storagePercent}%` : "—"}
            </div>
          </div>
        </div>

        {/* Storage */}

        {entity.storageCapacity && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Capacity Utilization</span>

              <span className="text-sm text-muted-foreground">
                {entity.storageCapacity.used.toLocaleString()} /{" "}
                {entity.storageCapacity.total.toLocaleString()}
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${
                  storagePercent >= 90
                    ? "bg-red-500"
                    : storagePercent >= 70
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
                style={{
                  width: `${storagePercent}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Footer */}

        {"status" in entity && entity.status && (
          <Button onClick={onOpenDetails} className="mt-2 w-full">
            View Rig Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </aside>
  );
};

export default InfoPanel;
