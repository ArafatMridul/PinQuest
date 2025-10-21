import { Book, ChevronRight, Globe, Heart, Lock, Sparkles } from "lucide-react";
import { useState } from "react";

const features = [
    {
        icon: <Book className="w-8 h-8" />,
        title: "Rich Story Editor",
        description:
            "Craft your travel stories with a distraction-free editor. Add photos, videos, and interactive maps with ease.",
        color: "from-gray-800 to-gray-900",
    },
    {
        icon: <Heart className="w-8 h-8" />,
        title: "Memory Timeline",
        description:
            "Navigate through your adventures with an interactive timeline. Relive every moment chronologically.",
        color: "from-gray-700 to-gray-800",
    },
    {
        icon: <Globe className="w-8 h-8" />,
        title: "Interactive Maps",
        description:
            "Pin your locations on a world map and visualize your journey across continents.",
        color: "from-gray-800 to-gray-900",
    },
    {
        icon: <Lock className="w-8 h-8" />,
        title: "Private & Secure",
        description:
            "Your memories are encrypted and stored safely. Share only what you want, when you want.",
        color: "from-gray-700 to-gray-800",
    },
];

const Featured = () => {
    const [activeCard, setActiveCard] = useState(null);
    return (
        <section id="features" className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center space-x-2 bg-white rounded-lg px-3 py-1 border border-gray-300 mb-4">
                        <Sparkles className="w-4 h-4 text-gray-700" />
                        <span className="text-xs font-semibold text-gray-700">
                            FEATURES
                        </span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                        Everything You Need
                    </h2>
                    <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                        Powerful tools designed to make journaling effortless
                        and enjoyable
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-lg p-7 transition-all duration-300 border border-gray-200 cursor-pointer overflow-hidden"
                            onMouseEnter={() => setActiveCard(index)}
                            onMouseLeave={() => setActiveCard(null)}
                        >
                            <div className="relative">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gray-900 text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                                <div className="mt-4 flex items-center text-gray-900 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span>Learn more</span>
                                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Featured;
