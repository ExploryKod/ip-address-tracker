import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface IIPCityLocationAPI {
  findLocationCityByIP(ip: string): Promise<IPLocationEntity.IPLocationCity | null>;
}