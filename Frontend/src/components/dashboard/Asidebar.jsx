import React from "react";
import { Link } from "react-router-dom";

const Asidebar = ({ setActiveMenu, activeMenu, menuItems }) => {
    return (
        <aside className="w-64 bg-white shadow-lg flex flex-col fixed top-0 bottom-0">
            <Link to="/" className="p-6 text-2xl font-bold text-blue-600">
                PinQuest
            </Link>
            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActiveMenu(item.name)}
                        className={`flex items-center space-x-3 w-full px-4 py-2 rounded-lg text-gray-700  transition-all duration-300 ease-in-out cursor-pointer ${
                            activeMenu === item.name
                                ? "bg-blue-500 text-white"
                                : "hover:bg-blue-200"
                        }`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Asidebar;
