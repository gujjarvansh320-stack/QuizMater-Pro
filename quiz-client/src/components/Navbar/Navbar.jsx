import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">

        {/* Logo */}
        <NavLink to="/" className="logo">
          Quiz<span>Master</span>
        </NavLink>

        {/* Navigation */}
        <ul className="nav-menu">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/categories">
              Categories
            </NavLink>
          </li>

          <li>
            <NavLink to="/leaderboard">
              Leaderboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/about">
              About
            </NavLink>
          </li>
        </ul>

        {/* Right Side */}
        <div className="nav-buttons">

          {isAuthenticated ? (
            <>
              <span style={{ marginRight: "15px", fontWeight: "600" }}>
                Welcome, {user?.name}
              </span>

              <FaUserCircle
                className="profile-icon"
                style={{ cursor: "pointer", marginRight: "15px" }}
                onClick={() => navigate("/profile")}
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
              <NavLink to="/login" className="login-btn">
                Login
              </NavLink>

              <NavLink to="/register" className="register-btn">
                Register
              </NavLink>

              <FaUserCircle className="profile-icon" />
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;