import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";

const LogoutPopup = ({ setClose, onClosePopup }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const onSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("coords_cache");
        localStorage.removeItem(`journals_${user.id}`);
        navigate("/");
    };

    const onCloseClick = () => {
        setClose((prev) => !prev);
        onClosePopup();
    };
    return (
        <div className="relative sm:w-[350px] lg:w-[400px] bg-transparent outline-2 outline-white p-6 sm:p-12 rounded-3xl">
            <div className="bg-white absolute inset-0 rounded-3xl -rotate-3"></div>
            <div className="relative z-50">
                <div>
                    <img src="/public/logout.png" alt="" className="mx-auto" />
                </div>
                <div className="text-center mt-8">
                    <h1 className="capitalize text-sm sm:text-lg font-extrabold mb-2">
                        are you logging out?
                    </h1>
                    <p className=" text-xs sm:text-sm w-[32ch] mx-auto">
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
                        className="text-center text-slate-800 text-xs sm:text-sm lg:text-[1rem] px-5 sm:px-8 py-2 outline-1 rounded-full font-bold cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
                        onClick={onCloseClick}
                    >
                        <p>Cancel</p>
                    </div>
                    <div
                        className="text-center text-xs sm:text-sm lg:text-[1rem] px-5 sm:px-8 py-2 text-white bg-black outline-1 font-bold rounded-full cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
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
                <IoClose className="text-xl sm:lext-2xl lg:text-3xl" />
            </div>
        </div>
    );
};

export default LogoutPopup;
