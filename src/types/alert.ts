export type AlertSeverity = "info" | "warning" | "critical";

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  createdAt: string;
}
