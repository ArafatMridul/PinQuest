import { useState } from "react";
import Map from "../../pages/Map";
import LogoutPopup from "../LogoutPopup";
import Header from "./Header";
import JournalContainer from "./journal/JournalContainer";
import UserProfile from "../../pages/UserProfile";
import Memory from "../../pages/Memory";

const Main = ({ activeMenu, setActiveMenu }) => {
    const [close, setClose] = useState(false);

    const onClosePopup = () => {
        setActiveMenu("Travel Journal");
        setClose(false);
    };

    return (
        <div className="flex-1 flex flex-col">
            <Header activeMenu={activeMenu} />

            <main className="flex-1 relative">
                {activeMenu === "Travel Journal" && <JournalContainer />}
                {activeMenu === "Map View" && <Map />}
                {activeMenu === "Profile" && <UserProfile />}
                {activeMenu === "Memories" && <Memory />}
            </main>
            {activeMenu === "Logout" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xs z-50">
                    <LogoutPopup
                        onClosePopup={onClosePopup}
                        setClose={setClose}
                    />
                </div>
            )}
        </div>
    );
};

export default Main;
