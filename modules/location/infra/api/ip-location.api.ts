
import type { IPLocationEntity } from '@modules/location/core/models/ip-location.entity'
import type { IIPLocationAPI } from '@modules/location/core/ports/ip-location.api.interface';

export class IPLocationApi implements IIPLocationAPI {
  constructor(
    private readonly config: { apiKey: string; baseUrl?: string }
  ) {
    if (!config.apiKey) {
      throw new Error('IPLocationApi requires a non-empty apiKey.');
    }
  }

  async findLocationByIP(ip: string): Promise<IPLocationEntity.IPLocation | null> {
    const baseUrl = this.config.baseUrl ?? 'https://geo.ipify.org/api/v2/country,city';
    const url = `${baseUrl}?apiKey=${encodeURIComponent(this.config.apiKey)}&ipAddress=${encodeURIComponent(ip)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    
    const data = await res.json();
    return data as IPLocationEntity.IPLocation ?? null;
  }
}
