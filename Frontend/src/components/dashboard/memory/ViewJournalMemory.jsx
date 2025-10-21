import moment from "moment";
import { FaLocationDot } from "react-icons/fa6";
import { MdCalendarToday } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const ViewJournalMemory = ({ journal, onClose }) => {
    return (
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
            {/* Hero Image Section */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src={journal?.imageURL}
                    alt={journal?.title}
                    className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Close Button */}
                <button
                    className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 z-10 cursor-pointer"
                    onClick={onClose}
                >
                    <IoMdClose className="text-2xl text-gray-700" />
                </button>

                {/* Title and Meta Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                            {journal?.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4">
                            {/* Date Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                                <MdCalendarToday className="text-cyan-500" />
                                <span>
                                    {moment(journal?.visitedDate).format(
                                        "MMMM Do, YYYY"
                                    )}
                                </span>
                            </div>

                            {/* Location Badge */}
                            <div className="inline-flex items-center gap-2 bg-cyan-500/95 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                                <FaLocationDot className="text-base" />
                                <span>
                                    {journal?.visitedLocation.join(", ")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12">
                <div className="max-w-4xl mx-auto">
                    {/* Story Header */}
                    <div className="mb-6 pb-4 border-b-2 border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></span>
                            My Travel Story
                        </h2>
                    </div>

                    {/* Story Content */}
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
                            {journal?.story}
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative Bottom Gradient */}
            <div className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
        </div>
    );
};

export default ViewJournalMemory;
