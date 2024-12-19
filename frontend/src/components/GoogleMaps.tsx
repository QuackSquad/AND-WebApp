import { useEffect, useRef } from "react";
import { GOOGLE_MAPS_API_KEY } from "../../config.json";

declare global {
    interface Window {
        google: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    }
}

const center = {
    lat: 0,
    lng: -180,
};

const pathCoordinates = [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
];

const FlightPathMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load the Google Maps API script
        const loadScript = (url: string) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = url;
                script.async = true;
                script.defer = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        const initMap = async () => {
            if (!mapRef.current) return;

            // Load the Google Maps API with API key
            await loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
            );

            // Wait for the google maps object to be available
            const { Map, Marker, Polyline } = window.google.maps;

            // Create a new map object
            const map = new Map(mapRef.current, {
                center: center,
                zoom: 3,
            });

            // Add a marker to the map
            new Marker({
                position: center,
                map,
                title: "Marker Position",
            });

            // Create a polyline path
            const flightPath = new Polyline({
                path: pathCoordinates,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });

            flightPath.setMap(map);
        };

        initMap();
    }, []);

    return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default FlightPathMap;
