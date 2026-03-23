import { describe, it, expect } from "@jest/globals";
import { GetLocationCoordinatesUseCase } from "./get-location-coordinates.usecase";
import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

describe("GetLocationCoordinatesUseCase", () => {
  const useCase = new GetLocationCoordinatesUseCase();

  it("returns coordinates when location has valid lat/lng", async () => {
    const location: IPLocationEntity.IPLocation = {
      ip: "176.128.133.201",
      location: {
        city: "Vierzon",
        country: "FR",
        region: "Centre-Val de Loire",
        timezone: "+01:00",
        lat: 47.22186,
        lng: 2.0684,
        postalCode: "18100",
      },
      isp: "Bouygues Telecom ISP",
    };

    const result = await useCase.execute({ location });

    expect(result.success).toBe(true);
    expect(result.coordinates).toEqual({ lat: 47.22186, lng: 2.0684 });
  });

  it("returns failure when location is null", async () => {
    const result = await useCase.execute({ location: null });

    expect(result.success).toBe(false);
    expect(result.coordinates).toBeNull();
  });

  it("returns failure when provider fallback is 0,0", async () => {
    const location: IPLocationEntity.IPLocation = {
      ip: "::1",
      location: {
        city: "",
        country: "",
        region: "",
        timezone: "",
        lat: 0,
        lng: 0,
        postalCode: "",
      },
    };

    const result = await useCase.execute({ location });

    expect(result.success).toBe(false);
    expect(result.coordinates).toBeNull();
  });
});

