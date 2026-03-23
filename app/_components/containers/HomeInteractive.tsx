"use client";

import { useState } from "react";
import { BannerSection } from "@components/sections/BannerSection";
import { HeroBanner } from "@components/molecules/HeroBanner";
import { AddressInfosContainer } from "@components/containers/AddressInfosContainer";
import { Section } from "@components/sections/Section";
import { MapContainer } from "@components/containers/MapContainer";
import type { HomeViewModel } from "@presenters/home-view-model";

type HomeInteractiveProps = {
  initialViewModel: HomeViewModel;
};

type LookupApiResponse = {
  success: boolean;
  location: {
    ip: string;
    location: {
      city?: string;
      timezone?: string;
      lat?: number;
      lng?: number;
    };
    isp?: string;
  };
};

export function HomeInteractive({ initialViewModel }: HomeInteractiveProps) {
  const [vm, setVm] = useState<HomeViewModel>(initialViewModel);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  async function handleSearchIp(ip: string) {
    if (vm.ipifyCreditsStatus === "stopped") {
      setSearchError(
        "Sorry, Ipify api free credits are too low so we stopped the service"
      );
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const res = await fetch(`/api/location?ip=${encodeURIComponent(ip)}`, {
        method: "GET",
        cache: "no-store",
      });

      const data: unknown = await res.json();

      if (!res.ok) {
        const errorMessage =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error?: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Unable to resolve location for this IP.";
        setSearchError(errorMessage);
        return;
      }

      const payload = data as LookupApiResponse;
      if (!payload.success || !payload.location) {
        setSearchError("Unable to resolve location for this IP.");
        return;
      }

      const lat = payload.location.location?.lat;
      const lng = payload.location.location?.lng;
      const hasValidCoordinates =
        typeof lat === "number" &&
        Number.isFinite(lat) &&
        typeof lng === "number" &&
        Number.isFinite(lng) &&
        !(lat === 0 && lng === 0);

      setVm((prev) => ({
        ...prev,
        ipAddress: payload.location.ip ?? ip,
        locationCity: payload.location.location?.city || "Unavailable",
        locationTimezone: payload.location.location?.timezone || "Unavailable",
        isp: payload.location.isp || "Unavailable",
        coordinates: hasValidCoordinates ? { lat, lng } : null,
      }));
    } catch {
      setSearchError("Network error. Please try again.");
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <>
      <BannerSection>
        <HeroBanner
          ipifyCreditsStatus={vm.ipifyCreditsStatus}
          onSearchIp={handleSearchIp}
          isSearching={isSearching}
          searchError={searchError}
        />
        <AddressInfosContainer
          ipAddress={vm.ipAddress}
          locationCity={vm.locationCity}
          locationTimezone={vm.locationTimezone}
          isp={vm.isp}
        />
      </BannerSection>
      <Section
        fluid
        classNames="flex-1 min-h-[300px] min-w-[300px] flex justify-center items-center"
      >
        <MapContainer coordinates={vm.coordinates} />
      </Section>
    </>
  );
}

