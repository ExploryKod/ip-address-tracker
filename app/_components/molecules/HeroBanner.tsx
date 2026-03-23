import { TrackerInput } from "@components/atomes/TrackerInput";
import { IPifyCreditsStatus } from "@components/molecules/IPifyCreditsStatus";

type HeroBannerProps = {
    hasIpifyCredits: boolean;
    onSearchIp: (ip: string) => Promise<void>;
    isSearching: boolean;
    searchError: string | null;
};

export const HeroBanner = ({
    hasIpifyCredits,
    onSearchIp,
    isSearching,
    searchError,
}: HeroBannerProps) => {
    return (
        <article className="max-w-3xl mx-auto w-full flex flex-col justify-center items-center">
            <div className="bg-transparentw-full">
                <h1 className="text-4xl font-bold text-center text-white">IP Address Tracker</h1>
            </div>
            <TrackerInput
                onSearchIp={onSearchIp}
                isSearching={isSearching}
                searchError={searchError}
            />
            <IPifyCreditsStatus hasCredits={hasIpifyCredits} />
        </article>
    )
}