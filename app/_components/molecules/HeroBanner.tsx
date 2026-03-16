import { TrackerInput } from "@components/atomes/TrackerInput";

export const HeroBanner = () => {
    return (
        <article className="max-w-3xl mx-auto w-full flex flex-col justify-center items-center">
            <div className="bg-transparentw-full">
                <h1 className="text-4xl font-bold text-center text-white">IP Address Tracker</h1>
            </div>
            <TrackerInput />
        </article>
    )
}