import { Section } from "@components/sections/Section";
import { MapContainer } from "@components/containers/MapContainer";
import { HeroBanner } from "@components/molecules/HeroBanner";
import { AddressInfosContainer } from "@components/containers/AddressInfosContainer";
import { BannerSection } from "@components/sections/BannerSection";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-var(--header-height))] w-full flex-col">
      <BannerSection>
        <HeroBanner />
        <AddressInfosContainer />
      </BannerSection>
      <Section
        fluid
        classNames="flex-1 min-h-[300px] min-w-[300px] flex justify-center items-center"
      >
        <MapContainer />
      </Section>
    </main>
  );
}
