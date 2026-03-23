import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface GetTimezoneByIPInput {
  ip: string;
}

export interface GetTimezoneByIPOutput {
  success: boolean;
  timezone: IPLocationEntity.IPTimeZone["timezone"] | null;
}
