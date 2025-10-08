import React, { useEffect, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const ImageSelector = ({ image, setImage, handleDeleteImage }) => {
    const [previewURL, setPreviewURL] = useState(null);
    const inputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const handleDeleteImageClick = () => {
        setImage(null);
        if (handleDeleteImage) {
            handleDeleteImage();
        }
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    useEffect(() => {
        if (typeof image === "string") {
            setPreviewURL(image);
            return;
        }
        if (image) {
            const objectURL = URL.createObjectURL(image);
            setPreviewURL(objectURL);
            return () => URL.revokeObjectURL(objectURL);
        } else {
            setPreviewURL(null);
        }
    }, [image]);

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                className="border border-dashed border-slate-300 rounded-lg p-3 w-full cursor-pointer text-sm text-slate-400 font-medium hover:bg-slate-100 transition-all duration-300 ease-in-out"
                onChange={handleImageChange}
            />
            {!image ? (
                <button
                    className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded-md border border-slate-200/50"
                    onClick={() => {
                        onChooseFile();
                    }}
                >
                    <div className="w-14 h-14 flex items-center justify-center bg-cyan-100 rounded-full border border-cyan-100 cursor-pointer hover:bg-cyan-200 transition-all duration-300 ease-in-out">
                        <BsUpload className="text-md text-cyan-500 font-extrabold" />
                    </div>
                    <p className="text-sm text-slate-500">
                        Browse Image to Upload
                    </p>
                </button>
            ) : (
                <div className="w-full relative">
                    <img
                        src={previewURL}
                        alt=""
                        className="w-full h-[300px] object-cover rounded-md"
                    />
                    <button
                        className="flex items-center gap-1 text-xs font-medium bg-rose-50 text-rose-500 shadow-rose-100/0 border border-rose-100 hover:bg-rose-500 hover:text-white rounded-sm px-2 py-1 transition-all duration-300 ease-in-out cursor-pointer absolute top-2 right-2"
                        onClick={handleDeleteImageClick}
                    >
                        <MdDelete className="text-lg" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageSelector;
