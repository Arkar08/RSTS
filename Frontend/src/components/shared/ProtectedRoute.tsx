import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
  isAuth: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({ element, isAuth, redirectTo = "/auth/login" }: ProtectedRouteProps) => {
  return isAuth ? element : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
