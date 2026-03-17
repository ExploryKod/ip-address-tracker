import { Section } from "@components/sections/Section";
import { MapContainer } from "@components/containers/MapContainer";
import { HeroBanner } from "@components/molecules/HeroBanner";
import { AddressInfosContainer } from "@components/containers/AddressInfosContainer";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-var(--header-height))] w-full flex-col">
      <Section fluid classNames="relative bg-pattern flex flex-col justify-center items-center gap-y-10 px-5 md:px-10">
        <HeroBanner />
        <AddressInfosContainer />
      </Section>
      <Section fluid classNames="min-h-[300px] min-w-[300px] flex justify-center items-center">
          <MapContainer />
      </Section>
    </main>
  );
}
