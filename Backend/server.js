require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const port = process.env.PORT;

const app = express();

// Enhanced CORS configuration for production (Render/Vercel)
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
