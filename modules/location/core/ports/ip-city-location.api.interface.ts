import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface IIPCityLocationAPI {
  findCityByIP(ip: string): Promise<IPLocationEntity.IPLocationCity | null>;
}