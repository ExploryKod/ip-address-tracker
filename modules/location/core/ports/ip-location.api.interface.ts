import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface IIPLocationAPI {
  findLocationByIP(ip: string): Promise<IPLocationEntity.IPLocation | null>;
}
