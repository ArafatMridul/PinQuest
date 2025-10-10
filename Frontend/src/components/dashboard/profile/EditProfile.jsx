import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const EditProfile = ({
    userDetails,
    setOpenEdit,
    setUserDetails,
    handleEditProfile,
}) => {
    const [inputs, setInputs] = useState({
        dob: userDetails ? userDetails.dob : "",
        nationality: userDetails ? userDetails.nationality : "",
        address: userDetails ? userDetails.address : "",
        phoneNo: userDetails ? userDetails.phoneNo : "",
        gender: userDetails ? userDetails.gender : "",
    });
    const [changed, setChanged] = useState(false);

    const handleChange = (e) => {
        setChanged(true);
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:8000/users/profile/insert",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify(inputs),
                }
            );

            const data = await response.json();
            setUserDetails((prev) => ({ ...prev, ...inputs }));
            setOpenEdit(false);
            if (response.ok) {
                handleEditProfile();
            } else {
                alert(data.error || "Failed to update profile.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-30">
            <form
                onSubmit={handleSubmit}
                className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-lg space-y-6"
            >
                <h2 className="text-xl font-bold text-center mb-8">
                    Edit Profile
                </h2>

                {/* Date of Birth */}
                <div>
                    <label className="block font-medium mb-1">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        name="dob"
                        value={inputs.dob}
                        onChange={handleChange}
                        className="w-full outline-1 outline-dashed p-2 rounded-md"
                    />
                </div>

                {/* Nationality */}
                <div>
                    <label className="block font-medium mb-1">
                        Nationality
                    </label>
                    <input
                        type="text"
                        name="nationality"
                        value={inputs.nationality}
                        onChange={handleChange}
                        className="w-full outline-1 outline-dashed p-2 rounded-md"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block font-medium mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={inputs.address}
                        onChange={handleChange}
                        className="w-full outline-1 outline-dashed p-2 rounded-md"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block font-medium mb-1">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phoneNo"
                        value={inputs.phoneNo}
                        onChange={handleChange}
                        className="w-full outline-1 outline-dashed p-2 rounded-md"
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block font-medium mb-1">Gender</label>
                    <select
                        name="gender"
                        value={inputs.gender}
                        onChange={handleChange}
                        className="w-full outline-1 outline-dashed p-2 rounded-md"
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!changed}
                    className={`w-full bg-white outline-2 outline-black text-black py-2 rounded-md font-semibold transition-all duration-300 ease-in-out ${
                        changed
                            ? "hover:bg-black hover:text-white cursor-pointer"
                            : "cursor-not-allowed opacity-50"
                    }`}
                >
                    Save Changes
                </button>

                <div
                    className="absolute top-4 right-8 cursor-pointer hover:bg-slate-500/30 rounded-full transition-all duration-300 ease-in-out z-50"
                    onClick={setOpenEdit}
                >
                    <IoClose className="text-3xl" />
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
