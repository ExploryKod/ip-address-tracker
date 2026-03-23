import type {
  GetTimezoneByIPInput,
  GetTimezoneByIPOutput,
} from "./get-timezone-by-ip.types";
import type { IIPTimezoneAPI } from "@modules/location/core/ports/ip-timezone.api.interface";

export class GetTimezoneByIPUseCase {
  constructor(private readonly ipTimezoneApi: IIPTimezoneAPI) {}

  async execute(input: GetTimezoneByIPInput): Promise<GetTimezoneByIPOutput> {
    const timezone = await this.ipTimezoneApi.findTimezoneByIP(input.ip);
    return { success: Boolean(timezone), timezone: timezone?.timezone ?? null };
  }
}

