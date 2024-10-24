import OpenAI from 'openai';

// Configure OpenAI directly with the API key
const openai = new OpenAI({
  apiKey: `${process.env.OPENAI_API_KEY}`, // Keep your API key private!
});

// Function to handle generating chat responses
const getChatResponse = async (message) => {
    try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo', // Updated model
          messages: [{ role: 'user', content: `Answer this finance-related question: ${message}` }],
          max_tokens: 150,
        });
        return completion.choices[0].message.content.trim(); // Adjust to access the message content
    } catch (error) {
        console.error('Error in chatService:', error);
        throw new Error('Error in generating response from OpenAI.');
    }
};

export default { getChatResponse };
