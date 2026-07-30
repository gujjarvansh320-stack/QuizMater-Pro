// import React, { useState, useEffect } from 'react';
// // IMPORTANT: Make sure this path correctly points to your API file!
// // For example: import { getProfile } from '../../services/api';
// import { getProfile } from '../../api/auth'; 

// const AdminProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 1. Fetch the real-time profile securely from the backend
//     const fetchUserData = async () => {
//       try {
//         const responseData = await getProfile();
        
//         // Depending on your backend, the data might be nested inside a 'user' object
//         setUserData(responseData.user || responseData);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   // 2. Show a loading spinner while fetching the data
//   if (loading) {
//     return (
//       <div className="container mt-5 text-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   // 3. Set up dynamic variables with fallbacks
//   const name = userData?.name || "Unknown User";
//   const email = userData?.email || "No email provided";
//   const role = userData?.role || "user";
//   const userId = userData?._id || userData?.id || "Unknown ID";
  
//   // Dynamically grab the first letter for the circle icon
//   const initial = name.charAt(0).toUpperCase();

//   return (
//     <div className="container mt-4 d-flex justify-content-center">
//       <div className="card shadow-sm border-0" style={{ width: '100%', maxWidth: '400px' }}>
        
//         {/* Blue Header */}
//         <div 
//           className="card-header text-white text-start fs-5 py-3 border-0" 
//           style={{ backgroundColor: '#0d6efd' }}
//         >
//           My Profile
//         </div>
        
//         <div className="card-body text-center p-4">
          
//           {/* Dynamic Circular Initials Icon */}
//           <div 
//             className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 text-white" 
//             style={{ 
//               width: '120px', 
//               height: '120px', 
//               backgroundColor: '#17a2b8', 
//               fontSize: '3.5rem',
//               fontWeight: '400'
//             }}
//           >
//             {initial}
//           </div>
          
//           {/* Real-time Info Table */}
//           <table className="table text-start align-middle mb-4">
//             <tbody>
//               <tr>
//                 <th scope="row" className="border-bottom py-3" style={{ width: '100px' }}>Name</th>
//                 <td className="border-bottom py-3">{name}</td>
//               </tr>
//               <tr>
//                 <th scope="row" className="border-bottom py-3">Email</th>
//                 <td className="border-bottom py-3">{email}</td>
//               </tr>
//               <tr>
//                 <th scope="row" className="border-bottom py-3">Role</th>
//                 <td className="border-bottom py-3">
//                   {/* Dynamic Badge Color: Green for Admin, Blue for User */}
//                   <span className={`badge px-2 py-1 ${role === 'admin' ? 'bg-success' : 'bg-primary'}`}>
//                     {role}
//                   </span>
//                 </td>
//               </tr>
//               <tr>
//                 <th scope="row" className="border-bottom py-3">User ID</th>
//                 <td className="border-bottom py-3 text-break">{userId}</td>
//               </tr>
//             </tbody>
//           </table>
          
//           {/* Logout Button */}
//           <button 
//             className="btn text-white px-4 py-2" 
//             style={{ backgroundColor: '#dc3545', border: 'none' }}
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;




import React from 'react';
import { useNavigate } from 'react-router-dom';
// IMPORTANT: We import useAuth instead of the api file now!
import { useAuth } from '../../context/AuthContext'; 

const AdminProfile = () => {
  // 1. Grab the user data and logout function directly from your AuthContext
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 2. Use your context's built-in logout function
    logout();
    navigate("/login");
  };

  // 3. Show a loading state if the context hasn't loaded the user yet
  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 4. Set up dynamic variables using the context data
  const name = user.name || "Unknown User";
  const email = user.email || "No email provided";
  const role = user.role || "admin";
  const userId = user._id || user.id || "Unknown ID";
  
  // Dynamically grab the first letter for the circle icon
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card shadow-sm border-0" style={{ width: '100%', maxWidth: '400px' }}>
        
        {/* Blue Header */}
        <div 
          className="card-header text-white text-start fs-5 py-3 border-0" 
          style={{ backgroundColor: '#0d6efd' }}
        >
          My Profile
        </div>
        
        <div className="card-body text-center p-4">
          
          {/* Dynamic Circular Initials Icon */}
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 text-white" 
            style={{ 
              width: '120px', 
              height: '120px', 
              backgroundColor: '#17a2b8', 
              fontSize: '3.5rem',
              fontWeight: '400'
            }}
          >
            {initial}
          </div>
          
          {/* Real-time Info Table */}
          <table className="table text-start align-middle mb-4">
            <tbody>
              <tr>
                <th scope="row" className="border-bottom py-3" style={{ width: '100px' }}>Name</th>
                <td className="border-bottom py-3">{name}</td>
              </tr>
              <tr>
                <th scope="row" className="border-bottom py-3">Email</th>
                <td className="border-bottom py-3">{email}</td>
              </tr>
              <tr>
                <th scope="row" className="border-bottom py-3">Role</th>
                <td className="border-bottom py-3">
                  <span className={`badge px-2 py-1 ${role === 'admin' ? 'bg-success' : 'bg-primary'}`}>
                    {role}
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row" className="border-bottom py-3">User ID</th>
                <td className="border-bottom py-3 text-break">{userId}</td>
              </tr>
            </tbody>
          </table>
          
          {/* Logout Button */}
          <button 
            className="btn text-white px-4 py-2" 
            style={{ backgroundColor: '#dc3545', border: 'none' }}
            onClick={handleLogout}
          >
            Logout
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;