import { useState } from "react";
import { addExpense } from "../services/api";

const ExpenseForm = ({ onAdd }) => {
	const [form, setForm] = useState({
		title: "",
		amount: "",
		category: "",
	});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const categories = [
		{ value: "Food", label: "🍔 Food", color: "from-orange-500 to-red-500" },
		{
			value: "Transportation",
			label: "🚗 Transportation",
			color: "from-blue-500 to-cyan-500",
		},
		{
			value: "Shopping",
			label: "🛒 Shopping",
			color: "from-purple-500 to-pink-500",
		},
		{
			value: "Entertainment",
			label: "🎬 Entertainment",
			color: "from-indigo-500 to-violet-500",
		},
		{ value: "Bills", label: "💡 Bills", color: "from-gray-500 to-slate-600" },
		{
			value: "Health",
			label: "🏥 Health",
			color: "from-green-500 to-emerald-600",
		},
		{ value: "Other", label: "📦 Other", color: "from-stone-400 to-gray-500" },
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.title.trim() || !form.amount || !form.category) {
			setError("Please fill all fields correctly");
			return;
		}
		setError(null);
		setLoading(true);
		setSuccess(false);

		try {
			await addExpense({
				...form,
				amount: parseFloat(form.amount),
			});
			setSuccess(true);
			setTimeout(() => {
				setForm({ title: "", amount: "", category: "" });
				setSuccess(false);
				if (onAdd) onAdd();
			}, 1200);
		} catch (err) {
			setError(
				err.response?.data?.message || err.message || "Failed to add expense",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mb-12">
			{/* Success Message */}
			{success && (
				<div className="mb-6 p-5 rounded-3xl bg-linear-to-r from-emerald-900/60 to-emerald-800/60 border-2 border-emerald-600/70 backdrop-blur-xl shadow-2xl shadow-emerald-900/40 animate-bounce">
					<div className="flex items-center gap-3">
						<div className="shrink-0">
							<svg
								className="w-8 h-8 text-emerald-300"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									stroke="currentColor"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<div>
							<h4 className="text-xl font-bold text-emerald-200 mb-1">
								Expense Added Successfully!
							</h4>
							<p className="text-emerald-300 font-medium">
								Form cleared and list refreshed
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Error Message */}
			{error && (
				<div className="mb-6 p-5 rounded-3xl bg-linear-to-r from-rose-900/60 to-red-900/60 border-2 border-rose-600/70 backdrop-blur-xl shadow-2xl shadow-rose-900/40 animate-pulse">
					<div className="flex items-center gap-3">
						<div className="shrink-0">
							<svg
								className="w-8 h-8 text-rose-300"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									stroke="currentColor"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
						</div>
						<div>
							<h4 className="text-xl font-bold text-rose-200 mb-1">
								Something went wrong
							</h4>
							<p className="text-rose-300 font-medium">{error}</p>
						</div>
					</div>
				</div>
			)}

			{/* Form */}
			<form
				onSubmit={handleSubmit}
				className="backdrop-blur-xl bg-black/40 border border-blue-900/60 rounded-3xl p-8 shadow-2xl shadow-blue-950/60 hover:shadow-3xl hover:shadow-blue-950/80 transition-all duration-500"
			>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-end">
					{/* Title */}
					<div className="space Ascendancy">
						<div className="flex items-center gap-2 text-lg font-semibold text-blue-300">
							<svg
								className="w-6 h-6 shrink-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								/>
							</svg>
							<span>Title</span>
							{/* </label> */}
						</div>
						<input
							type="text"
							placeholder="Coffee at Starbucks"
							value={form.title}
							onChange={(e) => setForm({ ...form, title: e.target.value })}
							disabled={loading}
							className="w-full px-6 py-5 bg-gray-900/90 border border-blue-800/60 rounded-2xl backdrop-blur-lg text-blue-200 placeholder-blue-400 font-medium text-lg focus:ring-4 focus:ring-blue-500/40 focus:border-blue-600/80 focus:outline-none hover:border-blue-700/80 transition-all duration-400 shadow-xl hover:shadow-2xl shadow-blue-900/40 min-h-16"
							maxLength={60}
						/>
					</div>

					{/* Amount - LEFT ALIGNED */}
					<div className="space-y-3">
						<label className="flex items-center gap-2 text-lg font-semibold text-blue-300">
							<svg
								className="w-6 h-6 shrink-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08 .402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>Amount</span>
						</label>
						<div className="relative">
							<span className="absolute left-5 top-1/2 -translate-y-1/2 text-3xl font-black text-emerald-400">
								₹
							</span>
							<input
								type="number"
								// min="0.01"
								// step="0.01"
								// placeholder="99.99"
								value={form.amount}
								onChange={(e) => setForm({ ...form, amount: e.target.value })}
								disabled={loading}
								className="w-full pl-16 px-6 py-5 text-2xl font-bold bg-gray-900/90 border border-blue-800/60 rounded-2xl backdrop-blur-lg text-emerald-300 placeholder-blue-400 focus:ring-4 focus:ring-emerald-500/40 focus:border-emerald-600/80 focus:outline-none hover:border-blue-700/80 transition-all duration-400 shadow-xl hover:shadow-2xl shadow-blue-900/40 min-h-16"
							/>
						</div>
					</div>

					{/* Category & Submit */}
					<div className="space-y-4 lg:space-y-6">
						<div className="space-y-3">
							<label className="flex items-center gap-2 text-lg font-semibold text-blue-300">
								<svg
									className="w-6 h-6 shrink-0"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M7 7h.01M7 3h5c.512 0 1.024 .195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
									/>
								</svg>
								<span>Category</span>
							</label>
							<select
								value={form.category}
								onChange={(e) => setForm({ ...form, category: e.target.value })}
								disabled={loading}
								className="w-full px-6 py-5 text-lg bg-gray-900/90 border border-blue-800/60 rounded-2xl backdrop-blur-lg text-blue-200 font-semibold focus:ring-4 focus:ring-purple-500/40 focus:border-purple-600/80 focus:outline-none hover:border-blue-700/80 transition-all duration-400 shadow-xl hover:shadow-2xl shadow-blue-900/40 min-h-16 appearance-none bg-no-repeat bg-right-center bg-select-arrow"
							>
								<option value="">Select Category</option>
								{categories.map((cat) => (
									<option key={cat.value} value={cat.value}>
										{cat.label}
									</option>
								))}
							</select>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full lg:w-auto px-10 py-6 bg-linear-to-r from-emerald-700 via-emerald-600 to-green-700 hover:from-emerald-800 hover:via-emerald-700 hover:to-green-800 text-white font-black text-xl rounded-3xl shadow-2xl shadow-emerald-900/60 hover:shadow-3xl hover:shadow-emerald-900/80 focus:ring-4 focus:ring-emerald-500/50 focus:outline-none transition-all duration-400 transform hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap order-first lg:order-last"
						>
							{loading ? (
								<>
									<svg
										className="w-7 h-7 mr-3 animate-spin inline-flex-shrink-0"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Adding...
								</>
							) : (
								" Add Expense"
							)}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ExpenseForm;
