import { NavLink } from "react-router-dom";

const links = [
  { title: "Dashboard", path: "/" },
  { title: "Rigs", path: "/rigs" },
  { title: "Shipments", path: "/shipments" },
  { title: "Warehouses", path: "/warehouses" },
];

export default function Sidebar() {
  return (
    <aside className="app-sidebar hidden min-h-screen w-full max-w-[280px] shrink-0 flex-col gap-6 border-r border-border bg-sidebar p-6 text-sidebar-foreground md:flex">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Rig Link
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Operations</h1>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/80 hover:bg-muted hover:text-foreground"
              }`
            }
          >
            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
