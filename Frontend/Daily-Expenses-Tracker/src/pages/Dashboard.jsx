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

  // 🔐 Check token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // 🔄 Fetch Expenses
  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      // console.log("API Response:", res); // Debug log
      setExpenses(res.expenses || res.data?.expenses || res.data || []);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // 💰 Total
  const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  // 📊 Average
  const average =
    expenses.length > 0 ? (total / expenses.length).toFixed(2) : 0;

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="bg-blue-500 text-white p-4 rounded">
          <h3>Total Expense</h3>
          <p className="text-xl font-bold">₹ {total}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded">
          <h3>Average Expense</h3>
          <p className="text-xl font-bold">₹ {average}</p>
        </div>

      </div>

      {/* Category Pie Chart */}
      <div className="mb-6">
        <ExpensePieChart expenses={expenses} />
      </div>

      {/* Monthly Bar Chart */}
      <div className="mb-8">
        <MonthlyBarChart expenses={expenses} />
      </div>

      {/* Form */}
      <ExpenseForm onAdd={fetchExpenses} />

      {/* List */}
      <ExpenseList expenses={expenses} onDelete={fetchExpenses} />

    </div>
  );
};

export default Dashboard;