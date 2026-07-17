import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getResultById } from "../services/resultService";
import { addRating } from "../services/ratingService";

const Result = () => {
  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [rated, setRated] = useState(false);

  const fetchResult = useCallback(async () => {
  try {
    const data = await getResultById(id);
    setResult(data.result);
  } catch (error) {
    console.log(error);
    alert("Failed to load result");
  } finally {
    setLoading(false);
  }
}, [id]);

  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  const handleRating = async () => {
    if (rating === 0) {
      return alert("Please select a rating.");
    }

    try {
      setSubmitting(true);

      await addRating({
        resultId: result._id,
        categoryId: result.category._id,
        rating,
      });

      alert("Thanks for your rating ❤️");
      setRated(true);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to submit rating");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <h2 className="text-center mt-5">Loading...</h2>;

  if (!result)
    return <h2 className="text-center mt-5">No Result Found</h2>;

  return (
    <div className="container mt-5">

      <div className="card shadow p-5">

        <h2 className="text-center mb-4">
          Quiz Completed 🎉
        </h2>

        <h4>Score : {result.score}</h4>
        <h4>Correct : {result.correctAnswers}</h4>
        <h4>Wrong : {result.wrongAnswers}</h4>
        <h4>Percentage : {result.percentage}%</h4>

        <hr />

        <h3 className="text-center mb-3">
          Rate this Quiz
        </h3>

        <div className="text-center mb-4">
          {[1,2,3,4,5].map((star) => (
            <span
              key={star}
              onClick={() => !rated && setRating(star)}
              style={{
                fontSize: "40px",
                cursor: rated ? "default" : "pointer",
                color: star <= rating ? "gold" : "#ccc",
                margin: "5px"
              }}
            >
              ★
            </span>
          ))}
        </div>

        {!rated ? (
          <button
            className="btn btn-warning w-100"
            onClick={handleRating}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Rating"}
          </button>
        ) : (
          <div className="alert alert-success text-center">
            ⭐ Thank you for your feedback!
          </div>
        )}

        <Link
          className="btn btn-primary mt-4"
          to="/categories"
        >
          Take Another Quiz
        </Link>

      </div>

    </div>
  );
};

export default Result;