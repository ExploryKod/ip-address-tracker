export interface HomeViewModel {
  ipAddress: string | null;
  locationCity: string;
  locationTimezone: string;
  isp: string;
  ipifyCreditsStatus: "ok" | "warning" | "stopped" | "unknown";
  coordinates: { lat: number; lng: number } | null;
}

