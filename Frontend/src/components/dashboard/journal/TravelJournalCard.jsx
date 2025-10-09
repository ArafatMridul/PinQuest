import moment from "moment";
import { twMerge } from "tailwind-merge";
import { FaHeart, FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import SuccessMessage from "../../ui/SuccessMessage";

const TravelJournalCard = ({ journal, onEdit, onClick, onFavouriteToggle }) => {
    const {
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

    // Handle successful order creation
    const handleSetFavourite = (message = "Journal added to favourite.") => {
        setSuccessMessage(message);
        setShowSuccess(true);
    };

    // Handle closing success message
    const handleCloseSuccess = () => {
        setShowSuccess(false);
        setSuccessMessage("");
    };

    return (
        <div className="relative border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all duration-300 ease-in-out cursor-pointer">
            <img
                src={imageURL}
                alt={title}
                className="w-full h-56 object-cover rounded-lg"
                onClick={onClick}
            />

            <button
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/15 rounded-lg border border-white/30 group cursor-pointer"
                onClick={() => {
                    onFavouriteToggle(journal);
                    handleSetFavourite(
                        isFavourite
                            ? "Journal removed from favourite."
                            : "Journal added to favourite."
                    );
                }}
            >
                <FaHeart
                    className={twMerge(
                        "text-[22px] text-slate-300 group-hover:text-red-400 transition-colors duration-300 ease-in-out",
                        isFavourite && "text-red-400"
                    )}
                />
            </button>

            <div className="p-4" onClick={onClick}>
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <h6 className="text-sm font-bold">{title}</h6>
                        <span className="text-xs text-slate-500">
                            {visitedDate
                                ? moment(visitedDate).format("Do MMM, YYYY")
                                : "-"}
                        </span>
                    </div>
                </div>
                <p className="text-sm text-slate-800 mt-2">
                    {story?.slice(0, 60)}
                </p>
                <div className="max-w-[300px] xl:max-w-none inline-flex items-center gap-2 text-xs text-cya-600 mt-3 bg-cyan-200/40 rounded-full px-4 py-1 w-max">
                    <FaLocationDot className="text-lg text-cyan-700" />
                    <p className="pl-2">
                        {city},&nbsp;
                        {visitedLocation.map((loc, index) =>
                            visitedLocation.length === index + 1
                                ? `${loc}`
                                : `${loc}, `
                        )}
                    </p>
                </div>
            </div>
            <SuccessMessage
                show={showSuccess}
                message={successMessage}
                onClose={handleCloseSuccess}
            />
        </div>
    );
};

export default TravelJournalCard;
