import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, userRole, requiredRole}) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    if (userRole !== requiredRole) {
        return <Navigate to="/404" />;
    }
    return <Outlet/>; // Nếu tất cả điều kiện đều đúng, render children
};

export default PrivateRoute;