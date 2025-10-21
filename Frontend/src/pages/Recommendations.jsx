import React, { useEffect, useState } from "react";
import OverlayCard from "../components/dashboard/recommendations/OverlayCard";
import { useJournal } from "../../context/journalContext";

const Recommendations = () => {
    const { locations } = useJournal();
    const [recommendedPlaces, setRecommendedPlaces] = useState([]);

    const { lat, lng } = locations[0];

    useEffect(() => {
        const getRecommendations = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/recommendations/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                        body: JSON.stringify({ lat, lng }),
                    }
                );
                const data = await response.json();
                setRecommendedPlaces(data);
            } catch (error) {
                console.log(error);
            }
        };
        getRecommendations();
    }, [lng, lat]);

    return (
        <div className="pt-18">
            <OverlayCard data={recommendedPlaces} />
        </div>
    );
};

export default Recommendations;
