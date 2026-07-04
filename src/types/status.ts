export type Status =
  | "Operational"
  | "Maintenance"
  | "Offline"
  | "Preparing"
  | "Loading"
  | "In Transit"
  | "Delayed"
  | "Delivered";

export const STATUS_LIST: Status[] = [
  "Operational",
  "Maintenance",
  "Offline",
  "Preparing",
  "Loading",
  "In Transit",
  "Delayed",
  "Delivered",
];
