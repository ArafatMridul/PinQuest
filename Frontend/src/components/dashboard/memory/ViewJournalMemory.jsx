import moment from "moment";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const ViewJournalMemory = ({ journal, onClose }) => {
    return (
        <div className="relative ">
            <div className="flex items-center justify-end">
                <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
                    <button
                        className="cursor-pointer hover:bg-slate-200 rounded-full p-2 transition-all duration-300 ease-in-out"
                        onClick={onClose}
                    >
                        <IoMdClose className="text-lg text-slate-400" />
                    </button>
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

export default ViewJournalMemory;
