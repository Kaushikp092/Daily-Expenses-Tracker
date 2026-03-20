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
	return (
		<>
			{error && <p>{error}</p>}
			{expenses.length === 0 ? (
				<p>No expenses found</p>
			) : (
				expenses.map((e) => (
					<div
	key={e._id}
						className="flex justify-between items-center border p-4 mb-4 rounded-lg bg-gray-50 hover:shadow-md transition"
					>
						<div>
							<h3 className="font-semibold text-lg">{e.title}</h3>
							<p className="text-2xl font-bold text-green-600">₹{parseFloat(e.amount).toLocaleString()}</p>
							<span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{e.category}</span>
						</div>
						<button
							onClick={() => handleDelete(e._id)}
							className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
						>
							Delete
						</button>
					</div>
				))
			)}
		</>
	);
};

export default ExpenseList;
