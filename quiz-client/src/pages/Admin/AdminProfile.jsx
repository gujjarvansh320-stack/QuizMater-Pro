// import React from 'react';

// const AdminProfile = () => {
//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Admin Profile</h2>
      
//       <div className="card shadow-sm border-0" style={{ maxWidth: '600px' }}>
//         <div className="card-body text-center p-5">
//           {/* Large Profile Icon */}
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             viewBox="0 0 512 512" 
//             width="100" 
//             height="100" 
//             fill="#0d6efd"
//             className="mb-3"
//           >
//             <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 416c-52.73 0-97.9-32.17-119.3-78.23C139.7 325 145.4 320 152 320h208c6.641 0 12.3 5 15.27 17.77C353.9 383.8 308.7 416 256 416z"/>
//           </svg>
          
//           <h4>System Administrator</h4>
//           <p className="text-muted">Manage QuizMaster Data</p>
          
//           <hr className="my-4" />
          
//           <div className="text-start px-md-4">
//             <p className="mb-2"><strong>Role:</strong> Super Admin</p>
//             <p className="mb-2"><strong>Email:</strong> admin@quizmaster.com</p>
//             <p className="mb-2"><strong>Status:</strong> <span className="badge bg-success">Active</span></p>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;



import React, { useState, useEffect } from 'react';

const AdminProfile = () => {
  // State to hold the real-time user data
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // 1. Grab the user object from local storage
    // (Adjust the key "user" if you named it something else during login)
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Make sure to clear the user data on logout too!
    window.location.href = "/login";
  };

  // 2. Set up dynamic variables with fallbacks just in case data is missing
  const name = userData?.name || "Admin";
  const email = userData?.email || "No email provided";
  const role = userData?.role || "admin";
  const userId = userData?._id || userData?.id || "Unknown ID";
  
  // Dynamically grab the first letter of their name for the circle icon
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
                  <span className="badge bg-success px-2 py-1">{role}</span>
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