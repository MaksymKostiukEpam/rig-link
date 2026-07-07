import { useMemo, useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/paths";

import type { Rig, Warehouse } from "@/types";
import MapMarker from "./map-marker";
import InfoPanel from "./info-panel";
import { useTheme } from "@/hooks/use-theme";

type Props = {
  rigs: Rig[];
  warehouses: Warehouse[];
};

function FitBounds({ bounds }: { bounds?: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (!bounds?.length) return;

    map.fitBounds(bounds, {
      padding: [60, 60],
      animate: true,
    });
  }, [bounds, map]);

  return null;
}

export default function InteractiveMap({ rigs, warehouses }: Props) {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [selected, setSelected] = useState<Rig | Warehouse | null>(null);

  useEffect(() => {
    if (!selected && rigs.length) {
      setSelected(rigs[0]);
    }
  }, [rigs, selected]);

  const bounds = useMemo(() => {
    const latlngs: [number, number][] = [];

    rigs.forEach((rig) =>
      latlngs.push([rig.coordinates.lat, rig.coordinates.lng]),
    );

    warehouses.forEach((warehouse) =>
      latlngs.push([warehouse.coordinates.lat, warehouse.coordinates.lng]),
    );

    return latlngs;
  }, [rigs, warehouses]);

  const getRigColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "#22c55e";

      case "Maintenance":
        return "#f59e0b";

      default:
        return "#ef4444";
    }
  };

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
    <div className="rounded-3xl border border-border/60 bg-card shadow-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:h-[620px]">
        {/* Map */}

        <div className="relative h-[420px] lg:h-auto lg:flex-[2.4]">
          <MapContainer
            //@ts-expect-error
            center={[30, -120]}
            zoom={5}
            zoomControl={false}
            scrollWheelZoom={false}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <TileLayer
              key={theme}
              url={tileLayer.url}
              //@ts-expect-error
              attribution={tileLayer.attribution}
            />

            <FitBounds bounds={bounds} />

            {rigs.map((rig) => (
              <MapMarker
                key={rig.id}
                position={[rig.coordinates.lat, rig.coordinates.lng]}
                color={getRigColor(rig.status)}
                name={rig.name}
                selected={selected?.id === rig.id}
                onClick={() => setSelected(rig)}
              />
            ))}

            {warehouses.map((warehouse) => (
              <MapMarker
                key={warehouse.id}
                position={[
                  warehouse.coordinates.lat,
                  warehouse.coordinates.lng,
                ]}
                color="#8b5cf6"
                name={warehouse.name}
                selected={selected?.id === warehouse.id}
                onClick={() => setSelected(warehouse)}
              />
            ))}
          </MapContainer>

          {/* Legend */}

          <div className="absolute bottom-3 left-3 lg:bottom-5 lg:left-5 z-[500] rounded-2xl border border-border/70 bg-background/90 backdrop-blur-md px-3 py-2 lg:px-4 lg:py-3 shadow-lg">
            <div className="space-y-2 text-sm">
              <LegendItem color="#22c55e" label="Operational" />
              <LegendItem color="#f59e0b" label="Maintenance" />
              <LegendItem color="#ef4444" label="Offline" />
              <LegendItem color="#8b5cf6" label="Warehouse" />
            </div>
          </div>
        </div>

        {/* Info Panel */}

        <aside className="border-t lg:border-t-0 lg:border-l border-border bg-background lg:w-[380px]">
          <div className="p-6 lg:sticky lg:top-0 lg:h-full lg:overflow-auto">
            <InfoPanel
              entity={selected}
              onOpenDetails={() => {
                if (!selected) return;

                // only rigs have a details page
                if ("status" in selected) {
                  navigate(ROUTES.rigDetails(selected.id));
                }
              }}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-3 w-3 rounded-full shadow"
        style={{ backgroundColor: color }}
      />

      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
