"use client"
import { useEffect, useRef } from "react"
import L from "leaflet"

type MapProps = {
    coordinates: { lat: number; lng: number } | null;
}

const PARIS_COORDINATES = { lat: 48.8566, lng: 2.3522 }

export const Map = ({ coordinates }: MapProps) => {
    const mapRef = useRef<L.Map | null>(null)

    useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }

    const center = coordinates ?? PARIS_COORDINATES
    const map = L.map("map", {
      center: [center.lat, center.lng],
      zoom: 10, 
      scrollWheelZoom: false,
    })

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const locationPin = L.icon({
      iconUrl: "/icons/icon-location.svg",
      iconSize: [46, 56],
      iconAnchor: [23, 56],
      popupAnchor: [0, -56],
    });

    const marker = L.marker([center.lat, center.lng], {
      icon: locationPin,
    }).addTo(map)
    marker.setZIndexOffset(1000)

    mapRef.current = map

    return () => {
        if (mapRef.current) {
            mapRef.current.remove()
            mapRef.current = null
        }
    }

    }, [coordinates])

  return <div id="map" className="w-full h-full"></div>
}