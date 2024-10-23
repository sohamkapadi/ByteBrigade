//import { fetchStockData } from "../services/yhFinanceService.js";

export const getStockData = async (req, res, next) => {
  try {
    const stockData = await fetchStockData(req.params.ticker);
    res.status(200).json({
      success: true,
      data: stockData,
    });
  } catch (error) {
    next(error);
  }
};