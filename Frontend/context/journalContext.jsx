import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import { useUser } from "./userContext";

const JournalContext = createContext();

const JournalProvider = ({ children }) => {
    const { user } = useUser();

    // 🧠 Store references and state
    const abortRef = useRef(Symbol());
    const [journals, setJournals] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredJournal, setFilteredJournal] = useState([]);
    const [uniqueCountryCodes, setUniqueCountryCodes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    // 🧩 NEW: Helper functions to persist coordinate cache in localStorage
    const getCache = () => {
        try {
            return new Map(
                JSON.parse(localStorage.getItem("coords_cache") || "[]")
            );
        } catch {
            return new Map();
        }
    };

    const saveCache = (map) => {
        localStorage.setItem(
            "coords_cache",
            JSON.stringify([...map.entries()])
        );
    };

    // 🔒 Initialize the cache from localStorage (so it's persisted across reloads)
    const cacheRef = useRef(getCache());

    // 🧠 Track previous journals to prevent unnecessary coordinate re-fetch
    const prevJournalsRef = useRef();

    // 🗺️ Fetch coordinates only when journals actually change
    useEffect(() => {
        const currentJournals = JSON.stringify(journals);

        // ⚙️ Skip running again if journals data hasn't actually changed
        if (prevJournalsRef.current === currentJournals) return;
        prevJournalsRef.current = currentJournals;

        const fetchCoordinates = async () => {
            if (journals.length === 0) {
                setLocations([]);
                setUniqueCountryCodes([]);
                return;
            }

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
                    setProgress(
                        ((coords.length / journals.length) * 100).toFixed(0)
                    );
                    continue;
                }

                const key = `${journal.city
                    .trim()
                    .toLowerCase()},${journal.country.trim().toLowerCase()}`;

                // ⚡ NEW: Reuse cached coordinate data if already available
                if (cacheRef.current.has(key)) {
                    coords.push(cacheRef.current.get(key));
                    setProgress(
                        ((coords.length / journals.length) * 100).toFixed(0)
                    );
                    continue;
                }

                // 🛰️ Fetch from OpenStreetMap only if not in cache
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

                    // 🧩 Cache new coordinate and persist it
                    cacheRef.current.set(key, result);
                    saveCache(cacheRef.current);

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

                setProgress(
                    ((coords.length / journals.length) * 100).toFixed(0)
                );

                // ⏳ Delay to respect Nominatim’s rate limit
                await sleep(1100);
            }

            if (abortRef.current) {
                const validCoords = coords.filter((c) => c.lat && c.lng);

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

        const newAbortSymbol = Symbol();
        abortRef.current = newAbortSymbol;
        fetchCoordinates().finally(() => {
            if (abortRef.current === newAbortSymbol) abortRef.current = null;
        });

        return () => {
            abortRef.current = null;
        };
    }, [journals]);

    // 🧩 Fetch all journals, but now with localStorage caching
    useEffect(() => {
        if (!user) return;

        const getAllJournals = async () => {
            try {
                const token = localStorage.getItem("token");

                // ⚡ NEW: Check if journals for this user already cached
                const cached = localStorage.getItem(`journals_${user.id}`);
                if (cached) {
                    setJournals(JSON.parse(cached));
                    return;
                }

                // Otherwise, fetch from backend
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
                // 🧠 Cache them locally
                localStorage.setItem(
                    `journals_${user.id}`,
                    JSON.stringify(data)
                );
            } catch (error) {
                console.log(error);
            }
        };

        getAllJournals();
    }, [user]);

    // ⭐ Toggle favorite (unchanged)
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

    // 🔍 Search remains the same
    const onSearchJournal = useCallback(async () => {
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
    }, [searchQuery]);

    // 💡 NEW: Memoize the context value to prevent unnecessary re-renders
    const value = useMemo(
        () => ({
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
            progress,
        }),
        [
            journals,
            searchQuery,
            filteredJournal,
            uniqueCountryCodes,
            locations,
            isLoading,
            progress,
        ]
    );

    return (
        <JournalContext.Provider value={value}>
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
