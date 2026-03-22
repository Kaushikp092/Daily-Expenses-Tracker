import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const COLORS = [
	"#0088FE",
	"#00C49F",
	"#FFBB28",
	"#FF8042",
	"#FF8042",
	"#A28EFF",
];

const MonthlyBarChart = ({ expenses }) => {
	// Group by month and category
	const monthlyData = {};

	expenses.forEach((expense) => {
		const date = new Date(
			expense.date || expense.createdAt || expense.dateAdded || Date.now(),
		);
		const monthKey = date.toISOString().slice(0, 7); // YYYY-MM
		const amount = parseFloat(expense.amount) || 0;

		if (!monthlyData[monthKey]) {
			monthlyData[monthKey] = {};
		}
		if (!monthlyData[monthKey][expense.category]) {
			monthlyData[monthKey][expense.category] = 0;
		}
		monthlyData[monthKey][expense.category] += amount;
	});

	// Convert to recharts format
	const categories = [...new Set(expenses.map((e) => e.category))];
	const chartData = Object.keys(monthlyData)
		.sort()
		.map((month) => {
			const entry = { month, name: month };
			categories.forEach((cat) => {
				entry[cat] = monthlyData[month][cat] || 0;
			});
			return entry;
		});

	if (chartData.length === 0) {
		return (
			<div className="backdrop-blur-xl bg-black/40 border border-blue-900/60 rounded-3xl p-8 shadow-2xl shadow-blue-950/60 text-center min-h-105 flex flex-col items-center justify-center">
				<svg
					className="w-24 h-24 text-blue-500 mb-4"
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
				<h3 className="text-2xl font-bold text-blue-300 mb-2 drop-shadow-lg">
					No Monthly Data
				</h3>
				<p className="text-blue-400 font-medium drop-shadow-md">
					Add expenses to see monthly trends
				</p>
			</div>
		);
	}

	return (
		<div className="backdrop-blur-xl bg-black/40 border border-blue-900/60 rounded-3xl p-8 shadow-2xl shadow-blue-950/60 hover:shadow-3xl hover:shadow-blue-950/80 transition-all duration-400">
			<h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent mb-8 text-center drop-shadow-2xl">
				Monthly Trends
			</h2>
			<ResponsiveContainer width="100%" height={420}>
				<BarChart
					data={chartData}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid
						strokeDasharray="3 3"
						vertical={false}
						stroke="hsla(0,0%,100%,0.1)"
					/>
					<XAxis
						dataKey="name"
						tickFormatter={(value) => value.slice(5, 7)}
						tick={{ fill: "#94A3B8" }}
						tickLine={false}
					/>
					<YAxis
						tickFormatter={(value) => `₹${value.toLocaleString()}`}
						tick={{ fill: "#94A3B8" }}
						tickLine={false}
					/>
					<Tooltip
						formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
						labelFormatter={(label) => `Month: ${label.slice(5, 10)}`}
						contentStyle={{
							backgroundColor: "rgba(17, 24, 39, 0.95)",
              color: "white",
							border: "1px solid rgba(59, 130, 246, 0.3)",
							borderRadius: "16px",
							backdropFilter: "blur(20px)",
						}}
					/>
					<Legend wrapperStyle={{ paddingTop: "20px" }} />
					{categories.map((category, index) => (
						<Bar
							key={category}
							dataKey={category}
							stackId="a"
							fill={COLORS[index % COLORS.length]}
							radius={[4, 4, 0, 0]}
							name={category}
						/>
					))}
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default MonthlyBarChart;
