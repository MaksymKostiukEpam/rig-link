import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Package, Plus, Truck } from "lucide-react";
import { useMutation, useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Button from "@/components/ui/button";
import type { InventoryItem, Rig, Shipment, Vehicle, VehicleType } from "@/types";

type Props = {
  rig: Rig;
};

type CreateShipmentBody = {
  originId: string;
  originName: string;
  destinationId: string;
  destinationName: string;
  vehicle: Vehicle;
  cargo: InventoryItem[];
};

const SUPPLIES = ["Fuel", "Water", "Food"] as const;
const VEHICLES: VehicleType[] = ["Supply Vessel", "Helicopter"];

export default function RigLogistics({ rig }: Props) {
  const queryClient = useQueryClient();

  const [resource, setResource] = useState("Fuel");
  const [quantity, setQuantity] = useState(500);
  const [transport, setTransport] = useState<VehicleType>(VEHICLES[0]);

  const { data: allShipments } = useSuspenseQuery({
    queryKey: ["shipments"],
    queryFn: async (): Promise<Shipment[]> => {
      const res = await fetch("/api/shipments");
      if (!res.ok) throw new Error("Failed to load shipments");
      return res.json();
    },
  });

  const incoming = useMemo(
    () => allShipments.filter((s) => s.destinationId === rig.id),
    [allShipments, rig.id],
  );

  const outgoing = useMemo(
    () => allShipments.filter((s) => s.originId === rig.id),
    [allShipments, rig.id],
  );

  const mutation = useMutation({
    mutationFn: (body: CreateShipmentBody) =>
      fetch("/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json() as Promise<Shipment>;
      }),
    onSuccess: (shipment) => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
      toast.success(`Shipment ${shipment.id} requested`, {
        description: `${shipment.cargo[0]?.quantity} kg of ${shipment.cargo[0]?.name} en route via ${shipment.vehicle.name} to ${rig.name}.`,
      });
      setQuantity(500);
      setResource("Fuel");
      setTransport(VEHICLES[0]);
    },
    onError: () => toast.error("Failed to request shipment"),
  });

  function handleRequest() {
    mutation.mutate({
      originId: "warehouse-houston",
      originName: "Houston Warehouse",
      destinationId: rig.id,
      destinationName: rig.name,
      vehicle: {
        id: crypto.randomUUID(),
        name: transport,
        type: transport,
      },
      cargo: [
        {
          id: crypto.randomUUID(),
          name: resource,
          quantity,
          unit: "kg",
        },
      ],
    });
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
              className="h-9 w-full rounded-xl border border-border bg-background px-3 outline-none transition focus:border-primary"
            />
          </div>

          {/* Transport */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Transport</label>

            <Select
              value={transport}
              onValueChange={(value) => setTransport(value as VehicleType)}
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

          <div className="flex items-end">
            <Button
              onClick={handleRequest}
              disabled={mutation.isPending}
              className="h-10 w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {mutation.isPending ? "Creating..." : "Request Shipment"}
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
        <Info label="Vehicle">{shipment.vehicle.name}</Info>
        <Info label="ETA">
          {new Date(shipment.estimatedArrival).toLocaleDateString()}
        </Info>
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
