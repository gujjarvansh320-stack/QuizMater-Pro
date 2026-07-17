import React from "react";
import "./FAQ.css";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click the Register button, fill in your details, and verify your email to start using QuizMaster.",
    },
    {
      question: "Can I retake a quiz?",
      answer:
        "Yes. You can retake any quiz as many times as you like to improve your score.",
    },
    {
      question: "Will my quiz history be saved?",
      answer:
        "Yes. Every completed quiz is stored in your account so you can track your progress.",
    },
    {
      question: "How are leaderboard scores calculated?",
      answer:
        "Leaderboard rankings are based on quiz scores, accuracy, and completion time.",
    },
    {
      question: "Is QuizMaster free to use?",
      answer:
        "Yes. The basic version is completely free. Premium features may be added in the future.",
    },
  ];

  return (
    <section className="faq">
      <div className="container">

        <h2 className="section-title">
          Frequently Asked Questions
        </h2>

        <p className="section-subtitle">
          Everything you need to know about QuizMaster.
        </p>

        <div className="accordion mt-5" id="faqAccordion">

          {faqs.map((faq, index) => (
            <div className="accordion-item mb-3" key={index}>

              <h2 className="accordion-header">

                <button
                  className={`accordion-button ${
                    index !== 0 ? "collapsed" : ""
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#faq${index}`}
                >
                  {faq.question}
                </button>

              </h2>

              <div
                id={`faq${index}`}
                className={`accordion-collapse collapse ${
                  index === 0 ? "show" : ""
                }`}
                data-bs-parent="#faqAccordion"
              >

                <div className="accordion-body">
                  {faq.answer}
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FAQ;