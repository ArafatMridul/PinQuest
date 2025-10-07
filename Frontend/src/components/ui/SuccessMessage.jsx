import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SuccessMessage = ({ show, message, onClose }) => {
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
                    className="fixed top-4 right-4 bg-green-400 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm"
                >
                    <div className="flex items-center">
                        <svg
                            className="w-6 h-6 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                        <span className="flex-1">{message}</span>
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
