import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const LogoutPopup = ({ setClose, onClosePopup }) => {
    const navigate = useNavigate();

    const onSignOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const onCloseClick = () => {
        setClose((prev) => !prev);
        onClosePopup();
    };
    return (
        <div className="relative w-[450px] bg-transparent outline-2 outline-white p-12 rounded-3xl">
            <div className="bg-white absolute inset-0 rounded-3xl -rotate-3"></div>
            <div className="relative z-50">
                <div>
                    <img src="/public/logout.png" alt="" className="mx-auto" />
                </div>
                <div className="text-center mt-8">
                    <h1 className="capitalize text-lg font-extrabold mb-2">
                        are you logging out?
                    </h1>
                    <p className="text-sm">
                        You can always log back in at any time. If you just want
                        to switch account, you can{" "}
                        <Link
                            to="/login"
                            className="underline underline-offset-4 cursor-pointer"
                        >
                            add another acount
                        </Link>
                        .
                    </p>
                </div>
                <div className="flex items-center justify-center gap-4 mt-10">
                    <div
                        className="text-center text-slate-800 px-8 py-2 outline-1 rounded-full font-bold cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
                        onClick={onCloseClick}
                    >
                        <p>Cancel</p>
                    </div>
                    <div
                        className="text-center px-8 py-2 text-white bg-black outline-1 font-bold rounded-full cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                        onClick={onSignOut}
                    >
                        <p>Log out</p>
                    </div>
                </div>
            </div>
            <div
                className="absolute top-4 right-8 cursor-pointer hover:bg-slate-500/30 rounded-full transition-all duration-300 ease-in-out z-50"
                onClick={onCloseClick}
            >
                <IoClose className="text-3xl" />
            </div>
        </div>
    );
};

export default LogoutPopup;
