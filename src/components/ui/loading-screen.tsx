import { useEffect, useState } from "react";
import { Activity, HardHat, Package, Satellite, Warehouse } from "lucide-react";

const STEPS = [
  {
    icon: Satellite,
    text: "Connecting to offshore network...",
  },
  {
    icon: HardHat,
    text: "Loading rig telemetry...",
  },
  {
    icon: Warehouse,
    text: "Synchronizing warehouses...",
  },
  {
    icon: Package,
    text: "Fetching logistics...",
  },
];

export default function LoadingScreen() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, 600);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-lg">
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-xl">
              <Activity className="h-10 w-10 animate-pulse" />
            </div>
          </div>
        </div>

        <h1 className="text-center text-4xl font-bold tracking-tight">
          RigLink
        </h1>

        <p className="mt-2 text-center text-muted-foreground">
          Initializing Operations Center
        </p>

        <div className="mt-10 rounded-2xl border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            {STEPS.map((item, index) => {
              const Icon = item.icon;

              const complete = index < step;
              const active = index === step;

              return (
                <div key={item.text} className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition
                    ${
                      complete
                        ? "bg-emerald-500 text-white"
                        : active
                          ? "bg-primary text-primary-foreground animate-pulse"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon size={18} />
                  </div>

                  <span
                    className={
                      complete || active ? "" : "text-muted-foreground"
                    }
                  >
                    {item.text}
                  </span>

                  {complete && (
                    <span className="ml-auto text-emerald-500">✓</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{
                  width: `${((step + 1) / STEPS.length) * 100}%`,
                }}
              />
            </div>

            <p className="mt-2 text-center text-xs text-muted-foreground">
              {Math.round(((step + 1) / STEPS.length) * 100)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
