import { Camera, Compass, Heart, Sparkles } from "lucide-react";
import React from "react";

const steps = [
    {
        number: "1",
        title: "Sign Up",
        description:
            "Create your account in 30 seconds. No credit card required.",
        icon: <Sparkles className="w-6 h-6" />,
    },
    {
        number: "2",
        title: "Create Journey",
        description: "Start a new journal for each trip with custom themes.",
        icon: <Compass className="w-6 h-6" />,
    },
    {
        number: "3",
        title: "Capture Moments",
        description: "Add photos, stories, and locations with our editor.",
        icon: <Camera className="w-6 h-6" />,
    },
    {
        number: "4",
        title: "Relive Memories",
        description: "Access your journals anytime, anywhere.",
        icon: <Heart className="w-6 h-6" />,
    },
];

const Intro = () => {
    return (
        <section
            id="how-it-works"
            className="py-16 bg-white relative overflow-hidden"
        >
            <div className="absolute inset-0 opacity-3">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-black rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-400 rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1 border border-gray-300 mb-4">
                        <Compass className="w-4 h-4 text-gray-700" />
                        <span className="text-xs font-semibold text-gray-700">
                            SIMPLE PROCESS
                        </span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                        Get Started in Minutes
                    </h2>
                    <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                        Four simple steps to preserve your travel memories
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6 relative h-full">
                    <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gray-300"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative text-center group md:grid md:grid-rows-[fit_1fr]">
                            <div className="relative inline-flex flex-col items-center">
                                <div className="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-md group-hover:scale-110 transition-transform duration-300 relative z-10">
                                    {step.number}
                                </div>
                                <div className="absolute top-0 -inset-3 bg-gray-900 rounded-full opacity-0 group-hover:opacity-10 blur-lg transition-opacity duration-300"></div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-5 shadow-sm group-hover:shadow-md transition-all duration-300 border border-gray-200">
                                <div className="text-gray-900 flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                                    {step.icon}
                                </div>
                                <h3 className="text-base font-bold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-xs">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Intro;
