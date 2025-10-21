import { motion } from "framer-motion";
import { Link } from "lucide-react"; // using lucide icon library (you already use shadcn, so this works)

const OverlayCard = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.map(({ id, image, name, description, distance_m }) => {
                if (!image) return null;

                return (
                    <div
                        key={id}
                        className="relative h-96 rounded-3xl overflow-hidden cursor-pointer group"
                    >
                        {/* Background image */}
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        {/* Floating link icon (hidden by default) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            whileHover={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 transition-all duration-300"
                        >
                            <div className="bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-md">
                                <Link className="w-5 h-5 text-white" />
                            </div>
                        </motion.div>

                        {/* Content area */}
                        <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-2xl font-medium text-white mb-2">
                                {name}
                            </h3>

                            <p className="text-white/80 text-sm mb-4 line-clamp-2">
                                {description}
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <span className="text-white font-medium">
                                        {distance_m}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OverlayCard;
