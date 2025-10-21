import { Camera, Image, MapPin } from "lucide-react";
import React from "react";

const journalCards = [
    {
        title: "Bali Paradise",
        location: "Indonesia",
        date: "Dec 2024",
        gradient: "from-gray-800 to-gray-900",
        entries: 24,
        photos: 156,
        image: "/bali.jpg",
    },
    {
        title: "Tokyo Neon Dreams",
        location: "Japan",
        date: "Nov 2024",
        gradient: "from-gray-700 to-gray-800",
        entries: 18,
        photos: 203,
        image: "/tokyo.jpg",
    },
    {
        title: "Parisian Romance",
        location: "France",
        date: "Oct 2024",
        gradient: "from-gray-900 to-black",
        entries: 15,
        photos: 127,
        image: "/paris.jpg",
    },
];

const Gallery = () => {
    return (
        <section id="gallery" className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center space-x-2 bg-white rounded-lg px-3 py-1 border border-gray-300 mb-4">
                        <Image className="w-4 h-4 text-gray-700" />
                        <span className="text-xs font-semibold text-gray-700">
                            GALLERY
                        </span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                        Beautiful Journals
                    </h2>
                    <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                        See how stunning your travel memories can look
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {journalCards.map((card, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200"
                        >
                            <div
                                className={`relative aspect-video ${card.gradient} flex items-center justify-center overflow-hidden`}
                            >
                                <img src={card.image} alt="" />
                                <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-semibold text-gray-900">
                                    {card.entries} entries
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
                                    {card.title}
                                </h3>
                                <div className="flex items-center text-gray-600 mb-3">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span className="font-medium text-xs">
                                        {card.location}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <span className="text-xs text-gray-500">
                                        {card.date}
                                    </span>
                                    <div className="flex items-center space-x-1">
                                        <Camera className="w-3 h-3 text-gray-400" />
                                        <span className="text-xs text-gray-600 font-medium">
                                            {card.photos}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
