import { InfosCard } from "@components/molecules/InfosCard";

export const AddressInfosContainer = () => {
    return (
        <article className="relative z-500">
            <div className="rounded-md md:-mb-[calc(160px/2)] -mb-[calc(400px/2)] 
        py-10 px-5 shadow-md max-w-5xl mx-auto w-full 
        flex flex-col md:flex-row justify-center items-center bg-white">
                <InfosCard data={{ label: "IP Address", info: "192.168.1.1" }} />
                <InfosCard data={{ label: "Location", info: "New York" }} />
                <InfosCard data={{ label: "Timezone", info: "UTC +05:00" }} />
                <InfosCard sep={false} data={{ label: "ISP", info: "Netflix" }} />
            </div>
         
        </article>
    )
}