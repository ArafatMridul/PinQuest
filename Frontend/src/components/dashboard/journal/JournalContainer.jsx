import { useState } from "react";
import JournalCard from "./JournalCard";
import JournalEntryForm from "./JournalEntryForm";
import { motion, AnimatePresence } from "motion/react";
import { useJournal } from "../../../../context/journalContext";

const JournalContainer = () => {
    const { journals } = useJournal();
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="relative h-full bg-gray-100 p-8">
            <div className="grid grid-cols-4 gap-8 overflow-scroll py-10">
                {journals.map((journal) => (
                    <JournalCard trip={journal} />
                ))}
            </div>
            <div
                onClick={() => setShowForm(true)}
                className="absolute bottom-10 right-10 p-4 rounded-md bg-blue-600 cursor-pointer"
            >
                <img src="/assets/icons/plus.svg" alt="" className="size-5" />
            </div>
            <AnimatePresence mode="wait">
                {showForm && (
                    <>
                        <motion.div
                            key="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 bg-black/40"
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <JournalEntryForm
                                journals={journals}
                                onclick={() => setShowForm(false)}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JournalContainer;
