import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface IIPAddressAPI {
  getUserIP(): Promise<IPLocationEntity.IPAddress | null>;
}