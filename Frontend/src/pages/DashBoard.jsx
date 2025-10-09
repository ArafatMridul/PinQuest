import { useState } from "react";
import {
    ArrowLeftStartOnRectangleIcon,
    MapIcon,
    GlobeEuropeAfricaIcon,
    Battery100Icon,
    UserIcon,
} from "@heroicons/react/24/outline";

import Asidebar from "../components/dashboard/Asidebar";
import Main from "../components/dashboard/Main";
import { Link, useNavigate } from "react-router-dom";

const menuItems = [
    {
        name: "Travel Journal",
        icon: <GlobeEuropeAfricaIcon className="h-5 w-5" />,
    },
    { name: "Map View", icon: <MapIcon className="h-5 w-5" /> },
    { name: "Memories", icon: <Battery100Icon className="h-5 w-5" /> },
    { name: "Profile", icon: <UserIcon className="h-5 w-5" /> },
    {
        name: "Logout",
        icon: <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />,
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
        <div className="min-h-screen flex bg-gray-100">
            <div className="w-18 lg:w-64">
                <Asidebar
                    menuItems={menuItems}
                    setActiveMenu={setActiveMenu}
                    activeMenu={activeMenu}
                />
            </div>
            <div className="flex-1 relative">
                <Main activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            </div>
        </div>
    );
}
