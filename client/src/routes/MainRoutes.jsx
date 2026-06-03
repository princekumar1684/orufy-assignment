import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Products from "../pages/Products";
import DashboardLayout from "../layout/DashboardLayout";

const MainRoutes = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
        withCredentials: true,
      })
      .then((res) => setAuth(res.data.loggedIn))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route element={auth ? <DashboardLayout /> : <Navigate to="/login" />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
