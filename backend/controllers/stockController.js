import { generateStockRecommendations } from '../services/gptServices.js';

export const getStockRecommendations = async (req, res) => {
  const { userProfile } = req.body;

  if (!userProfile) {
    return res.status(400).json({ error: 'User profile and stock data are required.' });
  }

  try {
    const recommendations = await generateStockRecommendations(userProfile);
    res.status(200).json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};