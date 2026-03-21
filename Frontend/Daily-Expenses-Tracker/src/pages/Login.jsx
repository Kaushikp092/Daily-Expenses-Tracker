import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const login = () => {
	const [form, setForm] = useState({ email: "", password: "" });
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");
		try {
			const res = await loginUser(form);
			localStorage.setItem("token", res.token);
			localStorage.setItem("userEmail", res.user.email);
			setMessage("Login successfull!! Redirecting...");
			navigate("/dashboard");
		} catch (err) {
			setError(err.message || "Failed to Logging");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="flex justify-center items-center h-screen">
				<form onSubmit={handleSubmit} className="p-6 border-radius">
			{message && <p className="text-2xl text-green-600">{message}</p>}
			{error && <p className="text-2xl text-red-500">{error}</p>}
					<h1 className="mb-4">Login form</h1>
					<label htmlFor="email">
						Email:
						<input
							type="email"
							value={form.email}
							placeholder="Enter Your Email"
							className="border p-2 mb-2 w-full"
							onChange={(e) => setForm({ ...form, email: e.target.value })}
							required
						/>
					</label>
					<label htmlFor="password">
						Password:
						<input
							type="password"
							value={form.password}
							placeholder="Enter your password"
							className="border p-2 mb-2 w-full"
							onChange={(e) => setForm({ ...form, password: e.target.value })}
							required
						/>
					</label>

					<button
						type="submit"
						className="bg-black text-white w-3/12 py-2 rounded-lg"
					>
						{loading ? "Logging in..." : "Login "}
					</button>
					<p className="mt-2 text-sm">
						If your don't have acc?
						<span
							className="text-blue-500 cursor-pointer"
							onClick={() => navigate("/Register")}
						>
							register
						</span>
					</p>

				<div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-lg my-6 mx-auto max-w-sm hover:shadow-xl transition-all duration-300">
					<h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
						📱 Try Demo Account
					</h3>
					<div className="space-y-3">
						<div className="flex items-center justify-between p-3 bg-white rounded-lg">
							<span className="flex items-center">
								📧 <span className="ml-2 font-medium">demo@gmail.com</span>
							</span>
							<button
								type="button"
								className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
								onClick={() => {
									navigator.clipboard.writeText('demo@gmail.com');
									setMessage('Email copied!');
									setTimeout(() => setMessage(''), 2000);
								}}
							>
								Copy
							</button>
						</div>
						<div className="flex items-center justify-between p-3 bg-white rounded-lg">
							<span className="flex items-center">
								🔒 <span className="ml-2 font-medium">123456</span>
							</span>
							<button
								type="button"
								className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors"
								onClick={() => {
									navigator.clipboard.writeText('123456');
									setMessage('Password copied!');
									setTimeout(() => setMessage(''), 2000);
								}}
							>
								Copy
							</button>
						</div>
					</div>
					<p className="text-xs text-gray-500 mt-3 text-center">Quick login for testing the app!</p>
				</div>

				</form>

					
			</div>
		</>
	);
};

export default login;
