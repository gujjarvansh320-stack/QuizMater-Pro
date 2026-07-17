import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Computer Science Student",
    review:
      "QuizMaster helped me prepare for my exams with interactive quizzes. The leaderboard kept me motivated!",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Emma Watson",
    role: "Medical Student",
    review:
      "The random questions and instant results are amazing. I improved my knowledge every day.",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "David Miller",
    role: "Engineering Student",
    review:
      "Beautiful interface, fast performance and lots of quiz categories. Highly recommended!",
    image: "https://i.pravatar.cc/150?img=8",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">

      <div className="container">

        <h2 className="section-title">
          What Our Users Say
        </h2>

        <p className="section-subtitle">
          Thousands of students trust QuizMaster every day.
        </p>

        <div className="row mt-5">

          {testimonials.map((user) => (

            <div className="col-lg-4 mb-4" key={user.id}>

              <div className="testimonial-card">

                <img
                  src={user.image}
                  alt={user.name}
                  className="testimonial-img"
                />

                <h4>{user.name}</h4>

                <span>{user.role}</span>

                <p>"{user.review}"</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;