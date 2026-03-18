import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface IIPLocationAPI {
  getUserIP(): Promise<IPLocationEntity.IPAddress | null>;
  findLocationByIP(ip: string): Promise<IPLocationEntity.IPLocation | null>;
}
