import { Navigate, useLocation } from "react-router-dom";
import { useApiContext } from "../context/ApiProvider";

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const { auth } = useApiContext();

    return auth.is_superuser ? (
        children
    ) : (
        <Navigate to="/page-not-authorzed" state={{ from: location }} replace />
    );
};

export default RequireAuth;