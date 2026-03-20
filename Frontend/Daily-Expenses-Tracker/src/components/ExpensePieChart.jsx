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
			<div className="bg-white p-6 rounded-xl shadow-lg text-center">
				<p className="text-gray-500">No expense data for categories</p>
			</div>
		);
	}

	return (
		<div className="bg-white p-6 rounded-xl shadow-lg">
			<h2 className="text-xl font-bold mb-6 text-gray-800 text-center">Expenses by Category</h2>
			<ResponsiveContainer width="100%" height={400}>
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						innerRadius={30}
						outerRadius={80}
						label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Tooltip 
						formatter={(value) => [ `₹${value.toLocaleString()}` , "Amount"]}
						labelFormatter={(label) => `Category: ${label}`}
					/>
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ExpensePieChart;

