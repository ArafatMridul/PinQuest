import { useEffect } from "react";

export default function Popup({ city, country, description, date, onClose }) {
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md relative animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {city}, {country}
                </h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <p className="text-sm text-gray-500">
                    📅{" "}
                    {new Date(date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </p>
            </div>
        </div>
    );
}
