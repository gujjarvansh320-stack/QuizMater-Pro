import React from "react";
import "./Hero.css";
import heroImage from "../../assets/images/hero.svg";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Side */}
          <div className="col-lg-6">

            <span className="hero-badge">
              🚀 Trusted by 15,000+ Students
            </span>

            <h1 className="hero-title">
              Challenge Your
              <span> Knowledge</span>
            </h1>

            <p className="hero-description">
              Learn, compete and improve your skills with
              thousands of interactive quizzes from different
              categories.
            </p>

            <div className="hero-buttons">

              <button
                className="btn hero-btn"
                onClick={() => navigate("/categories")}
              >
                Start Quiz
                <FaArrowRight className="ms-2" />
              </button>

              <button
                className="btn hero-btn-outline"
                onClick={() => navigate("/categories")}
              >
                Explore Categories
              </button>

            </div>

            <div className="hero-rating">
              ⭐⭐⭐⭐⭐
              <p>Rated 4.9/5 by 10,000+ learners</p>
            </div>

          </div>

          {/* Right Side */}
          <div className="col-lg-6">

            <div className="hero-image-box">

              <img
                src={heroImage}
                alt="Quiz Hero"
                className="hero-image"
              />

              <div className="floating-card card1">
                🏆 <span>5000+ Questions</span>
              </div>

              <div className="floating-card card2">
                ⭐ <span>4.9 Rating</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;