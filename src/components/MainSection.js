import React from "react";
import "../styles/Main.css";


const MainSection = () => {
  return (
    <div className="main-section">
      <h2>Find the perfect job for YOU</h2>
      <div className="features">
        <div className="feature-card">
          <h3>Boost</h3>
          <p>Stand out to employers</p>
        </div>
        <div className="feature-card">
          <h3>Prep</h3>
          <p>Up your interview success rate</p>
        </div>
        <div className="feature-card">
          <h3>Learn</h3>
          <p>Upskill to get ahead</p>
        </div>
        <div className="feature-card">
          <h3>Network</h3>
          <p>Grow with peers & mentors</p>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
