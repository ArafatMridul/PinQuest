import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import Featured from "../components/home/Featured";
import Intro from "../components/home/Intro";
import Gallery from "../components/home/Gallery";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

const HomePage = () => {
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <Navbar scrolled={scrolled} />
            <Hero />
            <Featured />
            <Intro />
            <Gallery />
            <CTA />
            <Footer />
        </div>
    );
};

export default HomePage;
