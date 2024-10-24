import React, { useState } from 'react';
import './Recommendations.css'; // Make sure to import the CSS

const Recommendations = () => {
    const [riskProfile, setRiskProfile] = useState('low');

    const recommendations = {
        low: [
            {
                name: "Microsoft Corp.",
                summary: "Microsoft's strong income statement reveals a significant revenue of $245 billion with a high net income of $88 billion and operating income of $109 billion; the balance sheet exhibits solid cash reserves ($75.5 billion in cash and short-term investments) alongside a strong equity position of $268 billion, indicating robust financial health."
            },
            {
                name: "Coca-Cola Co.",
                summary: "Coca-Cola's stable revenue of $42 billion and net income of $9.5 billion illustrate its strong market position; the balance sheet shows cash reserves of $20 billion, highlighting its ability to withstand market fluctuations."
            },
            {
                name: "Johnson & Johnson",
                summary: "Johnson & Johnson's consistent revenue of $94 billion and net income of $20 billion underline its robust financial health, supported by $24 billion in cash reserves and a diversified product portfolio."
            }
        ],
        moderate: [
            {
                name: "Google",
                summary: "Google showcases a dominant financial position with extensive revenue of $307.4 billion and a substantial net income of $73.8 billion; its balance sheet reflects financial strength with $110.9 billion in cash and short-term investments and an impressive stockholders' equity of $283 billion."
            },
            {
                name: "Apple Inc.",
                summary: "Apple's strong revenue of $394 billion and net income of $99.8 billion reflect its robust market presence; the company holds $27 billion in cash and short-term investments, providing financial stability."
            },
            {
                name: "PepsiCo Inc.",
                summary: "PepsiCo's revenue of $86 billion and net income of $13 billion show strong brand performance; the balance sheet includes $16 billion in cash and short-term investments, supporting its growth initiatives."
            }
        ],
        high: [
            {
                name: "Cisco Systems Inc.",
                summary: "Cisco demonstrates healthy financials with a solid revenue of $53.8 billion and net income of $10.3 billion; its balance sheet is strong with $17.9 billion in cash and short-term investments and a balanced total equity of $45.5 billion."
            },
            {
                name: "Tesla Inc.",
                summary: "Tesla's impressive revenue growth of $81 billion and net income of $12.6 billion highlight its market leadership; the company's balance sheet reflects $19 billion in cash, enabling it to invest in future technologies."
            },
            {
                name: "NVIDIA Corp.",
                summary: "NVIDIA's revenue of $26.9 billion and net income of $9.8 billion showcase its strong position in the semiconductor industry; with $12 billion in cash reserves, the company is well-equipped for expansion."
            }
        ]
    };

    const handleRiskChange = (event) => {
        setRiskProfile(event.target.value);
    };

    return (
        <div className="recommendations-container">
            <h2>Investment Recommendations</h2>
            <label htmlFor="risk-profile">Select Risk Profile:</label>
            <select id="risk-profile" value={riskProfile} onChange={handleRiskChange}>
                <option value="low">Low Risk</option>
                <option value="moderate">Moderate Risk</option>
                <option value="high">High Risk</option>
            </select>
            <div className="recommendations-content">
                {recommendations[riskProfile].map((company, index) => (
                    <div className="recommendation-card" key={index}>
                        <h3>{company.name}</h3>
                        <p>{company.summary}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
