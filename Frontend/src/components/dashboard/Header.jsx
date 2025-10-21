import { twMerge } from "tailwind-merge";
import { useJournal } from "../../../context/journalContext";
import { useUser } from "../../../context/userContext";
import SearchBar from "../SearchBar";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Header = ({ activeMenu }) => {
    const { user } = useUser();
    const { searchQuery, setSearchQuery, onSearchJournal, setFilteredJournal } =
        useJournal();

    const handleSearch = () => {
        if (searchQuery) {
            onSearchJournal();
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
        setFilteredJournal([]);
    };

    return (
        <header className="absolute z-20 right-0 left-0 bg-white border-b-1 border-slate-300 p-4 flex justify-between items-center">
            <h1
                className={twMerge(
                    "text-sm lg:text-xl font-semibold",
                    activeMenu === "Travel Journal" && "hidden sm:block"
                )}
            >
                {activeMenu}
            </h1>
            {activeMenu === "Travel Journal" && (
                <div className="lg:w-[400px] flex items-center px-4 bg-slate-100 rounded-md outline-2 outline-dashed">
                    <SearchBar
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onHandle={handleSearch}
                    />
                    <div className="flex items-center gap-1">
                        {searchQuery && (
                            <IoMdClose
                                className="text-slate-400 cursor-pointer"
                                onClick={onClearSearch}
                            />
                        )}
                        <FaSearch
                            className="text-slate-400 cursor-pointer"
                            onClick={handleSearch}
                        />
                    </div>
                </div>
            )}
            <div className="flex items-center space-x-1 lg:space-x-3">
                <span className="hidden sm:inline text-gray-600 text-xs lg:text-lg">
                    Hello,
                </span>
                <span className="text-end font-semibold capitalize text-xs lg:text-lg">
                    {user?.firstName}
                </span>
                <img
                    src="/user.png"
                    alt="user avatar"
                    className="size-6 lg:size-10 rounded-full"
                />
            </div>
        </header>
    );
};

export default Header;
