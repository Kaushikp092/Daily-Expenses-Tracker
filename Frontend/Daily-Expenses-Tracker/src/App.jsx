import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Register" element={<Register />} />
				<Route path="/Dashboard" element={<Dashboard />} />
			</Routes>
		</>
	);
};

export default App;
