import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");
		setLoading(true);
		try {
			await registerUser(form);
			setMessage("Registration successful! Redirecting...");
			setTimeout(() => navigate("/"), 1500);
		} catch (err) {
			setError(err.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-gray-900 to-blue-950 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="backdrop-blur-xl bg-black/30 border border-blue-900/50 rounded-3xl p-8 shadow-2xl shadow-blue-950/50">
					<div className="text-center mb-8">
						<h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
							Join Us
						</h1>
						<p className="text-blue-300 text-lg font-medium drop-shadow-md">Create your free account</p>
					</div>

					{message && (
						<div className="mb-6 p-4 bg-emerald-900/50 border border-emerald-600/60 rounded-2xl backdrop-blur-sm text-emerald-200 text-center font-semibold shadow-xl shadow-emerald-900/30 animate-pulse">
							{message}
						</div>
					)}
					{error && (
						<div className="mb-6 p-4 bg-red-900/50 border border-red-600/60 rounded-2xl backdrop-blur-sm text-red-200 text-center font-semibold shadow-xl shadow-red-900/30 animate-pulse">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block text-sm font-semibold text-blue-300 mb-2">
								Full Name
							</label>
							<input
								type="text"
								value={form.name}
								placeholder="John Doe"
								className="w-full px-5 py-4 bg-gray-900/80 border border-blue-800/50 rounded-2xl backdrop-blur-md text-blue-200 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-600/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-900/30"
								onChange={(e) => setForm({ ...form, name: e.target.value })}
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-semibold text-blue-300 mb-2">
								Email Address
							</label>
							<input
								type="email"
								value={form.email}
								placeholder="your@email.com"
								className="w-full px-5 py-4 bg-gray-900/80 border border-blue-800/50 rounded-2xl backdrop-blur-md text-blue-200 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-600/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-900/30"
								onChange={(e) => setForm({ ...form, email: e.target.value })}
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-semibold text-blue-300 mb-2">
								Password
							</label>
							<input
								type="password"
								value={form.password}
								placeholder="••••••••"
								className="w-full px-5 py-4 bg-gray-900/80 border border-blue-800/50 rounded-2xl backdrop-blur-md text-blue-200 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-600/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-900/30"
								onChange={(e) => setForm({ ...form, password: e.target.value })}
								required
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-4 bg-linear-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-bold rounded-2xl shadow-2xl shadow-blue-900/50 hover:shadow-3xl hover:shadow-blue-900/70 transform hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
						>
							{loading ? (
								<span className="flex items-center justify-center">
									<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Creating Account
								</span>
							) : (
								"Create Account"
							)}
						</button>
					</form>

					<div className="mt-8 pt-6 border-t border-blue-900/50">
						<p className="text-center text-sm text-blue-400">
							Already have an account?{" "}
							<span
								className="text-blue-300 font-bold hover:text-blue-200 cursor-pointer transition-all underline decoration-blue-600/50 hover:decoration-blue-500"
								onClick={() => navigate("/")}
							>
								Sign In Now
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
