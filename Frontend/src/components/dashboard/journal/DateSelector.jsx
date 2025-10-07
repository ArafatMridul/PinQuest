import moment from "moment";
import { useState } from "react";
import { MdDateRange } from "react-icons/md";
import { DayPicker } from "react-day-picker";
import { IoMdClose } from "react-icons/io";

const DateSelector = ({ setDate, date }) => {
    const [openDatePicker, setOpenDatePicker] = useState(false);
    return (
        <div>
            <button
                className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-900 bg-sky-200/40 hover:bg-sky-200/70 rounded-sm px-2 py-1 cursor-pointer transition-all duration-300 ease-in-out"
                onClick={() => {
                    setOpenDatePicker((prev) => !prev);
                }}
            >
                <MdDateRange className="text-lg" />
                {date
                    ? moment(date).format("Do MMM, YYYY")
                    : moment().format("Do MMM, YYYY")}
            </button>
            {openDatePicker && (
                <div className="overflow-y-scroll p-5 bg-sky-50/80 rounded-lg relative pt-9">
                    <button
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-sky-100 hover:bg-sky-200 absolute top-2 right-2 transition-all duration-300 ease-in-out cursor-pointer"
                        onClick={() => {
                            setOpenDatePicker(false);
                        }}
                    >
                        <IoMdClose className="text-xl text-blue-900" />
                    </button>

                    <DayPicker
                        captionLayout="dropdown"
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        pagedNavigation
                    />
                </div>
            )}
        </div>
    );
};

export default DateSelector;
