import React, { useEffect, useState } from "react";
import { useJournal } from "../../context/journalContext";
import MapView from "../components/map/MapView";

const Map = () => {
    const { journals } = useJournal();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            const coords = await Promise.all(
                journals.map(async (journal) => {
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
                                journal.city
                            )}&country=${encodeURIComponent(
                                journal.country
                            )}&format=json&limit=1`
                        );
                        const data = await response.json();
                        if (data && data.length > 0) {
                            return {
                                city: journal.city,
                                country: journal.country,
                                lat: data[0].lat,
                                lng: data[0].lon,
                            };
                        } else {
                            return {
                                city: journal.city,
                                country: journal.country,
                                lat: null,
                                lng: null,
                            };
                        }
                    } catch (err) {
                        console.error("Error fetching coordinates:", err);
                        return {
                            city: journal.city,
                            country: journal.country,
                            lat: null,
                            lng: null,
                        };
                    }
                })
            );

            const uniqueCoords = coords.filter(
                (loc, index, self) =>
                    index ===
                    self.findIndex(
                        (t) => t.city === loc.city && t.country === loc.country
                    )
            );

            setLocations(uniqueCoords);
        };

        if (journals.length > 0) {
            fetchCoordinates();
        }
    }, [journals]);

    if (locations.length === 0) {
        return (
            <div className="absolute top-70 sm:top-85 lg:top-100 bottom-0 left-0 right-0 flex items-center justify-center font-bold text-center z-30">
                <div className="w-50 sm:w-70 lg:w-100 text-xs sm:text-sm lg:text-lg">
                    <p>Loading map...</p>
                    <p>
                        If this takes too long, check if any journal is added,
                        if not add first to see them appear in the map.
                    </p>
                </div>
            </div>
        );
    }

    return <div>{<MapView locations={locations} />}</div>;
};

export default Map;
