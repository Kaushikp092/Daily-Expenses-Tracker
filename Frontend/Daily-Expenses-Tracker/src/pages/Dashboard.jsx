import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExpenses } from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyBarChart from "../components/MonthlyBarChart";

const Dashboard = () => {
	const [expenses, setExpenses] = useState([]);
	const navigate = useNavigate();

	// Get user info from localStorage
	const userEmail = localStorage.getItem("userEmail") || "user@example.com";
	const userName =
		localStorage.getItem("userName") ||
		localStorage.getItem("userEmail")?.split("@")[0] ||
		"User";

	// 🔄 Fetch Expenses
	const fetchExpenses = async () => {
		try {
			const res = await getExpenses();
			setExpenses(res.expenses || res.data?.expenses || res.data || []);
		} catch (err) {
			console.error("Failed to fetch expenses:", err);
		}
	};

	useEffect(() => {
		fetchExpenses();
	}, []);

	// 💰 Stats
	const total = expenses.reduce(
		(sum, e) => sum + (parseFloat(e.amount) || 0),
		0,
	);
	const average =
		expenses.length > 0 ? (total / expenses.length).toFixed(2) : "0.00";
	const expenseCount = expenses.length;

	// 🚪 Logout
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userEmail");
		localStorage.removeItem("userName");
		navigate("/");
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-gray-950 to-blue-950 flex flex-col">
			{/* Header */}
			<div className="backdrop-blur-xl bg-black/40 border-b border-blue-900/60">
				<div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
						{/* Profile Card */}
						<div className="backdrop-blur-xl bg-black/50 border border-blue-900/70 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-blue-950/70 hover:shadow-3xl hover:shadow-blue-950/90 transition-all duration-400 max-w-md lg:flex-1 lg:max-w-sm lg:order-1">
							<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
								{/* Avatar */}
								<div className="w-20 h-20 bg-linear-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/50 ring-4 ring-blue-900/50 hover:scale-110 transition-transform duration-300 shrink-0">
									<div className="text-3xl font-bold text-white drop-shadow-lg">
										{userName
											.split(" ")
											.map((n) => n[0])
											.join("")
											.toUpperCase()}
									</div>
								</div>

								{/* User Info */}
								<div className="flex-1 min-w-0">
									<h2 className="text-2xl sm:text-3xl font-black bg-linear-to-r from-blue-300 via-blue-200 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl mb-1 truncate">
										{userName}
									</h2>
									<p className="text-blue-300 font-semibold text-lg sm:text-xl drop-shadow-lg truncate max-w-62.5">
										{userEmail}
									</p>
								</div>
							</div>

							{/* Sign Out Button */}
							<button
								onClick={handleLogout}
								className="mt-6 w-full sm:w-auto px-8 py-4 bg-linear-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold rounded-3xl shadow-2xl shadow-rose-500/60 hover:shadow-3xl hover:shadow-rose-500/80 transition-all duration-400 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.97] whitespace-nowrap group"
							>
								<svg
									className="w-6 h-6 inline mr-2 group-hover:-translate-x-1 transition-transform duration-300"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
									/>
								</svg>
								Sign Out
							</button>
						</div>

						{/* Title */}
						<div className="flex flex-col items-center lg:items-start lg:flex-1 lg:order-2">
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl mb-3 lg:mb-0 text-center lg:text-left">
								Dashboard
							</h1>
							<p className="text-blue-300 font-medium text-lg sm:text-xl drop-shadow-md text-center lg:text-left max-w-md lg:max-w-none">
								Manage your daily expenses with insights and analytics
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
				{/* Stats Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
					{/* Total */}
					<div className="backdrop-blur-xl bg-black/40 border border-blue-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/60 hover:shadow-3xl hover:shadow-blue-950/80 transition-all duration-400 hover:-translate-y-2 h-full">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/50">
								<svg
									className="w-7 h-7 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08 .402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<p className="text-blue-300 font-semibold uppercase tracking-wide text-xs sm:text-sm">
								Total Spent
							</p>
						</div>
						<p className="text-3xl sm:text-4xl lg:text-5xl font-black bg-linear-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-2xl">
							₹{total.toLocaleString()}
						</p>
					</div>

					{/* Average */}
					<div className="backdrop-blur-xl bg-black/40 border border-blue-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/60 hover:shadow-3xl hover:shadow-blue-950/80 transition-all duration-400 hover:-translate-y-2 h-full">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-14 h-14 bg-linear-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/50">
								<svg
									className="w-7 h-7 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
									/>
								</svg>
							</div>
							<p className="text-blue-300 font-semibold uppercase tracking-wide text-xs sm:text-sm">
								Avg/Expense
							</p>
						</div>
						<p className="text-3xl sm:text-4xl lg:text-5xl font-black bg-linear-to-r from-cyan-400 via-sky-400 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl">
							₹{average}
						</p>
					</div>

					{/* Count */}
					<div className="backdrop-blur-xl bg-black/40 border border-blue-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/60 hover:shadow-3xl hover:shadow-blue-950/80 transition-all duration-400 hover:-translate-y-2 h-full">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-14 h-14 bg-linear-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/50">
								<svg
									className="w-7 h-7 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a4 4 0 11-8 0 4 4 0 018 0zm1 3a4 4 0 11-8 0 4 4 0 018 0z"
									/>
								</svg>
							</div>
							<p className="text-blue-300 font-semibold uppercase tracking-wide text-xs sm:text-sm">
								Total Count
							</p>
						</div>
						<p className="text-3xl sm:text-4xl lg:text-5xl font-black bg-linear-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
							{expenseCount}
						</p>
					</div>
				</div>

				{/* Charts Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
					<div className="backdrop-blur-xl bg-black/40 border border-blue-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/60 hover:shadow-3xl hover:shadow-blue-950/80 transition-all duration-400">
						<ExpensePieChart expenses={expenses} />
					</div>
					<div className="backdrop-blur-xl bg-black/40 border border-blue-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/60 hover:shadow-3xl hover:shadow-blue-950/80 transition-all duration-400">
						<MonthlyBarChart expenses={expenses} />
					</div>
				</div>

				{/* Form & List */}
				<div className="space-y-8">
					<ExpenseForm onAdd={fetchExpenses} />
					<div className="backdrop-blur-xl bg-black/30 border border-blue-900/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/50 hover:shadow-3xl">
						<h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent mb-8 drop-shadow-2xl text-center">
							Recent Expenses
						</h2>
						<div className="max-h-150 overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-blue-800/50 scrollbar-track-blue-950/50">
							<ExpenseList expenses={expenses} onDelete={fetchExpenses} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
