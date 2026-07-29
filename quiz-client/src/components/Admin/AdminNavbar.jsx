// import React from 'react';
// import { Link } from 'react-router-dom'; // 1. Import Link

// const AdminNavbar = ({ toggleSidebar }) => {
//   const handleLogout = () => {
//     localStorage.removeItem("token"); 
//     window.location.href = "/login";
//   };

//   return (
//     <nav className="navbar navbar-light bg-light px-4 shadow-sm justify-content-between">
      
//       <div className="d-flex align-items-center">
//         <button 
//           className="btn btn-outline-secondary d-md-none me-3" 
//           onClick={toggleSidebar}
//         >
//           ☰
//         </button>
//         <span className="navbar-brand mb-0 h1">Admin Panel</span>
//       </div>
      
//       <div className="d-flex align-items-center">
        
//         {/* 2. Wrap the Profile section in a Link */}
//         <Link 
//           to="/admin/profile" 
//           className="d-flex align-items-center me-4 text-decoration-none"
//           style={{ cursor: 'pointer' }}
//         >
//           <span className="d-none d-md-inline fw-medium text-dark me-2">
//             Welcome, Admin
//           </span>

//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             viewBox="0 0 512 512" 
//             width="32" 
//             height="32" 
//             fill="#0d6efd" 
//           >
//             <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 416c-52.73 0-97.9-32.17-119.3-78.23C139.7 325 145.4 320 152 320h208c6.641 0 12.3 5 15.27 17.77C353.9 383.8 308.7 416 256 416z"/>
//           </svg>
//         </Link>

//         <button 
//           className="btn btn-outline-danger btn-sm px-3" 
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
      
//     </nav>
//   );
// };

// export default AdminNavbar;




import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = ({ toggleSidebar }) => {
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-light bg-light px-4 shadow-sm justify-content-between">
      
      <div className="d-flex align-items-center">
        <button 
          className="btn btn-outline-secondary d-md-none me-3" 
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <span className="navbar-brand mb-0 h1">Admin Panel</span>
      </div>
      
      <div className="d-flex align-items-center">
        
        {/* Profile Section in a Link */}
        <Link 
          to="/admin/profile" 
          className="d-flex align-items-center me-4 text-decoration-none"
          style={{ cursor: 'pointer' }}
        >
          {/* Circular Initials Icon */}
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center text-white" 
            style={{ 
              width: '35px', 
              height: '35px', 
              backgroundColor: '#17a2b8', // Teal color matching your image
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            V
          </div>

          <span className="d-none d-md-inline fw-medium text-dark ms-2">
            Welcome, Vansh
          </span>
        </Link>

        <button 
          className="btn btn-outline-danger btn-sm px-3" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      
    </nav>
  );
};

export default AdminNavbar;