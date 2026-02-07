import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/news.css';

const NewsSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchNews = async () => {
      const data = [
        { id: 1, title: "Top 5 Remote Jobs in 2024", description: "Discover the most in-demand remote jobs for this year." },
        { id: 2, title: "Tech Skills You Need to Learn in 2024", description: "Stay ahead of the curve with these in-demand tech skills." },
        { id: 3, title: "Salary Trends for Software Engineers", description: "Explore the average salaries of software engineers across various cities." },
        { id: 4, title: "Job Market Insights for Fresh Graduates", description: "Find out how the job market is evolving for fresh graduates." },
      ];
      setNews(data);
    };

    fetchNews();
  }, []);

  return (
    <div className="news-section">
      <h2>Recent Trends in the Job Market</h2>
      <div className="news-cards">
        {news.map((item) => (
          <div className="news-card" key={item.id}>
            <Link to={`/news/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <h3>{item.title}</h3>
            </Link>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;