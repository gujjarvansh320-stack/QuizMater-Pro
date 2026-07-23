// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Handle Login
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       console.log(process.env.REACT_APP_BASE_URL);

//       const res = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
//         formData,
//       );

//       const data = res.data;

//       console.log("Login Response:", data);

//       // Save token & user in Auth Context

//       console.log("Token:", data.token);
//       console.log("Full Response:", data);

//       login(data.token, data.user);

//       alert("Login Successful");

//       console.log("User:", data.user);
//       console.log("Role:", data.user.role);

//       // Redirect according to role
//       if (data.user.role === "admin") {
//         navigate("/Dashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error(error);

//       alert(error.response?.data?.message || error.message || "Login Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "450px" }}>
//       <h2 className="text-center mb-4">Login</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Email</label>

//           <input
//             type="email"
//             name="email"
//             className="form-control"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Password</label>

//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="text-end mb-3">
//           <Link to="/forgot-password">Forgot Password?</Link>
//         </div>

//         <button
//           type="submit"
//           className="btn btn-primary w-100"
//           disabled={loading}
//         >
//           {loading ? "Logging In..." : "Login"}
//         </button>
//       </form>

//       <p className="mt-3 text-center">
//         Don't have an account? <Link to="/register">Register</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;




import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./Login.css"; // Ensure you link the CSS file below

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        formData
      );

      const data = res.data;

      // Save token & user in Auth Context
      login(data.token, data.user);

      // Redirect according to role
      if (data.user.role === "admin") {
        navigate("/Dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="auth-card p-4 p-md-5 w-100" style={{ maxWidth: "450px" }}>
        
        {/* Header Section */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark-blue mb-2">Welcome Back 👋</h2>
          <p className="text-muted">Log in to continue your QuizMaster journey.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4 position-relative">
            <label className="form-label fw-semibold text-dark-blue">Email Address</label>
            <div className="input-group-custom">
              <span className="input-icon">
                <FaEnvelope className="text-muted" />
              </span>
              <input
                type="email"
                name="email"
                className="form-control custom-input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold text-dark-blue">Password</label>
            <div className="input-group-custom">
              <span className="input-icon">
                <FaLock className="text-muted" />
              </span>
              <input
                type="password"
                name="password"
                className="form-control custom-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-end mb-4">
            <Link to="/forgot-password" className="text-primary-link fw-medium small">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary-custom w-100 fw-bold"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-4 text-center text-muted">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary-link fw-bold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;