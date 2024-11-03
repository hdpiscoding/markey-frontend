import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import useLocalStorage from "./useLocalStorage";

const PrivateRoute = ({ isAuthenticated, userRole, requiredRole}) => {
    const navigate = useNavigate();
    const token = useLocalStorage('token').get();

    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    if (userRole !== requiredRole) {
        return <Navigate to="/404" />;
    }
    return <Outlet/>; // Nếu tất cả điều kiện đều đúng, render children
};

export default PrivateRoute;