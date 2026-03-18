import axios from "axios";

const API = axios.create({
	backendURL: import.meta.env.VITE_BACKEND_API,
});

API.interceptors.request.use((req) => {
	const token = localStorage.getItem("token");
    
	if (token) {
		req.headers.Authorization = `Bearer ${token}`;
	}

	return req;
});

export default API;
