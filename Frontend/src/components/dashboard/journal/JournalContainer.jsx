import { FaPlus } from "react-icons/fa6";
import { useJournal } from "../../../../context/journalContext";
import TravelJournalCard from "./TravelJournalCard";
import { useState } from "react";
import Modal from "react-modal";
import AddJournal from "./AddJournal";

const JournalContainer = () => {
    const { journals, handleToggleFavourite } = useJournal();
    const [addModalOpen, setAddModalOpen] = useState({
        isShow: false,
        type: "add",
        journal: null,
    });

    const handleViewJournal = (journal) => {
        console.log("View journal:", journal);
    };

    const handleEditJournal = (journal) => {
        console.log("Edit journal:", journal);
    };

    return (
        <div>
            <div className="flex gap-7">
                <div className="flex-1">
                    {journals.length === 0 ? (
                        <div>
                            <p>No journals available</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {journals.map((journal) => (
                                <TravelJournalCard
                                    key={journal.id}
                                    journal={journal}
                                    onClick={() => handleViewJournal(journal)}
                                    onEdit={() => handleEditJournal(journal)}
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
                        display: "flex",
                        paddingTop: "10vh",
                        justifyContent: "center",
                    },
                }}
                appElement={document.getElementById("root")}
                className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-sm mx-auto p-5 overflow-y-scroll scrollbar z-50"
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
                    <div>Edit Journal Modal</div>
                )}
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
