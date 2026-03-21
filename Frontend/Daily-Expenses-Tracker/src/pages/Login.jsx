import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = () => {
	const [form, setForm] = useState({ email: "", password: "" });
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
			const res = await loginUser(form);
			localStorage.setItem("token", res.token);
			localStorage.setItem("userEmail", res.user.email);
			setMessage("Login successful! Redirecting...");
			setTimeout(() => navigate("/dashboard"), 1500);
		} catch (err) {
			setError(err.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-gray-950 to-blue-950 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="backdrop-blur-xl bg-black/40 border border-blue-900/60 rounded-3xl p-8 shadow-2xl shadow-blue-950/60">
					<div className="text-center mb-8">
						<h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
							Welcome Back
						</h1>
						<p className="text-blue-300 text-lg font-medium drop-shadow-md">Sign in to your dashboard</p>
					</div>

					{message && (
						<div className="mb-6 p-4 bg-blue-900/60 border border-blue-600/70 rounded-2xl backdrop-blur-sm text-blue-200 text-center font-semibold shadow-xl shadow-blue-900/40 animate-bounce">
							{message}
						</div>
					)}
					{error && (
						<div className="mb-6 p-4 bg-red-900/60 border border-red-600/70 rounded-2xl backdrop-blur-sm text-red-200 text-center font-semibold shadow-xl shadow-red-900/40 animate-pulse">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block text-sm font-semibold text-blue-300 mb-2">
								📧 Email
							</label>
							<input
								type="email"
								value={form.email}
								placeholder="your@email.com"
								className="w-full px-5 py-4 bg-gray-900/90 border border-blue-800/60 rounded-2xl backdrop-blur-lg text-blue-200 placeholder-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-600/80 transition-all duration-400 shadow-xl hover:shadow-2xl hover:shadow-blue-900/40"
								onChange={(e) => setForm({ ...form, email: e.target.value })}
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-semibold text-blue-300 mb-2">
								🔒 Password
							</label>
							<input
								type="password"
								value={form.password}
								placeholder="••••••••"
								className="w-full px-5 py-4 bg-gray-900/90 border border-blue-800/60 rounded-2xl backdrop-blur-lg text-blue-200 placeholder-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-600/80 transition-all duration-400 shadow-xl hover:shadow-2xl hover:shadow-blue-900/40"
								onChange={(e) => setForm({ ...form, password: e.target.value })}
								required
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-4 bg-linear-to-r from-blue-700 via-blue-800 to-blue-900 hover:from-blue-800 hover:via-blue-900 hover:to-blue-950 text-white font-bold rounded-3xl shadow-2xl shadow-blue-900/60 hover:shadow-3xl hover:shadow-blue-900/80 transform hover:-translate-y-2 active:scale-[0.97] transition-all duration-400 ring-2 ring-blue-500/30 disabled:opacity-30 disabled:cursor-not-allowed"
						>
							{loading ? (
								<span className="flex items-center justify-center">
									<svg className="animate-spin -ml-1 mr-4 h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Signing In...
								</span>
							) : (
								"Sign In Securely"
							)}
						</button>
					</form>

					<div className="mt-8 pt-6 border-t border-blue-900/60">
						<p className="text-center text-sm text-blue-400 mb-2">
							New user?{" "}
							<span
								className="text-blue-300 font-bold hover:text-blue-200 cursor-pointer transition-all underline decoration-blue-600/60 hover:decoration-blue-500 hover:decoration-2"
								onClick={() => navigate("/register")}
							>
								Create Account
							</span>
						</p>
					</div>

					{/* Enhanced Demo Section - Copy Only */}
					<div className="mt-10 p-7 bg-linear-to-br from-blue-900/80 to-gray-900/80 border-2 border-blue-800/80 rounded-3xl backdrop-blur-xl shadow-2xl shadow-blue-950/80">
						<h3 className="text-2xl font-black text-blue-300 mb-6 text-center drop-shadow-xl">
							 Instant Demo Credentials
						</h3>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<div className="group">
								<div className="font-mono bg-blue-950/90 p-5 rounded-2xl mb-4 text-center text-xl text-blue-300 font-bold shadow-2xl shadow-blue-900/60 backdrop-blur-sm">
									demo@gmail.com
								</div>
								<button
									className="w-full py-4 px-8 bg-linear-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-blue-200 font-bold rounded-2xl transition-all duration-400 shadow-xl shadow-blue-900/60 hover:shadow-2xl hover:shadow-blue-900/80 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] ring-2 ring-blue-600/50"
									onClick={() => {
										navigator.clipboard.writeText("demo@gmail.com");
										setMessage("📧 Demo email copied to clipboard! Paste above 👆");
										setTimeout(() => setMessage(""), 3000);
									}}
								>
									 Copy 
								</button>
							</div>
							<div className="group">
								<div className="font-mono bg-blue-950/90 p-5 rounded-2xl mb-4 text-center text-xl text-cyan-300 font-bold shadow-2xl shadow-blue-900/60 backdrop-blur-sm">
									123456
								</div>
								<button
									className="w-full py-4 px-8 bg-linear-to-r from-cyan-700 to-blue-900 hover:from-cyan-800 hover:to-blue-950 text-cyan-200 font-bold rounded-2xl transition-all duration-400 shadow-xl shadow-cyan-900/60 hover:shadow-2xl hover:shadow-cyan-900/80 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] ring-2 ring-cyan-600/50"
									onClick={() => {
										navigator.clipboard.writeText("123456");
										setMessage("🔑 Demo password copied! Paste above 👆");
										setTimeout(() => setMessage(""), 3000);
									}}
								>
									 Copy 
								</button>
							</div>
						</div>
						<p className="text-sm text-blue-400 mt-6 text-center font-semibold opacity-90 drop-shadow-md">
							Perfect for quick testing your app ✨
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
