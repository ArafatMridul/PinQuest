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
            setLocations(coords);
        };

        if (journals.length > 0) {
            fetchCoordinates();
        }
    }, [journals]);

    if (locations.length === 0) {
        return (
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-bold text-center">
                <p>Loading map...</p>
                <p>
                    If this takes too long, check if any journal is added, if
                    not add first to see them appear in the map.
                </p>
            </div>
        );
    }

    return <div>{<MapView locations={locations} />}</div>;
};

export default Map;
