"use client"
import { InfosCard } from "@components/molecules/InfosCard";
import { useElementHeightCssVar } from "@modules/app/react/hooks/useElementHeightCssVar"

interface AddressInfosContainerProps {
    ipAddress: string | null;
    locationCity: string;
}

export const AddressInfosContainer = ({ ipAddress, locationCity }: AddressInfosContainerProps) => {
    const { ref } = useElementHeightCssVar({
        cssVarName: "--address-infos-height",
        // Reasonable starting value to reduce layout shift before measuring.
        initialPx: 220,
        // Map height calc needs this value from a sibling, so write globally.
        writeTo: "root",
    })

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