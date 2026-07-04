import { Marker, Tooltip } from "react-leaflet";
// @ts-ignore
import L from "leaflet";

const AnyMarker: any = Marker;

type Props = {
  position: [number, number];
  color?: string;
  name?: string;
  onClick?: () => void;
};

export default function MapMarker({
  position,
  color = "#2563eb",
  name,
  onClick,
}: Props) {
  const icon = L.divIcon({
    className: "",
    html:
      `<span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${color};box-shadow:0 6px 18px rgba(0,0,0,0.12);border:2px solid rgba(255,255,255,0.9);transform:translateY(0);transition:transform .15s ease;">` +
      `</span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -12],
  } as any);

  return (
    <AnyMarker
      position={position as any}
      icon={icon as any}
      eventHandlers={{ click: onClick } as any}
    >
      {name ? <Tooltip>{name}</Tooltip> : null}
    </AnyMarker>
  );
}
