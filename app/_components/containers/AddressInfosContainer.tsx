"use client"
import { useEffect, useState } from "react";
import { InfosCard } from "@components/molecules/InfosCard";
import { useElementHeightCssVar } from "@modules/app/react/hooks/useElementHeightCssVar"

interface AddressInfosContainerProps {
    ipAddress: string | null;
}

export const AddressInfosContainer = ({ ipAddress }: AddressInfosContainerProps) => {
    // Default immediately to avoid "setState in effect" lint complaints.
    const [locationCity, setLocationCity] = useState<string>("Unavailable");

    const { ref } = useElementHeightCssVar({
        cssVarName: "--address-infos-height",
        // Reasonable starting value to reduce layout shift before measuring.
        initialPx: 220,
        // Map height calc needs this value from a sibling, so write globally.
        writeTo: "root",
    })

    useEffect(() => {
        // Boundary call: UI -> API route -> use-case -> infra
        // We only need the city for the "Location" card.
        if (!ipAddress) {
            return;
        }

        const ip = ipAddress;

        let cancelled = false;

        async function loadLocationCity() {
            try {
                const res = await fetch(
                    `/api/location?ip=${encodeURIComponent(ip)}`,
                    { cache: "no-store" }
                );
                const data: unknown = await res.json();

                const city =
                    res.ok &&
                    typeof data === "object" &&
                    data !== null &&
                    "success" in data &&
                    (data as { location?: { location?: { city?: string } } }).location
                        ?.location?.city;

                if (!cancelled) {
                    setLocationCity(typeof city === "string" ? city : "Unavailable");
                }
            } catch {
                if (!cancelled) setLocationCity("Unavailable");
            }
        }

        loadLocationCity();

        return () => {
            cancelled = true;
        };
    }, [ipAddress]);

    return (
        <article className="relative z-500 w-full">
            <div
                ref={ref}
                className="rounded-md -mb-[calc(var(--address-infos-height)/2)] 
        py-10 px-5 shadow-md max-w-5xl mx-auto w-full 
        flex flex-col md:flex-row justify-center items-center bg-white">
                <InfosCard data={{ label: "IP Address", info: ipAddress ?? "Unavailable" }} />
                <InfosCard data={{ label: "Location", info: locationCity }} />
                <InfosCard data={{ label: "Timezone", info: "UTC +05:00" }} />
                <InfosCard sep={false} data={{ label: "ISP", info: "Netflix" }} />
            </div>
         
        </article>
    )
}