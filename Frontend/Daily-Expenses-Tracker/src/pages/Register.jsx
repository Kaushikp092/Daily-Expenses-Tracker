import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const register = () => {
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

		try {
			await registerUser(form);
			setMessage("Register successfull!!! Redirecting...");
			navigate("/Login");
		} catch (err) {
			setError(err.message || "Failed to Register");
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			{message && <p className="text-2xl text-green-600">{message}</p>}
			{error && <p className="text-2xl text-red-500">{error}</p>}
			<div className="flex justify-center items-center h-screen">
				<form onSubmit={handleSubmit} className="p-6 border-radius">
					<h1 className="mb-4">Register Form</h1>
					<label htmlFor="name">
						Name:
						<input
							type="text"
							value={form.name}
							placeholder="Enter your name"
							className="border p-2 mb-2 w-full"
							onChange={(e) => setForm({ ...form, name: e.target.value })}
							required
						/>
					</label>
					<label htmlFor="email">
						Email:
						<input
							type="email"
							value={form.email}
							placeholder="Enter your email"
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
						{loading ? "Register in..." : "Register "}
					</button>
					<p className="mt-2 text-sm">
						Already having acc?
						<span
							className="text-blue-500 cursor-pointer"
							onClick={() => navigate("/Login")}
						>
							Login
						</span>
					</p>
				</form>
			</div>
		</>
	);
};

export default register;
