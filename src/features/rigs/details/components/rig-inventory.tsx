import { useMemo, useState } from "react";
import type { Rig } from "@/types";

import {
  Droplets,
  Fuel,
  Wrench,
  Utensils,
  Shield,
  Pill,
  Circle,
} from "lucide-react";

type Props = {
  rig: Rig;
};

const iconMap: Record<string, React.ReactNode> = {
  Fuel: <Fuel className="h-5 w-5" />,
  Water: <Droplets className="h-5 w-5" />,
  Food: <Utensils className="h-5 w-5" />,
  Tools: <Wrench className="h-5 w-5" />,
  Safety: <Shield className="h-5 w-5" />,
  Medical: <Pill className="h-5 w-5" />,
};

export default function RigInventory({ rig }: Props) {
  const [search, setSearch] = useState("");

  const inventory = useMemo(() => {
    return rig.inventory.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [rig.inventory, search]);

  return (
    <section className="rounded-3xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Inventory</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Supplies currently available on this rig
            </p>
          </div>

          <span className="rounded-xl bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {inventory.length} Items
          </span>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search inventory..."
          className="mt-5 h-11 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
        />
      </div>

      <div className="divide-y divide-border">
        {inventory.map((item) => (
          <InventoryRow key={item.id} item={item} />
        ))}

        {!inventory.length && (
          <div className="p-12 text-center text-muted-foreground">
            No inventory items found.
          </div>
        )}
      </div>
    </section>
  );
}

function InventoryRow({ item }: { item: Rig["inventory"][number] }) {
  return (
    <div className="flex items-center justify-between p-5 transition hover:bg-muted/40">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {iconMap[item.name] ?? <Circle className="h-5 w-5" />}
        </div>

        <div>
          <div className="font-medium">{item.name}</div>

          <div className="text-sm text-muted-foreground">Resource</div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-lg font-semibold">
          {item.quantity.toLocaleString()} {item.unit}
        </div>

        <div className="text-sm text-muted-foreground">Available</div>
      </div>
    </div>
  );
}
