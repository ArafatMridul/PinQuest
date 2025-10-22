import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        country: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setError(null);
                alert("Signup successful! Please log in.");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900  to-black/70 text-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full px-6">
                <div className="hidden lg:block">
                    <img
                        src="/assets/images/login-img.jpg"
                        alt=""
                        className="h-full w-full"
                    />
                </div>
                <div className="w-full max-w-xl bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700 mx-auto">
                    <h2 className="text-3xl font-extrabold text-white mb-2 text-center tracking-wide">
                        Sign Up To Get Started
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-10">
                        <div className="grid lg:flex items-center gap-6">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">
                                    First Name
                                </label>
                                <input
                                    type="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1">
                                Country
                            </label>
                            <input
                                type="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="country"
                                className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                required
                            />
                        </div>
                        <div>
                            {error && (
                                <p className="text-red-500 text-sm">{error}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transform hover:scale-[1.02] transition-all duration-500 ease-in-out cursor-pointer"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-gray-400 text-center">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-400 hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
