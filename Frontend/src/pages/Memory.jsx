import { useState, useEffect } from "react";
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

    console.log(dateRange);
    console.log(filteredStories);

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
        <div className="relative z-50 pt-18">
            <div className="p-6">
                {/* Calendar */}
                <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg w-100 mx-auto flex justify-center">
                    <div className="p-3">
                        <DayPicker
                            mode="range"
                            captionLayout="dropdown"
                            selected={dateRange}
                            onSelect={handleDayClick}
                            pagedNavigation
                        />
                    </div>
                </div>

                {/* Stories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {Array.isArray(filteredStories) &&
                    filteredStories.length > 0 ? (
                        filteredStories.map((journal) => (
                            <TravelJournalCardMemory
                                key={journal.id}
                                journal={journal}
                                onClick={() => handleViewJournal(journal)}
                            />
                        ))
                    ) : !dateRange?.from || !dateRange?.to ? (
                        <p className="col-span-full text-center text-gray-500">
                            Add a valid date range.
                        </p>
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            No journals found in this date range.
                        </p>
                    )}
                </div>
                <Modal
                    isOpen={openViewModal.isShow}
                    onRequestClose={() => {}}
                    style={{
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            zIndex: 1000,
                            backdropFilter: "blur(4px)",
                            paddingTop: "10vh",
                            paddingInline: "12px",
                        },
                    }}
                    appElement={document.getElementById("root")}
                    className="sm:max-w-[80vw] lg:max-w-[1000px] h-[80vh] bg-white rounded-sm mx-auto p-5 overflow-y-scroll scrollbar z-50"
                >
                    <ViewJournalMemory
                        onClose={() => {
                            setOpenViewModal((prev) => ({
                                ...prev,
                                isShow: false,
                            }));
                        }}
                        journal={openViewModal.data}
                    ></ViewJournalMemory>
                </Modal>
            </div>
        </div>
    );
};

export default Memory;
