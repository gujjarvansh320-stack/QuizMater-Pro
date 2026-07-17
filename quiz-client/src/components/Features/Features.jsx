import React from "react";
import "./Features.css";

import {
  FaRandom,
  FaChartLine,
  FaTrophy,
  FaMobileAlt,
  FaLock,
  FaBolt
} from "react-icons/fa";

const Features = () => {

  const features = [

    {
      icon:<FaRandom/>,
      title:"Random Questions",
      desc:"Every quiz shuffles both questions and answers for a fresh experience."
    },

    {
      icon:<FaChartLine/>,
      title:"Track Progress",
      desc:"Monitor your performance and improve with detailed analytics."
    },

    {
      icon:<FaTrophy/>,
      title:"Leaderboard",
      desc:"Compete with friends and climb the global leaderboard."
    },

    {
      icon:<FaMobileAlt/>,
      title:"Responsive",
      desc:"Enjoy a seamless experience on desktop, tablet, and mobile."
    },

    {
      icon:<FaLock/>,
      title:"Secure Login",
      desc:"JWT authentication ensures your account stays protected."
    },

    {
      icon:<FaBolt/>,
      title:"Instant Results",
      desc:"Get your score and detailed analysis immediately after every quiz."
    }

  ];

  return (

    <section className="features">

      <div className="container">

        <h2 className="section-title">
          Why Choose QuizMaster?
        </h2>

        <p className="section-subtitle">
          Everything you need to learn, compete, and improve.
        </p>

        <div className="row mt-5">

          {features.map((feature,index)=>(

            <div className="col-lg-4 col-md-6 mb-4" key={index}>

              <div className="feature-card">

                <div className="feature-icon">
                  {feature.icon}
                </div>

                <h4>{feature.title}</h4>

                <p>{feature.desc}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
};

export default Features;