import React from 'react';

const AdminProfile = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Profile</h2>
      
      <div className="card shadow-sm border-0" style={{ maxWidth: '600px' }}>
        <div className="card-body text-center p-5">
          {/* Large Profile Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512" 
            width="100" 
            height="100" 
            fill="#0d6efd"
            className="mb-3"
          >
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 416c-52.73 0-97.9-32.17-119.3-78.23C139.7 325 145.4 320 152 320h208c6.641 0 12.3 5 15.27 17.77C353.9 383.8 308.7 416 256 416z"/>
          </svg>
          
          <h4>System Administrator</h4>
          <p className="text-muted">Manage QuizMaster Data</p>
          
          <hr className="my-4" />
          
          <div className="text-start px-md-4">
            <p className="mb-2"><strong>Role:</strong> Super Admin</p>
            <p className="mb-2"><strong>Email:</strong> admin@quizmaster.com</p>
            <p className="mb-2"><strong>Status:</strong> <span className="badge bg-success">Active</span></p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;