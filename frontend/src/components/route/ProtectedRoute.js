import React, { Fragment } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    // Render a loading indicator if authentication state is still loading
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            <Outlet />
          ) : (
            <Navigate to="/login" state={{ from: location.pathname }} />
          )
        }
      />
    </Routes>
  );
};

export default ProtectedRoute;
