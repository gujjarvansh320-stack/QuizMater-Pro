import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = (categoryId) => {
    navigate(`/quiz/${categoryId}`);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Choose a Category</h2>

      {loading ? (
        <h4 className="text-center">Loading...</h4>
      ) : (
        <div className="row">
          {categories.length === 0 ? (
            <div className="text-center">
              <h4>No Categories Found</h4>
            </div>
          ) : (
            categories.map((category) => (
              <div className="col-md-4 mb-4" key={category._id}>
                <div className="card shadow h-100">
                  <div className="card-body text-center">
                    <h4>{category.name}</h4>

                    <p>{category.description}</p>

                    <button
                      className="btn btn-primary mt-3"
                      onClick={() => startQuiz(category._id)}
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;