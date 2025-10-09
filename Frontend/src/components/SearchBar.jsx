import React from "react";

const SearchBar = ({ value, onChange, onHandle }) => {
    return (
        <input
            type="text"
            placeholder="search journal..."
            className="text-xs w-full bg-transparent py-2 outline-none font-semibold"
            value={value}
            onChange={onChange}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onHandle();
                }
            }}
        ></input>
    );
};

export default SearchBar;
