export const getRecommendedLocations = async (req, res) => {
    const { lat, lng } = req.body;

    try {
        // Step 1: search nearby places
        const baseResp = await fetch(
            `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lng}&lat=${lat}&rate=3&limit=5&apikey=${process.env.OPEN_TRIP_MAP_API_KEY}`
        );
        const baseData = await baseResp.json();

        // Step 2: get details for each xid
        const detailed = await Promise.all(
            baseData.features.map(async (place) => {
                const xid = place.properties.xid;
                const detailResp = await fetch(
                    `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${process.env.OPEN_TRIP_MAP_API_KEY}`
                );
                const detail = await detailResp.json();

                return {
                    id: xid,
                    name: detail.name,
                    description:
                        detail.info?.descr ||
                        detail.wikipedia_extracts?.text ||
                        "",
                    image: detail.preview?.source || null,
                    wikipedia: detail.wikipedia || null,
                    lat: detail.point?.lat,
                    lon: detail.point?.lon,
                    rating: place.properties.rate,
                    distance_m: place.properties.dist,
                };
            })
        );

        return res.json(detailed);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};
