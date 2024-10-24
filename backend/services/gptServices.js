import  OpenAI from "openai";
import stockData from '../data/stocks.json' assert {type :'json'}; // Import the stock data

const configuration = new OpenAI({
  apiKey: `${process.env.OPENAI_API_KEY}`,
});
const openai = new OpenAI(configuration);

// export const generateStockRecommendations = async (userProfile) => {
//   try {
//     // Step 1: Prepare the prompt
//     const prompt = `
//       The user "${userProfile.name}" has a "${userProfile.riskProfile}" risk profile for stock investments. 
//       Below is the financial data for 10 companies:
      
//       ${JSON.stringify(stockData, null, 2)}
      
//       Based on this financial data and the user's risk profile, recommend the top stocks for investment.
//       Also, summarize and visualize the financial data for the recommended stocks.
//     `;

//     // Step 2: Make the API call to OpenAI
//     const response = await openai.createCompletion({
//       model: "gpt-4",
//       prompt: prompt,
//       max_tokens: 500,
//       temperature: 0.7,
//     });

//     return response.data.choices[0].text;
//   } catch (error) {
//     throw new Error(Failed to generate recommendations: ${error.message});
//   }
// };




export const generateStockRecommendations = async (userProfile) => {
  try {
    const messages = [
      {
        role: "system",
        content: "You are a helpful financial assistant."
      },
      {
        role : "system",
        content:"There total 3 risk profiles of any person low , moderate , high"
      },
      {
        role: "system",
        content: `The user "${userProfile.name}" has a "${userProfile.riskProfile}" risk profile for stock investments.Below is the financial data for 10 companies: ${JSON.stringify(stockData, null, 2)}`
      },
    //   {
    //     role : "system",
    //     content:`Give output in strictly JSON object format with stock and summary as parameter in the format.  `
    //    },
      {
        role:"user",
        content:` Based on this financial data and the user's risk profile, recommend the name of top 3 stocks for investment. Give 1 line summary for each stock about Balance sheet and income statements helping users understand the financial health of companies in the following format:
        Company 1:
        Name: Company Name
        Summary: Summary of Balance sheet and Income statement
        Repeat for 3 companies with each company and summary on a new line and not a JSON format output, using the same format for each.`
      }
    ];

    // Call GPT-4 using the chat format
    const response = await openai.chat.completions.create({
      model: "gpt-4o",  // or "gpt-3.5-turbo" depending on the model you're using
      messages: messages,
      // max_tokens: 500,
      // temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw new Error(`Failed to generate recommendations: ${error.message}`);
  }
};