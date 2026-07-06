import { Activity, HardHat, Package, Warehouse } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-background/70 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-2xl">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-3xl bg-primary/20" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-xl">
              <Activity className="h-10 w-10 animate-pulse" />
            </div>
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold">Initializing RigLink</h2>

        <p className="mt-2 text-center text-muted-foreground">
          Loading operational data...
        </p>

        <div className="mt-8 space-y-4">
          <LoadingRow icon={<HardHat />} text="Loading offshore rigs" />

          <LoadingRow icon={<Warehouse />} text="Synchronizing warehouses" />

          <LoadingRow icon={<Package />} text="Preparing logistics" />
        </div>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}

function LoadingRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <span>{text}</span>

      <div className="ml-auto h-2 w-2 animate-pulse rounded-full bg-primary" />
    </div>
  );
}
