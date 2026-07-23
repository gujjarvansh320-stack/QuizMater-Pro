// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../services/authService";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
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

//       const data = await registerUser(formData);

//       alert(data.message || "Registration Successful");

//       navigate("/login");
//     } catch (error) {
//       alert(error.response?.data?.message || "Registration Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "450px" }}>
//       <h2 className="text-center mb-4">Register</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Name</label>

//           <input
//             type="text"
//             name="name"
//             className="form-control"
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Email</label>

//           <input
//             type="email"
//             name="email"
//             className="form-control"
//             placeholder="Enter your email"
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
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button
//           className="btn btn-success w-100"
//           disabled={loading}
//         >
//           {loading ? "Creating Account..." : "Register"}
//         </button>
//       </form>

//       <p className="text-center mt-3">
//         Already have an account?{" "}
//         <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "./Register.css"; 

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

  // Handle Registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
        formData
      );

      const data = res.data;
      console.log("Registration Response:", data);

      alert("Registration Successful! Please log in.");
      // setLoading(true)
      navigate("/login");
      
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || error.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="auth-card p-4 p-md-5 w-100" style={{ maxWidth: "450px" }}>
        
        {/* Header Section */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark-blue mb-2">Create an Account 🚀</h2>
          <p className="text-muted">Join QuizMaster and start challenging your knowledge.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4 position-relative">
            <label className="form-label fw-semibold text-dark-blue">Full Name</label>
            <div className="input-group-custom">
              <span className="input-icon">
                <FaUser className="text-muted" />
              </span>
              <input
                type="text"
                name="name"
                className="form-control custom-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

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
          <div className="mb-4 position-relative">
            <label className="form-label fw-semibold text-dark-blue">Password</label>
            <div className="input-group-custom">
              <span className="input-icon">
                <FaLock className="text-muted" />
              </span>
              <input
                type="password"
                name="password"
                className="form-control custom-input"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary-custom w-100 fw-bold"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-4 text-center text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-link fw-bold">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;