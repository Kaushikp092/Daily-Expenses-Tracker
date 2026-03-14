const express = require("express");
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
	try {
		const { title, amount, category } = req.body;

		const expense = new Expense({
			title,
			amount,
			category,
			userID: req.user.id,
		});

		await expense.save();

		res.status(200).json({ expense });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.get("/", authMiddleware, async (req, res) => {
	try {
        console.log('Logged User ID:', req.user.id);
		const expense = await Expense.find({ userId: req.user.id });
		res.status(200).json({ expense });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.delete("/:id", authMiddleware, async (req, res) => {
	try {
		await Expense.findOneAndDelete({_id: req.params.id, userId: req.user.id});
		res.status(200).json({ message: "Expense Deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
