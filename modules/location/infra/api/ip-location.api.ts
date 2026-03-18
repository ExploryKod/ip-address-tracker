import { headers } from "next/headers";  
 
import type { IPLocationEntity } from '@modules/location/core/models/ip-location.entity'
import type { IIPLocationAPI } from '@modules/location/core/ports/ip-location.api.interface';

const REST_IP_LOCATION_URL =
  'https://geo.ipify.org/api/v2/country,city?apiKey=at_Ay4rbIiTztiDXyVPn2eAm5Z2eoy5R&ipAddress={ip}';

export class IPLocationApi implements IIPLocationAPI {
  constructor() {}

  async getUserIP(): Promise<IPLocationEntity.IPAddress | null> {
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for");  
    const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1";  
    return ip as IPLocationEntity.IPAddress ?? null;
  }

  async findLocationByIP(ip: string): Promise<IPLocationEntity.IPLocation | null> {
    const res = await fetch(REST_IP_LOCATION_URL.replace('{ip}', encodeURIComponent(ip)));
    if (!res.ok) return null;
    
    const data = await res.json();
    return data as IPLocationEntity.IPLocation ?? null;
  }
}
