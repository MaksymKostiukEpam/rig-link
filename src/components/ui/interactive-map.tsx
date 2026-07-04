import { useMemo, useState, useEffect } from "react";
import { MapContainer, Marker, Tooltip, Popup, useMap } from "react-leaflet";
import type { Rig, Warehouse } from "@/types";
import EntityCard from "./entity-card";
// @ts-ignore - leaflet types may not be installed in this workspace
import L from "leaflet";
const AnyMarker: any = Marker;
const AnyPopup: any = Popup;
import { useTheme } from "@/hooks/use-theme";

type Props = {
  rigs: Rig[];
  warehouses: Warehouse[];
};

export default function InteractiveMap({ rigs, warehouses }: Props) {
  const [selected, setSelected] = useState<Rig | Warehouse | null>(null);

  const bounds = useMemo(() => {
    const latlngs: [number, number][] = [];
    rigs.forEach((r) => latlngs.push([r.coordinates.lat, r.coordinates.lng]));
    warehouses.forEach((w) =>
      latlngs.push([w.coordinates.lat, w.coordinates.lng]),
    );
    return latlngs.length ? latlngs : undefined;
  }, [rigs, warehouses]);

  const defaultCenter = [30, -120] as [number, number];
  const { theme } = useTheme();

  const getRigColor = (status: string) =>
    status === "Operational"
      ? "#16a34a"
      : status === "Maintenance"
        ? "#f59e0b"
        : "#ef4444";

  const createIcon = (color: string) =>
    L.divIcon({
      className: "",
      html: `<span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:${color};box-shadow:0 0 0 3px rgba(0,0,0,0.08);border:2px solid rgba(255,255,255,0.9)"></span>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
      popupAnchor: [0, -10],
    } as any);

  function ThemeTileLayer({ theme }: { theme: string }) {
    const map = useMap();

    useEffect(() => {
      const url =
        theme === "dark"
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      const attribution =
        theme === "dark"
          ? '&copy; <a href="https://carto.com/">CartoDB</a>'
          : '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>';

      const layer = L.tileLayer(url, { attribution } as any).addTo(map);
      return () => {
        try {
          map.removeLayer(layer);
        } catch (e) {
          /* ignore */
        }
      };
    }, [map, theme]);

    return null;
  }

  return (
    <div className="h-[420px] ">
      <MapContainer
        // cast to any to avoid mismatched react-leaflet type issues in this workspace
        {...({
          center: bounds ? (bounds[0] as [number, number]) : defaultCenter,
        } as any)}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <ThemeTileLayer theme={theme} />

        {rigs.map((r) => (
          <AnyMarker
            key={r.id}
            position={[r.coordinates.lat, r.coordinates.lng] as any}
            icon={createIcon(getRigColor(r.status)) as any}
            eventHandlers={{ click: () => setSelected(r) } as any}
          >
            <Tooltip>{r.name}</Tooltip>
          </AnyMarker>
        ))}

        {warehouses.map((w) => (
          <AnyMarker
            key={w.id}
            position={[w.coordinates.lat, w.coordinates.lng] as any}
            icon={createIcon("#2563eb") as any}
            eventHandlers={{ click: () => setSelected(w) } as any}
          >
            <Tooltip>{w.name}</Tooltip>
          </AnyMarker>
        ))}

        {selected ? (
          <AnyPopup
            position={
              [selected.coordinates.lat, selected.coordinates.lng] as any
            }
            onClose={() => setSelected(null)}
          >
            <div className="max-w-xs">
              <EntityCard
                title={selected.name}
                subtitle={selected.id}
                status={
                  ("status" in selected
                    ? (selected as any).status
                    : undefined) as any
                }
                crew={
                  ("crew" in selected
                    ? (selected as any).crew
                    : undefined) as any
                }
                storagePercent={
                  ("storageCapacity" in selected
                    ? Math.round(
                        ((selected as any).storageCapacity.used /
                          (selected as any).storageCapacity.total) *
                          100,
                      )
                    : undefined) as any
                }
                actionLabel="Open →"
              />
            </div>
          </AnyPopup>
        ) : null}
      </MapContainer>
    </div>
  );
}
