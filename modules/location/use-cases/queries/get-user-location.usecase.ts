import type { IIPAddressAPI } from "@modules/location/core/ports/ip-address.api.interface";
import type { IIPLocationAPI } from "@modules/location/core/ports/ip-location.api.interface";
import type { GetUserLocationOutput } from "./get-user-location.types";

export class GetUserLocationUseCase {
  constructor(
    private readonly ipAddressApi: IIPAddressAPI,
    private readonly ipLocationApi: IIPLocationAPI
  ) {}

  async execute(): Promise<GetUserLocationOutput> {
    const userIP = await this.ipAddressApi.getUserIP();
    if (!userIP) {
      return { success: false, location: null };
    }

    const location = await this.ipLocationApi.findLocationByIP(userIP);
    return { success: Boolean(location), location };
  }
}

