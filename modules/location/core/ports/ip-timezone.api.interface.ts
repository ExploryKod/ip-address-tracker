import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface IIPTimezoneAPI {
  findTimezoneByIP(ip: string): Promise<IPLocationEntity.IPTimeZone | null>;
}