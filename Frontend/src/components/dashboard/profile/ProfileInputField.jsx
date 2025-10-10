import React from "react";

const ProfileInputField = ({ label, field }) => {
    return (
        <div className="grid grid-rows-2 sm:grid-rows-1 md:grid-cols-[240px_1fr] px-4 py-2 not-last:border-b border-slate-200">
            <label className="text-sm sm:text-lg">{label} :</label>
            <input
                type="text"
                disabled
                value={`${field}`}
                className={`${label === "Email" ? "" : "capitalize"}`}
            />
        </div>
    );
};

export default ProfileInputField;
