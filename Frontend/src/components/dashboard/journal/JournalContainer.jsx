import { useJournal } from "../../../../context/journalContext";
import TravelJournalCard from "./TravelJournalCard";

const JournalContainer = () => {
    const { journals } = useJournal();

    const handleViewJournal = (journal) => {
        console.log("View journal:", journal);
    }

    const handleEditJournal = (journal) => {
        console.log("Edit journal:", journal);
    }

    const handleToggleFavourite = (journal) => {
        console.log("Toggle favourite for journal:", journal);
    }   

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
        </div>
    );
};

export default JournalContainer;
