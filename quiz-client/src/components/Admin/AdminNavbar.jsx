// const AdminNavbar = () => {
//   return (
//     <nav className="navbar navbar-light bg-white shadow-sm px-4">
//       <h4 className="mb-0">Admin Panel</h4>

//       <div>
//         <strong>Admin</strong>
//       </div>
//     </nav>
//   );
// };

// export default AdminNavbar;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminNavbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // 1. Clear the authentication token from storage
//     localStorage.removeItem("token"); 
//     // (If you use a context/state for the user, clear it here too)

//     // 2. Redirect the admin back to the login page
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-light bg-light px-4 shadow-sm">
//       <span className="navbar-brand mb-0 h1">Admin Panel</span>
      
//       {/* Logout Button */}
//       <button 
//         className="btn btn-outline-danger" 
//         onClick={handleLogout}
//       >
//         Logout
//       </button>
//     </nav>
//   );
// };

// export default AdminNavbar;





import React from 'react';

const AdminNavbar = () => {
  const handleLogout = () => {
    // 1. Clear the authentication token from storage
    localStorage.removeItem("token"); 
    // (If you use a context/state for the user, clear it here too)

    // 2. Force a hard redirect to completely wipe React's memory
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-light bg-light px-4 shadow-sm justify-content-between">
      <span className="navbar-brand mb-0 h1">Admin Panel</span>
      
      {/* Logout Button */}
      <button 
        className="btn btn-outline-danger" 
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;