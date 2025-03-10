import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { SocketProvider } from "./socketContext";
import FrogotPassword from "./pages/FrogotPassword";
import UpdatePassword from "./pages/UpdatePassword";


import { useEffect } from "react";

function ProtectedRoute({ children }) {
  // const token = Cookies.get("token");
  const { token } = useSelector((state) => state.auth);
  console.log(token, "is token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<FrogotPassword />} />
        <Route path="/forgot-password/:token" element={<UpdatePassword />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SocketProvider>
                <Home />
              </SocketProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
