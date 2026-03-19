const express = require("express");
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
	try {
		const { title, amount, category } = req.body;

		const expenses = new Expense({
			title,
			amount,
			category,
			userID: req.user.id,
		});

		await expenses.save();

		res.status(200).json({ expenses });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.get("/", authMiddleware, async (req, res) => {
	try {
		const expenses = await Expense.find({ userID: req.user.id }).populate(
			"userID",
			"name",
		);
		return res.status(200).json({ expenses });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.put("/:id", authMiddleware, async (req, res) => {
	try {
		const updatedExpense = await Expense.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ returnDocument: "after" },
		);

		if (!updatedExpense)
			return res.status(404).json({ message: "Expense Not Found" });

		return res.status(200).json({ expense: updatedExpense });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.delete("/:id", authMiddleware, async (req, res) => {
	try {
		await Expense.findOneAndDelete({ _id: req.params.id, userID: req.user.id });
		return res.status(200).json({ message: "Expense Deleted" });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;
