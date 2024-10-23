// controllers/newsController.js
import axios from "axios";

export const getLatestNews = async (req, res) => {
    try {
        const response = await axios.get(`https://api.marketaux.com/v1/news/all?countries=in&filter_entities=true&published_after=2024-10-22T17:46&api_token=${process.env.MARKETAUX_API_KEY} `, {
        });

        // Extract relevant information from response
        //console.log(response.data);
        const articles = response.data.data.map(article => {
            const date = new Date(article.published_at); // Create a Date object
            const formattedDate = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD

            return {
                title: article.title,
                description: article.description,
                published_at: formattedDate // Only include the date
            };
        });

        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching news' });
    }
};
