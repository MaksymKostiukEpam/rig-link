import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/paths";
import MetricCard from "@/components/ui/metric-card";
import InteractiveMap from "@/components/ui/interactive-map";
import SectionHeader from "@/components/ui/section-header";

import { rigs, warehouses } from "@/mocks/data";

import { Warehouse, Package, HardHat, TriangleAlert } from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Active Rigs"
            value={18}
            subtitle="Currently operational across all regions"
            accent="blue"
            trend={{
              direction: "up",
              change: "+2 today",
            }}
            icon={<HardHat className="h-7 w-7" />}
          />

          <MetricCard
            title="Warehouses"
            value={6}
            subtitle="Distribution hubs available"
            accent="purple"
            icon={<Warehouse className="h-7 w-7" />}
          />

          <MetricCard
            title="Shipments"
            value={24}
            subtitle="Cargo currently in transit"
            accent="green"
            trend={{
              direction: "up",
              change: "+3 today",
            }}
            icon={<Package className="h-7 w-7" />}
          />

          <MetricCard
            title="Critical Alerts"
            value={2}
            subtitle="Assets requiring immediate attention"
            accent="orange"
            trend={{
              direction: "up",
              change: "+1 today",
            }}
            icon={<TriangleAlert className="h-7 w-7" />}
          />
        </div>
      </section>

      <section>
        <SectionHeader
          title="Field Operations"
          subtitle="Monitor offshore rigs, terminals and logistics positions in real time."
          actionLabel="View all rigs"
          onAction={() => navigate(ROUTES.rigs)}
        />

        <div className="mt-4">
          <InteractiveMap rigs={rigs} warehouses={warehouses} />
        </div>
      </section>
    </div>
  );
}
