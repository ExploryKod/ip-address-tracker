"use client";

interface UseAddressInfosContainerPresenterInput {
  ipAddress: string | null;
  locationCity: string;
  locationTimezone: string;
  isp: string;
}

export interface AddressInfosContainerViewModel {
  ipInfo: string;
  locationInfo: string;
  timezoneInfo: string;
  ispInfo: string;
}

/**
 * React presenter: maps "UI props" into display strings.
 * Keeps UI components small and consistent.
 */
export function useAddressInfosContainerPresenter(
  input: UseAddressInfosContainerPresenterInput
): AddressInfosContainerViewModel {
  return {
    ipInfo: input.ipAddress ?? "Unavailable",
    locationInfo: input.locationCity ?? "Unavailable",
    timezoneInfo: input.locationTimezone ?? "Unavailable",
    ispInfo: input.isp ?? "Unavailable",
  };
}

