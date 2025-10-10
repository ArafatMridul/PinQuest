import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./userContext";

const JournalContext = createContext();

const JournalProvider = ({ children }) => {
    const { user } = useUser();
    const [journals, setJournals] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredJournal, setFilteredJournal] = useState([]);
    const [uniqueCountryCodes, setUniqueCountryCodes] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            const sleep = (ms) =>
                new Promise((resolve) => setTimeout(resolve, ms));
            const coords = [];

            for (const journal of journals) {
                // Skip if city or country is missing/empty
                if (!journal?.city || !journal?.country) {
                    coords.push({
                        city: journal.city,
                        country: journal.country,
                        lat: null,
                        lng: null,
                    });
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
                            "User-Agent": "MyTravelApp/1.0 (me@example.com)", // 👈 REQUIRED by Nominatim
                        },
                    });

                    const data = await response.json();

                    coords.push({
                        city: journal.city,
                        country: journal.country,
                        lat: data?.[0]?.lat ?? null,
                        lng: data?.[0]?.lon ?? null,
                    });
                } catch (err) {
                    console.error("Error fetching coordinates:", err);
                    coords.push({
                        city: journal.city,
                        country: journal.country,
                        lat: null,
                        lng: null,
                    });
                }

                // 👇 wait ~1 second between calls (Nominatim rate limit)
                await sleep(1100);
            }

            // Optional: keep only unique city+country pairs
            const uniqueCoords = coords.filter(
                (loc, index, self) =>
                    index ===
                    self.findIndex(
                        (t) => t.city === loc.city && t.country === loc.country
                    )
            );

            setLocations(uniqueCoords);
        };

        if (journals.length > 0) {
            fetchCoordinates();
        }
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

    useEffect(() => {
        // guard if journals is missing or empty
        if (!Array.isArray(journals) || journals.length === 0) {
            setUniqueCountryCodes([]);
            return;
        }

        const getCountryCodes = async () => {
            try {
                const codes = await Promise.all(
                    journals.map(async (journal) => {
                        try {
                            // skip if country missing/empty
                            if (
                                !journal?.country ||
                                journal.country.trim() === ""
                            ) {
                                return null;
                            }

                            const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
                                journal.city || ""
                            )}&country=${encodeURIComponent(
                                journal.country
                            )}&format=json&limit=1&addressdetails=1`;

                            const response = await fetch(url, {
                                headers: {
                                    "User-Agent":
                                        "MyTravelApp/1.0 (me@example.com)",
                                },
                            });

                            const data = await response.json();
                            if (Array.isArray(data) && data.length > 0) {
                                return (
                                    data[0].address.country_code?.toUpperCase() ??
                                    null
                                );
                            }
                            return null;
                        } catch (err) {
                            console.error("Error fetching coordinates:", err);
                            return null;
                        }
                    })
                );

                const uniqueCodes = [...new Set(codes.filter(Boolean))];
                setUniqueCountryCodes(uniqueCodes);
            } catch (outerErr) {
                console.error("Error in getCountryCodes:", outerErr);
                setUniqueCountryCodes([]);
            }
        };

        getCountryCodes();
    }, [journals]);

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
