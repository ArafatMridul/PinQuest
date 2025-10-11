import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useUser } from "./userContext";

const JournalContext = createContext();

const JournalProvider = ({ children }) => {
    const { user } = useUser();
    const abortRef = useRef(Symbol());
    const cacheRef = useRef(new Map());
    const [journals, setJournals] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredJournal, setFilteredJournal] = useState([]);
    const [uniqueCountryCodes, setUniqueCountryCodes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCoordinates = async () => {
            setIsLoading(true);
            const sleep = (ms) =>
                new Promise((resolve) => setTimeout(resolve, ms));
            const coords = [];

            for (const journal of journals) {
                if (!journal?.city || !journal?.country) {
                    coords.push({
                        city: journal.city,
                        country: journal.country,
                        lat: null,
                        lng: null,
                    });
                    continue;
                }

                const key = `${journal.city
                    .trim()
                    .toLowerCase()},${journal.country.trim().toLowerCase()}`;

                if (cacheRef.current.has(key)) {
                    coords.push(cacheRef.current.get(key));
                    continue;
                }

                try {
                    const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
                        journal.city
                    )}&country=${encodeURIComponent(
                        journal.country
                    )}&format=json&limit=1&addressdetails=1`;

                    const response = await fetch(url, {
                        headers: {
                            "User-Agent": "MyTravelApp/1.0 (me@example.com)",
                        },
                    });

                    const data = await response.json();

                    const result = {
                        city: journal.city,
                        country: journal.country,
                        lat: data?.[0]?.lat ?? null,
                        lng: data?.[0]?.lon ?? null,
                        code: data?.[0]?.address?.country_code ?? null,
                    };

                    cacheRef.current.set(key, result);
                    coords.push(result);
                } catch (err) {
                    console.error("Error fetching coordinates:", err);
                    coords.push({
                        city: journal.city,
                        country: journal.country,
                        lat: null,
                        lng: null,
                    });
                }

                await sleep(1100);
            }

            if (abortRef.current) {
                const validCoords = coords.filter(
                    (c) => c.lat !== null && c.lng !== null
                );

                const uniqueCoords = validCoords.filter(
                    (loc, i, arr) =>
                        i ===
                        arr.findIndex(
                            (t) =>
                                t.city === loc.city && t.country === loc.country
                        )
                );

                setLocations(uniqueCoords);
                setUniqueCountryCodes([
                    ...new Set(validCoords.map((c) => c.code).filter(Boolean)),
                ]);
            }
            setIsLoading(false);
        };

        if (journals.length > 0) {
            const newAbortSymbol = Symbol();
            abortRef.current = newAbortSymbol;
            fetchCoordinates().finally(() => {
                if (abortRef.current === newAbortSymbol) {
                    abortRef.current = null;
                }
            });
        } else {
            setLocations([]);
            setUniqueCountryCodes([]);
        }

        return () => {
            abortRef.current = null;
        };
    }, [journals]);

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
                uniqueCountryCodes,
                setUniqueCountryCodes,
                locations,
                isLoading,
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
