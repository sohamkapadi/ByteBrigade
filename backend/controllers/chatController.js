import chatService from '../services/chatService.js';

export const getChatResponse = async (req, res) => {
    try {
        const { message } = req.body;

        // Validate message input
        if (!message) {
            return res.status(400).json({ error: 'Message is required.' });
        }

        const response = await chatService.getChatResponse(message);
        res.status(200).json({ response });
    } catch (error) {
        console.error('Error in chatController:', error);
        res.status(500).json({ error: 'Failed to generate a response.' });
    }
};
