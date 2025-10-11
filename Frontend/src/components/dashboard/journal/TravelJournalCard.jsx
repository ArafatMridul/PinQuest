import moment from "moment";
import { useState } from "react";
import { FaHeart, FaLocationDot } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import SuccessMessage from "../../ui/SuccessMessage";
import { motion } from "framer-motion"; // ✅ Correct import

const TravelJournalCard = ({ journal, onClick, onFavouriteToggle }) => {
    const {
        id,
        city,
        imageURL,
        isFavourite,
        story,
        title,
        visitedDate,
        visitedLocation,
    } = journal;

    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [liked, setLiked] = useState({ [id]: isFavourite });
    const [isHovered, setIsHovered] = useState(false);

    const handleSetFavourite = (message = "Journal added to favourite.") => {
        setSuccessMessage(message);
        setShowSuccess(true);
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
        setSuccessMessage("");
    };

    const handleFavouriteClick = () => {
        const updated = !liked[id];
        setLiked({ ...liked, [id]: updated });
        onFavouriteToggle(journal);
        handleSetFavourite(
            updated
                ? "Journal added to favourite."
                : "Journal removed from favourite."
        );
    };

    return (
        <div
            key={id}
            className="relative h-96 rounded-3xl overflow-hidden cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Background Image */}
            <img
                src={imageURL}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Favourite Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleFavouriteClick();
                }}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all z-10 cursor-pointer group/like"
            >
                <FaHeart
                    className={twMerge(
                        "w-5 h-5 transition-colors group-hover/like:fill-red-500",
                        liked[id] ? "fill-red-500 text-red-500" : "text-white"
                    )}
                />
            </button>

            {/* Card Content */}
            <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-0 group-hover:-translate-y-6 transition-transform duration-300">
                {/* Tags */}
                <div className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2 mb-3 flex-wrap">
                        {visitedLocation.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs rounded-full border border-white/30"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-medium text-white mb-2">
                    {title}
                </h3>

                {/* Animated Story */}
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

                {/* Date and Location */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <span className="text-white font-medium">
                                {visitedDate
                                    ? moment(visitedDate).format("Do MMM, YYYY")
                                    : "-"}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-white/80">
                        <FaLocationDot className="text-lg text-cyan-400" />
                        <span className="text-sm">{city}</span>
                    </div>
                </div>
            </div>

            {/* Success Message */}
            <SuccessMessage
                show={showSuccess}
                message={successMessage}
                onClose={handleCloseSuccess}
            />
        </div>
    );
};

export default TravelJournalCard;
