import { useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
    const [loggedin, setLoggedin] = useState(false);
    const token = localStorage.getItem("token");
    if (token && !loggedin) {
        setLoggedin(true);
    }
    return (
        <section className="flex items-center justify-center text-center bg-[url(/assets/images/hero-img.jpg)] bg-cover text-white h-screen">
            <div className="px-6">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    Capture Your Journeys
                </h2>
                <p className="text-lg md:text-xl mb-6">
                    Relive your travel stories and share them with the world.
                </p>
                <Link
                    to={loggedin ? "/app/dashboard" : "/signup"}
                    className="bg-white text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100"
                >
                    Explore Journal
                </Link>
            </div>
        </section>
    );
};

export default Hero;
