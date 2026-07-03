export type VehicleType = "Helicopter" | "Supply Vessel"

export interface Vehicle {
  id: string
  name: string
  type: VehicleType
}
