import { describe, it, expect, beforeEach } from "@jest/globals";
import { FindLocationByIPUseCase } from "./find-location-by-ip.usecase";
import type { IIPLocationAPI } from "@modules/location/core/ports/ip-location.api.interface";
import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

class FakeIPLocationApi implements IIPLocationAPI {
  public lastIp: string | null = null;

  constructor(
    private readonly result: IPLocationEntity.IPLocation | null
  ) {}

  async findLocationByIP(
    ip: string
  ): Promise<IPLocationEntity.IPLocation | null> {
    this.lastIp = ip;
    return this.result;
  }
}

describe("FindLocationByIPUseCase", () => {
  const ip = "176.128.133.201";

  const location: IPLocationEntity.IPLocation = {
    ip,
    location: {
      country: "FR",
      region: "Centre-Val de Loire",
      timezone: "+01:00",
      lat: 47.22186,
      lng: 2.0684,
      postalCode: "18100",
    },
  };

  let useCase: FindLocationByIPUseCase;
  let api: FakeIPLocationApi;

  beforeEach(() => {
    api = new FakeIPLocationApi(location);
    useCase = new FindLocationByIPUseCase(api);
  });

  it("returns success true with the resolved location", async () => {
    const result = await useCase.execute({ ip });

    expect(result.success).toBe(true);
    expect(result.location).toEqual(location);
    expect(api.lastIp).toBe(ip);
  });

  it("returns success false when location cannot be resolved", async () => {
    api = new FakeIPLocationApi(null);
    useCase = new FindLocationByIPUseCase(api);

    const result = await useCase.execute({ ip });

    expect(result.success).toBe(false);
    expect(result.location).toBeNull();
    expect(api.lastIp).toBe(ip);
  });
});