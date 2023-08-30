import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";
export default function ProtectedRoute() {
  const { user } = useAuth();
  console.log(user);

  if (!window.localStorage.getItem("pocketbase_auth"))
    return <Navigate to="/login" replace />;
  return <Outlet />;
}
