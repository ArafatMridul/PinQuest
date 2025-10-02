import React, { useState } from "react";
import { useUser } from "../../../../context/userContext";
import { useJournal } from "../../../../context/journalContext";

const JournalEntryForm = ({ onclick }) => {
    const token = localStorage.getItem("token");
    const { setJournals } = useJournal();
    const [formData, setFormData] = useState({
        city: "",
        country: "",
        description: "",
    });

    const { user } = useUser();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/journal/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userId: user.id, ...formData }),
            });

            const data = await response.json();
            console.log("Response:", data);
        } catch (error) {
            console.error("Error:", error);
        }
        setJournals((journals) => [
            ...journals,
            { ...formData, createdAt: Date.now() },
        ]);
        onclick();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto pt-16"
        >
            <div onClick={onclick} className="absolute top-2 right-2">
                <img
                    src="/assets/icons/cross.svg"
                    alt=""
                    className="rotate-45 size-8 z-50 cursor-pointer"
                />
            </div>
            <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
            >
                Submit Journal
            </button>
        </form>
    );
};

export default JournalEntryForm;
