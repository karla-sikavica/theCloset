import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // ili tvoja Loading komponenta

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
