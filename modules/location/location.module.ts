import type { IIPAddressAPI } from "@modules/location/core/ports/ip-address.api.interface";
import type { IIPLocationAPI } from "@modules/location/core/ports/ip-location.api.interface";
import { IPAddressApi } from "@modules/location/infra/api/ip-address.api";
import { IPLocationApi } from "@modules/location/infra/api/ip-location.api";
import { GetUserLocationUseCase } from "./use-cases/queries/get-user-location.usecase";
import { FindLocationByIPUseCase } from "./use-cases/queries/find-location-by-ip.usecase";
import { GetUserIPUseCase } from "./use-cases/queries/get-user-ip.usecase";

export function createLocationModule(config: {
  ipifyApiKey?: string;
  ipifyBaseUrl?: string;
  ipAddressApi?: IIPAddressAPI;
  ipLocationApi?: IIPLocationAPI;
}) {
  const ipAddressApi = config.ipAddressApi ?? new IPAddressApi();
  const ipLocationApi = config.ipLocationApi
    ? config.ipLocationApi
    : config.ipifyApiKey
      ? new IPLocationApi({
          apiKey: config.ipifyApiKey,
          baseUrl: config.ipifyBaseUrl,
        })
      : null;

  return {
    getUserIP: new GetUserIPUseCase(ipAddressApi),
    getUserLocation: ipLocationApi
      ? new GetUserLocationUseCase(ipAddressApi, ipLocationApi)
      : null,
    findLocationByIP: ipLocationApi
      ? new FindLocationByIPUseCase(ipLocationApi)
      : null,
  };
}

