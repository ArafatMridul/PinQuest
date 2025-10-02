import Navbar from "../components/Navbar";
import Hero from "../components/home/hero";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <Hero />
        </div>
    );
}
