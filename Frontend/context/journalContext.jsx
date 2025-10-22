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

    // State management
    const [journals, setJournals] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredJournal, setFilteredJournal] = useState([]);
    const [uniqueCountryCodes, setUniqueCountryCodes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    // Refs for tracking
    const abortControllerRef = useRef(null);
    const coordinateFetchAbortRef = useRef(null);
    const currentUserIdRef = useRef(null);
    const prevJournalsHashRef = useRef(null);

    // ===== UTILITY FUNCTIONS =====

    // Coordinate cache helpers
    const coordinateCache = useMemo(() => {
        const getCache = () => {
            try {
                const cached = localStorage.getItem("coords_cache");
                return cached ? new Map(JSON.parse(cached)) : new Map();
            } catch (err) {
                console.warn("Failed to load coordinate cache:", err);
                return new Map();
            }
        };
        return getCache();
    }, []);

    const saveCoordinateCache = useCallback((map) => {
        try {
            localStorage.setItem(
                "coords_cache",
                JSON.stringify([...map.entries()])
            );
        } catch (err) {
            console.warn("Failed to save coordinate cache:", err);
        }
    }, []);

    // Simple hash to detect journal changes
    const getJournalsHash = (journalsData) => {
        return JSON.stringify(journalsData.map((j) => j.id).sort());
    };

    // ===== COORDINATE FETCHING =====

    useEffect(() => {
        // Skip if no journals
        if (!journals || journals.length === 0) {
            setLocations([]);
            setUniqueCountryCodes([]);
            return;
        }

        // Skip if journals haven't actually changed
        const currentHash = getJournalsHash(journals);
        if (prevJournalsHashRef.current === currentHash) {
            return;
        }
        prevJournalsHashRef.current = currentHash;

        // Abort previous coordinate fetch if still running
        if (coordinateFetchAbortRef.current) {
            coordinateFetchAbortRef.current.abort();
        }

        const abortController = new AbortController();
        coordinateFetchAbortRef.current = abortController;

        const fetchCoordinates = async () => {
            try {
                setIsLoading(true);
                setProgress(0);
                const coords = [];
                const validLocations = journals.filter(
                    (j) => j?.city && j?.country
                );

                for (let i = 0; i < validLocations.length; i++) {
                    if (abortController.signal.aborted) {
                        console.log("Coordinate fetch aborted");
                        return;
                    }

                    const journal = validLocations[i];
                    const cacheKey = `${journal.city
                        .trim()
                        .toLowerCase()},${journal.country
                        .trim()
                        .toLowerCase()}`;

                    // Check cache first
                    if (coordinateCache.has(cacheKey)) {
                        coords.push(coordinateCache.get(cacheKey));
                        setProgress(
                            Math.round(((i + 1) / validLocations.length) * 100)
                        );
                        continue;
                    }

                    try {
                        const query = new URLSearchParams({
                            city: journal.city,
                            country: journal.country,
                            format: "json",
                            limit: "1",
                            addressdetails: "1",
                        });

                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/search?${query}`,
                            {
                                headers: {
                                    "User-Agent":
                                        "MyTravelApp/1.0 (contact@mytravelapp.com)",
                                },
                                signal: abortController.signal,
                            }
                        );

                        if (!response.ok) {
                            throw new Error(`API error: ${response.status}`);
                        }

                        const data = await response.json();
                        const result = {
                            city: journal.city,
                            country: journal.country,
                            lat: data?.[0]?.lat ?? null,
                            lng: data?.[0]?.lon ?? null,
                            code: data?.[0]?.address?.country_code ?? null,
                        };

                        coordinateCache.set(cacheKey, result);
                        coords.push(result);
                    } catch (err) {
                        if (err.name !== "AbortError") {
                            console.error(
                                `Error fetching coordinates for ${journal.city}, ${journal.country}:`,
                                err
                            );
                        }
                        coords.push({
                            city: journal.city,
                            country: journal.country,
                            lat: null,
                            lng: null,
                            code: null,
                        });
                    }

                    setProgress(
                        Math.round(((i + 1) / validLocations.length) * 100)
                    );

                    // Rate limiting - respect API limits
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }

                if (!abortController.signal.aborted) {
                    // Process and deduplicate results
                    const validCoords = coords.filter((c) => c.lat && c.lng);
                    const uniqueCoords = Array.from(
                        new Map(
                            validCoords.map((loc) => [
                                `${loc.city}-${loc.country}`,
                                loc,
                            ])
                        ).values()
                    );

                    const countryCodes = Array.from(
                        new Set(validCoords.map((c) => c.code).filter(Boolean))
                    );

                    setLocations(uniqueCoords);
                    setUniqueCountryCodes(countryCodes);
                    saveCoordinateCache(coordinateCache);
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Coordinate fetch error:", err);
                }
            } finally {
                setIsLoading(false);
                setProgress(0);
            }
        };

        fetchCoordinates();

        return () => {
            if (abortController) {
                abortController.abort();
            }
        };
    }, [journals, coordinateCache, saveCoordinateCache]);

    // ===== JOURNAL FETCHING =====

    useEffect(() => {
        // Cleanup function
        const cleanup = () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };

        // If no user, clear everything
        if (!user) {
            console.log("No user - clearing journals");
            setJournals([]);
            setFilteredJournal([]);
            setLocations([]);
            setUniqueCountryCodes([]);
            setProgress(0);
            setSearchQuery("");
            currentUserIdRef.current = null;
            prevJournalsHashRef.current = null;
            cleanup();
            return;
        }

        console.log(
            "User changed to:",
            user.id,
            "Current ref:",
            currentUserIdRef.current
        );

        // If user hasn't changed AND we have journals, skip
        if (currentUserIdRef.current === user.id && journals.length > 0) {
            console.log("Same user and has journals - skipping fetch");
            return;
        }

        console.log("Fetching journals for user:", user.id);

        // User changed or no journals - update ref and clear old data
        currentUserIdRef.current = user.id;
        setJournals([]);
        setFilteredJournal([]);
        setLocations([]);
        setUniqueCountryCodes([]);
        setProgress(0);
        prevJournalsHashRef.current = null;

        // Create new abort controller
        cleanup();
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        const fetchJournals = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem("token");
                if (!token) {
                    console.warn("No authentication token found");
                    setIsLoading(false);
                    return;
                }

                console.log("Making API call for user:", user.id);

                const response = await fetch(
                    `http://localhost:8000/journal/${user.id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        signal: abortController.signal,
                    }
                );

                if (!response.ok) {
                    if (response.status === 401) {
                        console.error("Unauthorized - token may have expired");
                        // Clear auth if unauthorized
                        localStorage.removeItem("token");
                        return;
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched journals data:", data);

                // Only update if user is still the same and request wasn't aborted
                if (
                    currentUserIdRef.current === user.id &&
                    !abortController.signal.aborted
                ) {
                    const journalsArray = Array.isArray(data) ? data : [];
                    console.log("Setting journals:", journalsArray);
                    setJournals(journalsArray);
                    localStorage.setItem(
                        `journals_${user.id}`,
                        JSON.stringify(data)
                    );
                }
            } catch (err) {
                if (err.name === "AbortError") {
                    console.log("Journal fetch was aborted");
                } else {
                    console.error("Error fetching journals:", err);
                    setJournals([]);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchJournals();

        return cleanup;
    }, [user, journals.length]); // Add journals.length to dependencies

    // ===== JOURNAL OPERATIONS =====

    const addJournal = useCallback(
        async (newJournal) => {
            if (!user) {
                console.error("No user logged in");
                return;
            }

            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8000/journal`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(newJournal),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const savedJournal = await response.json();

                setJournals((prev) => {
                    const updated = [...prev, savedJournal];
                    localStorage.setItem(
                        `journals_${user.id}`,
                        JSON.stringify(updated)
                    );
                    return updated;
                });
            } catch (err) {
                console.error("Error adding journal:", err);
                throw err; // Re-throw for caller to handle
            }
        },
        [user]
    );

    const handleToggleFavourite = useCallback(
        async (journal) => {
            if (!user || !journal?.id) {
                console.error("Invalid journal or user");
                return;
            }

            try {
                const token = localStorage.getItem("token");
                const newFavouriteState = !journal.isFavourite;

                const response = await fetch(
                    `http://localhost:8000/journal/update-isFavorite/${journal.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            isFavourite: newFavouriteState,
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                setJournals((prev) => {
                    const updated = prev.map((j) =>
                        j.id === journal.id
                            ? { ...j, isFavourite: newFavouriteState }
                            : j
                    );
                    localStorage.setItem(
                        `journals_${user.id}`,
                        JSON.stringify(updated)
                    );
                    return updated;
                });
            } catch (err) {
                console.error("Error toggling favourite:", err);
                throw err;
            }
        },
        [user]
    );

    const onSearchJournal = useCallback(async () => {
        if (!searchQuery.trim()) {
            setFilteredJournal([]);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:8000/journal/search?query=${encodeURIComponent(
                    searchQuery
                )}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setFilteredJournal(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error searching journals:", err);
            setFilteredJournal([]);
        }
    }, [searchQuery]);

    // ===== MEMOIZED CONTEXT VALUE =====

    const value = useMemo(
        () => ({
            journals,
            setJournals,
            addJournal,
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
            onSearchJournal,
            addJournal,
            handleToggleFavourite,
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
        throw new Error("useJournal must be used within a JournalProvider");
    }
    return context;
};

export { JournalProvider, useJournal };
