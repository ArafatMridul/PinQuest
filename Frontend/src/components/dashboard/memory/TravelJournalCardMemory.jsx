import moment from "moment";
import { twMerge } from "tailwind-merge";
import { FaHeart, FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import { motion } from "motion/react";

const TravelJournalCardMemory = ({ journal, onClick }) => {
    const {
        city,
        imageURL,
        isFavourite,
        story,
        title,
        visitedDate,
        visitedLocation,
    } = journal;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg transition-all duration-500 ease-in-out hover:scale-[1.02]"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Image */}
            <img
                src={imageURL}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Favourite Icon */}
            <button
                onClick={(e) => e.stopPropagation()}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/20"
            >
                <FaHeart
                    className={twMerge(
                        "w-5 h-5 transition-colors",
                        isFavourite ? "fill-red-500 text-red-500" : "text-white"
                    )}
                />
            </button>

            {/* Card Content */}
            <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-2 group-hover:-translate-y-6 transition-transform duration-300">
                <div className="flex flex-col gap-1 mb-2">
                    <h6 className="text-xl font-semibold text-white">
                        {title}
                    </h6>
                    <span className="text-xs text-white/70">
                        {visitedDate
                            ? moment(visitedDate).format("Do MMM, YYYY")
                            : "-"}
                    </span>
                </div>

                <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={
                        isHovered
                            ? { opacity: 1, height: "auto" }
                            : { opacity: 0, height: 0 }
                    }
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="text-white/80 text-sm mb-4 overflow-hidden"
                >
                    {story.slice(0, 150)}...
                </motion.p>

                <div className="inline-flex items-center gap-2 bg-cyan-400/20 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full border border-cyan-300/30">
                    <FaLocationDot className="text-base text-cyan-300" />
                    <span>
                        {city},&nbsp;
                        {visitedLocation
                            .map((loc, index) =>
                                visitedLocation.length === index + 1
                                    ? `${loc}`
                                    : `${loc}, `
                            )
                            .join("")}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TravelJournalCardMemory;
