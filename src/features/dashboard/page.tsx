import MetricCard from "@/components/ui/metric-card";
import InteractiveMap from "@/components/ui/interactive-map";
import { rigs, warehouses } from "@/mocks/data";
import { Warehouse, Package, HardHat, TriangleAlert } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1440px] space-y-8 p-6">
      <section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Active Rigs"
            value={18}
            description="Operational rigs online"
            accent="blue"
            trend={{ direction: "up", change: "+2" }}
            icon={<HardHat className="h-7 w-7" />}
          />

          <MetricCard
            title="Warehouses"
            value={6}
            description="Total locations"
            accent="purple"
            icon={<Warehouse className="h-7 w-7" />}
          />

          <MetricCard
            title="Shipments"
            value={24}
            description="Shipments in transit"
            accent="green"
            trend={{ direction: "up", change: "+3" }}
            icon={<Package className="h-7 w-7" />}
          />

          <MetricCard
            title="Critical Alerts"
            value={2}
            description="Require attention"
            accent="orange"
            trend={{ direction: "up", change: "+1" }}
            icon={<TriangleAlert className="h-7 w-7" />}
          />
        </div>
      </section>

      <section>
        <SectionHeader
          title="Field Operations"
          subtitle="Monitor offshore rigs, terminals and logistics positions in real time"
        />
        <div className="mt-4">
          <InteractiveMap rigs={rigs} warehouses={warehouses} />
        </div>
      </section>
    </div>
  );
}
