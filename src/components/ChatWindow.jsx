import React, { useEffect, useRef } from 'react';

const ChatWindow = ({ messages, isTyping }) => {
  const chatEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[78vh] w-full max-w-[900px] mx-auto box-border p-4">
      <div className="flex-1 overflow-y-auto p-2 mb-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-center mb-2 p-2 rounded-lg ${
              message.isYou
                ? 'justify-end' // Align user input to the right
                : 'justify-start' // Align bot response to the left
            }`}
          >
            {!message.isYou && (
              <div className="w-10 m-2">
                <img
                  className="rounded-xl"
                  src="/public/gemini.svg"
                  alt="bot avatar"
                />
              </div>
            )}
            <div
              className={`p-2 rounded-lg ${
                message.isYou
                  ? 'bg-gray-300 ml-0 lg:ml-[200px]' // User message on the right
                  : 'bg-white mr-0 lg:mr-[200px]' // Bot response on the left
              }`}
            >
              {message.text}
            </div>
            {message.isYou && (
              <div className="avatar ml-2">
                <div className="w-10 m-2">
                  <img
                    className="rounded-xl"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="user avatar"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing animation when AI is responding */}
        {isTyping && (
          <div className="flex items-center justify-start mb-2 p-2">
            <div className="w-10 m-2">
              <img
                className="rounded-xl"
                src="/gemini.svg"
                alt="bot avatar"
              />
            </div>
            <div className="typing-animation flex flex-col space-y-2">
              <div className="line w-36 h-4 bg-gradient-to-r from-white via-blue-200 to-white rounded-md animate-typing"></div>
              <div className="line w-36 h-4 bg-gradient-to-r from-white via-blue-200 to-white rounded-md animate-typing"></div>
              <div className="line w-36 h-4 bg-gradient-to-r from-white via-blue-200 to-white rounded-md animate-typing"></div>
            </div>
          </div>
        )}

        {/* Dummy div to ensure auto-scroll to bottom */}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
