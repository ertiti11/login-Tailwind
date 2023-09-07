import { Navigate, Outlet } from "react-router-dom";
export default function ProtectedRoute() {

  if (!window.localStorage.getItem("pocketbase_auth"))
    return <Navigate to="/login" replace />;
  return <Outlet />;
}
