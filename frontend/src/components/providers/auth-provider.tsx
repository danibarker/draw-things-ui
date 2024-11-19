import { useEffect, useState } from "react";
import { getCurrentUser } from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./useAuth";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	console.log("user", user);
	useEffect(() => {
		const getLoggedInUser = async () => {
			const newUser = await getCurrentUser();
			setUser(newUser);
			setLoading(false);
		};
		getLoggedInUser();
	}, [navigate]);

	const theValue = { user, loading };
	return (
		<AuthContext.Provider value={theValue}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
