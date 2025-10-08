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

    return (
        <div className="min-h-screen flex bg-gray-100">
            <div className="w-64">
                <Asidebar
                    menuItems={menuItems}
                    setActiveMenu={setActiveMenu}
                    activeMenu={activeMenu}
                />
            </div>
            <Main activeMenu={activeMenu} />
        </div>
    );
}
