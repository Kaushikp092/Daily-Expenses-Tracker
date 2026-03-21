import { useState } from "react";
import { deleteExpense } from "../services/api";

const ExpenseList = ({ expenses, onDelete }) => {
	const [error, setError] = useState(null);

	const handleDelete = async (id) => {
		try {
			await deleteExpense(id);
			onDelete();
		} catch (err) {
			setError(err.message);
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	if (error) {
		return (
			<div className="p-6 backdrop-blur-xl bg-rose-900/60 border-2 border-rose-600/70 rounded-3xl shadow-2xl shadow-rose-900/40 mb-8">
				<p className="text-rose-200 text-center font-semibold text-lg">
					{error}
				</p>
			</div>
		);
	}

	if (expenses.length === 0) {
		return (
			<div className="text-center py-20">
				<div className="w-28 h-28 bg-linear-to-br from-blue-500/30 to-purple-600/30 border-4 border-blue-500/50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl backdrop-blur-xl">
					<svg
						className="w-16 h-16 text-blue-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M9 12h6m-6 0v6m0-6H5m14 0H15m0 0v6m0-6h4M9 5h6a1 1 0 011 1v2a1 1 0 01-1 1h-6a1 1 0 01-1-1V6a1 1 0 011-1z"
						/>
					</svg>
				</div>
				<h3 className="text-3xl font-bold text-blue-300 mb-3 drop-shadow-xl">
					No Expenses
				</h3>
				<p className="text-blue-400 text-lg font-medium drop-shadow-md">
					Start adding your expenses to see them here
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 *:min-h-90">
			{expenses.map((expense) => (
				<div
					key={expense._id}
					className="group relative bg-black/40 backdrop-blur-xl border border-blue-900/60 hover:border-blue-700/80 rounded-3xl p-8 shadow-2xl shadow-blue-950/60 hover:shadow-3xl hover:shadow-blue-950/80 transition-all duration-500 hover:-translate-y-3 h-full flex flex-col justify-between hover:scale-[1.015]"
				>
					<div className="flex flex-col h-full space-y-6">
						{/* Header */}
						<div>
							<h3 className="text-2xl font-black bg-linear-to-r from-blue-300 via-blue-200 to-blue-400 bg-clip-text text-transparent line-clamp-2 leading-tight drop-shadow-2xl">
								{expense.title}
							</h3>
						</div>

						{/* Category & Date */}
						<div className="space-y-4">
							<div className="flex gap-3 flex-wrap">
								<span className="px-5 py-2 rounded-2xl text-sm font-bold bg-linear-to-r from-emerald-900/70 to-green-900/70 text-emerald-200 border border-emerald-600/70 shadow-lg backdrop-blur-xl hover:from-emerald-800/80 hover:shadow-emerald-900/50 transition-all">
									{expense.category}
								</span>
							</div>

							<div className="flex items-center gap-3 p-3 bg-blue-900/60 rounded-2xl backdrop-blur-xl border border-blue-700/60">
								<svg
									className="w-5 h-5 text-blue-400 shrink-0"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<span className="text-blue-300 font-medium text-sm inline-block">
									{formatDate(expense.createdAt)}
								</span>
							</div>
						</div>

						{/* Amount & Delete */}
						<div className="mt-auto space-y-6 pt-4">
							<p className="text-5xl font-black bg-linear-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-3xl text-center tracking-tight">
								₹{parseFloat(expense.amount).toLocaleString()}
							</p>
							<button
								onClick={() => handleDelete(expense._id)}
								className="w-full py-4 px-8 bg-linear-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold rounded-2xl shadow-2xl shadow-rose-500/60 hover:shadow-3xl hover:shadow-rose-500/80 transition-all duration-400 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.97]"
							>
								<svg
									className="w-6 h-6 inline mr-3"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
								Delete Expense
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ExpenseList;
