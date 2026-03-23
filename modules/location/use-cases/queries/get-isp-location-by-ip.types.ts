import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface GetISPLocationByIPInput {
  ip: string;
}

export interface GetISPLocationByIPOutput {
  success: boolean;
  ispLocation: IPLocationEntity.IPISPLocation | null;
}
