import type { FC } from "react";
import {
  Cloud,
  CloudRain,
  CloudFog,
  CloudLightning,
  Sun,
  Wind,
  MapPin,
  Users,
} from "lucide-react";

import StatusBadge from "@/components/ui/status-badge";
import type { Rig } from "@/types";

type Props = {
  rig: Rig;
};

const weatherIcons = {
  Clear: Sun,
  Cloudy: Cloud,
  Rain: CloudRain,
  Stormy: CloudLightning,
  Fog: CloudFog,
} as const;

const RigHero: FC<Props> = ({ rig }) => {
  const WeatherIcon = weatherIcons[rig.weather.condition];

  return (
    <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
      <div className="grid lg:grid-cols-[420px_1fr]">
        {/* Image */}

        <div className="relative h-[320px] overflow-hidden bg-muted">
          <img
            src={rig.image}
            alt={rig.name}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content */}

        <div className="flex flex-col justify-between p-8">
          <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Offshore Rig
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                  {rig.name}
                </h1>

                <p className="mt-2 text-muted-foreground">{rig.id}</p>
              </div>

              <StatusBadge status={rig.status} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Info
                icon={<MapPin className="h-5 w-5" />}
                label="Coordinates"
                value={`${rig.coordinates.lat.toFixed(3)}, ${rig.coordinates.lng.toFixed(3)}`}
              />

              <Info
                icon={<Users className="h-5 w-5" />}
                label="Crew"
                value={`${rig.crew.current} / ${rig.crew.max}`}
              />

              <Info
                icon={<WeatherIcon className="h-5 w-5" />}
                label="Weather"
                value={`${rig.weather.condition} • ${rig.weather.temperature}°C`}
              />

              <Info
                icon={<Wind className="h-5 w-5" />}
                label="Wind"
                value={`${rig.weather.windSpeed} km/h`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-background/50 p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default RigHero;
