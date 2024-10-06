// src/components/Chatbox.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../css/Chatbox.css'; // Stil dosyasını oluşturacağız

const Chatbox = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello, what are you wondering about the universe today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message: input });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error communicating with backend:', error);
      const errorMessage = { sender: 'bot', text: 'Üzgünüm, bir hata oluştu.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h2>Sohbet</h2>
      </div>
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span>{msg.text}</span>
          </div>
        ))}
        {isLoading && <div className="message bot">Cevaplanıyor...</div>}
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          placeholder="Mesajınızı yazın..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          Gönder
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
