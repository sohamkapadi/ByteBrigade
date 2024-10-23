import React, { useState, useEffect } from 'react';
import './Recommendations.css'; // Import CSS for styling

const StockRecommendations = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/finance/recommendations'); // Replace with your actual endpoint
        const data = await response.json();
        const recommendations = JSON.parse(data.recommendations); // Parse the JSON string
        setStocks(recommendations.stocks);
      } catch (error) {
        console.error('Error fetching stock recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="stock-recommendations-container">
      <h2>Stock Recommendations</h2>
      <div className="card-container">
        {stocks.map((stock, index) => (
          <div key={index} className="card">
            <h3>{stock.name} ({stock.symbol})</h3>
            <p>{stock.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockRecommendations;
