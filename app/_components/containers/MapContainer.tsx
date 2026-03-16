"use client"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("@components/molecules/Map").then((mod) => mod.Map), {
    ssr: false,
})

export const MapContainer = () => {
    return (
        <div className="md:flex-1 w-screen h-screen">
            <Map />
        </div>
    )
}