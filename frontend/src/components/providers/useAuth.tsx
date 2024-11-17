import { createContext, useContext } from "react";

export const AuthContext = createContext<{ user: User | null }>({ user: null });

export const useAuth = () => {
	return useContext(AuthContext);
};
