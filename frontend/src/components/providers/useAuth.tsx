import { createContext, useContext } from "react";

export const AuthContext = createContext<{
	user: User | null;
	loading: boolean;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({ user: null, loading: true, setUser: () => {} });

export const useAuth = () => {
	return useContext(AuthContext);
};
