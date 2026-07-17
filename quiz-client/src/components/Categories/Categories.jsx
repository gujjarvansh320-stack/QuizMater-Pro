import React, { useEffect, useState } from "react";
import "./Categories.css";
import { FaCode } from "react-icons/fa";
import CategoryCard from "./CategoryCard";
import { getCategories } from "../../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="categories">
      <div className="container">
        <h2 className="section-title">
          Popular Categories
        </h2>

        <p className="section-subtitle">
          Choose a category and test your skills.
        </p>

        <div className="row mt-5">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              icon={<FaCode />}
              title={category.name}
              description={category.description}
              categoryId={category._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;