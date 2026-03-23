"use client"
import { useEffect, useRef } from "react"
import L from "leaflet"

export const Map = () => {
    const mapRef = useRef<L.Map | null>(null)

    useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }

    const map = L.map("map", {
      center: [48.8566, 2.3522], // coordonnées de Paris
      zoom: 10, 
      scrollWheelZoom: false,
    })

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapRef.current = map

    return () => {
        if (mapRef.current) {
            mapRef.current.remove()
            mapRef.current = null
        }
    }

    }, [])

  return <div id="map" className="w-full h-full"></div>
}