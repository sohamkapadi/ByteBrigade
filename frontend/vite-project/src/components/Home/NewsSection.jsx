import React, { useEffect, useState } from "react";
import axios from "axios";
import './NewsSection.css'; // Make sure you have this CSS file for styling

const NewsSection = () => {
    const [news, setNews] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/news');
                console.log(response.data); // Log the response to inspect its structure
                setNews(response.data); // Set the response data directly
            } catch (err) {
                console.error(err); // Log error for debugging
                setError("Error fetching news");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <p>Loading news...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Check if news is an array
    if (!Array.isArray(news)) {
        return <p>No news available</p>; // Handle non-array responses
    }

    return (
        <div className="newsSection">
            <h2>Latest News</h2>
            <div className="newsCards">
                {news.map((article, index) => (
                    <div className="newsCard" key={index}>
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <p><strong>Published on:</strong> {article.published_at}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
