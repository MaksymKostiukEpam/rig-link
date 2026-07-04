import KpiCard from "@/components/ui/kpi-card";
import InteractiveMap from "@/components/ui/interactive-map";
import { rigs, warehouses } from "@/mocks/data";
import { HardHat, Warehouse, Package, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </header>

      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Rigs"
            value={18}
            icon={<HardHat className="h-6 w-6" />}
            trend={{ direction: "up", change: "+2 this week" }}
            description="Active rigs"
          />

          <KpiCard
            title="Warehouses"
            value={6}
            icon={<Warehouse className="h-6 w-6" />}
            trend={{ direction: "neutral", change: "" }}
            description="Total locations"
          />

          <KpiCard
            title="Shipments"
            value={24}
            icon={<Package className="h-6 w-6" />}
            trend={{ direction: "up", change: "+3 this week" }}
            description="Active shipments"
          />

          <KpiCard
            title="Critical Alerts"
            value={2}
            icon={<AlertCircle className="h-6 w-6" />}
            trend={{ direction: "up", change: "+1" }}
            description="Requires attention"
          />
        </div>
      </section>

      <section>
        <InteractiveMap rigs={rigs} warehouses={warehouses} />
      </section>
    </div>
  );
}
