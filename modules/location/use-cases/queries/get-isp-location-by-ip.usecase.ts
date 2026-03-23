import type { IIPISPLocationAPI } from "@modules/location/core/ports/ip-isp-location.api.interface";
import type {
  GetISPLocationByIPInput,
  GetISPLocationByIPOutput,
} from "./get-isp-location-by-ip.types";

export class GetISPLocationByIPUseCase {
  constructor(private readonly ipISPLocationApi: IIPISPLocationAPI) {}

  async execute(input: GetISPLocationByIPInput): Promise<GetISPLocationByIPOutput> {
    const ispLocation = await this.ipISPLocationApi.findISPLocationByIP(input.ip);
    return { success: Boolean(ispLocation), ispLocation };
  }
}
