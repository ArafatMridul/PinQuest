import Header from "./Header";
import JournalContainer from "./journal/JournalContainer";

const Main = ({ activeMenu }) => {
    return (
        <div className="flex-1 flex flex-col">
            <Header activeMenu={activeMenu} />

            <main className="flex-1">
                {activeMenu === "Travel Journal" && <JournalContainer />}
            </main>
        </div>
    );
};

export default Main;
