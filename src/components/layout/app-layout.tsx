import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./header";
import Sidebar from "./sidebar";
import LoadingScreen from "@/components/ui/loading-screen";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-shell min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <Header />

          <main className="app-main flex-1 p-6 md:p-8">
            <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col gap-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
