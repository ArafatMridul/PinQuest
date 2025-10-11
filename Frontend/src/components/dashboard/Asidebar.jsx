import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";

const Asidebar = ({ setActiveMenu, activeMenu, menuItems }) => {
    const [mobileOpen, setMobileOpen] = useState(false); // for <md

    return (
        <>
            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.aside
                        key="mobile-sidebar"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-white shadow-lg flex flex-col fixed top-0 bottom-0 w-64 xl:hidden z-50"
                    >
                        <div className="flex items-center justify-between p-4">
                            <Link
                                to="/"
                                className="text-xl font-bold text-black"
                            >
                                PinQuest
                            </Link>
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="text-2xl"
                            >
                                <IoClose />
                            </button>
                        </div>
                        <nav className="flex-1 px-2 space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        setActiveMenu(item.name);
                                        setMobileOpen(false);
                                    }}
                                    className={`flex items-center space-x-3 w-full px-4 py-2 rounded-lg text-black transition ${
                                        activeMenu === item.name
                                            ? "bg-slate-400 text-black"
                                            : "hover:bg-slate-300"
                                    }`}
                                >
                                    {item.icon}
                                    <span className="text-black">
                                        {item.name}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Mobile overlay + toggle */}
            <AnimatePresence mode="wait">
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeInOut" }}
                        className="bg-black/40 fixed inset-0 z-30 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
                {!mobileOpen && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeInOut" }}
                        onClick={() => setMobileOpen(true)}
                        className="xl:hidden fixed top-5 left-2 md:top-6 md:left-6 z-30 text-3xl border rounded-sm p-0.25 bg-slate-100"
                    >
                        <IoMenu className="text-black" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Desktop Nav (always expanded) */}
            <aside className="hidden xl:flex bg-white shadow-lg flex-col fixed top-0 bottom-0 w-64 z-30">
                <div className="flex items-center justify-between p-6">
                    <Link to="/" className="text-2xl font-bold text-black">
                        PinQuest
                    </Link>
                </div>
                <nav className="flex-1 px-2 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveMenu(item.name)}
                            className={`flex items-center space-x-3 w-full px-4 py-2 rounded-lg text-black transition-all duration-300 ease-in-out cursor-pointer ${
                                activeMenu === item.name
                                    ? "bg-slate-400 text-black"
                                    : "hover:bg-slate-300"
                            }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </button>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Asidebar;
