import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5"; // menu toggle icons

const Asidebar = ({ setActiveMenu, activeMenu, menuItems }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`bg-white shadow-lg flex flex-col fixed top-0 bottom-0 transition-all duration-300 ease-in-out
        ${collapsed ? "w-18" : "w-64"} 
        md:w-64`} // always full on md+
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6">
                {!collapsed && (
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        PinQuest
                    </Link>
                )}
                {/* Toggle button only visible < md */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setCollapsed((prev) => !prev)}
                >
                    {collapsed ? <IoMenu /> : <IoClose />}
                </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-2 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActiveMenu(item.name)}
                        className={`flex items-center ${
                            collapsed ? "justify-center" : "space-x-3"
                        } w-full px-4 py-2 rounded-lg text-gray-700 transition-all duration-300 ease-in-out cursor-pointer
              ${
                  activeMenu === item.name
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-200"
              }`}
                    >
                        {item.icon}
                        {!collapsed && <span>{item.name}</span>}
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Asidebar;
