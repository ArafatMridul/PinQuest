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

    console.log(locations);
    if (locations.length === 0) {
        return <p>Loading map....</p>;
    }

    return <div>{<MapView locations={locations} />}</div>;
};

export default Map;
