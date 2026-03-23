"use client"
import { InfosCard } from "@components/molecules/InfosCard";
import { useElementHeightCssVar } from "@modules/app/react/hooks/useElementHeightCssVar"
import { useAddressInfosContainerPresenter } from "./useAddressInfosContainerPresenter";

interface AddressInfosContainerProps {
    ipAddress: string | null;
    locationCity: string;
}

export const AddressInfosContainer = ({ ipAddress, locationCity }: AddressInfosContainerProps) => {
    const vm = useAddressInfosContainerPresenter({ ipAddress, locationCity });
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
                <InfosCard data={{ label: "IP Address", info: vm.ipInfo }} />
                <InfosCard data={{ label: "Location", info: vm.locationInfo }} />
                <InfosCard data={{ label: "Timezone", info: vm.timezoneInfo }} />
                <InfosCard sep={false} data={{ label: "ISP", info: vm.ispInfo }} />
            </div>
        </article>
    )
}