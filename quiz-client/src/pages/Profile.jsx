import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <h3>Loading Profile...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">My Profile</h3>
        </div>

        <div className="card-body">
          <div className="text-center mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}&background=0D8ABC&color=fff&size=128`}
              alt="Profile"
              className="rounded-circle"
            />
          </div>

          <table className="table">
            <tbody>
              <tr>
                <th width="200">Name</th>
                <td>{user.name}</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{user.email}</td>
              </tr>

              <tr>
                <th>Role</th>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "bg-danger"
                        : "bg-success"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>

              <tr>
                <th>User ID</th>
                <td>{user._id || user.id}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-center mt-4">
            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;