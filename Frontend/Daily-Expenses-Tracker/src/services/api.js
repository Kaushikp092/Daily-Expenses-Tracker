const BASE_URL = import.meta.env.VITE_BACKEND_API;

const getHeaders = () => ({
    "Content-Type" : "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ''}`
});

const handleResponse = async (res) => {
    const data = await res.json();
    if(!res.ok){
        const message = data.message || `Request Failed with Status ${res.status}`;
        throw new Error(message);
    }
    return data;
};

export const registerUser = async (formData) =>{
    const res = await fetch(`${BASE_URL}/auth/register`,{
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(formData)
    });
    return handleResponse(res);
};

export const loginUser = async (formData) => {
    const res = await fetch(`${BASE_URL}/auth/login`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
    });
    return handleResponse(res);
};

export const getExpenses = async () =>{
    const res = await fetch(`${BASE_URL}/expenses`,{
        headers: getHeaders(),
    });
    return handleResponse(res);
};

export const addExpense = async (expense) => {
    const res = await fetch(`${BASE_URL}/expenses`,{
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(expense),
    });
    return handleResponse(res);
};

export const updateExpense = async (id, expenses) => {
    const res = await fetch(`${BASE_URL}/expense/${id}`,{
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(expenses),
    });
    return handleResponse(res);
};

export const deleteExpense = async(id) => {
    const res = await fetch(`${BASE_URL}/expenses/${id}`,{
        method: "DELETE",
        headers: getHeaders(),
    });
    return handleResponse(res);
};