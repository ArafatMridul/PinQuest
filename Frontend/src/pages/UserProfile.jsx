import React, { useEffect, useState } from "react";
import ProfileInputField from "../components/dashboard/profile/ProfileInputField";
import moment from "moment";
import parsePhoneNumber from "libphonenumber-js";
import EditProfile from "../components/dashboard/profile/EditProfile";
import SuccessMessage from "../components/ui/SuccessMessage";

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Handle successful edit profile
    const handleEditProfile = (message = "Profile editted successfully.") => {
        setSuccessMessage(message);
        setShowSuccess(true);
    };

    // Handle closing success message
    const handleCloseSuccess = () => {
        setShowSuccess(false);
        setSuccessMessage("");
    };

    const getUserDetails = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/users/profile",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            const data = await response.json();
            setUserDetails(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    console.log(userDetails);

    return (
        <div className="min-h-screen pb-8 sm:pb-0 pt-18 relative">
            <div className="px-4 py-2 md:py-4 md:px-8">
                <div>
                    <img src="/user.png" alt="" className="size-18" />
                    <div className="mt-4">
                        <h1 className="capitalize relative inline text-2xl md:text-[1.75rem] tracking-[-0.2px] leading-[1.2]">
                            {userDetails?.firstName} {userDetails?.lastName}
                            <img
                                src="/verified.svg"
                                alt=""
                                className="size-5 absolute -top-2 -right-6"
                            />
                        </h1>
                        <p className="text-sm md:text-lg">
                            {userDetails?.email}
                        </p>
                    </div>
                </div>
                <div className="mt-12 rounded-md overflow-clip border-2 border-slate-200 xl:w-[85%]">
                    <div className="bg-gray-200 px-4 py-2">
                        <h2>Personal Details</h2>
                    </div>
                    <ProfileInputField
                        label={`Full Name`}
                        field={`${userDetails?.firstName} ${userDetails?.lastName}`}
                    />
                    <ProfileInputField
                        label={`Date of Birth`}
                        field={`${
                            userDetails?.dob
                                ? moment(userDetails?.dob).format(
                                      "MMMM Do, YYYY"
                                  )
                                : "n/a"
                        }`}
                    />
                    <ProfileInputField
                        label={`Gender`}
                        field={`${userDetails?.gender || "n/a"}`}
                    />
                    <ProfileInputField
                        label={`Nationality`}
                        field={`${userDetails?.nationality || "n/a"}`}
                    />
                    <ProfileInputField
                        label={`Address`}
                        field={`${userDetails?.address || "n/a"}`}
                    />
                    <ProfileInputField
                        label="Phone Number"
                        field={
                            userDetails?.phoneNo
                                ? parsePhoneNumber(
                                      userDetails.phoneNo,
                                      "BD"
                                  ).formatInternational()
                                : "n/a"
                        }
                    />
                    <ProfileInputField
                        label={`Email`}
                        field={`${userDetails?.email}`}
                    />
                </div>
                <div className="mt-12 rounded-md overflow-clip border-2 border-slate-200 xl:w-[85%]">
                    <div className="bg-gray-200 px-4 py-2">
                        <h2>Security Settings</h2>
                    </div>
                    <ProfileInputField
                        label={`User Id`}
                        field={`${userDetails?.userId}`}
                    />
                    <ProfileInputField
                        label={`Security Key`}
                        field={`${Math.floor(
                            Math.random() * 10000
                        )}-${Math.floor(Math.random() * 10000)}-${Math.floor(
                            Math.random() * 10000
                        )}-${Math.floor(Math.random() * 10000)}`}
                    />
                </div>
                <div className="flex items-center gap-3 mt-6">
                    <div
                        className="text-center text-slate-800 px-8 py-2 outline-1 rounded-full font-bold cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
                        onClick={() => setOpenEdit(true)}
                    >
                        <p>Edit</p>
                    </div>
                </div>
            </div>
            {openEdit && (
                <EditProfile
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                    setOpenEdit={() => setOpenEdit(false)}
                    handleEditProfile={handleEditProfile}
                />
            )}
            <SuccessMessage
                show={showSuccess}
                message={successMessage}
                onClose={handleCloseSuccess}
            />
        </div>
    );
};

export default UserProfile;
