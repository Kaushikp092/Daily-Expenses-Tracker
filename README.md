# 💸 Daily Expenses Tracker

A full-stack MERN application for tracking daily expenses, featuring secure user authentication, insightful charts, and real-time data synchronization.

---

## 🌐 Live Demo

- 🔗 **Frontend:** https://daily-expenses-tracker-chi.vercel.app  
- 🔗 **Backend API:** https://daily-expenses-tracker-aubo.onrender.com  

---

## 🎯 Features

- 📝 **Manage Expenses:** Add, edit, and delete your daily spending records  
- 📊 **Visual Analytics:** Interactive Pie & Bar charts for insights  
- 👤 **User Authentication:** Secure login/register using JWT  
- 🔐 **Protected Routes:** Frontend & backend security  
- 📱 **Responsive UI:** Built with Tailwind CSS  
- 💾 **Data Storage:** MongoDB Atlas integration  

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js (Vite)
- Tailwind CSS
- React Router
- Axios
- Recharts

### 🔹 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)
- CORS

---

## 📁 Project Structure

```
daily-expenses-tracker/
│
├── Backend/
│   ├── models/         # User & Expense schemas
│   ├── routes/         # Auth & Expense endpoints
│   ├── middleware/     # JWT verification
│   ├── server.js
│   └── .env
│
├── Frontend/
│   └── Daily-Expenses-Tracker/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── services/api.js
│       │   └── App.jsx
│       └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation Guide (Run Locally)

### 📌 Prerequisites
- Node.js (v18+)
- MongoDB Atlas or Local MongoDB

---

### 🔹 1. Clone Repository

```
git clone https://github.com/your-username/daily-expenses-tracker.git
cd daily-expenses-tracker
```

---

### 🔹 2. Backend Setup

```
cd Backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend server:

```
npm run dev
```

👉 Backend runs on: http://localhost:5000

---

### 🔹 3. Frontend Setup

Open new terminal:

```
cd Frontend/Daily-Expenses-Tracker
npm install
```

Create `.env` file:

```
VITE_API_URL=http://localhost:5000
```

Start frontend:

```
npm run dev
```

👉 Frontend runs on: http://localhost:5173

---

## 🔧 API Endpoints

| Method | Endpoint            | Description        |
|--------|--------------------|--------------------|
| POST   | /api/auth/register | Register user      |
| POST   | /api/auth/login    | Login user         |
| GET    | /api/expenses      | Get expenses       |
| POST   | /api/expenses      | Add expense        |
| PUT    | /api/expenses/:id  | Update expense     |
| DELETE | /api/expenses/:id  | Delete expense     |

---

## 🔐 Environment Variables

### Backend (.env)
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Deployment

- Frontend: Vercel  
- Backend: Render  

---

## ⚠️ Common Issues

### ❌ CORS Error
Fix in backend:

```
app.use(cors({
  origin: "https://daily-expenses-tracker-chi.vercel.app"
}));
```

---

### ❌ MongoDB Connection Error
- Add IP whitelist: 0.0.0.0/0  
- Check MONGO_URI  

---

## 🤝 Contributing

1. Fork the repo  
2. Create feature branch  
3. Commit changes  
4. Push to GitHub  
5. Open Pull Request  

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Kaushik Patil  
Aspiring Full Stack Developer  
MERN Stack Developer  

---

## ⭐ Support

If you like this project:

Give it a ⭐ on GitHub  
Share with others  
