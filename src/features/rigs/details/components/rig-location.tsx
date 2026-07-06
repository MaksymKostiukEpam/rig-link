import type { FC } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapPin, Wind, Thermometer, Cloud } from "lucide-react";

import type { Rig } from "@/types";
import { useTheme } from "@/hooks/use-theme";
import MapMarker from "@/components/ui/map-marker";

type Props = {
  rig: Rig;
};

const weatherIcons = {
  Clear: "☀️",
  Cloudy: "☁️",
  Stormy: "⛈️",
  Rain: "🌧️",
  Fog: "🌫️",
} as const;

const RigLocation: FC<Props> = ({ rig }) => {
  const { theme } = useTheme();

  const tileLayer =
    theme === "dark"
      ? {
          url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
          attribution: "&copy; CartoDB",
        }
      : {
          url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          attribution: "&copy; OpenStreetMap & CartoDB",
        };

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <MapPin className="h-6 w-6 text-primary" />

        <div>
          <h2 className="text-xl font-semibold">Location & Weather</h2>

          <p className="text-sm text-muted-foreground">
            Current offshore position and environmental conditions.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Map */}

        <div className="overflow-hidden rounded-2xl border border-border">
          <MapContainer
            //@ts-expect-error react-leaflet typings
            center={[rig.coordinates.lat, rig.coordinates.lng]}
            zoom={7}
            dragging={false}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            touchZoom={false}
            zoomControl={false}
            attributionControl={false}
            keyboard={false}
            style={{
              height: "320px",
              width: "100%",
            }}
          >
            <TileLayer
              key={theme}
              url={tileLayer.url}
              //@ts-expect-error react-leaflet typings
              attribution={tileLayer.attribution}
            />

            <MapMarker
              position={[rig.coordinates.lat, rig.coordinates.lng]}
              color={
                rig.status === "Operational"
                  ? "#22c55e"
                  : rig.status === "Maintenance"
                    ? "#f59e0b"
                    : "#ef4444"
              }
              name={rig.name}
            />
          </MapContainer>
        </div>

        {/* Details */}

        <div className="space-y-4">
          <InfoRow
            icon={<MapPin className="h-5 w-5" />}
            label="Coordinates"
            value={`${rig.coordinates.lat.toFixed(3)}, ${rig.coordinates.lng.toFixed(3)}`}
          />

          <InfoRow
            icon={<Thermometer className="h-5 w-5" />}
            label="Temperature"
            value={`${rig.weather.temperature}°C`}
          />

          <InfoRow
            icon={<Wind className="h-5 w-5" />}
            label="Wind Speed"
            value={`${rig.weather.windSpeed} km/h`}
          />

          <InfoRow
            icon={<Cloud className="h-5 w-5" />}
            label="Conditions"
            value={`${weatherIcons[rig.weather.condition]} ${rig.weather.condition}`}
          />

          <InfoRow
            icon={<MapPin className="h-5 w-5" />}
            label="Rig Status"
            value={rig.status}
          />
        </div>
      </div>
    </section>
  );
};

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:bg-muted/40">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
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

export default RigLocation;
