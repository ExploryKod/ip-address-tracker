import type { IIPLocationAPI } from "@modules/location/core/ports/ip-location.api.interface";
import type {
  FindLocationByIPInput,
  FindLocationByIPOutput,
} from "./find-location-by-ip.types";

export class FindLocationByIPUseCase {
  constructor(private readonly ipLocationApi: IIPLocationAPI) {}

  async execute(input: FindLocationByIPInput): Promise<FindLocationByIPOutput> {
    const location = await this.ipLocationApi.findLocationByIP(input.ip);
    return { success: Boolean(location), location };
  }
}

