import React from "react";
import { useAuth } from "./providers/useAuth";
import { Navigate } from "react-router-dom";
import Loading from "./loading";

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
	const { user, loading } = useAuth();

	return loading ? <Loading /> : user ? children : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
