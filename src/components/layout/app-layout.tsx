import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./header";
import Sidebar from "./sidebar";
import LoadingOverlay from "@/components/ui/loading-overlay";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-shell min-h-screen bg-background text-foreground">
      {loading && <LoadingOverlay />}
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="app-main flex-1 p-6 md:p-8">
            <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col gap-6">
              {loading ? <DashboardSkeleton /> : <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <div className="h-10 w-64 animate-pulse rounded-xl bg-muted" />

      <div className="grid gap-6 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-36 animate-pulse rounded-3xl border bg-card"
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-[520px] animate-pulse rounded-3xl border bg-card lg:col-span-2" />

        <div className="h-[520px] animate-pulse rounded-3xl border bg-card" />
      </div>
    </>
  );
}
