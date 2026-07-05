import type { Rig } from "@/types";
import RigCard from "./rig-card";
import { Link } from "react-router-dom";
import { ROUTES } from "@/app/router/paths";

type Props = {
  rigs: Rig[];
};

export default function RigGrid({ rigs }: Props) {
  if (!rigs.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
        <h3 className="text-lg font-semibold">No rigs found</h3>

        <p className="mt-2 text-muted-foreground">
          Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
      {rigs.map((rig) => (
        <Link to={ROUTES.rigDetails(rig.id)}>
          <RigCard rig={rig} />
        </Link>
      ))}
    </div>
  );
}
