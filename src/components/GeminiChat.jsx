import React, { useState, createContext, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import InputBox from './InputBox';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBHO8ezsyoBSs1WZq1LImw8csfl38z5PhQ';

function GeminiChat() {
    const [messages, setMessages] = useState([]);
    const [genAI, setGenAI] = useState(null);
    const [isTyping, setIsTyping] = useState(false); // State for typing indicator
  
    useEffect(() => {
      const ai = new GoogleGenerativeAI(API_KEY);
      setGenAI(ai);
    }, []);
  
    const sendMessage = async (message) => {
      if (!genAI) return;

      // Add user message to the chat
      setMessages((prevMessages) => [...prevMessages, { text: message, isYou: true }]);

      // Show typing indicator
      setIsTyping(true);

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(message);

      // Simulate delay for typing effect (optional)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await result.response;
      const text = response.text();

      // Remove typing indicator and add the AI response
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, { text }]);
    };
  
    return (
      <div className="chat-app">
        {/* <App messages={messages} /> */}
        <ChatWindow messages={messages} isTyping={isTyping} />
        <InputBox onSendMessage={sendMessage} />
      </div>
    );
}

export default GeminiChat;
