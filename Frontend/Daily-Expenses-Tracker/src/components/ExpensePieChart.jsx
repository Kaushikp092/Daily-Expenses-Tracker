import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ExpensePieChart = ({ expenses }) => {
	const grouped = {};

	expenses.forEach((e) => {
		grouped[e.category] = (grouped[e.category] || 0) + parseFloat(e.amount || 0);
	});

	// convert to chart format
	const data = Object.keys(grouped)
		.map((key) => ({
			name: key,
			value: grouped[key],
		}))
		.sort((a, b) => b.value - a.value);

	if (data.length === 0) {
		return (
			<div className="backdrop-blur-xl bg-black/40 border border-blue-900/60 rounded-3xl p-8 shadow-2xl shadow-blue-950/60 text-center min-h-100 flex flex-col items-center justify-center">
				<svg className="w-24 h-24 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>
				<h3 className="text-2xl font-bold text-blue-300 mb-2 drop-shadow-lg">No Category Data</h3>
				<p className="text-blue-400 font-medium drop-shadow-md">Add expenses to see spending breakdown</p>
			</div>
		);
	}

	return (
		<div className="backdrop-blur-xl bg-black/40 border border-blue-900/60 rounded-3xl p-8 shadow-2xl shadow-blue-950/60 hover:shadow-3xl hover:shadow-blue-950/80 transition-all duration-400">
			<h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent mb-8 text-center drop-shadow-2xl">
				Spending by Category
			</h2>
			<ResponsiveContainer width="100%" height={420}>
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						innerRadius={40}
						outerRadius="90%"
						cornerRadius={8}
						label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Tooltip 
						formatter={(value) => [ `₹${value.toLocaleString()}`, "Amount"]}
						labelFormatter={(label) => `Category: ${label}`}
					/>
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ExpensePieChart;
