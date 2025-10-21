import { ChevronRight, Sparkles } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../../context/userContext";

const CTA = () => {
    const { user } = useUser();
    return (
        <section className="py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#0A0A0A]"></div>
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Sparkles className="w-12 h-12 text-white mx-auto mb-6 animate-pulse" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Ready to Preserve Your Adventures?
                </h2>
                <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto">
                    Join thousands of travelers documenting their journeys.
                    Start your first journal today—it's free!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to={user ? "app/dashboard" : "/login"}
                        className="group bg-white text-black px-10 py-3 rounded-lg text-sm font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2"
                    >
                        <span>Create Your First Journal</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="bg-transparent text-white px-10 py-3 rounded-lg text-sm font-bold border border-white hover:bg-white/10 transition-all duration-300">
                        Learn More
                    </button>
                </div>
                <p className="text-gray-400 mt-6 text-xs">
                    No credit card required • Free forever • Cancel anytime
                </p>
            </div>
        </section>
    );
};

export default CTA;
