import { createLocationModule } from "@modules/location/location.module";
import { GetLocationCoordinatesUseCase } from "@modules/location/use-cases/queries/get-location-coordinates.usecase";
import type { HomeViewModel } from "./home-view-model";

/**
 * Server presenter: orchestrates use-cases and converts results to UI props.
 * Must stay server-only (no React hooks).
 */
export async function presentHomeViewModel(): Promise<HomeViewModel> {
  const WARNING_THRESHOLD = 500;
  const STOP_THRESHOLD = 200;

  const ipifyApiKey = process.env.IPIFY_API_KEY;
  const getCoordinatesUseCase = new GetLocationCoordinatesUseCase();

  const locationModule = createLocationModule({
    ipifyApiKey,
  });

  const ipResult = await locationModule.getUserIP.execute();
  const accountBalanceResult = locationModule.getIPifyAccountBalance
    ? await locationModule.getIPifyAccountBalance.execute()
    : { success: false, credits: null };

  let locationCity = "Unavailable";
  let locationTimezone = "Unavailable";
  let isp = "Unavailable";
  let coordinates: { lat: number; lng: number } | null = null;
  let ipifyCreditsStatus: HomeViewModel["ipifyCreditsStatus"] = "unknown";
  if (
    accountBalanceResult.success &&
    typeof accountBalanceResult.credits === "number"
  ) {
    if (accountBalanceResult.credits <= STOP_THRESHOLD) {
      ipifyCreditsStatus = "stopped";
    } else if (accountBalanceResult.credits <= WARNING_THRESHOLD) {
      ipifyCreditsStatus = "warning";
    } else {
      ipifyCreditsStatus = "ok";
    }
  }

  // Keep service live only when enough credits remain.
  const canCallIpifyGeo = ipifyCreditsStatus !== "stopped";
  if (canCallIpifyGeo && ipResult.ip && locationModule.findLocationByIP) {
    const locResult = await locationModule.findLocationByIP.execute({
      ip: ipResult.ip,
    });

    const city = (locResult.location?.location as {
      city?: string;
    }).city;

    const timezone =
      locResult.location?.location?.timezone ??
      (locResult.location?.location as { timezone?: string }).timezone;
    const coordinatesResult = await getCoordinatesUseCase.execute({
      location: locResult.location,
    });

    if (locResult.success && typeof city === "string" && city.length > 0) {
      locationCity = city;
    }

    if (locResult.success && typeof timezone === "string" && timezone.length > 0) {
      locationTimezone = timezone;
    }

    if (locResult.success && typeof locResult.location?.isp === "string" && locResult.location?.isp.length > 0) {
      isp = locResult.location.isp;
    }

    if (coordinatesResult.success) {
      coordinates = coordinatesResult.coordinates;
    }

  }

  return {
    ipAddress: ipResult.ip,
    locationCity,
    locationTimezone,
    isp,
    ipifyCreditsStatus,
    coordinates,
  };
}

