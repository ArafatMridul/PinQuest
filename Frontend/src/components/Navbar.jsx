import React, { useState } from "react";
import { MapPin, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";

const Navbar = ({ scrolled }) => {
    const {user} = useUser();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/50 backdrop-blur-md"
                    : "bg-transparent backdrop-blur-md"
            } ${isOpen && "h-screen"}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2 group cursor-pointer">
                        <MapPin
                            className={`w-8 h-8 group-hover:scale-110 transition-transform ${
                                scrolled ? "text-slate-800" : "text-white/90"
                            }`}
                        />
                        <span
                            className={`text-2xl font-bold transition-colors ${
                                scrolled ? "text-black" : "text-white/90"
                            }`}
                        >
                            PinQuest
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {["Features", "How It Works", "Gallery"].map((item) => (
                            <a
                                key={item}
                                href={`#${item
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                className={`relative text-sm font-bold transition-colors after:absolute after:w-0 after:left-0 after:-bottom-1 after:h-0.5 hover:after:w-full after:transition-all after:duration-500 after:ease-in-out ${
                                    scrolled
                                        ? "text-gray-800 hover:text-black after:bg-black"
                                        : "text-white/85 hover:text-white after:bg-white"
                                }`}
                            >
                                {item}
                            </a>
                        ))}

                        <Link
                            to={user ? "/app/dashboard" : "/login"}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out cursor-pointer ${
                                scrolled
                                    ? "bg-black text-white hover:bg-gray-800"
                                    : "bg-white text-black hover:bg-gray-200"
                            }`}
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <X
                                className={`w-6 h-6 ${
                                    scrolled ? "text-black" : "text-white"
                                }`}
                            />
                        ) : (
                            <Menu
                                className={`w-6 h-6 ${
                                    scrolled ? "text-black" : "text-white"
                                }`}
                            />
                        )}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div
                        className={`md:hidden px-4 py-8 text-center rounded-md animate-fade-in mt-6 ${
                            scrolled ? "bg-white" : "bg-gray-900/80"
                        }`}
                    >
                        {["Features", "How It Works", "Gallery"].map((item) => (
                            <a
                                key={item}
                                href={`#${item
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                className={`block py-2 text-sm font-medium px-2 ${
                                    scrolled
                                        ? "text-gray-800 hover:text-black"
                                        : "text-gray-200 hover:text-white"
                                }`}
                            >
                                {item}
                            </a>
                        ))}
                        <button
                            className={`w-full mt-4 px-5 py-2 rounded-sm text-sm font-semibold ${
                                scrolled
                                    ? "bg-black text-white hover:bg-gray-800"
                                    : "bg-white text-black hover:bg-gray-200"
                            }`}
                        >
                            Get Started
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
