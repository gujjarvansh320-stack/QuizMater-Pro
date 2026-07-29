// import React from "react";
// import AppRoutes from "./routes/AppRoutes";
// import Navbar from "./components/Navbar/Navbar"; // --> Add this import (adjust path if needed)

// function App() {
//   return (
//     <>
//       {/* 
//         Placing the Navbar outside of the routes ensures 
//         it renders at the top of every single page. 
//       */}
//       <Navbar />
      
//       {/* Your page content will render below the navbar */}
//       <AppRoutes />
//     </>
//   );
// }

// export default App;




// import React from "react";
// import { useLocation } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";
// import Navbar from "./components/Navbar/Navbar"; 

// function App() {
//   // 1. Get the current URL location
//   const location = useLocation();

//   // 2. Convert the path to lowercase to easily check it
//   const currentPath = location.pathname.toLowerCase();

//   // 3. Define what constitutes an "Admin" route based on your AppRoutes
//   // This will catch "/Dashboard", "/admin-dashboard", "/admin/users", etc.
//   const isAdminRoute = currentPath === "/dashboard" || currentPath.startsWith("/admin");

//   return (
//     <>
//       {/* 
//         4. Conditionally render the Navbar:
//         It will ONLY show up if isAdminRoute is false.
//       */}
//       {!isAdminRoute && <Navbar />}
      
//       {/* Your page content will render below */}
//       <AppRoutes />
//     </>
//   );
// }

// export default App;





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