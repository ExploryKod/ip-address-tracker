/* eslint-disable @typescript-eslint/no-namespace */
export namespace IPLocationEntity {
  export type IPAddress = string
  export type Location = {
    city: string
    country: string
    region: string
    timezone: string
    lat: number
    lng: number
    postalCode: string
  }

  export type IPLocation = {
    ip: IPAddress
    location: Location
    // Present in IPify responses (returned from IPLocationApi).
    isp?: string
    as?: {
      asn: number
      name: string
      route: string
      domain: string
      type: string
    }
  }

  export type IPLocationCity = {
    ip: IPAddress
    city: Location["city"]
  }

  export type IPTimeZone = {
    ip: IPAddress
    timezone: Location["timezone"]
  }

}

