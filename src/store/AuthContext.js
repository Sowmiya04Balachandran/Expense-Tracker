import { createContext } from "react";

const AuthContext = createContext({
    token: null,
    
    isLoggedIn: false,
    login: (token,userId) => {},
    logout: () => {},
});

export default AuthContext;

