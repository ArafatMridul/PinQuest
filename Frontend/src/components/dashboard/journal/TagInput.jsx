import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdAdd, IoMdClose } from "react-icons/io";

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState([]);

    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags((prev) => [...prev, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div>
            {tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="flex items-center gap-2 text-sm text-cyan-600 bg-cyan-200/40 px-3 py-1 rounded-sm"
                        >
                            <FaLocationDot className="text-sm" /> {tag}
                            <button
                                onClick={() => handleRemoveTag(tag)}
                                className="cursor-pointer"
                            >
                                <IoMdClose />
                            </button>
                        </span>
                    ))}
                </div>
            )}
            <div className="flex items-center gap-4 mt-3">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="text-sm bg-transparent border-2 border-dashed border-slate-200 px-3 py-2 rounded-sm outline-none font-semibold"
                    placeholder="Add locations.."
                />
                <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-cyan-500 hover:bg-cyan-500 transition-all duration-300 ease-in-out cursor-pointer">
                    <IoMdAdd
                        className="text-2xl text-cyan-500 hover:text-white transition-all duration-300 ease-in-out"
                        onClick={addNewTag}
                    />
                </button>
            </div>
        </div>
    );
};

export default TagInput;
