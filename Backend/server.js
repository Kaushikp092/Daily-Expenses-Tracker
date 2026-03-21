require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const port = process.env.PORT;

const app = express();

// connecting frontend to backend
app.use(cors({origin: "*", credentials: true}));

// mongoDb mongoose connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/expenses", require("./routes/expenseRouter"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
