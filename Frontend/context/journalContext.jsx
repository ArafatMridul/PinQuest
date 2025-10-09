import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./userContext";

const JournalContext = createContext();

const JournalProvider = ({ children }) => {
    const { user } = useUser();
    const [journals, setJournals] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredJournal, setFilteredJournal] = useState([]);

    useEffect(() => {
        if (!user) return;

        const getAllJournals = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    `http://localhost:8000/journal/${user.id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setJournals(data);
            } catch (error) {
                console.log(error);
            }
        };

        getAllJournals();
    }, [user]);

    const handleToggleFavourite = async (journal) => {
        const journalId = journal.id;
        try {
            const token = localStorage.getItem("token");

            await fetch(
                `http://localhost:8000/journal/update-isFavorite/${journalId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ isFavourite: !journal.isFavourite }),
                }
            );

            setJournals((prev) =>
                prev.map((j) =>
                    j.id === journalId
                        ? { ...j, isFavourite: !j.isFavourite }
                        : j
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const onSearchJournal = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/journal/search?query=${searchQuery}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            const data = await response.json();
            setFilteredJournal(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <JournalContext.Provider
            value={{
                journals,
                setJournals,
                handleToggleFavourite,
                searchQuery,
                setSearchQuery,
                onSearchJournal,
                filteredJournal,
                setFilteredJournal,
            }}
        >
            {children}
        </JournalContext.Provider>
    );
};

const useJournal = () => {
    const context = useContext(JournalContext);

    if (!context) {
        throw new Error("JournalContext used outside of JournalProvider.");
    }

    return context;
};

export { JournalProvider, useJournal };
