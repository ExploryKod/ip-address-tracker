export interface HomeViewModel {
  ipAddress: string | null;
  locationCity: string;
  locationTimezone: string;
  isp: string;
  hasIpifyCredits: boolean;
  coordinates: { lat: number; lng: number } | null;
}

