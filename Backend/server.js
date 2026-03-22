require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const port = process.env.PORT;

const app = express();

const allowedOrigins = {
  production: [process.env.CLIENT_URL],
  development: ['http://localhost:5173', 'http://localhost:5000']
};

app.use(cors({
  origin: (origin, callback) => {
    const env = process.env.NODE_ENV || 'development';
    const allowed = allowedOrigins[env];

    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  }
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
});
