import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // This is required for chartjs to work
import './charts.css'; // Import CSS for styling

// Sample Data (This should be imported or fetched from your backend)
import jsonStockObject from '../../../data/jsonStockObjects.json'; // Assuming this contains your companies data

const Charts = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [incomeStatementData, setIncomeStatementData] = useState({});
  const [balanceSheetData, setBalanceSheetData] = useState({});

  // Define the company options
  const companyOptions = jsonStockObject.companies.map(company => ({
    label: company.name,
    value: company.symbol,
  }));

  // Handle dropdown selection
  const handleCompanyChange = (event) => {
    const selectedSymbol = event.target.value;
    setSelectedCompany(selectedSymbol);

    // Find the selected company's data
    const company = jsonStockObject.companies.find(c => c.symbol === selectedSymbol);

    if (company) {
      setIncomeStatementData(company.incomeStatement);
      setBalanceSheetData(company.balanceSheet);
    }
  };

  // Prepare data for Chart 1 (Income Statement Metrics)
  const incomeStatementChartData = {
    labels: ['Revenue', 'Gross Profit', 'Operating Income', 'Net Income', 'EPS'],
    datasets: [
      {
        label: `${selectedCompany} Income Statement`,
        data: [
          incomeStatementData.revenue,
          incomeStatementData.grossProfit,
          incomeStatementData.operatingIncome,
          incomeStatementData.netIncome,
          incomeStatementData.eps,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Chart 2 (Balance Sheet Metrics)
  const balanceSheetChartData = {
    labels: ['Total Assets', 'Total Liabilities', 'Total Equity', 'Current Assets', 'Long-Term Debt'],
    datasets: [
      {
        label: `${selectedCompany} Balance Sheet`,
        data: [
          balanceSheetData.totalAssets,
          balanceSheetData.totalLiabilities,
          balanceSheetData.totalStockholdersEquity,
          balanceSheetData.totalCurrentAssets,
          balanceSheetData.longTermDebt,
        ],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="charts-container">
      <h2>Company Financial Metrics</h2>

      {/* Dropdown for selecting a company */}
      <select value={selectedCompany} onChange={handleCompanyChange}>
        <option value="">Select a Company</option>
        {companyOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Show charts only if a company is selected */}
      {selectedCompany && (
        <div className="charts">
          {/* Chart 1: Income Statement Metrics */}
          <div className="chart">
            <h3>Income Statement Metrics</h3>
            <Bar data={incomeStatementChartData} />
          </div>

          {/* Chart 2: Balance Sheet Metrics */}
          <div className="chart">
            <h3>Balance Sheet Metrics</h3>
            <Bar data={balanceSheetChartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Charts;