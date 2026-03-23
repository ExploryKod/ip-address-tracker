import { Section } from "@components/sections/Section";
import { MapContainer } from "@components/containers/MapContainer";
import { HeroBanner } from "@components/molecules/HeroBanner";
import { AddressInfosContainer } from "@components/containers/AddressInfosContainer";
import { BannerSection } from "@components/sections/BannerSection";
import { Header } from "@modules/app/react/layout/Header";
import { createLocationModule } from "@modules/location/location.module";

export default async function Home() {
  const ipifyApiKey = process.env.IPIFY_API_KEY;
  const locationModule = createLocationModule({
    ipifyApiKey,
  });

  const ipResult = await locationModule.getUserIP.execute();

  let locationCity = "Unavailable";
  if (ipResult.ip && locationModule.findLocationByIP) {
    const locResult = await locationModule.findLocationByIP.execute({
      ip: ipResult.ip,
    });
    const city = (locResult.location?.location as { city?: string }).city;
    if (locResult.success && typeof city === "string" && city.length > 0) {
      locationCity = city;
    }
  }

  return (
    <>
    <Header />
    <main className="flex min-h-[calc(100vh-var(--header-height)-var(--banner-height))] w-full flex-col">
      <BannerSection>
        <HeroBanner />
        <AddressInfosContainer ipAddress={ipResult.ip} locationCity={locationCity} />
      </BannerSection>
      <Section
        fluid
        classNames="flex-1 min-h-[300px] min-w-[300px] flex justify-center items-center"
      >
        <MapContainer />
      </Section>
    </main>
    </>
  );
}
