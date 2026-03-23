import { createLocationModule } from "@modules/location/location.module";

export interface HomeViewModel {
  ipAddress: string | null;
  locationCity: string;
  locationTimezone: string;
  isp: string;
  hasIpifyCredits: boolean;
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
  const accountBalanceResult = locationModule.getIPifyAccountBalance
    ? await locationModule.getIPifyAccountBalance.execute()
    : { success: false, credits: null };

  let locationCity = "Unavailable";
  let locationTimezone = "Unavailable";
  let isp = "Unavailable";
  const hasIpifyCredits =
    accountBalanceResult.success &&
    typeof accountBalanceResult.credits === "number" &&
    accountBalanceResult.credits > 0;
  if (ipResult.ip && locationModule.findLocationByIP) {
    const locResult = await locationModule.findLocationByIP.execute({
      ip: ipResult.ip,
    });

    const city = (locResult.location?.location as {
      city?: string;
    }).city;

    const timezone =
      locResult.location?.location?.timezone ??
      (locResult.location?.location as { timezone?: string }).timezone;

    if (locResult.success && typeof city === "string" && city.length > 0) {
      locationCity = city;
    }

    if (locResult.success && typeof timezone === "string" && timezone.length > 0) {
      locationTimezone = timezone;
    }

    if (locResult.success && typeof locResult.location?.isp === "string" && locResult.location?.isp.length > 0) {
      isp = locResult.location.isp;
    }
  }

  return {
    ipAddress: ipResult.ip,
    locationCity,
    locationTimezone,
    isp,
    hasIpifyCredits,
  };
}

