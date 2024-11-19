import { useEffect, useState } from "react";
import { getCurrentUser } from "../../helpers/api";
import { AuthContext } from "./useAuth";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	console.log("user", user);
	useEffect(() => {
		const getLoggedInUser = async () => {
			try {
				const newUser = await getCurrentUser();
				setUser(newUser);
			} catch (error) {
				setUser(null);
				console.warn("error getting user", error);
			}
			setLoading(false);
		};
		getLoggedInUser();
	}, []);
	console.log("provider,user", user);
	const theValue = { user, loading, setUser };
	return (
		<AuthContext.Provider value={theValue}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
