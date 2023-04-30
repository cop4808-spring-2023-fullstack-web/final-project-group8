import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";

function PrivateRoute({ path, ...props }) {
  const { user } = useAuth();

  return user ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
