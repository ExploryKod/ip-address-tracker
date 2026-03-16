import { IInstrumentationService } from '@modules/core/application/services/intrumentation.service.interface';

export const DI_SYMBOLS = {
  IInstrumentationService: Symbol.for('IInstrumentationService'),
} as const;

export interface DI_RETURN_TYPES {
  IInstrumentationService: IInstrumentationService;
}
