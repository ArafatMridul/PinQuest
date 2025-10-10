import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useJournal } from "../../context/journalContext";
import TravelJournalCardMemory from "../components/dashboard/memory/TravelJournalCardMemory";
import Modal from "react-modal";
import ViewJournalMemory from "../components/dashboard/memory/ViewJournalMemory";
import { motion, AnimatePresence } from "motion/react";

const Memory = () => {
    const { journals, uniqueCountryCodes } = useJournal();
    const [showFlags, setShowFlags] = useState(false);
    const [dateRange, setDateRange] = useState({
        from: new Date(),
        to: new Date(),
    });
    const [filteredStories, setFilteredStories] = useState([]);
    const [openViewModal, setOpenViewModal] = useState({
        isShow: false,
        data: null,
    });

    const handleViewJournal = (journal) => {
        setOpenViewModal({ isShow: true, data: journal });
    };

    const filterStoriesByDate = (range) => {
        if (!range?.from || !range?.to) {
            setFilteredStories([]);
            return;
        }

        const fromDate = new Date(range.from);
        const toDate = new Date(range.to);

        const filtered = journals.filter((journal) => {
            if (!journal.visitedDate) return false;
            const visitedDate = new Date(journal.visitedDate);
            return visitedDate >= fromDate && visitedDate <= toDate;
        });

        setFilteredStories(filtered);
    };

    const handleDayClick = (range) => {
        setDateRange(range);
        filterStoriesByDate(range);
    };

    return (
        <div className="relative z-20 pt-16 w-fit">
            <div className="p-3 sm:p-6 w-full mx-auto space-y-8">
                <div>
                    <h3 className="flex items-center gap-2 font-bold">
                        Country/ies visited ({uniqueCountryCodes.length}) :
                        {journals.length > 0 && (
                            <button
                                onClick={() => setShowFlags(!showFlags)}
                                className="px-4 py-1 text-sm bg-black text-white rounded-full hover:bg-white hover:text-black hover:outline-1 transition-all duration-300 ease-in-out cursor-pointer"
                            >
                                {showFlags ? "Hide" : "Show"}
                            </button>
                        )   }
                    </h3>
                    <AnimatePresence mode="wait">
                        {showFlags && (
                            <motion.div
                                key="flags"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-wrap items-center gap-4 px-4 py-2">
                                    {uniqueCountryCodes.map((code) => (
                                        <div
                                            key={code}
                                            className="px-2 py-1 outline-2 rounded-md bg-slate-300"
                                        >
                                            <img
                                                src={`https://flagcdn.com/w40/${code}.png`}
                                                alt={`${code}`}
                                                className="h-6 w-10"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {/* Calendar */}
                <div className="bg-white sm:w-md rounded-xl border border-slate-300 sm:px-6 sm:py-2">
                    <h2 className="text-sm sm:text-lg px-6 py-3 font-semibold text-slate-800">
                        Filter Memories by Date
                    </h2>
                    <div className="flex justify-center">
                        <DayPicker
                            mode="range"
                            captionLayout="dropdown"
                            selected={dateRange}
                            onSelect={handleDayClick}
                            pagedNavigation
                            className="text-slate-700 scale-80 sm:scale-92"
                        />
                    </div>
                </div>

                {/* Stories Grid */}
                <div>
                    <h3 className="text-base font-medium text-slate-700 mb-3">
                        Your Travel Memories
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.isArray(filteredStories) &&
                        filteredStories.length > 0 ? (
                            filteredStories.map((journal) => (
                                <div
                                    key={journal.id}
                                    onClick={() => handleViewJournal(journal)}
                                    className="bg-white rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
                                >
                                    <TravelJournalCardMemory
                                        journal={journal}
                                    />
                                </div>
                            ))
                        ) : !dateRange?.from || !dateRange?.to ? (
                            <p className="col-span-full text-center text-slate-500 text-sm">
                                Select a valid date range to view your memories.
                            </p>
                        ) : (
                            <p className="col-span-full text-center text-slate-500 text-sm">
                                No journals found for this date range.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Modern Modal */}
            <Modal
                isOpen={openViewModal.isShow}
                style={{
                    overlay: {
                        backgroundColor: "rgba(15, 23, 42, 0.4)", // darker backdrop
                        backdropFilter: "blur(6px)",
                        zIndex: 1000,
                        paddingTop: "8vh",
                        paddingInline: "12px",
                    },
                }}
                appElement={document.getElementById("root")}
                className="w-full sm:max-w-[85vw] lg:max-w-[950px] h-[80vh] bg-white rounded-xl shadow-2xl mx-auto p-6 overflow-y-auto scrollbar"
            >
                <ViewJournalMemory
                    onClose={() => {
                        setOpenViewModal((prev) => ({
                            ...prev,
                            isShow: false,
                        }));
                    }}
                    journal={openViewModal.data}
                />
            </Modal>
        </div>
    );
};

export default Memory;
