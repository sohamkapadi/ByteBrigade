import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (message.trim()) {
      const newChat = { user: 'You', text: message };
      setChatHistory([...chatHistory, newChat]);

      try {
        const response = await axios.post('http://localhost:3000/api/v1/chatbot/chat', { message });
        const botResponse = { user: 'Bot', text: response.data.response };
        setChatHistory([...chatHistory, newChat, botResponse]);
      } catch (error) {
        console.error('Error in sending message:', error);
        const errorResponse = { user: 'Bot', text: 'Failed to get response. Please try again.' };
        setChatHistory([...chatHistory, newChat, errorResponse]);
      }
      setMessage(''); // Clear the input field
    }
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-heading">Chatbot</h1>
      <div className="chatbox">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.user === 'You' ? 'user-message' : 'bot-message'}`}>
            <div className="message-content">
              <strong>{chat.user}:</strong> {chat.text}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a finance question..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
