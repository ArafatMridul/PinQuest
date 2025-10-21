import { MapPin } from "lucide-react";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                            <MapPin className="text-white w-8 h-8" />
                            <span className="text-2xl font-bold">
                                TravelLog
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 text-center md:text-start">
                            Preserve your travel memories with the most
                            beautiful and intuitive journaling platform. Your
                            stories deserve to be told.
                        </p>
                        <div className="flex space-x-3 items-center justify-center md:justify-start">
                            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer text-xs">
                                𝕏
                            </div>
                            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer text-xs">
                                in
                            </div>
                            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer text-xs">
                                ig
                            </div>
                        </div>
                    </div>

                    <div className="text-center md:text-start">
                        <h3 className="text-sm font-bold mb-4">Product</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>
                                <a
                                    href="#features"
                                    className="hover:text-white transition-colors"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#how-it-works"
                                    className="hover:text-white transition-colors"
                                >
                                    How It Works
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#gallery"
                                    className="hover:text-white transition-colors"
                                >
                                    Gallery
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="text-center md:text-start">
                        <h3 className="text-sm font-bold mb-4">Support</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Terms
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
                    <p className="text-gray-400">
                        © 2025 PinQuest. All rights reserved. Made with ❤️ for
                        travelers.
                    </p>
                    <p className="text-gray-500 mt-3 md:mt-0">Siuuuu</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
