import React from "react";
import "./HowItWorks.css";

import {
  FaUserPlus,
  FaListAlt,
  FaPlayCircle,
  FaTrophy,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Create Account",
      desc: "Sign up and create your free QuizMaster account.",
    },
    {
      icon: <FaListAlt />,
      title: "Choose Category",
      desc: "Select your favorite quiz category.",
    },
    {
      icon: <FaPlayCircle />,
      title: "Start Quiz",
      desc: "Answer randomly shuffled questions with a timer.",
    },
    {
      icon: <FaTrophy />,
      title: "View Result",
      desc: "Check your score, ranking and performance analysis.",
    },
  ];

  return (
    <section className="how-it-works">
      <div className="container">

        <h2 className="section-title">
          How It Works
        </h2>

        <p className="section-subtitle">
          Start learning in just four simple steps.
        </p>

        <div className="row mt-5">

          {steps.map((step, index) => (
            <div className="col-lg-3 col-md-6 mb-4" key={index}>

              <div className="step-card">

                <div className="step-number">
                  {index + 1}
                </div>

                <div className="step-icon">
                  {step.icon}
                </div>

                <h4>{step.title}</h4>

                <p>{step.desc}</p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;