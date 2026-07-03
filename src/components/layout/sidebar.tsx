import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Home, HardHat, Package, Warehouse } from "lucide-react";
import { ROUTES } from "@/app/router/paths";

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
      <div
        className={`fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col gap-6 border-r border-border bg-sidebar p-6 text-sidebar-foreground shadow-2xl transition-transform duration-200 md:static md:translate-x-0 md:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Rig Link
          </p>
          <h1 className="text-2xl font-semibold text-foreground">Operations</h1>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 px-4 py-4 text-sm font-medium rounded-none transition ${
                    isActive
                      ? "bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]"
                      : "text-foreground/80 hover:bg-muted hover:text-foreground hover:rounded-2xl"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
