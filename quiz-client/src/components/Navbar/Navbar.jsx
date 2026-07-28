// import React, { useState } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom"; // <-- Fixed capital 'L' here
// import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
// import { useAuth } from "../../context/AuthContext";
// import "./Navbar.css";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); 
//   const { user, isAuthenticated, logout } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);

//   // If the user is on the quiz page, do not render the Navbar
//   if (location.pathname.startsWith('/quiz')) {
//     return null; 
//   }

//   const closeMenu = () => setMenuOpen(false);

//   const handleLogout = () => {
//     logout();
//     closeMenu();
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="container navbar-container">

//         {/* Logo */}
//         <NavLink to="/" className="logo" onClick={closeMenu}>
//           Quiz<span>Master</span>
//         </NavLink>

//         {/* Hamburger */}
//         <div
//           className="menu-icon"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </div>

//         {/* Menu */}
//         <div className={`nav-wrapper ${menuOpen ? "active" : ""}`}>

//           <ul className="nav-menu">

//             <li>
//               <NavLink to="/" end onClick={closeMenu}>
//                 Home
//               </NavLink>
//             </li>

//             <li>
//               <NavLink to="/categories" onClick={closeMenu}>
//                 Categories
//               </NavLink>
//             </li>

//             <li>
//               <NavLink to="/leaderboard" onClick={closeMenu}>
//                 Leaderboard
//               </NavLink>
//             </li>

//             <li>
//               <NavLink to="/about" onClick={closeMenu}>
//                 About
//               </NavLink>
//             </li>
//             <butto/>

//           </ul>

//           <div className="nav-buttons">

//             {isAuthenticated ? (
//               <>
//                 <span className="welcome-text">
//                   Welcome, {user?.name}
//                 </span>

//                 <FaUserCircle
//                   className="profile-icon"
//                   onClick={() => {
//                     navigate("/profile");
//                     closeMenu();
//                   }}
//                 />

//                 <button
//                   className="login-btn"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <NavLink
//                   to="/login"
//                   className="login-btn"
//                   onClick={closeMenu}
//                 >
//                   Login
//                 </NavLink>

//                 <NavLink
//                   to="/register"
//                   className="register-btn"
//                   onClick={closeMenu}
//                 >
//                   Register
//                 </NavLink>
//               </>
//             )}

//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // If the user is on the quiz page, do not render the Navbar
  if (location.pathname.startsWith('/quiz')) {
    return null; 
  }

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">

        {/* Logo */}
        <NavLink to="/" className="logo" onClick={closeMenu}>
          Quiz<span>Master</span>
        </NavLink>

        {/* Hamburger */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Menu */}
        <div className={`nav-wrapper ${menuOpen ? "active" : ""}`}>

          <ul className="nav-menu">

            <li>
              <NavLink to="/" end onClick={closeMenu}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/categories" onClick={closeMenu}>
                Categories
              </NavLink>
            </li>

            <li>
              <NavLink to="/leaderboard" onClick={closeMenu}>
                Leaderboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </li>

            {/* History Link - Only shows if the user is logged in */}
            {isAuthenticated && (
              <li>
                <NavLink to="/history" onClick={closeMenu}>
                  History
                </NavLink>
              </li>
            )}

          </ul>

          <div className="nav-buttons">

            {isAuthenticated ? (
              <>
                <span className="welcome-text">
                  Welcome, {user?.name}
                </span>

                <FaUserCircle
                  className="profile-icon"
                  onClick={() => {
                    navigate("/profile");
                    closeMenu();
                  }}
                />

                <button
                  className="login-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="login-btn"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="register-btn"
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;