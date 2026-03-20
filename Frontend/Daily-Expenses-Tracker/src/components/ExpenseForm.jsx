import { useState } from "react";
import { addExpense } from "../services/api";

const ExpenseForm = ({ onAdd }) => {
	const [form, setForm] = useState({
		title: "",
		amount: "",
		category: "",
	});

	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.title || !form.amount || !form.category) {
			setError("Please fill all fields");
			return;
		}
		setError(null);
		try {
			await addExpense(form);
			setForm({ title: "", amount: "", category: "" });
			onAdd(); // refresh list
		} catch (err) {
			setError(err.message);
		}
	};
	return (
		<>
			{error && <p className="text-red-500 mb-4 p-3 bg-red-50 border rounded">{error}</p>}
			<form onSubmit={handleSubmit} className="flex gap-3 flex-wrap items-end mb-8 p-4 border rounded-lg bg-white shadow">
				<input
					placeholder="Title"
					value={form.title}
					onChange={(e) => setForm({ ...form, title: e.target.value })}
					className="border p-3 rounded-lg w-64 focus:ring-2 focus:ring-blue-500"
					required
				/>

				<input
					type="number"
					min="0"
					step="0.01"
					placeholder="Amount"
					value={form.amount}
					onChange={(e) => setForm({ ...form, amount: e.target.value })}
					className="border p-3 rounded-lg w-64 focus:ring-2 focus:ring-green-500"
					required
				/>

				<select
					value={form.category}
					onChange={(e) => setForm({ ...form, category: e.target.value })}
					className="border p-3 rounded-lg w-64 focus:ring-2 focus:ring-purple-500 bg-white"
					required
				>
					<option value="">Select Category</option>
					<option value="Food">Food</option>
					<option value="Transportation">Transportation</option>
					<option value="Shopping">Shopping</option>
					<option value="Entertainment">Entertainment</option>
					<option value="Bills">Bills</option>
					<option value="Health">Health</option>
					<option value="Other">Other</option>
				</select>

				<button 
					type="submit"
					className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
				>
					Add Expense
				</button>
			</form>
		</>
	);
};

export default ExpenseForm;
