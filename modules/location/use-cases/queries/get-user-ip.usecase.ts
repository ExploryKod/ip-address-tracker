import type { IIPAddressAPI } from "@modules/location/core/ports/ip-address.api.interface";

export interface GetUserIPOutput {
  success: boolean;
  ip: string | null;
}

export class GetUserIPUseCase {
  constructor(private readonly ipAddressApi: IIPAddressAPI) {}

  async execute(): Promise<GetUserIPOutput> {
    const ip = await this.ipAddressApi.getUserIP();
    return { success: Boolean(ip), ip };
  }
}

