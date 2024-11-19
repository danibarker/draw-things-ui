import { createContext, useContext } from "react";

export const AuthContext = createContext<{
	user: User | null;
	loading: boolean;
}>({ user: null, loading: true });

export const useAuth = () => {
	return useContext(AuthContext);
};
