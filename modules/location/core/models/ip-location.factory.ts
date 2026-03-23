import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export class IpLocationFactory { 

    static create(data?:Partial<IPLocationEntity.IPLocation>):IPLocationEntity.IPLocation {
        return {
            ip: '',
            location: {
                city: '',
                country: '',
                region: '',
                timezone: '',
                lat: 0,
                lng: 0,
                postalCode: '',
            },
            ...data
        }
    }

    static createLocationCity(data?:Partial<IPLocationEntity.IPLocationCity>):IPLocationEntity.IPLocationCity {
        return {
            ip: '',
            city: '',
            ...data
        }
    }

    static createTimeZone(data?:Partial<IPLocationEntity.IPTimeZone>):IPLocationEntity.IPTimeZone {
        return {
            ip: '',
            timezone: '',
            ...data
        }
    }

    static createISPLocation(data?:Partial<IPLocationEntity.IPISPLocation>):IPLocationEntity.IPISPLocation {
        return {
            ip: '',
            isp: '',
            ...data
        }
    }
}