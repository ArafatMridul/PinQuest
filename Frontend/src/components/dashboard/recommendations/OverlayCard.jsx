import React, { useState } from "react";
import { useJournal } from "../../../../context/journalContext";

const OverlayCard = () => {
    const [liked, setLiked] = useState({});
    const { journals } = useJournal();
    console.log(journals)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {journals.map((dest) => (
                <div
                    key={dest.id}
                    className="relative h-96 rounded-3xl overflow-hidden cursor-pointer group"
                >
                    <img
                        src={dest.imageURL}
                        alt={dest.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    <button
                        onClick={() =>
                            setLiked({ ...liked, [dest.id]: !liked[dest.id] })
                        }
                        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all z-10"
                    >
                        {/* <Heart
                            className={`w-5 h-5 ${
                                liked[dest.id]
                                    ? "fill-red-500 text-red-500"
                                    : "text-white"
                            } transition-colors`}
                        /> */}
                    </button>

                    <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex gap-2 mb-3">
                                {dest.visitedLocation.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs rounded-full border border-white/30"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <h3 className="text-2xl font-medium text-white mb-2">
                            {dest.title}
                        </h3>

                        <p className="text-white/80 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                            {dest.story}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    {/* <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> */}
                                    <span className="text-white font-medium">
                                        {dest.visitedDate}
                                    </span>
                                </div>
                                {/* <div className="flex items-center gap-1 text-white/80">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">
                                        {dest.duration}
                                    </span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OverlayCard;
