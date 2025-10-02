import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [loggedin, setLoggedin] = useState(false);
    const token = localStorage.getItem("token");
    if (token && !loggedin) {
        setLoggedin(true);
    }
    return (
        <header className="bg-white/20 backdrop-blur-2xl fixed w-full top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white">PinQuest</Link>
                {!loggedin && (
                    <nav className="space-x-6 hidden md:flex text-black text-lg font-semibold">
                        <Link
                            to="/login"
                            className="outline-2 outline-black px-4 rounded-sm hover:scale-[1.05] transition-all duration-300 ease-in-out"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="outline-2 outline-black px-4 rounded-sm hover:scale-[1.05] transition-all duration-300 ease-in-out"
                        >
                            Sign up
                        </Link>
                    </nav>
                )}
                {loggedin && (
                    <div>
                        <Link
                            to="/app/dashboard"
                            className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 ease-in-out"
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
