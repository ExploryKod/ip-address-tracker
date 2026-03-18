import { createContainer } from '@evyweb/ioctopus';

import { DI_RETURN_TYPES, DI_SYMBOLS } from '@modules/di/types';

import { IInstrumentationService } from '@modules/core/application/services/intrumentation.service.interface';
import { IPAddressApi } from '@modules/location/infra/api/ip-address.api';
import { IPLocationApi } from '@modules/location/infra/api/ip-location.api';

const noopInstrumentation: IInstrumentationService = {
  startSpan(_options, callback) {
    return callback();
  },
  async instrumentServerAction(_name, _options, callback) {
    return callback();
  },
};

const ApplicationContainer = createContainer();
ApplicationContainer.bind(DI_SYMBOLS.IInstrumentationService).toValue(noopInstrumentation);

const ipifyApiKey = process.env.IPIFY_API_KEY;
if (!ipifyApiKey) {
  throw new Error(
    'Missing env var IPIFY_API_KEY. Add it to `.env.local` (server-only).'
  );
}

ApplicationContainer.bind(DI_SYMBOLS.IIPAddressAPI).toClass(IPAddressApi);
ApplicationContainer
  .bind(DI_SYMBOLS.IIPLocationAPI)
  .toValue(new IPLocationApi({ apiKey: ipifyApiKey }));

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  const instrumentationService =
    ApplicationContainer.get<IInstrumentationService>(
      DI_SYMBOLS.IInstrumentationService
    );

  return instrumentationService.startSpan(
    {
      name: '(di) getInjection',
      op: 'function',
      attributes: { symbol: symbol.toString() },
    },
    () => ApplicationContainer.get(DI_SYMBOLS[symbol])
  );
}
