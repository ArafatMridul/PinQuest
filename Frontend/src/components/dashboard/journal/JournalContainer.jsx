import { FaPlus } from "react-icons/fa6";
import { useJournal } from "../../../../context/journalContext";
import TravelJournalCard from "./TravelJournalCard";
import { useState } from "react";
import Modal from "react-modal";
import AddJournal from "./AddJournal";
import ViewJournal from "./ViewJournal";
import EmptyCard from "./EmptyCard";
import SuccessMessage from "../../ui/SuccessMessage";

const JournalContainer = () => {
    const { journals, handleToggleFavourite, setJournals, filteredJournal } =
        useJournal();
    const [addModalOpen, setAddModalOpen] = useState({
        isShow: false,
        type: "add",
        journal: null,
    });
    const [openViewModal, setOpenViewModal] = useState({
        isShow: false,
        data: null,
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Handle successful edit profile
    const handleClick = (message = "Action carried out successfully.") => {
        setSuccessMessage(message);
        setShowSuccess(true);
    };

    // Handle closing success message
    const handleCloseSuccess = () => {
        setShowSuccess(false);
        setSuccessMessage("");
    };

    const handleViewJournal = (journal) => {
        setOpenViewModal({ isShow: true, data: journal });
        document.querySelector("body").style.overflow = "hidden";
    };

    const handleEditJournal = (journal) => {
        setAddModalOpen((prev) => ({
            ...prev,
            isShow: true,
            type: "edit",
            journal,
        }));
        document.querySelector("body").style.overflow = "hidden";
    };

    const deleteJournal = async (journal) => {
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
            handleClick(data.message);
            if (response.ok) {
                setJournals((prev) => prev.filter((j) => j.id !== journal.id));

                setOpenViewModal({ isShow: false, data: null });
            } else {
                console.error("Delete failed:", data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const allJournals =
        filteredJournal.length === 0 ? journals : filteredJournal;

    return (
        <div className="p-3 sm:p-4 lg:p-6">
            <div className="flex gap-7 h-full pt-18">
                <div className="flex-1">
                    {!Array.isArray(allJournals) ? (
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.isArray(allJournals) &&
                                allJournals.map((journal) => (
                                    <TravelJournalCard
                                        key={journal.id}
                                        journal={journal}
                                        onClick={() =>
                                            handleViewJournal(journal)
                                        }
                                        onFavouriteToggle={() =>
                                            handleToggleFavourite(journal)
                                        }
                                    />
                                ))}
                        </div>
                    )}
                </div>
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
                        onClose={() => {
                            setAddModalOpen({
                                isShow: false,
                                type: "add",
                                journal: null,
                            });
                            document.querySelector("body").style.overflow =
                                "auto";
                        }}
                        handleClick={handleClick}
                    />
                ) : (
                    <AddJournal
                        journal={addModalOpen.journal}
                        type={addModalOpen.type}
                        onClose={() => {
                            setAddModalOpen({
                                isShow: false,
                                type: "edit",
                                journal: null,
                            });
                            document.querySelector("body").style.overflow =
                                "auto";
                        }}
                        handleClick={handleClick}
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
                className="w-fit bg-white rounded-3xl shadow-2xl mx-auto overflow-y-auto sm:max-w-[80vw] lg:max-w-[1000px] max-h-[80vh]"
            >
                <ViewJournal
                    onClose={() => {
                        setOpenViewModal((prev) => ({
                            ...prev,
                            isShow: false,
                        }));
                        document.querySelector("body").style.overflow = "auto";
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
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-400 text-white fixed bottom-12 right-12 flex items-center justify-center shadow-lg hover:bg-slate-200 transition-colors duration-300 ease-in-out cursor-pointer z-30"
                onClick={() => {
                    setAddModalOpen({
                        isShow: true,
                        type: "add",
                        journal: null,
                    });
                    document.querySelector("body").style.overflow = "hidden";
                }}
            >
                <FaPlus className="text-lg text-black" />
            </button>
            <SuccessMessage
                show={showSuccess}
                message={successMessage}
                onClose={handleCloseSuccess}
            />
        </div>
    );
};

export default JournalContainer;
