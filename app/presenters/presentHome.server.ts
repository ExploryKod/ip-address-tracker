import { createLocationModule } from "@modules/location/location.module";

export interface HomeViewModel {
  ipAddress: string | null;
  locationCity: string;
}

/**
 * Server presenter: orchestrates use-cases and converts results to UI props.
 * Must stay server-only (no React hooks).
 */
export async function presentHomeViewModel(): Promise<HomeViewModel> {
  const ipifyApiKey = process.env.IPIFY_API_KEY;

  const locationModule = createLocationModule({
    ipifyApiKey,
  });

  const ipResult = await locationModule.getUserIP.execute();

  let locationCity = "Unavailable";
  if (ipResult.ip && locationModule.findLocationByIP) {
    const locResult = await locationModule.findLocationByIP.execute({
      ip: ipResult.ip,
    });

    const city = (locResult.location?.location as {
      city?: string;
    }).city;

    if (locResult.success && typeof city === "string" && city.length > 0) {
      locationCity = city;
    }
  }

  return {
    ipAddress: ipResult.ip,
    locationCity,
  };
}

