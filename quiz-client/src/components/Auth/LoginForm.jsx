import React from "react";
import "./LoginForm.css";

const LoginForm = () => {
  return (
    <div className="login-container">

      <div className="login-card">

        <h2>Welcome Back 👋</h2>

        <p>Login to continue your learning journey.</p>

        <form>

          <div className="mb-3">

            <label>Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />

          </div>

          <div className="mb-3">

            <label>Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />

          </div>

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default LoginForm;