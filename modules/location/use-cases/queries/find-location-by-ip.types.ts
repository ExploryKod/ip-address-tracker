import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface FindLocationByIPInput {
  ip: string;
}

export interface FindLocationByIPOutput {
  success: boolean;
  location: IPLocationEntity.IPLocation | null;
}

