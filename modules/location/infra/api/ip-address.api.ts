import { headers } from "next/headers";  
 
import type { IIPAddressAPI } from "@modules/location/core/ports/ip-address.api.interface";
import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export class IPAddressApi implements IIPAddressAPI {
  async getUserIP(): Promise<IPLocationEntity.IPAddress | null> {
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for");  
    const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1"; // Fallback for localhost  
    return ip as IPLocationEntity.IPAddress ?? null;
  }
}