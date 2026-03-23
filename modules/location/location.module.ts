import type { IIPAddressAPI } from "@modules/location/core/ports/ip-address.api.interface";
import type { IIPLocationAPI } from "@modules/location/core/ports/ip-location.api.interface";
import type { IIPifyAccountBalanceAPI } from "@modules/location/core/ports/ipify-account-balance.api.interface";
import { IPAddressApi } from "@modules/location/infra/api/ip-address.api";
import { IPLocationApi } from "@modules/location/infra/api/ip-location.api";
import { GetUserLocationUseCase } from "./use-cases/queries/get-user-location.usecase";
import { FindLocationByIPUseCase } from "./use-cases/queries/find-location-by-ip.usecase";
import { GetUserIPUseCase } from "./use-cases/queries/get-user-ip.usecase";
import { GetIPifyAccountBalanceUseCase } from "./use-cases/queries/get-ipify-account-balance.usecase";

export function createLocationModule(config: {
  ipifyApiKey?: string;
  ipifyBaseUrl?: string;
  ipAddressApi?: IIPAddressAPI;
  ipLocationApi?: IIPLocationAPI;
  ipifyAccountApi?: IIPifyAccountBalanceAPI;
}) {
  const ipAddressApi = config.ipAddressApi ?? new IPAddressApi();
  const defaultLocationApi = config.ipifyApiKey
    ? new IPLocationApi({
        apiKey: config.ipifyApiKey,
        baseUrl: config.ipifyBaseUrl,
      })
    : null;
  const ipLocationApi = config.ipLocationApi
    ? config.ipLocationApi
    : defaultLocationApi;
  const ipifyAccountApi = config.ipifyAccountApi
    ? config.ipifyAccountApi
    : defaultLocationApi;

  return {
    getUserIP: new GetUserIPUseCase(ipAddressApi),
    getUserLocation: ipLocationApi
      ? new GetUserLocationUseCase(ipAddressApi, ipLocationApi)
      : null,
    findLocationByIP: ipLocationApi
      ? new FindLocationByIPUseCase(ipLocationApi)
      : null,
    getIPifyAccountBalance: ipifyAccountApi
      ? new GetIPifyAccountBalanceUseCase(ipifyAccountApi)
      : null,
  };
}

