import { IInstrumentationService } from '@modules/core/application/services/intrumentation.service.interface';
import type { IIPAddressAPI } from '@modules/location/core/ports/ip-address.api.interface';
import type { IIPLocationAPI } from '@modules/location/core/ports/ip-location.api.interface';

export const DI_SYMBOLS = {
  IInstrumentationService: Symbol.for('IInstrumentationService'),
  IIPAddressAPI: Symbol.for('IIPAddressAPI'),
  IIPLocationAPI: Symbol.for('IIPLocationAPI'),
} as const;

export interface DI_RETURN_TYPES {
  IInstrumentationService: IInstrumentationService;
  IIPAddressAPI: IIPAddressAPI;
  IIPLocationAPI: IIPLocationAPI;
}
