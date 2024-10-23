
import axios from "axios";

// Adapter function to fetch finance news
async function getFinanceNews() {
    try {
        const response = await axios.get('https://api.marketaux.com/v1/news/all', {
            params: {
                api_token: process.env.MARKETAUX_API_KEY,
                filter_entities: 'finance',
                language: 'en',
            }
        });
        return response.data.data; // Marketaux returns data inside the 'data' key
    } catch (error) {
        console.error('Error fetching finance news:', error);
        throw error;
    }
}

module.exports = { getFinanceNews };
