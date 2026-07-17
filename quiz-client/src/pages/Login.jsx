// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser } from "../services/authService";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const data = await loginUser(formData);
//       console.log("Login Response:", data);
//       console.log("User:", data.user);
//       console.log("Role:", data.user?.role);

//       // Save token & user in AuthContext
//       login(data.token, data.user);

//       alert("Login Successful");
//       console.log(" the user role is ",data.user.role); // "admin"
//       if (data.user.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }

//     } catch (error) {
//       alert(error.response?.data?.message || "Login Failed");
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

//         <button className="btn btn-primary w-100" disabled={loading}>
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

      console.log(process.env.REACT_APP_BASE_URL);

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        formData,
      );

      const data = res.data;

      console.log("Login Response:", data);

      // Save token & user in Auth Context

      console.log("Token:", data.token);
      console.log("Full Response:", data);

      login(data.token, data.user);

      alert("Login Successful");

      console.log("User:", data.user);
      console.log("Role:", data.user.role);

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
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>

          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>

          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="text-end mb-3">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
