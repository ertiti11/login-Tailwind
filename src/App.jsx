import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/authContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Thanks from "./pages/Thanks";
import Quest from "./pages/Quest";
import Chart from "./pages/DataChart";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />{" "}
            <Route path="/quest" element={<Quest />} />
          </Route>

          <Route path="/finished" element={<Thanks />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
