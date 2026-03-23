import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface GetLocationCoordinatesInput {
  location: IPLocationEntity.IPLocation | null;
}

export interface GetLocationCoordinatesOutput {
  success: boolean;
  coordinates: { lat: number; lng: number } | null;
}

