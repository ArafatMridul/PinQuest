import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SuccessMessage = ({ show, message, onClose, type = undefined }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="success-message"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed top-4 right-4 bg-green-100 text-black px-2 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg shadow-green-200 z-50 max-w-sm outline outline-green-400"
                >
                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm lg:text-lg">
                        <img src="/public/tick.svg" alt="" className="size-5" />
                        <div className="grid">
                            <span>Success!</span>
                            <span className="capitalize">{message}</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SuccessMessage;
