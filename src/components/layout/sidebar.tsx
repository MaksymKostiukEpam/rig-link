import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  HardHat,
  Package,
  Warehouse,
  Activity,
  ChevronRight,
} from "lucide-react";
import { ROUTES } from "@/app/router/paths";
import { useEffect, useState } from "react";

type SidebarLink = {
  title: string;
  path: string;
  icon: LucideIcon;
};

const links: SidebarLink[] = [
  { title: "Dashboard", path: ROUTES.dashboard, icon: Home },
  { title: "Rigs", path: ROUTES.rigs, icon: HardHat },
  { title: "Shipments", path: ROUTES.shipments, icon: Package },
  { title: "Warehouses", path: ROUTES.warehouses, icon: Warehouse },
];

type SidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}

      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col overflow-hidden border-r border-border/60 bg-sidebar/95 backdrop-blur-xl transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}

        {/* Logo */}

        <div className="flex h-20 items-center border-b border-border/60 px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <Activity className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">RigLink</h1>

              <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Industrial Logistics Platform
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    "group relative flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200",

                    isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-1",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Left Accent */}

                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-primary" />
                    )}

                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted group-hover:bg-background"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <span className="font-medium">{item.title}</span>
                    </div>

                    <ChevronRight
                      className={`h-4 w-4 transition ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}

        <div className="mt-auto border-t border-border/60 bg-sidebar/95 p-5">
          <div className="rounded-xl border border-border/60 bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                DU
              </div>

              <div>
                <p className="text-sm font-semibold">Demo User</p>
                <p className="text-xs text-muted-foreground">
                  Operations Manager
                </p>
              </div>
            </div>

            <div className="my-4 h-px bg-border" />

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">System Time</span>
              <UtcClock />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function UtcClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "UTC",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " UTC",
      );
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono font-medium">{time}</span>;
}
