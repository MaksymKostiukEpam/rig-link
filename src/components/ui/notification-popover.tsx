import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Bell, CircleAlert, PackageCheck, Warehouse } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Rig Alpha entered maintenance",
    time: "2 min ago",
    icon: CircleAlert,
    color: "text-amber-500",
  },
  {
    id: 2,
    title: "Shipment SH-1034 dispatched",
    time: "15 min ago",
    icon: PackageCheck,
    color: "text-emerald-500",
  },
  {
    id: 3,
    title: "Storage utilization exceeded 90%",
    time: "42 min ago",
    icon: CircleAlert,
    color: "text-red-500",
  },
  {
    id: 4,
    title: "Warehouse synchronized",
    time: "Yesterday",
    icon: Warehouse,
    color: "text-primary",
  },
];

export default function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background transition hover:bg-muted">
          <Bell className="h-4 w-4" />

          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
            4
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-80 rounded-2xl p-0 overflow-hidden"
      >
        <div className="border-b border-border px-4 py-3">
          <h4 className="font-semibold">Notifications</h4>
          <p className="text-xs text-muted-foreground">
            Latest operational events
          </p>
        </div>

        <div className="max-h-80 overflow-auto">
          {notifications.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className="flex w-full items-start gap-3 border-b border-border/50 px-4 py-3 text-left transition hover:bg-muted/60 last:border-none"
              >
                <Icon className={`mt-0.5 h-4 w-4 ${item.color}`} />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-5">{item.title}</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.time}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
