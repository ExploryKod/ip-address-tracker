import type { IPLocationEntity } from "@modules/location/core/models/ip-location.entity";

export class IpLocationFactory { 

    static create(data?:Partial<IPLocationEntity.IPLocation>):IPLocationEntity.IPLocation {
        return {
            ip: '',
            location: {
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
}