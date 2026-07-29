// import Sidebar from "./Sidebar";
// import AdminNavbar from "./AdminNavbar";
// import { Outlet } from "react-router-dom";

// const AdminLayout = () => {
//   return (
//     <div className="d-flex">
//       <Sidebar />

//       <div className="flex-grow-1">
//         <AdminNavbar />

//         <div className="p-4">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;




import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  // 1. State to manage mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Functions to open and close the mobile sidebar
  const toggleSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="d-flex">
      
      {/* --- DESKTOP SIDEBAR --- */}
      {/* Hidden on small screens, visible on medium screens and up */}
      <div className="d-none d-md-block">
        <Sidebar closeSidebar={closeSidebar} />
      </div>

      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      {/* Only renders when the hamburger button is clicked */}
      {isSidebarOpen && (
        <div
          className="d-md-none" // Ensures this overlay is only on mobile
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark transparent background
            zIndex: 1050, // Stays above everything else
          }}
          onClick={closeSidebar} // Clicking the dark background closes the sidebar
        >
          <div 
            style={{ width: "250px", height: "100%" }}
            onClick={(e) => e.stopPropagation()} // Prevents closing if clicking inside the sidebar
          >
            <Sidebar closeSidebar={closeSidebar} />
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        
        {/* Pass the toggle function to the Navbar so the hamburger button works */}
        <AdminNavbar toggleSidebar={toggleSidebar} />

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;