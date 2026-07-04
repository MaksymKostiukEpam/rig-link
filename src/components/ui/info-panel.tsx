import type { FC } from "react";
import StatusBadge from "./status-badge";
import Button from "./button";

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
        className={
          "p-6 bg-card rounded-xl border border-border/60 " + className
        }
      >
        <div className="text-sm text-muted-foreground">
          Select a rig or warehouse to see details.
        </div>
      </aside>
    );
  }

  const storagePercent = entity.storageCapacity
    ? Math.round(
        (entity.storageCapacity.used / entity.storageCapacity.total) * 100,
      )
    : undefined;
  const crewDisplay =
    entity.crew == null
      ? "—"
      : typeof entity.crew === "object"
        ? `${(entity.crew as any).current}/${(entity.crew as any).max}`
        : String(entity.crew);

  const storageDisplay = entity.storageCapacity
    ? `${entity.storageCapacity.used.toLocaleString()} / ${entity.storageCapacity.total.toLocaleString()} (${storagePercent}%)`
    : "—";

  return (
    <aside
      className={"p-6 bg-card rounded-xl border border-border/60 " + className}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold">{entity.name}</h3>
          <div className="text-sm text-muted-foreground mt-1">
            ID: {entity.id}
          </div>
        </div>
        <div>
          {entity.status ? <StatusBadge status={entity.status as any} /> : null}
        </div>
      </div>

      <div className="my-4 h-px bg-border/40" />

      <dl className="grid grid-cols-1 gap-3 text-sm text-muted-foreground">
        <div>
          <dt className="font-medium text-foreground/90">Location</dt>
          <dd>
            {entity.coordinates.lat.toFixed(3)},{" "}
            {entity.coordinates.lng.toFixed(3)}
          </dd>
        </div>

        <div>
          <dt className="font-medium text-foreground/90">Crew</dt>
          <dd>{crewDisplay}</dd>
        </div>

        <div>
          <dt className="font-medium text-foreground/90">Storage</dt>
          <dd>{storageDisplay}</dd>
        </div>

        <div>
          <dt className="font-medium text-foreground/90">Incoming Shipments</dt>
          <dd>—</dd>
        </div>

        <div>
          <dt className="font-medium text-foreground/90">Outgoing Shipments</dt>
          <dd>—</dd>
        </div>

        <div>
          <dt className="font-medium text-foreground/90">Critical Alerts</dt>
          <dd>—</dd>
        </div>
      </dl>

      <div className="mt-6">
        <Button onClick={onOpenDetails} variant="secondary">
          Open Rig Details
        </Button>
      </div>
    </aside>
  );
};

export default InfoPanel;
