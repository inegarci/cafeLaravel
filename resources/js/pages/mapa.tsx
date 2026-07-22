import 'leaflet/dist/leaflet.css';

import { Head } from '@inertiajs/react';
import type { Map as LeafletMap } from 'leaflet';
import { useEffect, useRef } from 'react';

const MONTEVIDEO: [number, number] = [-34.9011, -56.1645];
const DEFAULT_ZOOM = 14;

export default function Mapa() {
    // Leaflet renders inside this DOM element.
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<LeafletMap | null>(null);

    useEffect(() => {
        let disposed = false;

        void import('leaflet').then((L) => {
            if (disposed || !containerRef.current || mapRef.current) {
                return;
            }

            // Initialize the map and its visual tile layer.
            const map = L.map(containerRef.current).setView(
                MONTEVIDEO,
                DEFAULT_ZOOM,
            );

            L.tileLayer(
                'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                {
                    attribution: '&copy; OpenStreetMap &copy; CARTO',
                    maxZoom: 20,
                },
            ).addTo(map);

            mapRef.current = map;
        });

        return () => {
            // Remove Leaflet state when Inertia unmounts this page.
            disposed = true;
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, []);

    return (
        <>
            <Head title="Mapa" />

            <main className="h-dvh w-full">
                <div ref={containerRef} className="h-full w-full" />
            </main>
        </>
    );
}
