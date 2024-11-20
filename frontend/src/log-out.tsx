import { Navigate } from "react-router-dom";
import { deleteCookie } from "./helpers";
import { useAuth } from "./components/providers/useAuth";

const LogOut = () => {
	const { setUser } = useAuth();
	setUser(null);
	deleteCookie();
	return <Navigate to="/login" />;
};

export default LogOut;
