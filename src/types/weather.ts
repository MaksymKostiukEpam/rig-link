export interface Weather {
  condition: "Clear" | "Cloudy" | "Stormy" | "Rain" | "Fog";
  windSpeed: number;
  temperature: number;
}
