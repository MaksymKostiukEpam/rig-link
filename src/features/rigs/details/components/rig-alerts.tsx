import type { FC } from "react";
import type { Rig } from "@/types";
import { AlertTriangle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

type Props = {
  rig: Rig;
};

const severityStyles = {
  info: {
    icon: Info,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  critical: {
    icon: TriangleAlert,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
} as const;

const formatDate = (date: string) =>
  new Date(date).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const RigAlerts: FC<Props> = ({ rig }) => {
  return (
    <section className="rounded-3xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Alerts</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Current operational notifications
            </p>
          </div>

          <span className="rounded-xl bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {rig.alerts.length}
          </span>
        </div>
      </div>

      {rig.alerts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="divide-y divide-border">
          {rig.alerts.map((alert) => {
            const style = severityStyles[alert.severity];
            const Icon = style.icon;

            return (
              <div key={alert.id} className="p-5 transition hover:bg-muted/40">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${style.bg} ${style.border}`}
                  >
                    <Icon className={`h-5 w-5 ${style.color}`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold">{alert.title}</h3>

                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(alert.createdAt)}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {alert.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
        <CheckCircle2 className="h-7 w-7 text-emerald-500" />
      </div>

      <h3 className="mt-5 text-lg font-semibold">No Active Alerts</h3>

      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        This rig is currently operating without any reported issues or
        incidents.
      </p>
    </div>
  );
}

export default RigAlerts;
