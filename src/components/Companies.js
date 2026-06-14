import React from "react";
import "../styles/companies.css";

const Companies = () => {
  return (
    <div className="companies-container">
      <div className="companies-title">Trusted by top industry leaders</div>
      <div className="companies">
        <img src="https://via.placeholder.com/100x40?text=Capgemini" alt="Capgemini" />
        <img src="https://via.placeholder.com/100x40?text=HDFC+Bank" alt="HDFC Bank" />
        <img src="https://via.placeholder.com/100x40?text=Apple" alt="Apple" />
        <img src="https://via.placeholder.com/100x40?text=JP+Morgan" alt="JP Morgan" />
        <img src="https://via.placeholder.com/100x40?text=BNY+Mellon" alt="BNY Mellon" />
      </div>
    </div>
  );
};

export default Companies;
