import React from "react";
import "./Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="container">

        <div className="row">

          {/* Company */}

          <div className="col-lg-4 mb-4">

            <h3 className="footer-logo">
              QuizMaster
            </h3>

            <p>
              QuizMaster is an online quiz platform where students
              can improve their knowledge through interactive quizzes,
              leaderboards, and performance analytics.
            </p>

          </div>

          {/* Quick Links */}

          <div className="col-lg-2 col-md-6 mb-4">

            <h5>Quick Links</h5>

            <ul>

              <li><a href="/">Home</a></li>

              <li><a href="/">Categories</a></li>

              <li><a href="/">Leaderboard</a></li>

              <li><a href="/">Contact</a></li>

            </ul>

          </div>

          {/* Categories */}

          <div className="col-lg-3 col-md-6 mb-4">

            <h5>Categories</h5>

            <ul>

              <li>Programming</li>

              <li>Science</li>

              <li>Sports</li>

              <li>Movies</li>

              <li>General Knowledge</li>

            </ul>

          </div>

          {/* Contact */}

          <div className="col-lg-3">

            <h5>Contact</h5>

            <p>

              <FaMapMarkerAlt />

              Haryana, India

            </p>

            <p>

              <FaEnvelope />

              support@quizmaster.com

            </p>

            <p>

              <FaPhoneAlt />

              +91 9876543210

            </p>

            <div className="social-icons">

              <a href="/">
                <FaFacebookF />
              </a>

              <a href="/">
                <FaInstagram />
              </a>

              <a href="/">
                <FaLinkedinIn />
              </a>

              <a href="/">
                <FaGithub />
              </a>

            </div>

          </div>

        </div>

        <hr />

        <div className="footer-bottom">

          © {new Date().getFullYear()} QuizMaster. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
};

export default Footer;