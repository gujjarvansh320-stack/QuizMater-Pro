import React from 'react';
import { FaBullseye, FaRocket, FaCheckCircle, FaLaptopCode, FaServer, FaDatabase, FaShieldAlt } from 'react-icons/fa';
import './About.css'; // Make sure to link the CSS file below

const About = () => {
  return (
    <div className="about-page-container">
      <div className="container py-5">
        
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-dark-blue mb-3">About QuizMaster</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
            QuizMaster is a modern online quiz platform designed to help users improve their programming knowledge through interactive quizzes, instant results, ratings, and leaderboards.
          </p>
        </div>

        <div className="row g-4 mb-4">
          {/* Mission Card */}
          <div className="col-md-6">
            <div className="about-card h-100 p-4 p-md-5">
              <div className="d-flex align-items-center mb-4">
                <div className="icon-wrapper bg-primary-light text-primary">
                  <FaBullseye size={26} />
                </div>
                <h3 className="ms-3 mb-0 fw-bold">Our Mission</h3>
              </div>
              <p className="text-muted lh-lg">
                Our mission is to make learning programming engaging and enjoyable by providing quizzes across multiple technologies. Whether you're a beginner or an experienced developer, QuizMaster helps you test and strengthen your skills.
              </p>
            </div>
          </div>

          {/* Features Card */}
          <div className="col-md-6">
            <div className="about-card h-100 p-4 p-md-5">
              <div className="d-flex align-items-center mb-4">
                <div className="icon-wrapper bg-primary-light text-primary">
                  <FaRocket size={26} />
                </div>
                <h3 className="ms-3 mb-0 fw-bold">Features</h3>
              </div>
              <ul className="feature-list list-unstyled mb-0">
                <li><FaCheckCircle className="text-primary me-3" /> User Authentication</li>
                <li><FaCheckCircle className="text-primary me-3" /> Email Verification & Password Reset</li>
                <li><FaCheckCircle className="text-primary me-3" /> Category-Based Quizzes</li>
                <li><FaCheckCircle className="text-primary me-3" /> Randomized Questions</li>
                <li><FaCheckCircle className="text-primary me-3" /> Instant Quiz Results</li>
                <li><FaCheckCircle className="text-primary me-3" /> User Rating System</li>
                <li><FaCheckCircle className="text-primary me-3" /> Leaderboard & Admin Dashboard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technologies Card */}
        <div className="about-card p-4 p-md-5 mt-2">
          <h3 className="fw-bold mb-5 text-center">Technologies Used</h3>
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <div className="tech-icon-wrapper mb-3 mx-auto">
                <FaLaptopCode size={36} className="text-primary" />
              </div>
              <h5 className="fw-bold mb-2">Frontend</h5>
              <p className="text-muted small mb-0">React.js, Bootstrap, Axios</p>
            </div>
            <div className="col-6 col-md-3">
              <div className="tech-icon-wrapper mb-3 mx-auto">
                <FaServer size={36} className="text-primary" />
              </div>
              <h5 className="fw-bold mb-2">Backend</h5>
              <p className="text-muted small mb-0">Node.js, Express.js</p>
            </div>
            <div className="col-6 col-md-3">
              <div className="tech-icon-wrapper mb-3 mx-auto">
                <FaDatabase size={36} className="text-primary" />
              </div>
              <h5 className="fw-bold mb-2">Database</h5>
              <p className="text-muted small mb-0">MongoDB</p>
            </div>
            <div className="col-6 col-md-3">
              <div className="tech-icon-wrapper mb-3 mx-auto">
                <FaShieldAlt size={36} className="text-primary" />
              </div>
              <h5 className="fw-bold mb-2">Authentication</h5>
              <p className="text-muted small mb-0">JWT & Nodemailer</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;