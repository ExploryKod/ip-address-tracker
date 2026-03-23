import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface IIPISPLocationAPI {
  findISPLocationByIP(ip: string): Promise<IPLocationEntity.IPISPLocation | null>;
}
