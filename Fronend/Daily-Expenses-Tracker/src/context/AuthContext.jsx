import { Children, createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({Children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = (token) =>{
        localStorage.removeItem("token");
        setToken(null);
    };

    return(
        <AuthContext.Provider value={{token, login, logout}}>
            {Children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

