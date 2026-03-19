import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface GetUserLocationOutput {
  success: boolean;
  location: IPLocationEntity.IPLocation | null;
}

