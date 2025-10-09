import React from "react";

const ProfileInputField = ({ label, field }) => {
    return (
        <div className="grid grid-cols-[240px_1fr] px-4 py-2 not-last:border-b border-slate-200">
            <label>{label} : </label>
            <input type="text" disabled value={field} className={`${label === "Email" ? "" : "capitalize"}`}/>
        </div>
    );
};

export default ProfileInputField;
