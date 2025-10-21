import { useState } from "react";
import {
    ArrowLeftStartOnRectangleIcon,
    MapIcon,
    GlobeEuropeAfricaIcon,
    Battery100Icon,
    UserIcon,
    HandThumbUpIcon,
} from "@heroicons/react/24/outline";

import Asidebar from "../components/dashboard/Asidebar";
import Main from "../components/dashboard/Main";
import { Link, useNavigate } from "react-router-dom";

const menuItems = [
    {
        name: "Travel Journal",
        icon: (
            <GlobeEuropeAfricaIcon className="h-5 w-5 text-black group-hover:text-white" />
        ),
    },
    {
        name: "Map View",
        icon: <MapIcon className="h-5 w-5 text-black group-hover:text-white" />,
    },
    {
        name: "Memories",
        icon: (
            <Battery100Icon className="h-5 w-5 text-black group-hover:text-white" />
        ),
    },
    {
        name: "Profile",
        icon: (
            <UserIcon className="h-5 w-5 text-black group-hover:text-white" />
        ),
    },
    {
        name: "Recommendations",
        icon: (
            <HandThumbUpIcon className="h-5 w-5 text-black group-hover:text-white" />
        ),
    },
    {
        name: "Logout",
        icon: (
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5 text-black group-hover:text-white" />
        ),
    },
];

const menuItemsAside = [
    {
        name: "Travel Journal",
        icon: <GlobeEuropeAfricaIcon className="h-8 w-8 text-black" />,
    },
    { name: "Map View", icon: <MapIcon className="h-8 w-8 text-black" /> },
    {
        name: "Memories",
        icon: <Battery100Icon className="h-8 w-8 text-black" />,
    },
    { name: "Profile", icon: <UserIcon className="h-8 w-8 text-black" /> },
    {
        name: "Recommendations",
        icon: <HandThumbUpIcon className="h-8 w-8 text-black" />,
    },
    {
        name: "Logout",
        icon: <ArrowLeftStartOnRectangleIcon className="h-8 w-8 text-black" />,
    },
];

export default function DashBoard() {
    const [activeMenu, setActiveMenu] = useState("Travel Journal");
    const token = localStorage.getItem("token");
    const navivate = useNavigate();

    if (!token) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-lg">
                <div className="bg-white max-w-[450px] px-6 py-12 rounded-2xl">
                    <p className="">Login first to access dashboard.</p>
                    <div
                        className="text-center px-8 py-2 text-white bg-black outline-1 font-bold rounded-full cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out w-fit mx-auto mt-4"
                        onClick={() => navivate("/login")}
                    >
                        <p>Login</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen grid grid-cols-[50px_1fr] md:grid-cols-[80px_1fr] xl:grid-cols-[256px_1fr] bg-gray-100">
            <div className="bg-white border-r-1 border-slate-300">
                <Asidebar
                    menuItems={menuItems}
                    setActiveMenu={setActiveMenu}
                    activeMenu={activeMenu}
                />
                <nav className="flex-1 px-1 md:px-3 space-y-2 pt-18 md:pt-20 sticky top-0">
                    {menuItemsAside.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => {
                                setActiveMenu(item.name);
                            }}
                            className={`flex items-center justify-center space-x-3 w-full px-2 py-2 rounded-lg text-gray-700 transition ${
                                activeMenu === item.name
                                    ? "bg-slate-400 text-red"
                                    : "hover:bg-blue-200"
                            }`}
                        >
                            {item.icon}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="flex-1 relative">
                <Main activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            </div>
        </div>
    );
}
