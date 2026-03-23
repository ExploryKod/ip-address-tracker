"use client"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("@components/molecules/Map").then((mod) => mod.Map), {
    ssr: false,
})

type MapContainerProps = {
    coordinates: { lat: number; lng: number } | null;
}

export const MapContainer = ({ coordinates }: MapContainerProps) => {
    return (
        <div className="w-full h-screen md:h-[calc(100vh-var(--banner-height)+(var(--address-infos-height)/2))]">
            <Map coordinates={coordinates} />
        </div>
    )
}