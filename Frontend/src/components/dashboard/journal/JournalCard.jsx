import React from "react";

const JournalCard = ({ trip }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img
                src={trip.image}
                alt={trip.destination}
                className="w-full h-48 object-cover"
            />

            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {trip.destination}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{trip.date}</p>
                <p className="text-gray-600 mb-4">{trip.description}</p>

                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-blue-600">
                        {trip.location}
                    </span>
                    <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        View Journal →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JournalCard;
