import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useJournal } from "../../context/journalContext";
import TravelJournalCardMemory from "../components/dashboard/memory/TravelJournalCardMemory";
import Modal from "react-modal";
import ViewJournalMemory from "../components/dashboard/memory/ViewJournalMemory";

const Memory = () => {
    const { journals } = useJournal();
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
                {/* Calendar */}
                <div className="bg-white sm:w-md rounded-xl border border-slate-200 shadow-sm sm:p-6">
                    <h2 className="text-sm sm:text-lg px-6 py-3 font-semibold text-slate-800 mb-4">
                        Filter Memories by Date
                    </h2>
                    <div className="flex justify-center">
                        <DayPicker
                            mode="range"
                            captionLayout="dropdown"
                            selected={dateRange}
                            onSelect={handleDayClick}
                            pagedNavigation
                            className="text-slate-700 scale-80 sm:scale-90"
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
                                    className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
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
