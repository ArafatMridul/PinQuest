import React, { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Map, X } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ locations }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showRealMap, setShowRealMap] = useState(false);
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);

    useEffect(() => {
        if (showRealMap && mapRef.current && !mapInstanceRef.current) {
            const map = L.map(mapRef.current);

            L.tileLayer(
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                {
                    attribution:
                        "&copy; <a href='https://www.openstreetmap.org/copyright'>OSM</a> contributors &copy; <a href='https://carto.com/'>CARTO</a>",
                }
            ).addTo(map);

            mapInstanceRef.current = map;

            const bounds = [];
            locations.forEach((location) => {
                const lat = parseFloat(location.lat);
                const lng = parseFloat(location.lng);
                if (isNaN(lat) || isNaN(lng)) return;

                const marker = L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(
                        `<div style="text-align: center; font-size: 13px;">
                            <strong>${location.city}</strong><br/>
                            ${lat.toFixed(4)}°, ${lng.toFixed(4)}°<br/>
                            ${location.country}
                        </div>`
                    );

                marker.on("click", () => {
                    setSelectedLocation({ ...location, lat, lng });
                    map.setView([lat, lng], 8, { animate: true, duration: 1 });
                });

                markersRef.current.push(marker);
                bounds.push([lat, lng]);
            });

            if (bounds.length > 0) {
                map.fitBounds(bounds, { padding: [40, 40] });
            } else {
                map.setView([20, 0], 2);
            }
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                markersRef.current = [];
            }
        };
    }, [showRealMap, locations]);

    const handlePinClick = (location) => {
        const lat = parseFloat(location.lat);
        const lng = parseFloat(location.lng);
        if (isNaN(lat) || isNaN(lng)) return;

        setSelectedLocation({ ...location, lat, lng });
        if (!showRealMap) setShowRealMap(true);
        else if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([lat, lng], 8, {
                animate: true,
                duration: 1,
            });
        }
    };

    return (
        <div className="relative w-full h-screen bg-gray-50 p-2 lg:p-4 z-10 pt-16 lg:pt-22">
            <div className="h-full mx-auto bg-white rounded-lg border lg:flex lg:flex-row overflow-scroll">
                {/* Content */}
                <div className="flex-1 grid grid-rows-2 lg:flex">
                    {/* Map */}
                    <div className="flex-1 relative">
                        {showRealMap ? (
                            <div ref={mapRef} className="w-full h-full" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                                <div className="text-center">
                                    <Map className="w-12 h-12 mx-auto mb-2 opacity-40" />
                                    <p>Click "Show Map" to view</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="h-full grid grid-rows-[64px_1fr]">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-4 py-3 bg-white border-l gap-3">
                            <h1 className="text-sm lg:text-lg font-semibold flex items-center gap-2 text-gray-800">
                                <Navigation className="w-5 h-5" />
                                Map Viewer
                            </h1>
                            <button
                                onClick={() => setShowRealMap(!showRealMap)}
                                className="flex items-center gap-2 text-xs lg:text-sm border px-3 py-1.5 rounded hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer"
                            >
                                {showRealMap ? (
                                    <>
                                        <X className="w-4 h-4" /> Close Map
                                    </>
                                ) : (
                                    <>
                                        <Map className="w-4 h-4" /> Show Map
                                    </>
                                )}
                            </button>
                        </div>
                        {/* Sidebar */}
                        <div className="w-full border-l p-4 flex-1">
                            <h2 className="text-sm font-semibold text-gray-700 mb-3">
                                Locations ({locations.length})
                            </h2>
                            <div className="space-y-2">
                                {locations.map((location, idx) => {
                                    const lat = parseFloat(location.lat);
                                    const lng = parseFloat(location.lng);
                                    const isSelected =
                                        selectedLocation?.city ===
                                        location.city;

                                    return (
                                        <div
                                            key={idx}
                                            onClick={() =>
                                                handlePinClick(location)
                                            }
                                            className={`p-3 rounded cursor-pointer text-sm border transition ${
                                                isSelected
                                                    ? "bg-blue-50 border-blue-400"
                                                    : "hover:bg-gray-50"
                                            }`}
                                        >
                                            <div className="flex items-start gap-2">
                                                <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {location.city}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {location.country}
                                                    </p>
                                                    {!isNaN(lat) &&
                                                        !isNaN(lng) && (
                                                            <p className="text-xs text-gray-500">
                                                                {lat.toFixed(2)}
                                                                °,{" "}
                                                                {lng.toFixed(2)}
                                                                °
                                                            </p>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {showRealMap && selectedLocation && (
                                <div className="mt-4 p-3 rounded border bg-gray-300 text-sm">
                                    <h3 className="font-medium text-gray-700 mb-1 flex items-center gap-1">
                                        <MapPin className="w-4 h-4" /> Selected
                                        Location
                                    </h3>
                                    <p className="text-gray-800">
                                        {selectedLocation.city},{" "}
                                        {selectedLocation.country}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {selectedLocation.lat.toFixed(2)}°,{" "}
                                        {selectedLocation.lng.toFixed(2)}°
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapView;
