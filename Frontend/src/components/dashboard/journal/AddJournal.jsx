import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import DateSelector from "./DateSelector";
import ImageSelector from "./ImageSelector";
import TagInput from "./TagInput";

const AddJournal = ({ journal, type, onClose }) => {
    const [visitedDate, setVisitedDate] = useState(null);
    const [title, setTitle] = useState("");
    const [story, setStory] = useState("");
    const [storyImage, setStoryImage] = useState(null);
    const [visitedLocation, setVisitedLocation] = useState([]);

    const handleAddOrUpdateJournal = () => {};

    const handleDeleteStoryImage = () => {};

    return (
        <div>
            <div className="flex items-center justify-between">
                <h5 className="text-xl font-extrabold text-slate-700">
                    {type === "add" ? "Add New Journal" : "Edit Journal"}
                </h5>
                <div>
                    <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
                        {type === "add" ? (
                            <>
                                <button
                                    className="flex items-center gap-1 text-xs font-medium bg-cyan-50 text-[#05b6d3] shadow-cyan-100/0 border border-cyan-100 hover:bg-[#05b6d3] hover:text-white rounded-sm px-3 py-[3px] transition-all duration-300 ease-in-out cursor-pointer"
                                    onClick={handleAddOrUpdateJournal}
                                >
                                    <FaPlus />
                                    Add Journal
                                </button>
                                <button className="flex items-center gap-1 text-xs font-medium bg-rose-50 text-rose-500 shadow-rose-100/0 border border-rose-100 hover:bg-rose-500 hover:text-white rounded-sm px-3 py-[3px] transition-all duration-300 ease-in-out cursor-pointer">
                                    <MdDelete />
                                    Delete Journal
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="flex items-center gap-1 text-xs font-medium bg-cyan-50 text-[#05b6d3] shadow-cyan-100/0 border border-cyan-100 hover:bg-[#05b6d3] hover:text-white rounded-sm px-3 py-[3px] transition-all duration-300 ease-in-out cursor-pointer"
                                    onClick={AddOrUpdateJournal}
                                >
                                    <MdOutlineUpdate />
                                    Update Journal
                                </button>
                                <button className="flex items-center gap-1 text-xs font-medium bg-rose-50 text-rose-500 shadow-rose-100/0 border border-rose-100 hover:bg-rose-500 hover:text-white rounded-sm px-3 py-[3px] transition-all duration-300 ease-in-out cursor-pointer">
                                    <MdDelete />
                                    Delete Journal
                                </button>
                            </>
                        )}
                        <button className="" onClick={onClose}>
                            <IoClose className="text-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-slate-400/20 rounded-full" />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-1 flex-col gap-2 pt-4">
                    <label className="text-xs text-slate-400 font-bold uppercase">
                        Title
                    </label>
                    <input
                        type="text"
                        className="text-2xl text-slate-900 font-semibold outline-none"
                        placeholder="Once upon a time..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="my-3">
                        <DateSelector
                            date={visitedDate}
                            setDate={setVisitedDate}
                        />
                    </div>
                    <div>
                        <ImageSelector
                            image={storyImage}
                            setImage={setStoryImage}
                            handleDeleteImage={handleDeleteStoryImage}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <label className="text-xs text-slate-400 font-bold uppercase">
                            story
                        </label>
                        <textarea
                            rows={10}
                            className="w-full text-slate-900 bg-slate-100 font-semibold outline-none p-3 border border-slate-200 rounded-lg focus:border-slate-300 transition-all duration-300 ease-in-out resize-none"
                            placeholder="Write your story here..."
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="pt-3">
                        <label className="text-xs text-slate-400 font-bold uppercase">
                            visited locations
                        </label>
                        <TagInput
                            tags={visitedLocation}
                            setTags={setVisitedLocation}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddJournal;
