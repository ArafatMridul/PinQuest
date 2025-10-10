const ProfileInputField = ({ label, field, src = null }) => {
    return (
        <div className="grid grid-rows-2 sm:grid-rows-1 md:grid-cols-[240px_1fr] px-4 py-2 not-last:border-b border-slate-200">
            <label className="text-sm sm:text-lg">{label} :</label>
            <div className="flex items-center gap-2">
                {src && (
                    <div className="flex items-center gap-1">
                        <img src={src} alt="" className="w-7.5" />
                        <p>-</p>
                    </div>
                )}
                <input
                    type="text"
                    disabled
                    value={field}
                    readOnly
                    className={`${
                        label === "Email" ? "" : "capitalize"
                    } w-full truncate`}
                />
            </div>
        </div>
    );
};

export default ProfileInputField;
