import { FaPlus } from "react-icons/fa6";
import { useJournal } from "../../../../context/journalContext";
import TravelJournalCard from "./TravelJournalCard";
import { useState } from "react";
import Modal from "react-modal";
import AddJournal from "./AddJournal";
import ViewJournal from "./ViewJournal";
import EmptyCard from "./EmptyCard";

const JournalContainer = () => {
    const { journals, handleToggleFavourite, setJournals } = useJournal();
    const [addModalOpen, setAddModalOpen] = useState({
        isShow: false,
        type: "add",
        journal: null,
    });
    const [openViewModal, setOpenViewModal] = useState({
        isShow: false,
        data: null,
    });

    const handleViewJournal = (journal) => {
        setOpenViewModal({ isShow: true, data: journal });
    };

    const handleEditJournal = (journal) => {
        setAddModalOpen((prev) => ({
            ...prev,
            isShow: true,
            type: "edit",
            journal,
        }));
    };

    const deleteJournal = async (journal) => {
        console.log(journal);
        try {
            const response = await fetch(
                `http://localhost:8000/journal/delete-journal/${journal.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                // ✅ remove from UI
                setJournals((prev) => prev.filter((j) => j.id !== journal.id));

                // ✅ close the modal
                setOpenViewModal({ isShow: false, data: null });
            } else {
                console.error("Delete failed:", data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-8">
            <div className="flex gap-7">
                <div className="flex-1">
                    {!Array.isArray(journals) ? (
                        <div>
                            <EmptyCard
                                imgSrc={
                                    "https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&w=600"
                                }
                                message={`Begin your journey by sharing unforgettable travel stories! Click 'Add' to capture your thoughts, experiences and adventures. Start Now!`}
                                setAddModalOpen={() =>
                                    setAddModalOpen({
                                        isShow: true,
                                        type: "add",
                                        data: null,
                                    })
                                }
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {Array.isArray(journals) &&
                                journals.map((journal) => (
                                    <TravelJournalCard
                                        key={journal.id}
                                        journal={journal}
                                        onClick={() =>
                                            handleViewJournal(journal)
                                        }
                                        onEdit={() =>
                                            handleEditJournal(journal)
                                        }
                                        onFavouriteToggle={() =>
                                            handleToggleFavourite(journal)
                                        }
                                    />
                                ))}
                        </div>
                    )}
                </div>

                <div className="w-[320px]"></div>
            </div>

            <Modal
                isOpen={addModalOpen.isShow}
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
                className="sm:max-w-[80vw] lg:max-w-[1000px] h-[80vh] bg-white rounded-sm mx-auto p-3 sm:p-5 overflow-y-scroll scrollbar z-50"
            >
                {addModalOpen.type === "add" ? (
                    <AddJournal
                        journal={addModalOpen.journal}
                        type={addModalOpen.type}
                        onClose={() =>
                            setAddModalOpen({
                                isShow: false,
                                type: "add",
                                journal: null,
                            })
                        }
                    />
                ) : (
                    <AddJournal
                        journal={addModalOpen.journal}
                        type={addModalOpen.type}
                        onClose={() =>
                            setAddModalOpen({
                                isShow: false,
                                type: "edit",
                                journal: null,
                            })
                        }
                    />
                )}
            </Modal>

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
                <ViewJournal
                    onClose={() => {
                        setOpenViewModal((prev) => ({
                            ...prev,
                            isShow: false,
                        }));
                    }}
                    onEditClick={() => {
                        setOpenViewModal((prev) => ({
                            ...prev,
                            isShow: false,
                        }));
                        handleEditJournal(openViewModal.data);
                    }}
                    onDeleteClick={async () => {
                        await deleteJournal(openViewModal.data || null);
                    }}
                    journal={openViewModal.data}
                ></ViewJournal>
            </Modal>

            <button
                className="w-14 h-14 rounded-full bg-[#05b6d3] text-white fixed bottom-8 right-8 flex items-center justify-center shadow-lg hover:bg-cyan-400 transition-colors duration-300 ease-in-out cursor-pointer"
                onClick={() =>
                    setAddModalOpen({
                        isShow: true,
                        type: "add",
                        journal: null,
                    })
                }
            >
                <FaPlus className="text-lg" />
            </button>
        </div>
    );
};

export default JournalContainer;
