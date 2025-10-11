import moment from "moment";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDelete, MdOutlineUpdate } from "react-icons/md";

const ViewJournal = ({ journal, onClose, onEditClick, onDeleteClick }) => {
    return (
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto   ">
            {/* Header Image with Overlay */}
            <div className="relative h-80 overflow-hidden">
                <img
                    src={journal?.imageURL}
                    alt={journal?.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer"
                    onClick={onClose}
                >
                    <IoMdClose className="text-xl text-gray-700" />
                </button>

                {/* Title and Location Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-start gap-3 mb-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-sm text-gray-700">
                            <FaLocationDot className="text-cyan-500" />
                            <span className="font-medium">
                                {journal?.visitedLocation.join(", ")}
                            </span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                        {journal?.title}
                    </h1>
                    <p className="text-white/90 text-sm font-medium">
                        {moment(journal?.visitedDate).format("MMMM Do, YYYY")}
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 lg:p-8">
                {/* Action Buttons */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                    <button
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white outline-1 text-black font-medium rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={onEditClick}
                    >
                        <MdOutlineUpdate className="text-lg" />
                        Update Journal
                    </button>
                    <button
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-rose-200 text-rose-500 font-medium rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-all duration-300"
                        onClick={onDeleteClick}
                    >
                        <MdOutlineDelete className="text-lg" />
                        Delete
                    </button>
                </div>

                {/* Story Content */}
                <div className="prose prose-gray max-w-none">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                        My Story
                    </h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {journal?.story}
                    </p>
                </div>
            </div>

            {/* Decorative Bottom Accent */}
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
        </div>
    );
};

export default ViewJournal;
