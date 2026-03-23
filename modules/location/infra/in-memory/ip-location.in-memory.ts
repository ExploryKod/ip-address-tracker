import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity"
import type { IIPLocationAPI } from "@modules/location/core/ports/ip-location.api.interface"

const ipLocationMap = new Map<string, IPLocationEntity.IPLocation>()

export class IPLocationApi implements IIPLocationAPI {
  constructor() {
    ipLocationMap.set("8.8.8.8", {
      ip: "8.8.8.8",
      location: {
        city: "Mountain View",
        country: "United States",
        region: "California",
        timezone: "America/Los_Angeles",
        lat: 37.40599,
        lng: -122.078514,
        postalCode: "94043",
      },
    })
  }

  async getUserIP(): Promise<IPLocationEntity.IPAddress | null> {
    return "8.8.8.8" 
  }

  async findLocationByIP(ip: string): Promise<IPLocationEntity.IPLocation | null> {
    return ipLocationMap.get(ip) ?? null
  }
}

