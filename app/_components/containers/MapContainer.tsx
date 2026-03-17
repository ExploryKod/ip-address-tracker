"use client"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("@components/molecules/Map").then((mod) => mod.Map), {
    ssr: false,
})

export const MapContainer = () => {
    return (
        <div className="w-full h-[calc(100vh-var(--header-height)-var(--banner-height)+(var(--address-infos-height)/2))]">
            <Map />
        </div>
    )
}