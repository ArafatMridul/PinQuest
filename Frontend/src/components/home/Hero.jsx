import {
    Award,
    Book,
    Camera,
    ChevronRight,
    Globe,
    Image,
    MapPin,
    Star,
} from "lucide-react";
import { useState } from "react";
import { useUser } from "../../../context/userContext";
import { Link } from "react-router-dom";

const stats = [
    {
        icon: <Book className="w-6 h-6" />,
        value: "10K+",
        label: "Journals",
    },
    {
        icon: <Image className="w-6 h-6" />,
        value: "500K+",
        label: "Photos",
    },
    {
        icon: <Globe className="w-6 h-6" />,
        value: "150+",
        label: "Countries",
    },
    { icon: <Star className="w-6 h-6" />, value: "4.9/5", label: "Rating" },
];

const Hero = () => {
    const { user } = useUser();
    const [loggedin, setLoggedin] = useState(false);
    const token = localStorage.getItem("token");
    if (token && !loggedin) {
        setLoggedin(true);
    }
    return (
        <section className="relative pt-24 pb-32 overflow-hidden">
            {/* Background with travel image */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
                    {/* Overlay gradient for readability */}
                    <img
                        src="/d.jpg"
                        alt=""
                        className="object-cover object-center h-full w-full"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 shadow-sm border border-white/30">
                            <Award className="w-4 h-4 text-white" />
                            <span className="text-xs font-semibold text-white">
                                Rated #1 Travel Journal App
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                            Your Stories,
                            <span className="text-gray-100">
                                {" "}
                                Beautifully Preserved
                            </span>
                        </h1>

                        <p className="text-base text-gray-100 leading-relaxed max-w-md">
                            Transform your travel experiences into stunning
                            digital journals. Capture moments, relive
                            adventures, and preserve memories that last forever.
                        </p>

                        <button className="group bg-white text-black px-8 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl cursor-pointer w-fit">
                            <Link to={user ? "/app/dashboard" : "/login"}>
                                Start Creating
                            </Link>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center md:text-left">
                                    <div className="text-white mb-1 opacity-90 flex items-center justify-center md:justify-start">
                                        {stat.icon}
                                    </div>
                                    <div className="text-lg font-bold text-white">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-gray-200">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative group hidden md:block">
                            {/* Decorative background elements */}
                            <div className="absolute -inset-8 bg-gradient-to-br from-white/20 via-transparent to-white/20 rounded-3xl blur-2xl group-hover:from-white/30 group-hover:to-white/30 transition-all duration-700"></div>

                            {/* Main card container */}
                            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-1 overflow-hidden border border-white/30 group-hover:shadow-2xl group-hover:border-white/50 transition-all duration-500 hover:z-30">
                                {/* Animated gradient border */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>

                                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
                                    {/* Main showcase area */}
                                    <div className="relative">
                                        <div className="aspect-video bg-gradient-to-br from-white/20 via-white/10 to-black/20 overflow-hidden relative">
                                            {/* Background travel image with overlay */}
                                            <div className="absolute inset-0 bg-cover bg-center">
                                                <img
                                                    src="/card-bg.jpg"
                                                    alt=""
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                                            </div>

                                            {/* Premium content showcase */}
                                            <div className="relative h-full flex flex-col items-center justify-between p-8">
                                                {/* Top section - Icon with badge */}
                                                <div className="flex flex-col items-center space-y-4 pb-4">
                                                    {/* Badge */}
                                                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 flex items-center space-x-1 group-hover:bg-white/30 transition-all duration-500">
                                                        <div className="w-2 h-2 rounded-full bg-white/80"></div>
                                                        <span className="text-xs font-semibold text-white">
                                                            Live Preview
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Middle section - Journal entry cards */}
                                                <div className="space-y-3 w-full max-w-sm">
                                                    {/* Entry 1 */}
                                                    <div className="group/card bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div className="space-y-1">
                                                                <p className="text-xs font-semibold text-white/70 tracking-wide">
                                                                    ENTRY
                                                                </p>
                                                                <p className="text-sm font-medium text-white">
                                                                    Santorini
                                                                    Sunset
                                                                </p>
                                                            </div>
                                                            <MapPin className="w-4 h-4 text-white/50 group-hover/card:text-white/70 transition-colors" />
                                                        </div>
                                                        <p className="text-xs text-white/60">
                                                            Greece • Dec 2024
                                                        </p>
                                                    </div>

                                                    {/* Entry 2 */}
                                                    <div className="group/card bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div className="space-y-1">
                                                                <p className="text-xs font-semibold text-white/70 tracking-wide">
                                                                    ENTRY
                                                                </p>
                                                                <p className="text-sm font-medium text-white">
                                                                    Mountain
                                                                    Peaks
                                                                </p>
                                                            </div>
                                                            <MapPin className="w-4 h-4 text-white/50 group-hover/card:text-white/70 transition-colors" />
                                                        </div>
                                                        <p className="text-xs text-white/60">
                                                            Alps • Dec 2024
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        {/* Gradient separator */}
                                        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                                        <div className="bg-gradient-to-b from-white/8 to-transparent backdrop-blur-md p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <p className="text-xs font-semibold text-white/60 tracking-widest mb-1">
                                                        YOUR JOURNEY
                                                    </p>
                                                    <h3 className="text-sm font-bold text-white">
                                                        Travel Memories Vault
                                                    </h3>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-400/60 animate-pulse"></div>
                                                    <span className="text-xs text-white/60">
                                                        Active
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Quick stats row */}
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="bg-white/5 border border-white/20 rounded-lg p-3 text-center hover:bg-white/10 transition-colors">
                                                    <p className="text-xs text-white/70 mb-1">
                                                        Locations
                                                    </p>
                                                    <p className="text-sm font-bold text-white">
                                                        12
                                                    </p>
                                                </div>
                                                <div className="bg-white/5 border border-white/20 rounded-lg p-3 text-center hover:bg-white/10 transition-colors">
                                                    <p className="text-xs text-white/70 mb-1">
                                                        Duration
                                                    </p>
                                                    <p className="text-sm font-bold text-white">
                                                        15d
                                                    </p>
                                                </div>
                                                <div className="bg-white/5 border border-white/20 rounded-lg p-3 text-center hover:bg-white/10 transition-colors">
                                                    <p className="text-xs text-white/70 mb-1">
                                                        Stories
                                                    </p>
                                                    <p className="text-sm font-bold text-white">
                                                        32
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
