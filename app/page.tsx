import { Section } from "@components/sections/Section";
import { MapContainer } from "@components/containers/MapContainer";
import { HeroBanner } from "@components/molecules/HeroBanner";
import { AddressInfosContainer } from "@components/containers/AddressInfosContainer";
import { BannerSection } from "@components/sections/BannerSection";
import { Header } from "@modules/app/react/layout/Header";
import { presentHomeViewModel } from "@presenters/presentHome.server";

export default async function Home() {
  const vm = await presentHomeViewModel();

  return (
    <>
    <Header />
    <main className="flex min-h-[calc(100vh-var(--header-height)-var(--banner-height))] w-full flex-col">
      <BannerSection>
        <HeroBanner hasIpifyCredits={vm.hasIpifyCredits} />
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
    </main>
    </>
  );
}
