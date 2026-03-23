
import type { IPLocationEntity } from '@modules/location/core/models/ip-location.entity'
import type { IIPLocationAPI } from '@modules/location/core/ports/ip-location.api.interface';
import type { IIPCityLocationAPI } from '@modules/location/core/ports/ip-city-location.api.interface';
import type { IIPTimezoneAPI } from '@modules/location/core/ports/ip-timezone.api.interface';
import type { IIPISPLocationAPI } from '@modules/location/core/ports/ip-isp-location.api.interface';
import type { IIPifyAccountBalanceAPI } from '@modules/location/core/ports/ipify-account-balance.api.interface';

export class IPLocationApi
  implements
    IIPLocationAPI,
    IIPCityLocationAPI,
    IIPTimezoneAPI,
    IIPISPLocationAPI,
    IIPifyAccountBalanceAPI
{
  constructor(
    private readonly config: { apiKey: string; baseUrl?: string }
  ) {
    if (!config.apiKey) {
      throw new Error('IPLocationApi requires a non-empty apiKey.');
    }
  }

  private async fetchGeoDataByIP(
    ip: string
  ): Promise<IPLocationEntity.IPLocation | null> {
    const baseUrl = this.config.baseUrl ?? 'https://geo.ipify.org/api/v2/country,city';
    const url = `${baseUrl}?apiKey=${encodeURIComponent(this.config.apiKey)}&ipAddress=${encodeURIComponent(ip)}`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    return data as IPLocationEntity.IPLocation;
  }

  async findLocationByIP(ip: string): Promise<IPLocationEntity.IPLocation | null> {
    return this.fetchGeoDataByIP(ip);
  }

  async findCityByIP(ip: string): Promise<IPLocationEntity.IPLocationCity | null> {
    const data = await this.fetchGeoDataByIP(ip);
    if (!data?.location?.city) return null;
    return { ip: data.ip, city: data.location.city };
  }

  async findTimezoneByIP(ip: string): Promise<IPLocationEntity.IPTimeZone | null> {
    const data = await this.fetchGeoDataByIP(ip);
    if (!data?.location?.timezone) return null;
    return { ip: data.ip, timezone: data.location.timezone };
  }

  async findISPLocationByIP(
    ip: string
  ): Promise<IPLocationEntity.IPISPLocation | null> {
    const data = await this.fetchGeoDataByIP(ip);
    if (!data?.isp) return null;
    return { ip: data.ip, isp: data.isp };
  }

  async findAccountBalance(): Promise<IPLocationEntity.IPifyAccountBalance | null> {
    const url = `https://geo.ipify.org/service/account-balance?apiKey=${encodeURIComponent(
      this.config.apiKey
    )}`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = (await res.json()) as Partial<IPLocationEntity.IPifyAccountBalance>;
    if (typeof data.credits !== "number") return null;
    return { credits: data.credits };
  }
}
