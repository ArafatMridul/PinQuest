import moment from "moment";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDelete, MdOutlineUpdate } from "react-icons/md";

const ViewJournal = ({ journal, onClose, onEditClick, onDeleteClick }) => {
    return (
        <div className="relative ">
            <div className="flex items-center justify-end">
                <div>
                    <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
                        <button
                            className="flex items-center gap-1 text-xs font-medium bg-cyan-50 text-[#05b6d3] shadow-cyan-100/0 border border-cyan-100 hover:bg-[#05b6d3] hover:text-white rounded-sm px-3 py-[3px] transition-all duration-300 ease-in-out cursor-pointer"
                            onClick={onEditClick}
                        >
                            <MdOutlineUpdate className="text-lg" />
                            Update Journal
                        </button>
                        <button
                            className="flex items-center gap-1 text-xs font-medium bg-rose-50 text-rose-500 shadow-rose-100/0 border border-rose-100 hover:bg-rose-500 hover:text-white rounded-sm px-3 py-[3px] transition-all duration-300 ease-in-out cursor-pointer"
                            onClick={onDeleteClick}
                        >
                            <MdOutlineDelete className="text-lg" />
                            Delete Journal
                        </button>
                        <button
                            className="cursor-pointer hover:bg-slate-200 rounded-full p-2 transition-all duration-300 ease-in-out"
                            onClick={onClose}
                        >
                            <IoMdClose className="text-lg text-slate-400" />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex-1 flex flex-col gap-2 py-4">
                    <h1 className="text-2xl text-slate-950">
                        {journal?.title}
                    </h1>
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-500">
                            {moment(journal?.visitedDate).format(
                                "Do, MMM YYYY"
                            )}
                        </span>
                        <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded-sm px-2 py-1">
                            <FaLocationDot className="text-sm" />
                            {journal?.visitedLocation.map((item, index) =>
                                journal.visitedLocation.length === index + 1
                                    ? `${item}`
                                    : `${item},`
                            )}
                        </div>
                    </div>
                </div>
                <img
                    src={journal?.imageURL}
                    alt=""
                    className="w-full h-300px object-cover rounded-lg"
                />
                <div className="mt-4">
                    <p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line">
                        {journal?.story}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ViewJournal;
