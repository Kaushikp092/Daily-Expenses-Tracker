import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8042", "#A28EFF"];

const MonthlyBarChart = ({ expenses }) => {
  // Group by month and category
  const monthlyData = {};
  
  expenses.forEach((expense) => {
    const date = new Date(expense.date || expense.createdAt || expense.dateAdded || Date.now());
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
  const categories = [...new Set(expenses.map(e => e.category))];
  const chartData = Object.keys(monthlyData)
    .sort()
    .map(month => {
      const entry = { month, name: month };
      categories.forEach(cat => {
        entry[cat] = monthlyData[month][cat] || 0;
      });
      return entry;
    });

  if (chartData.length === 0) {
    return <div className="p-8 text-center text-gray-500">No expense data for charts</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Monthly Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickFormatter={(value) => value.slice(5, 7)} />
          <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
          <Tooltip 
            formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
            labelFormatter={(label) => `Month: ${label.slice(5, 10)}`}
          />
          <Legend />
          {categories.map((category, index) => (
            <Bar 
              key={category} 
              dataKey={category} 
              stackId="a" 
              fill={COLORS[index % COLORS.length]}
              name={category}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;

