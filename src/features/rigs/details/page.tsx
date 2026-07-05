import { Navigate, useParams } from "react-router-dom";

import { rigs } from "@/mocks/data";

export default function RigDetailsPage() {
  const { rigId } = useParams();

  const rig = rigs.find((r) => r.id === rigId);

  if (!rig) {
    return <Navigate to="/rigs" replace />;
  }

  return (
    <div className="space-y-8">
      <pre>{JSON.stringify(rig, null, 2)}</pre>
    </div>
  );
}
