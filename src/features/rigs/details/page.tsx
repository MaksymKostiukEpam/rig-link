import { useParams, Navigate } from "react-router-dom";

import { rigs } from "@/mocks/data";
import { ROUTES } from "@/app/router/paths";

import RigHero from "./components/rig-hero";
import RigOverview from "./components/rig-overview";
import RigInventory from "./components/rig-inventory";
import RigAlerts from "./components/rig-alerts";
import RigLocation from "./components/rig-location";
import RigLogistics from "./components/rig-logistics";

export default function RigDetailsPage() {
  const { rigId } = useParams();

  const rig = rigs.find((r) => r.id === rigId);

  if (!rig) {
    return <Navigate to={ROUTES.rigs} replace />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <RigHero rig={rig} />

      <RigOverview rig={rig} />

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <RigInventory rig={rig} />

        <RigAlerts rig={rig} />
      </div>

      <RigLogistics rig={rig} />

      <RigLocation rig={rig} />
    </div>
  );
}
