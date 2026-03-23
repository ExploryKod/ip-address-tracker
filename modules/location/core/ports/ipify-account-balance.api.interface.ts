import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export interface IIPifyAccountBalanceAPI {
  findAccountBalance(): Promise<IPLocationEntity.IPifyAccountBalance | null>;
}

