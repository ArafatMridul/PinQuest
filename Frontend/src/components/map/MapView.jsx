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

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors",
                maxZoom: 19,
            }).addTo(map);

            mapInstanceRef.current = map;

            const bounds = [];

            // Add markers
            locations.forEach((location) => {
                const lat = parseFloat(location.lat);
                const lng = parseFloat(location.lng);

                if (isNaN(lat) || isNaN(lng)) {
                    console.warn("Invalid coordinates:", location);
                    return;
                }

                const marker = L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(
                        `
              <div style="text-align: center;">
                <strong style="font-size: 16px;">${location.city}</strong><br/>
                <span style="color: #666; font-size: 12px;">
                  ${lat.toFixed(4)}°, ${lng.toFixed(4)}°<br/>
                  ${location.country}
                </span>
              </div>
            `
                    );

                marker.on("click", () => {
                    setSelectedLocation({ ...location, lat, lng });

                    // Center map when marker clicked
                    map.setView([lat, lng], 8, { animate: true, duration: 1 });
                });

                markersRef.current.push(marker);
                bounds.push([lat, lng]);
            });

            // Auto-fit to all markers
            if (bounds.length > 0) {
                map.fitBounds(bounds, { padding: [50, 50] });
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

    useEffect(() => {
        if (mapInstanceRef.current && selectedLocation && showRealMap) {
            const { lat, lng } = selectedLocation;
            mapInstanceRef.current.setView([lat, lng], 8, {
                animate: true,
                duration: 1,
            });

            const marker = markersRef.current.find(
                (m, idx) => locations[idx].city === selectedLocation.city
            );
            if (marker) marker.openPopup();
        }
    }, [selectedLocation, showRealMap, locations]);

    const handlePinClick = (location) => {
        const lat = parseFloat(location.lat);
        const lng = parseFloat(location.lng);
        if (isNaN(lat) || isNaN(lng)) return;

        setSelectedLocation({ ...location, lat, lng });

        if (!showRealMap) {
            setShowRealMap(true);
        } else if (mapInstanceRef.current) {
            // Center map when location selected from sidebar
            mapInstanceRef.current.setView([lat, lng], 8, {
                animate: true,
                duration: 1,
            });
        }
    };

    return (
        <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="h-9/10 mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <Navigation className="w-8 h-8" />
                            Location Map Viewer
                        </h1>
                        <p className="mt-2 text-blue-100">
                            {showRealMap
                                ? "Interactive Leaflet map with all locations"
                                : "Click on any location to view on map"}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowRealMap(!showRealMap)}
                        className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all shadow-lg font-medium"
                    >
                        {showRealMap ? (
                            <>
                                <X className="w-5 h-5" /> Close Map
                            </>
                        ) : (
                            <>
                                <Map className="w-5 h-5" /> Show Map
                            </>
                        )}
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row h-full">
                    {/* Map */}
                    <div
                        className="flex-1 relative bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden"
                    >
                        {showRealMap ? (
                            <div
                                ref={mapRef}
                                className="w-full h-full"
                                style={{ zIndex: 0 }}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-blue-600 font-medium">
                                <Map className="w-24 h-24 text-blue-300 mx-auto mb-4" />
                                <p>
                                    Click "Show Map" to view interactive Leaflet
                                    map
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div
                        className="lg:w-80 bg-gray-50 p-6 overflow-y-auto h-full"
                    >
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Locations ({locations.length})
                        </h2>
                        <div className="space-y-3">
                            {locations.map((location, idx) => {
                                const lat = parseFloat(location.lat);
                                const lng = parseFloat(location.lng);
                                const isSelected =
                                    selectedLocation?.city === location.city;

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => handlePinClick(location)}
                                        className={`p-4 rounded-lg cursor-pointer transition-all ${
                                            isSelected
                                                ? "bg-blue-600 text-white shadow-lg scale-105"
                                                : "bg-white hover:bg-blue-50 shadow"
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h3 className="font-semibold">
                                                    {location.city}
                                                </h3>
                                                <p
                                                    className={`text-sm mt-1 ${
                                                        isSelected
                                                            ? "text-blue-100"
                                                            : "text-gray-600"
                                                    }`}
                                                >
                                                    Country: {location.country}
                                                </p>
                                                {!isNaN(lat) && !isNaN(lng) && (
                                                    <p
                                                        className={`text-sm ${
                                                            isSelected
                                                                ? "text-blue-100"
                                                                : "text-gray-600"
                                                        }`}
                                                    >
                                                        Lat: {lat.toFixed(4)}° |
                                                        Lng: {lng.toFixed(4)}°
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {showRealMap && selectedLocation && (
                            <div className="mt-4 p-4 bg-blue-100 rounded-lg border-2 border-blue-300">
                                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Selected
                                    Location
                                </h3>
                                <p className="text-blue-800 font-medium">
                                    {selectedLocation.city},{" "}
                                    {selectedLocation.country}
                                </p>
                                <p className="text-sm text-blue-700 mt-1">
                                    {selectedLocation.lat.toFixed(4)}°,{" "}
                                    {selectedLocation.lng.toFixed(4)}°
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapView;
