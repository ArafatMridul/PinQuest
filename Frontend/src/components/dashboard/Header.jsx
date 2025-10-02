import React, { useEffect, useState } from "react";

const Header = ({ activeMenu }) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    "http://localhost:8000/users/user",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                console.log(error);
            }
        };
        getUserInfo();
    }, []);

    console.log(user);
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">{activeMenu}</h1>
            <div className="flex items-center space-x-3">
                <span className="text-gray-600">Hello,</span>
                <span className="font-semibold capitalize">{user.firstName} {user.lastName}</span>
                <img
                    src="https://i.pravatar.cc/40"
                    alt="user avatar"
                    className="w-10 h-10 rounded-full border"
                />
            </div>
        </header>
    );
};

export default Header;
