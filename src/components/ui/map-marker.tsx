import { useEffect, useMemo, useRef } from "react";
import { Marker, Tooltip } from "react-leaflet";
// @ts-ignore
import L from "leaflet";

type Props = {
  position: [number, number];
  color?: string;
  name?: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function MapMarker({
  position,
  color = "#2563eb",
  name,
  selected = false,
  onClick,
}: Props) {
  const markerRef = useRef<L.Marker>(null);

  const icon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `
          <span class="rig-marker${selected ? " is-selected" : ""}" style="--marker-color:${color}">
            <span class="rig-marker-pulse"></span>
            <span class="rig-marker-dot"></span>
          </span>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -12],
      }),
    [color, selected],
  );

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setIcon(icon);
    }
  }, [icon]);

  return (
    <Marker
      ref={markerRef}
      position={position}
      // @ts-expect-error
      icon={icon}
      eventHandlers={{
        click: () => {
          onClick?.();
        },
      }}
    >
      {name && (
        <Tooltip
          //@ts-expect-error
          direction="top"
          offset={[0, -10]}
        >
          {name}
        </Tooltip>
      )}
    </Marker>
  );
}
