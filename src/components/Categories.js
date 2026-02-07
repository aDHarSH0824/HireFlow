import React from "react";
import "../styles/categories.css";

const Categories = () => {
  const categories = ["Banking", "Work From Home", "HR", "Sales", "Accounting", "Customer Support"];
  return (
    <div className="categories">
      {categories.map((category, index) => (
        <div className="category-item" key={index}>{category}</div>
      ))}
    </div>
  );
};

export default Categories;
