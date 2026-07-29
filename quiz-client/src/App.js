import React from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar/Navbar"; // Adjust this path if your Navbar is located elsewhere

function App() {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  // 1. Check if the current page is an admin route
  const isAdminRoute = currentPath === "/dashboard" || currentPath.startsWith("/admin");
  
  // 2. Check if the current page is a login/register route
  const isAuthRoute = currentPath === "/login" || currentPath === "/register" || currentPath === "/forgot-password" || currentPath.startsWith("/reset-password");

  // 3. Hide the navbar if it's EITHER an admin route OR an auth route
  const shouldHideNavbar = isAdminRoute || isAuthRoute;

  return (
    <>
      {/* The Navbar will NOT render on Login, Register, or Admin pages */}
      {!shouldHideNavbar && <Navbar />}
      
      <AppRoutes />
    </>
  );
}

export default App;