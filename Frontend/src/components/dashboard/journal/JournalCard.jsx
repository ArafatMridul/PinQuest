import React, { useEffect, useState } from "react";
import Popup from "./Popup";

const JournalCard = ({ trip }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [countryImg, setCountryImg] = useState("");
    const date = new Date(trip.createdAt).toLocaleDateString("en-GB");

    useEffect(() => {
        const getCountryImg = async () => {
            const response = await fetch(
                `https://restcountries.com/v3.1/name/${trip.country}`
            );
            const data = await response.json();
            setCountryImg(data[0].flags.svg);
        };
        getCountryImg();
    }, [trip.country]);

    return (
        <div className="bg-white h-fit rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="p-6">
                <div className="h-[180px]">
                    <img src={countryImg} alt="" className="h-full w-full object-cover"/>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {trip.city}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{date}</p>

                <div className="flex flex-col justify-between items-center">
                    <button
                        onClick={() => setShowPopup(true)}
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        View Journal →
                    </button>
                </div>
                {showPopup && (
                    <Popup
                        city={trip.city}
                        country={trip.country}
                        description={trip.description}
                        date={date}
                        onClose={() => setShowPopup(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default JournalCard;
