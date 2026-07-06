import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Package, Plus, Truck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Button from "@/components/ui/button";
import type { InventoryItem, Rig, Shipment } from "@/types";

type Props = {
  rig: Rig;
};

const SUPPLIES = ["Fuel", "Water", "Food"] as const;

const VEHICLES = ["Supply Vessel", "Cargo Helicopter"];

export default function RigLogistics({ rig }: Props) {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  const [resource, setResource] = useState("Fuel");
  const [quantity, setQuantity] = useState(500);
  const [vehicle, setVehicle] = useState<string>(VEHICLES[0]);
  const [loading, setLoading] = useState(false);

  const incoming = useMemo(
    () => shipments.filter((s) => s.destinationId === rig.id),
    [shipments, rig.id],
  );

  const outgoing = useMemo(
    () => shipments.filter((s) => s.originId === rig.id),
    [shipments, rig.id],
  );

  function requestShipment() {
    setLoading(true);

    setTimeout(() => {
      const cargo: InventoryItem = {
        id: crypto.randomUUID(),
        name: resource,
        quantity,
        unit: "kg",
      };

      const shipment: Shipment = {
        id: `SH-${Math.floor(1000 + Math.random() * 9000)}`,

        originId: "warehouse-houston",
        originName: "Houston Warehouse",

        destinationId: rig.id,
        destinationName: rig.name,
        //@ts-expect-error
        vehicle,

        estimatedArrival: "3 days",

        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),

        status: "Preparing",

        cargo: [cargo],
      };

      setShipments((prev) => [shipment, ...prev]);

      toast.success(`Shipment ${shipment.id} requested`, {
        description: `${quantity} kg of ${resource} en route via ${vehicle} to ${rig.name}.`,
      });

      setLoading(false);
    }, 1000);
  }

  return (
    <section className="rounded-3xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-6">
        <h2 className="text-xl font-semibold">Logistics</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor cargo movements and request supplies.
        </p>
      </div>

      <div className="grid gap-8 p-6 lg:grid-cols-2">
        <ShipmentList
          title="Incoming Shipments"
          icon={<ArrowDown className="h-5 w-5 text-emerald-500" />}
          shipments={incoming}
          empty="No incoming shipments."
        />

        <ShipmentList
          title="Outgoing Shipments"
          icon={<ArrowUp className="h-5 w-5 text-orange-500" />}
          shipments={outgoing}
          empty="No outgoing shipments."
        />
      </div>

      <div className="border-t border-border bg-muted/20 p-6">
        <div className="mb-6 flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold">Request Supplies</h3>
            <p className="text-sm text-muted-foreground">
              Create a shipment from the central warehouse.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* Resource */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Resource</label>

            <Select
              value={resource}
              // @ts-expect-error
              onValueChange={setResource}
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {SUPPLIES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity (kg)</label>

            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="h-11 w-full rounded-xl border border-border bg-background px-3 outline-none transition focus:border-primary"
            />
          </div>

          {/* Vehicle */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Transport</label>

            <Select
              value={vehicle}
              //@ts-expect-error
              onValueChange={(value) => setVehicle(value)}
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {VEHICLES.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Button */}
          <div className="flex items-end">
            <Button
              onClick={requestShipment}
              disabled={loading}
              className="h-11 w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {loading ? "Creating..." : "Request Shipment"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShipmentList({
  title,
  icon,
  shipments,
  empty,
}: {
  title: string;
  icon: React.ReactNode;
  shipments: Shipment[];
  empty: string;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>

      <div className="space-y-3">
        {shipments.length === 0 ? (
          <Empty text={empty} />
        ) : (
          shipments.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))
        )}
      </div>
    </div>
  );
}

function ShipmentCard({ shipment }: { shipment: Shipment }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Package className="h-5 w-5" />
          </div>

          <div>
            <div className="font-medium">{shipment.cargo[0]?.name}</div>

            <div className="text-xs text-muted-foreground">{shipment.id}</div>
          </div>
        </div>

        <span className="rounded-lg bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
          {shipment.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Info label="Quantity">
          {shipment.cargo[0]?.quantity} {shipment.cargo[0]?.unit}
        </Info>
        <Info label="Vehicle">{shipment.vehicle as any}</Info>
        <Info label="ETA">{shipment.estimatedArrival}</Info>
        <Info label="Origin">{shipment.originName}</Info>
      </div>
    </div>
  );
}

function Info({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium">{children}</div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}
