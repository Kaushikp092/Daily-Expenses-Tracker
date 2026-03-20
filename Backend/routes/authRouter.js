const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			name,
			email,
			password: hashedPassword,
		}).select("-password");

		await user.save();

		return res
			.status(201)
			.json({ message: "User Registered Successfully", user: user });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const user = await User.findOne({ email });

		if (!user) return res.status(404).json({ message: "User Not Found" });

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

		const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
			expiresIn: "1d",
		});

		return res.status(200).json({
			token,
			user: {
				id: user._id,
				username: user.name,
				email: user.email,
			},
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const users = await User.find().select("-password");
		return res.status(200).json({ users });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Server error", error: error.message });
	}
});

module.exports = router;
