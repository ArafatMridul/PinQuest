import React from "react";
import JournalCard from "./JournalCard";

const JournalContainer = () => {
    const trip = {
        destination: "Paris, France",
        date: "April 10, 2024",
        description:
            "Explored the Eiffel Tower, enjoyed French cuisine, and wandered through charming streets.",
        location: "Europe",
        image: "https://source.unsplash.com/600x400/?paris",
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
            <JournalCard trip={trip} />
        </div>
    );
};

export default JournalContainer;
