import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface IIPTimezoneAPI {
  findTimeZoneByIP(ip: string): Promise<IPLocationEntity.IPTimeZone | null>;
}