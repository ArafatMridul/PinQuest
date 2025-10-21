import { useJournal } from "../../context/journalContext";
import MapView from "../components/map/MapView";
import CircularProgressWithLabel from "../components/ui/CircularProgressWithLabel";

const Map = () => {
    const { locations, isLoading, progress } = useJournal();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <CircularProgressWithLabel value={progress} />
                <p className="mt-4 text-black font-bold text-sm">
                    Loading map data...
                </p>
            </div>
        );
    }

    if (locations.length === 0) {
        return (
            <div className="absolute top-70 sm:top-85 lg:top-100 bottom-0 left-0 right-0 flex items-center justify-center font-bold text-center z-30">
                <div className="w-50 sm:w-70 lg:w-100 text-xs sm:text-sm lg:text-lg">
                    <p>
                        If this takes too long, check if any journal is added,
                        if not add first to see them appear in the map.
                    </p>
                </div>
            </div>
        );
    }

    return <div>{<MapView locations={locations} />}</div>;
};

export default Map;
