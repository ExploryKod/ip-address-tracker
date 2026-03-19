export namespace IPLocationEntity {
  export type IPAddress = string
  export type Location = {
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
  }

}

