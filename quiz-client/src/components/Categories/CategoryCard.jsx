import React from "react";
import "./Categories.css";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({
  icon,
  title,
  description,
  categoryId,
}) => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quiz/${categoryId}`);
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="category-card">

        <div className="category-icon">
          {icon}
        </div>

        <h3>{title}</h3>

        <p>{description}</p>

        <button
          className="category-btn"
          onClick={handleStartQuiz}
        >
          Start Quiz
        </button>

      </div>
    </div>
  );
};

export default CategoryCard;