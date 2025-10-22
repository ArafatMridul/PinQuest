import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    useEffect(() => {
        const getUserInfo = async () => {
            try {
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
    }, [token]);
    return (
        <UserContext.Provider value={{ user, logout }}>
            {children}
        </UserContext.Provider>
    );
};

function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("UserContext used outside of UserProvider.");
    }

    return context;
}

export { UserProvider, useUser };
