import { useEffect, useState } from "react";
import { getCurrentUser } from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./useAuth";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();
	useEffect(() => {
		const getLoggedInUser = async () => {
			const newUser = await getCurrentUser();
			setUser(newUser);
			if (!newUser) {
				navigate("/login");
			}
		};
		getLoggedInUser();
	}, [navigate]);

	const theValue = { user };
	return (
		<AuthContext.Provider value={theValue}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
