import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { ReactNode } from "react";
import Loading from "../../pages/Loading";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading></Loading>;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
