import React, { useEffect, useRef } from 'react';

const ChatWindow = ({ messages, isTyping }) => {
  const chatEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-[850px] mx-auto box-border p-4">
      <div className="flex-1 overflow-y-auto p-2 mb-2">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-center mb-2 p-2 rounded-lg 
            ${
              message.isYou ? 'justify-end' : 'justify-start'
            }`}>
            {!message.isYou && (
              <div className="flex items-start w-10 m-2">
                <img className="rounded-xl" src="/gemini.svg" alt="bot avatar" />
              </div>
            )}
            <div className={`p-2 rounded-lg 
            ${
                message.isYou
                  ? 'bg-gray-300 ml-0 lg:ml-2' // User message on the right
                  : 'bg-white mr-0 lg:mr-2' // Bot response on the left
              } max-w-[70%] sm:max-w-[80%] lg:max-w-[60%]`}>
              {message.text}
            </div>
            {message.isYou && (
              <div className="avatar ml-2">
                <div className="w-10 m-2">
                  <img className="rounded-xl" src="/user.png" alt="user avatar" />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing animation when AI is responding */}
        {isTyping && (
          <div className="flex items-center justify-start mb-2 p-2">
            <div className="flex items-start w-10 m-2">
              <img className="rounded-xl" src="/gemini.svg" alt="bot avatar" />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="line w-20 sm:w-32 lg:w-72 h-3 bg-gradient-to-r from-white via-blue-200 to-white rounded-md animate-pulse"></div>
              <div className="line w-20 sm:w-32 lg:w-72 h-3 bg-gradient-to-r from-white via-blue-200 to-white rounded-md animate-pulse"></div>
              <div className="line w-20 sm:w-32 lg:w-72 h-3 bg-gradient-to-r from-white via-blue-200 to-white rounded-md animate-pulse"></div>
            </div>
          </div>
        )}

        {/* dummy div every time res varum pothu down la vanthurum */}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
